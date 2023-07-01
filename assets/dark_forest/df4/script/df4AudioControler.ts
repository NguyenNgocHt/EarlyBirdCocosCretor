import { _decorator, Component, Node, AudioSource, log, AudioClip, Label } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { df4Manager } from './df4Manager';
import { audioContro } from './audioContro';
const { ccclass, property } = _decorator;
enum STATESOUND {
    NOPLAY,
    CHOOSENUMBERR,
    HOWMANYAPPLE,
    HOWMANYBANANA,
    HOWMANYSTRAWBERRY,
    GOOGJOB,
    CORRECT,
    WRONG,
    NUMBER,
    CONG_XU,
    WHATAPITY,
    COUNTOVER,
    WHATYOURNUMBER,
    AREYOU_OK,
};
enum STATEFRUIT {
    NOTHING,
    APPLES,
    STRAWBERRYS,
    BANANA,
};
@ccclass('df4AudioControler')
export class df4AudioControler extends Component {
    @property({ type: df4Manager })
    private emitfromDf4: df4Manager = null;
    @property({ type: audioContro })
    private ChooseNumber: audioContro = null;
    @property({ type: audioContro })
    private howManyApple: audioContro = null;
    @property({ type: audioContro })
    private howmanyBanana: audioContro = null;
    @property({ type: audioContro })
    private howmanyStrawberries: audioContro = null;
    @property({ type: audioContro })
    private correct: audioContro = null;
    @property({ type: audioContro })
    private goodjob: audioContro = null;
    @property({ type: audioContro })
    private wrong: audioContro = null;
    @property({ type: audioContro })
    private cong_xu: audioContro = null;
    @property({ type: audioContro })
    private whatapity: audioContro = null;
    @property({ type: audioContro })
    private soundDf4: audioContro = null;
    @property({ type: audioContro })
    private audiowrong: audioContro = null;
    @property({ type: audioContro })
    private countOver: audioContro = null;
    @property({ type: audioContro })
    private whatyourNumber: audioContro = null;
    @property({ type: audioContro })
    private areyouok: audioContro = null;
    private stateSound: STATESOUND = STATESOUND.NOPLAY;
    private stateSoundOK: STATESOUND = STATESOUND.NOPLAY;
    private stateFruits: STATEFRUIT = STATEFRUIT.NOTHING;
    private numberreading: number = 0;
    start() {
        this.emitfromDf4.node.on('play_sound', this.setAudio, this);
        this.emitfromDf4.node.on('state fruits', this.setFruitsSoundState, this);
        this.emitfromDf4.node.on('audio df4', this.setaudioDf4, this);
    }
    setaudioDf4() {
        this.soundDf4.play();
    }
    setFruitsSoundState(state: number, number: number) {
        if (state == STATEFRUIT.APPLES) {
            this.stateFruits = STATEFRUIT.APPLES;
        }
        if (state == STATEFRUIT.BANANA) {
            this.stateFruits = STATEFRUIT.BANANA;
        }
        if (state == STATEFRUIT.STRAWBERRYS) {
            this.stateFruits = STATEFRUIT.STRAWBERRYS;
        }
    }
    setAudio(state: number, readingNumber: number) {
        if (state == STATESOUND.CHOOSENUMBERR) {
            this.stateSound = STATESOUND.CHOOSENUMBERR;
            this.audiostart();
        }
        if (state == STATESOUND.NUMBER) {
            this.stateSound = STATESOUND.NUMBER;
            this.numberreading = readingNumber;
            this.audiostart();
        }
        if (state == STATESOUND.CORRECT) {
            this.stateSound = STATESOUND.CORRECT;
            this.audiostart();
        }
        if (state == STATESOUND.WRONG) {
            this.stateSound = STATESOUND.WRONG;
            this.audiostart();
        }
        if (state == STATESOUND.COUNTOVER) {
            this.stateSound = STATESOUND.COUNTOVER;
            this.audiostart();
        }
        if (state == STATESOUND.WHATYOURNUMBER) {
            this.stateSound = STATESOUND.WHATYOURNUMBER;
            this.audiostart();
        }
        if (state == STATESOUND.AREYOU_OK) {
            this.stateSound = STATESOUND.AREYOU_OK;
            this.audiostart();
        }
    }
    audiostart() {
        if (this.stateSound == STATESOUND.CHOOSENUMBERR) {
            this.ChooseNumber.play();
            this.ChooseNumber.node.on(AudioSource.EventType.ENDED, this.setaudioQuestion, this);
        }
        if (this.stateSound == STATESOUND.NUMBER) {
            this.setStringNumber();
            this.scheduleOnce(function () {
                this.stateSoundOK = STATESOUND.NUMBER;
                this.node.emit('end sound number', this.stateSoundOK);
            }, 1.2);
        }
        if (this.stateSound == STATESOUND.CORRECT) {
            this.correct.play();
            this.correct.node.on(AudioSource.EventType.ENDED, this.setaudioPlay_number, this);
        }
        if (this.stateSound == STATESOUND.WRONG) {
            this.audiowrong.play();
            this.audiowrong.node.on(AudioSource.EventType.ENDED, this.setaudioPlay_number, this);
        }
        if (this.stateSound == STATESOUND.GOOGJOB) {
            this.goodjob.play();
            this.goodjob.node.on(AudioSource.EventType.ENDED, this.setaudioPlay_number, this);
        }
        if (this.stateSound == STATESOUND.CONG_XU) {
            this.cong_xu.play();
            this.cong_xu.node.on(AudioSource.EventType.ENDED, this.setaudioPlay_number, this);
        }
        if (this.stateSound == STATESOUND.WHATAPITY) {
            this.whatapity.play();
            this.whatapity.node.on(AudioSource.EventType.ENDED, this.sendEmitToDf4, this);
        }
        if (this.stateSound == STATESOUND.COUNTOVER) {
            this.countOver.play();
            this.countOver.node.on(AudioSource.EventType.ENDED, this.sendEmitToDf4, this);
        }
        if (this.stateSound == STATESOUND.WHATYOURNUMBER) {
            this.whatyourNumber.play();
        }
        if (this.stateSound == STATESOUND.AREYOU_OK) {
            this.areyouok.play();
        }
    }
    setStringNumber() {
        var stringSounce = 'df4/sound/number/';
        var stringadd = `${this.numberreading}`;
        var stringSound = stringSounce.concat(stringadd);
        AudioManager.instance().playShort('dark_forest', stringSound, true);
        AudioManager.instance().audioSource.volume = 1;
    }
    setaudioPlay_number() {
        if (this.stateSound == STATESOUND.WRONG) {
            this.stateSound = STATESOUND.WHATAPITY;
            this.audiostart();
        }
        if (this.stateSound == STATESOUND.CORRECT) {
            this.setStringNumber();
            this.scheduleOnce(function () {
                this.stateSound = STATESOUND.GOOGJOB;
                this.audiostart();
            }, 3);
        }
        if (this.stateSound == STATESOUND.GOOGJOB) {
            this.stateSound = STATESOUND.CONG_XU;
            this.audiostart();
        }
        if (this.stateSound == STATESOUND.CONG_XU) {
            this.stateSoundOK = STATESOUND.CONG_XU;
            this.sendEmitToDf4();
        }
    }
    setaudioQuestion() {
        if (this.stateFruits == STATEFRUIT.APPLES) {
            this.howManyApple.play();
            this.stateSound = STATESOUND.HOWMANYAPPLE;
            this.howManyApple.node.on(AudioSource.EventType.ENDED, this.sendEmitToDf4, this);
        }
        if (this.stateFruits == STATEFRUIT.BANANA) {
            this.stateSound = STATESOUND.HOWMANYBANANA;
            this.howmanyBanana.play();
            this.howmanyBanana.node.on(AudioSource.EventType.ENDED, this.sendEmitToDf4, this);
        }
        if (this.stateFruits == STATEFRUIT.STRAWBERRYS) {
            this.stateSound = STATESOUND.HOWMANYSTRAWBERRY;
            this.howmanyStrawberries.play();
            this.howmanyStrawberries.node.on(AudioSource.EventType.ENDED, this.sendEmitToDf4, this);
        }

    }
    sendEmitToDf4() {
        if (this.stateSound == STATESOUND.HOWMANYAPPLE || this.stateSound == STATESOUND.HOWMANYBANANA || this.stateSound == STATESOUND.HOWMANYSTRAWBERRY) {
            this.node.emit('play sound ok', this.stateSound);
        }
        if (this.stateSound == STATESOUND.CONG_XU) {
            this.scheduleOnce(function () {
                this.node.emit('play sound ok', this.stateSound);
            }, 2);
        }
        if (this.stateSound == STATESOUND.WHATAPITY) {
            this.scheduleOnce(function () {
                this.node.emit('play sound ok', this.stateSound);
            }, 2);
        }
        if (this.stateSound == STATESOUND.COUNTOVER) {
            this.scheduleOnce(function () {
                this.node.emit('play sound ok', this.stateSound);
            }, 1);
        }
    }
    update(deltaTime: number) {

    }
}


