import { _decorator, Component, Node, AudioSource } from 'cc';
import { audioContro } from '../../df4/script/audioContro';
import { AudioManager } from '../../../loading/script/AudioManager';
import { numberContro } from '../../df4/script/numberContro';
const { ccclass, property } = _decorator;
enum mushroomAudioPlay {
    nostate,
    Opps,
    who_am_i,
    correc,
    wrong,
    goodjob,
    bird,
    congxu,
    what_animal,
    cat,
    tiger
}
enum eatFuitsAudioplay {
    nostate,
    choose,
    correc,
    wrong,
    goodjob,
    bird,
    congxu,
    notfull,
    you_can_go_now,
}
@ccclass('df1_audioControler')
export class df1_audioControler extends Component {
    QUESTIONCONTENT = ["Choose the right fruit to the monster", "I want a strawberry", "I want a banana", "I want a apple"];
    QUESTIONCONTENT1 = ["Choose the right fruit to the monster", "strawberry", "banana", "apple"];
    @property(Node)
    private emitfromMushroom: Node = null;
    @property(audioContro)
    private amthanhnen: audioContro = null;
    @property(audioContro)
    private Opps: audioContro = null;
    @property(Node)
    private emitfrom_eatFruits: Node = null;
    @property(audioContro)
    private who_am_i: audioContro = null;
    @property(audioContro)
    private wrong: audioContro = null;
    @property(audioContro)
    private correc: audioContro = null;
    @property(audioContro)
    private congxu: audioContro = null;
    @property(audioContro)
    private goodJob: audioContro = null;
    @property(audioContro)
    private birdSound: audioContro = null;
    @property(audioContro)
    private choose: audioContro = null;
    @property(audioContro)
    private what_animal: audioContro = null;
    @property(audioContro)
    private catSound: audioContro = null;
    @property(audioContro)
    private tigerSound: audioContro = null;
    @property(audioContro)
    private notfull: audioContro = null;
    @property(audioContro)
    private you_can_go_now: audioContro = null;
    private mushroomAudiostate: mushroomAudioPlay = mushroomAudioPlay.nostate;
    private eatfruitsAudiostate: eatFuitsAudioplay = eatFuitsAudioplay.nostate;
    private random_number: number = 0;
    private count_audioState_bird_tiger_cat: number = 0;
    onLoad() {
        this.amthanhnen.play();
    }
    start() {
        this.emitfromMushroom.on('audio play', this.setAudioPlay, this);
        this.emitfrom_eatFruits.on('audioPlay list', this.setAudioPlay_eatFruits, this);
        this.emitfrom_eatFruits.on('audio play_random number', this.set_question_audioPlay, this);
        this.emitfrom_eatFruits.on('correc_audioplay', this.set_correc_audioPlay, this);
    }
    //set audio play in eat fruits
    set_correc_audioPlay() {
        this.mushroomAudiostate = mushroomAudioPlay.correc;
        this.audioStart();
    }
    setAudioPlay_eatFruits(state: number) {
        if (state == eatFuitsAudioplay.choose) {
            this.eatfruitsAudiostate = eatFuitsAudioplay.choose;
            this.audioStart_eatfruits();
        }
        if (state == eatFuitsAudioplay.correc) {
            this.eatfruitsAudiostate = eatFuitsAudioplay.correc;
            this.audioStart_eatfruits();
        }
        if (state == eatFuitsAudioplay.goodjob) {
            this.eatfruitsAudiostate = eatFuitsAudioplay.goodjob;
            this.audioStart_eatfruits();
        }
        if (state == eatFuitsAudioplay.wrong) {
            this.eatfruitsAudiostate = eatFuitsAudioplay.wrong;
            this.audioStart_eatfruits();
        }
        if (state == eatFuitsAudioplay.notfull) {
            this.eatfruitsAudiostate = eatFuitsAudioplay.notfull;
            this.audioStart_eatfruits();
        }
    }
    setAudioPlay(state: number) {
        if (state == mushroomAudioPlay.Opps) {
            this.mushroomAudiostate = mushroomAudioPlay.Opps;
            this.audioStart();
        }
        if (state == mushroomAudioPlay.who_am_i) {
            this.mushroomAudiostate = mushroomAudioPlay.who_am_i;
            this.audioStart();
        }
        if (state == mushroomAudioPlay.correc) {
            this.mushroomAudiostate = mushroomAudioPlay.correc;
            this.audioStart();
        }
        if (state == mushroomAudioPlay.wrong) {
            this.mushroomAudiostate = mushroomAudioPlay.wrong;
            this.audioStart();
        }
        if (state == mushroomAudioPlay.what_animal) {
            this.mushroomAudiostate = mushroomAudioPlay.what_animal;
            this.audioStart();
        }
    }
    set_question_audioPlay(randomNumber: number) {
        this.random_number = randomNumber;
        var nameSounce = 'df1/sound/';
        var name_question = this.QUESTIONCONTENT[randomNumber];
        var audioPlay = nameSounce.concat(name_question);
        AudioManager.instance().playShort('dark_forest', audioPlay, true);
        this.scheduleOnce(function () {
            this.node.emit('question end');
        }, 2);
    }
    //audio start eat fruits
    audioStart_eatfruits() {
        if (this.eatfruitsAudiostate == eatFuitsAudioplay.choose) {
            this.choose.play();
            this.choose.node.on(AudioSource.EventType.ENDED, this.setEnd_ChoosePlay, this);
        }
        if (this.eatfruitsAudiostate == eatFuitsAudioplay.correc) {
            this.correc.play();
            this.correc.node.on(AudioSource.EventType.ENDED, this.chuyen_vocabulary, this);
        }
        if (this.eatfruitsAudiostate == eatFuitsAudioplay.goodjob) {
            this.goodJob.play();
            this.goodJob.node.on(AudioSource.EventType.ENDED, this.chuyen_sound_xu, this);
        }
        if (this.eatfruitsAudiostate == eatFuitsAudioplay.congxu) {
            this.congxu.play();
            this.congxu.node.on(AudioSource.EventType.ENDED, this.emit_audio_end, this);
        }
        if (this.eatfruitsAudiostate == eatFuitsAudioplay.wrong) {
            this.wrong.play();
        }
        if (this.eatfruitsAudiostate == eatFuitsAudioplay.notfull) {
            this.notfull.play();
        }
    }
    emit_audio_end() {
        //this.node.emit('audio end');
    }
    chuyen_vocabulary() {
        var nameSounce = 'df1/sound/';
        var name_vocabulary = this.QUESTIONCONTENT1[this.random_number];
        var audioPlay = nameSounce.concat(name_vocabulary);
        this.node.emit('show vocabulary', name_vocabulary);
        AudioManager.instance().playShort('dark_forest', audioPlay, true);
        AudioManager.instance().audioSource.volume = 1;
        this.scheduleOnce(function () {
            this.node.emit('vocabulary end');
        }, 1.5);
    }
    chuyen_sound_xu() {
        this.eatfruitsAudiostate = eatFuitsAudioplay.congxu;
        this.audioStart_eatfruits();
    }
    setEnd_ChoosePlay() {
        this.node.emit('choose_audio play end');
    }
    //audio start mushroom
    audioStart() {
        if (this.mushroomAudiostate == mushroomAudioPlay.Opps) {
            this.Opps.play();
            this.Opps.node.on(AudioSource.EventType.ENDED, this.emittoMushroom, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.who_am_i) {
            this.who_am_i.play();
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.correc) {
            this.correc.play();
            this.correc.node.on(AudioSource.EventType.ENDED, this.setBirdSound, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.bird) {
            this.birdSound.play();
            this.birdSound.node.on(AudioSource.EventType.ENDED, this.set_goodjob, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.tiger) {
            this.tigerSound.play();
            this.tigerSound.node.on(AudioSource.EventType.ENDED, this.set_goodjob, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.cat) {
            this.catSound.play();
            this.catSound.node.on(AudioSource.EventType.ENDED, this.set_goodjob, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.goodjob) {
            this.goodJob.play();
            this.goodJob.node.on(AudioSource.EventType.ENDED, this.set_correc, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.congxu) {
            this.congxu.play();
            this.congxu.node.on(AudioSource.EventType.ENDED, this.emittoMushroom, this);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.wrong) {
            this.wrong.play();
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.what_animal) {
            this.what_animal.play();
        }
    }
    setBirdSound() {
        this.count_audioState_bird_tiger_cat = this.count_audioState_bird_tiger_cat + 1;
        if (this.count_audioState_bird_tiger_cat == 1) {
            if (this.mushroomAudiostate == mushroomAudioPlay.correc) {
                this.mushroomAudiostate = mushroomAudioPlay.bird;
                this.audioStart();
            }
        }
        if (this.count_audioState_bird_tiger_cat == 2) {
            if (this.mushroomAudiostate == mushroomAudioPlay.correc) {
                this.mushroomAudiostate = mushroomAudioPlay.tiger;
                this.audioStart();
            }
        }
        if (this.count_audioState_bird_tiger_cat == 3) {
            if (this.mushroomAudiostate == mushroomAudioPlay.correc) {
                this.mushroomAudiostate = mushroomAudioPlay.cat;
                this.audioStart();
                this.count_audioState_bird_tiger_cat = 0;
            }
        }

    }
    set_goodjob() {
        if (this.mushroomAudiostate == mushroomAudioPlay.bird ||
            this.mushroomAudiostate == mushroomAudioPlay.tiger ||
            this.mushroomAudiostate == mushroomAudioPlay.cat) {
            this.mushroomAudiostate = mushroomAudioPlay.goodjob;
            this.audioStart();
        }
    }
    set_correc() {
        if (this.mushroomAudiostate == mushroomAudioPlay.goodjob) {
            this.mushroomAudiostate = mushroomAudioPlay.congxu;
            this.audioStart();
        }
    }
    emittoMushroom() {
        if (this.mushroomAudiostate == mushroomAudioPlay.Opps) {
            this.node.emit('audio end', this.mushroomAudiostate);
        }
        if (this.mushroomAudiostate == mushroomAudioPlay.congxu) {
            this.node.emit('audio end', this.mushroomAudiostate);
            this.mushroomAudiostate = mushroomAudioPlay.nostate;
        }
    }

    update(deltaTime: number) {

    }
}


