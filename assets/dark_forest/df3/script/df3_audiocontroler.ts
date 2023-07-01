import { _decorator, Component, Node, AudioSource, log } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { audioContro } from '../../df4/script/audioContro';
const { ccclass, property } = _decorator;
enum AUDIOSTATE {
    NOSTATE,
    CHOOSETHERIGHTANSWER,
    OPPS_WHEREISOURFRIEND,
    SOUNDCORRECT,
    GOODJOB,
    SOUNDXU,
    WRONG,
    AREYOUOK,
    HAVEYOUFOUND,
    PLEASEDRAWTHECORRECTCOLOR,
    HAVEYOUCHOSENANYCOLOR,
    STAR,
    CIRCLE,
    SQUARE,
    TRIANGLE,
};
enum sceneState {
    noState,
    findLocation,
    drawingColor,
    collectPictures,
}
@ccclass('df3_audiocontroler')
export class df3_audiocontroler extends Component {
    @property({ type: audioContro })
    private choose_the_right_answer: audioContro = null;
    @property({ type: audioContro })
    private opps_where_is_our_friend: audioContro = null;
    @property({ type: audioContro })
    private correct: audioContro = null;
    @property({ type: audioContro })
    private goodjob: audioContro = null;
    @property({ type: audioContro })
    private congxu: audioContro = null;
    @property({ type: audioContro })
    private wrong: audioContro = null;
    @property({ type: audioContro })
    private areyouokay: audioContro = null;
    @property({ type: audioContro })
    private haveyoufound: audioContro = null;
    @property({ type: audioContro })
    private pleasedrawcorrectcolor: audioContro = null;
    @property({ type: audioContro })
    private haveyouchosenany_color: audioContro = null;
    @property({ type: Node })
    private emitfromDF3: Node = null;
    private audiostate: AUDIOSTATE = AUDIOSTATE.NOSTATE;
    private scenestate: sceneState = sceneState.noState;
    private numberAudio: number = 0;
    private nameColor: string = " ";
    private audioPlayName_hunghinh: string = " ";
    onLoad() {
        this.scenestate = sceneState.findLocation;
    }
    start() {
        this.emitfromDF3.on('audio play', this.setaudio, this);
        this.emitfromDF3.on('press number', this.setAnswerAudio, this);
        this.emitfromDF3.on('name node get color', this.setaudioColor, this);
        this.emitfromDF3.on('audio play_hunghinh', this.audiosetting_hunghinh, this);
        this.emitfromDF3.on('audioPlaying_nex_picture', this.audioPlay_nex_picture, this);
        this.emitfromDF3.on('end game', this.endGameSeting, this);
    }
    audioPlay_nex_picture(audioPlay_nex_picture_name: string) {
        this.audioPlayName_hunghinh = audioPlay_nex_picture_name;
        let nodeParent = this.choose_the_right_answer.node.parent!;
        if (nodeParent) {
            let childs = nodeParent.children;
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].name == this.audioPlayName_hunghinh) {
                    let audiocontro = childs[i].getComponent(audioContro);
                    audiocontro.play();
                    audiocontro.node.on(AudioSource.EventType.ENDED, this.emittoDF3_mainHunghinh_nex_picture, this);
                }
            }
        }
    }
    endGameSeting() {
        this.correct.play();
        this.correct.node.on(AudioSource.EventType.ENDED, this.vocabularyPlaySound, this);
    }
    vocabularyPlaySound() {
        this.node.emit('spine bear seting');
        var audioSounce = 'df3/sound/hunghinh/';
        var audioplay = audioSounce.concat(this.audioPlayName_hunghinh);
        AudioManager.instance().playShort('dark_forest', audioplay, true);
        AudioManager.instance().audioSource.volume = 1;
        this.scheduleOnce(function () {
            this.setgoodjob();
        }, 1.5);
    }
    setgoodjob() {
        this.goodjob.play();
        this.goodjob.node.on(AudioSource.EventType.ENDED, this.setcongxu, this);
    }
    setcongxu() {
        this.congxu.play();
        this.goodjob.node.on(AudioSource.EventType.ENDED, this.emitto_hunghung_audioEND, this);
    }
    audiosetting_hunghinh(audioPlay_name: string) {
        this.audioPlayName_hunghinh = audioPlay_name;
        let nodeParent = this.choose_the_right_answer.node.parent!;
        if (nodeParent) {
            let childs = nodeParent.children;
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].name == this.audioPlayName_hunghinh) {
                    let audiocontro = childs[i].getComponent(audioContro);
                    audiocontro.play();
                    audiocontro.node.on(AudioSource.EventType.ENDED, this.emittoDF3_mainHunghinh, this);
                }
            }
        }
    }
    setAnswerAudio(numberAudio: number) {
        this.numberAudio = numberAudio;
        this.setAudioSounce(numberAudio);
        this.scheduleOnce(function () {
            this.node.emit('answer audio OK');
        }, 3);
    }
    setaudioColor(nameColor: string) {
        this.nameColor = nameColor;
        var audioSounce = 'df3/sound/color/';
        var audioAnswer = nameColor;
        var audioPlay = audioSounce.concat(audioAnswer);
        AudioManager.instance().playShort('dark_forest', audioPlay, true);
        AudioManager.instance().audioSource.volume = 1;
    }
    setAudioSounce(numberAudio: number) {
        var AnswerArray = [];
        AnswerArray = [" ", "Above the big tree on the left", "In the canopy of the big tree on the left", "Under the big tree on the left", "ontheground", "On the left side of the big tree on the right", "Behind the big tree on the right", "On the right side of the big tree on the right", "In front of the big tree on the right"];
        var audioSounce = 'df3/sound/';
        var audioAnswer = AnswerArray[numberAudio];
        var audioPlay = audioSounce.concat(audioAnswer);
        AudioManager.instance().playShort('dark_forest', audioPlay, true);
        AudioManager.instance().audioSource.volume = 1;
    }
    setaudio(audiostate: number, scene_State: number) {
        if (scene_State == sceneState.findLocation) {
            this.scenestate = sceneState.findLocation;
            if (audiostate == AUDIOSTATE.CHOOSETHERIGHTANSWER) {
                this.audiostate = AUDIOSTATE.CHOOSETHERIGHTANSWER;
                this.node.emit('audio state', this.audiostate);
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.audiostate = AUDIOSTATE.SOUNDCORRECT;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.WRONG) {
                this.audiostate = AUDIOSTATE.WRONG;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.HAVEYOUFOUND) {
                this.audiostate = AUDIOSTATE.HAVEYOUFOUND;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.AREYOUOK) {
                this.audiostate = AUDIOSTATE.AREYOUOK;
                this.audioPlay();
            }
        }
        if (scene_State == sceneState.drawingColor) {
            this.scenestate = sceneState.drawingColor;
            if (audiostate == AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR) {
                this.audiostate = AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.HAVEYOUCHOSENANYCOLOR) {
                this.audiostate = AUDIOSTATE.HAVEYOUCHOSENANYCOLOR;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.AREYOUOK) {
                this.audiostate = AUDIOSTATE.AREYOUOK;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.audiostate = AUDIOSTATE.SOUNDCORRECT;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.WRONG) {
                this.audiostate = AUDIOSTATE.WRONG;
                this.audioPlay();
            }
        }
        if (scene_State == sceneState.collectPictures) {
            this.scenestate = sceneState.collectPictures;
            if (audiostate == AUDIOSTATE.WRONG) {
                this.audiostate = AUDIOSTATE.WRONG;
                this.audioPlay();
            }
            if (audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.audiostate = AUDIOSTATE.SOUNDCORRECT;
                this.audioPlay();
            }
        }
    }
    audioPlay() {
        if (this.scenestate == sceneState.findLocation) {
            if (this.audiostate == AUDIOSTATE.CHOOSETHERIGHTANSWER) {
                this.choose_the_right_answer.play();
                this.choose_the_right_answer.node.on(AudioSource.EventType.ENDED, this.soundVocabulary, this);
            }
            if (this.audiostate == AUDIOSTATE.OPPS_WHEREISOURFRIEND) {
                this.opps_where_is_our_friend.play();
                this.node.emit('audio state', this.audiostate);
                this.opps_where_is_our_friend.node.on(AudioSource.EventType.ENDED, this.emitAudioEnd, this);
            }
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.correct.play();
                this.node.emit('audio end', this.audiostate);
                this.correct.node.on(AudioSource.EventType.ENDED, this.soundVocabulary, this);
            }
            if (this.audiostate == AUDIOSTATE.GOODJOB) {
                this.goodjob.play();
                this.goodjob.node.on(AudioSource.EventType.ENDED, this.soundVocabulary, this)
            }
            if (this.audiostate == AUDIOSTATE.SOUNDXU) {
                this.congxu.play();
                this.congxu.node.on(AudioSource.EventType.ENDED, this.emitAudioEnd, this);
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.wrong.play();
                this.wrong.node.on(AudioSource.EventType.ENDED, this.emitAudioEnd, this);
            }
            if (this.audiostate == AUDIOSTATE.HAVEYOUFOUND) {
                this.haveyoufound.play();
            }
            if (this.audiostate == AUDIOSTATE.AREYOUOK) {
                this.areyouokay.play();
            }
        }
        if (this.scenestate == sceneState.drawingColor) {
            if (this.audiostate == AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR) {
                this.pleasedrawcorrectcolor.play();
                this.pleasedrawcorrectcolor.node.on(AudioSource.EventType.ENDED, this.emitAudioEnd, this);
            }
            if (this.audiostate == AUDIOSTATE.HAVEYOUCHOSENANYCOLOR) {
                this.haveyouchosenany_color.play();
            }
            if (this.audiostate == AUDIOSTATE.AREYOUOK) {
                this.areyouokay.play();
            }
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.correct.play();
                this.correct.node.on(AudioSource.EventType.ENDED, this.soundNameColor, this);
            }
            if (this.audiostate == AUDIOSTATE.GOODJOB) {
                this.goodjob.play();
                this.goodjob.node.on(AudioSource.EventType.ENDED, this.soundNameColor, this)
            }
            if (this.audiostate == AUDIOSTATE.SOUNDXU) {
                this.congxu.play();
                this.congxu.node.on(AudioSource.EventType.ENDED, this.emitAudioEnd, this);
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.wrong.play();
                this.wrong.node.on(AudioSource.EventType.ENDED, this.emitAudioEnd, this);
            }
        }
        if (this.scenestate == sceneState.collectPictures) {
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.correct.play();
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.wrong.play();
            }
        }
    }
    soundVocabulary() {
        if (this.scenestate == sceneState.findLocation) {
            if (this.audiostate == AUDIOSTATE.CHOOSETHERIGHTANSWER) {
                this.audiostate = AUDIOSTATE.OPPS_WHEREISOURFRIEND;
                this.audioPlay();
            }
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.setAudioSounce(this.numberAudio);
                this.scheduleOnce(function () {
                    this.audiostate = AUDIOSTATE.GOODJOB;
                    this.audioPlay();
                }, 2);
            }
            if (this.audiostate == AUDIOSTATE.GOODJOB) {
                this.audiostate = AUDIOSTATE.SOUNDXU;
                this.audioPlay();
            }
        }
    }
    soundNameColor() {
        if (this.scenestate == sceneState.drawingColor) {
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.setaudioColor(this.nameColor);
                this.scheduleOnce(function () {
                    this.audiostate = AUDIOSTATE.GOODJOB;
                    this.audioPlay();
                }, 2);
            }
            if (this.audiostate == AUDIOSTATE.GOODJOB) {
                this.audiostate = AUDIOSTATE.SOUNDXU;
                this.audioPlay();
            }
        }
    }
    emitAudioEnd() {
        if (this.scenestate == sceneState.findLocation) {
            if (this.audiostate == AUDIOSTATE.OPPS_WHEREISOURFRIEND) {
                this.node.emit('audio end', this.audiostate);
            }
            if (this.audiostate == AUDIOSTATE.SOUNDXU) {
                this.node.emit('audio end', this.audiostate);
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.node.emit('audio end', this.audiostate);
            }
        }
        if (this.scenestate == sceneState.drawingColor) {
            if (this.audiostate == AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR) {
                this.node.emit('audio end', this.audiostate);
            }
        }
    }
    emittoDF3_mainHunghinh() {
        this.node.emit('audio end_main_hunghinh');
    }
    emittoDF3_mainHunghinh_nex_picture() {
        this.node.emit('audio_end_for_next_picture_for_main_hung_hinh');
    }
    emitto_hunghung_audioEND() {
        this.node.emit('audio play end');
    }
    update(deltaTime: number) {

    }
}


