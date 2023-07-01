import { _decorator, Component, Node, PostProcessStage, profiler, ProgressBarComponent, TERRAIN_HEIGHT_BASE, AudioSource, AudioSourceComponent } from 'cc';
import { audioContro } from '../../df4/script/audioContro';
import { AudioManager } from '../../../loading/script/AudioManager';
const { ccclass, property } = _decorator;
enum AUDIOPLAYLIST {
    nostate,
    correc,
    wrong,
    turnRight,
    goodjob,
    congxu,
}
@ccclass('df2_direction_audioPlayControler')
export class df2_direction_audioPlayControler extends Component {
    @property(Node)
    private emitfromDirection: Node = null;
    @property(audioContro)
    private correc: audioContro = null;
    @property(audioContro)
    private wrong: audioContro = null;
    @property(audioContro)
    private turnRight: audioContro = null;
    @property(audioContro)
    private goodjob: audioContro = null;
    @property(audioContro)
    private congxu: audioContro = null;
    private count_audioPlayState: number = 0;
    private audioplay_list: AUDIOPLAYLIST = AUDIOPLAYLIST.nostate;
    start() {
        this.emitfromDirection.on('audio play hoi duong', this.audiPlay_hoiduong, this);
        this.emitfromDirection.on('audio play hoi duong_chicken', this.setAudioPlay_chicken, this);
        this.emitfromDirection.on('audio play list', this.set_AudioPlay_Correc_Wrong, this);
    }
    set_AudioPlay_Correc_Wrong(state: number) {
        if (state == AUDIOPLAYLIST.correc) {
            this.audioplay_list = AUDIOPLAYLIST.correc;
            this.audioPlay();
        }
        if (state == AUDIOPLAYLIST.wrong) {
            this.wrong.play();
        }
    }
    audioPlay() {
        if (this.audioplay_list == AUDIOPLAYLIST.correc) {
            this.correc.play();
            this.correc.node.on(AudioSource.EventType.ENDED, this.vocabulary_audioPlay, this);
        }
        if (this.audioplay_list == AUDIOPLAYLIST.turnRight) {
            this.node.emit('turn right show boxchat play');
            this.turnRight.play();
            this.turnRight.node.on(AudioSource.EventType.ENDED, this.set_goodjob, this);
        }
        if (this.audioplay_list == AUDIOPLAYLIST.goodjob) {
            this.goodjob.play();
            this.goodjob.node.on(AudioSource.EventType.ENDED, this.set_congxu, this);
        }
        if (this.audioplay_list == AUDIOPLAYLIST.congxu) {
            this.congxu.play();
            this.congxu.node.on(AudioSource.EventType.ENDED, this.setAudioEnd, this);
        }
    }
    vocabulary_audioPlay() {
        this.audioplay_list = AUDIOPLAYLIST.turnRight;
        this.audioPlay();
    }
    set_goodjob() {
        this.node.emit('turn right show boxchat end');
        this.audioplay_list = AUDIOPLAYLIST.goodjob;
        this.audioPlay();
    }
    set_congxu() {
        this.audioplay_list = AUDIOPLAYLIST.congxu;
        this.audioPlay();
    }
    setAudioPlay_chicken(audioPlay_name: string) {
        this.count_audioPlayState = this.count_audioPlayState + 1;
        var audioSounce = 'df2/sound/';
        var audioPlay = audioSounce.concat(audioPlay_name);
        AudioManager.instance().playShort('dark_forest', audioPlay, true);
        AudioManager.instance().audioSource.volume = 1;
        this.scheduleOnce(function () {
            this.node.emit('chicken audio play end2');
        }, 1.6)
        this.count_audioPlayState = 0;
    }
    audiPlay_hoiduong(audioPlay_name: string) {
        this.count_audioPlayState = this.count_audioPlayState + 1;
        var audioSounce = 'df2/sound/';
        var audioPlay = audioSounce.concat(audioPlay_name);
        AudioManager.instance().playShort('dark_forest', audioPlay, true);
        if (this.count_audioPlayState == 1) {
            this.scheduleOnce(function () {
                this.node.emit('audio end 1');
                this.scheduleOnce(function () {
                    this.node.emit('audio end 2');
                    this.scheduleOnce(function () {
                        this.node.emit('audio end');
                    }, 1.1)
                }, 0.7)
            }, 2)
        }
        if (this.count_audioPlayState == 2) {
            this.scheduleOnce(function () {
                this.node.emit('hoi duong audio end');
            }, 1.5)
        }
        if (this.count_audioPlayState == 3) {
            this.scheduleOnce(function () {
                this.node.emit('chicken audio play end');
            }, 1.4)
            this.count_audioPlayState = 0;
        }
    }
    setAudioEnd() {

    }
    update(deltaTime: number) {

    }
}


