import { _decorator, Component, Node, log, Label } from 'cc';
import { spineBear } from './spineBear';
const { ccclass, property } = _decorator;
enum STATE_BANG {
    NOSTATE,
    BANG1,
    BANG2,
    BANG3,
};

@ccclass('showVocabulary')
export class showVocabulary extends Component {
    @property({ type: Node })
    private emitfromSpineBear: Node = null;
    @property({ type: Label })
    private bang1_voca: Label = null;
    @property({ type: Label })
    private bang2_voca: Label = null;
    @property({ type: Label })
    private bang3_voca: Label = null;
    private number_Bang1: number = 0;
    private number_Bang2: number = 0;
    private number_Bang3: number = 0;
    private stateShowBang: STATE_BANG = STATE_BANG.NOSTATE;
    private statteShowbangEnd: STATE_BANG = STATE_BANG.NOSTATE;

    start() {
        this.emitfromSpineBear.on('show vocabulary', this.setstateShowBang, this);
        this.emitfromSpineBear.on('clear vocabulary', this.setClearVocabulary, this);
        this.emitfromSpineBear.on('clear number', this.clear_number, this);
    }
    clear_number() {
        this.bang1_voca.string = " ";
        this.bang2_voca.string = " ";
        this.bang3_voca.string = " ";
    }
    setClearVocabulary(numberBang1: number, numberBang2: number, numberBang3: number, stateClearVocabulary: number) {
        if (stateClearVocabulary == STATE_BANG.BANG1) {
            this.stateShowBang = STATE_BANG.BANG1;
            this.number_Bang1 = numberBang1;
            this.number_Bang2 = numberBang2;
            this.number_Bang3 = numberBang3;
            this.setVocabulary();
        }
        if (stateClearVocabulary == STATE_BANG.BANG2) {
            this.stateShowBang = STATE_BANG.BANG2;
            this.number_Bang1 = numberBang1;
            this.number_Bang2 = numberBang2;
            this.number_Bang3 = numberBang3;
            this.setVocabulary();
        }
        if (stateClearVocabulary == STATE_BANG.BANG3) {
            this.stateShowBang = STATE_BANG.BANG3;
            this.number_Bang1 = numberBang1;
            this.number_Bang2 = numberBang2;
            this.number_Bang3 = numberBang3;
            this.setVocabulary();
        }

    }
    setstateShowBang(numberBang1: number, numberBang2: number, numberBang3: number, stateshowVocabulary: number) {
        if (stateshowVocabulary == STATE_BANG.BANG1) {
            this.stateShowBang = STATE_BANG.BANG1;
            this.number_Bang1 = numberBang1;
            this.number_Bang2 = numberBang2;
            this.number_Bang3 = numberBang3;
            this.setVocabulary();
        }
        if (stateshowVocabulary == STATE_BANG.BANG2) {
            this.stateShowBang = STATE_BANG.BANG2;
            this.number_Bang1 = numberBang1;
            this.number_Bang2 = numberBang2;
            this.number_Bang3 = numberBang3;
            this.setVocabulary();
        }
        if (stateshowVocabulary == STATE_BANG.BANG3) {
            this.stateShowBang = STATE_BANG.BANG3;
            this.number_Bang1 = numberBang1;
            this.number_Bang2 = numberBang2;
            this.number_Bang3 = numberBang3;
            this.setVocabulary();
        }
    }
    setVocabulary() {
        var arrayVocabulary = [];
        arrayVocabulary = [" ", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen", "Twenty", "Twenty-One", "Trwenty-Two",
            "Twenty-Three", "Twenty-Four", "Twenty-Five", "Twenty-Six", "Twenty-Seven", "Twenty-Eight", "Twenty-Nine", "Thirty"];

        if (this.stateShowBang == STATE_BANG.BANG1) {
            this.scheduleOnce(function () {
                this.bang1_voca.string = arrayVocabulary[this.number_Bang1];
            }, 0.2);
            this.scheduleOnce(function () {
                this.bang2_voca.string = arrayVocabulary[this.number_Bang2];
            }, 0.4);
            this.scheduleOnce(function () {
                this.bang3_voca.string = arrayVocabulary[this.number_Bang3];
            }, 0.6);
        }
        if (this.stateShowBang == STATE_BANG.BANG2) {
            this.scheduleOnce(function () {
                this.bang1_voca.string = arrayVocabulary[this.number_Bang1];
            }, 0.2);
            this.scheduleOnce(function () {
                this.bang2_voca.string = arrayVocabulary[this.number_Bang2];
            }, 0.4);
            this.scheduleOnce(function () {
                this.bang3_voca.string = arrayVocabulary[this.number_Bang3];
            }, 0.6);
        }
        if (this.stateShowBang == STATE_BANG.BANG3) {
            this.scheduleOnce(function () {
                this.bang1_voca.string = arrayVocabulary[this.number_Bang1];
            }, 0.2);
            this.scheduleOnce(function () {
                this.bang2_voca.string = arrayVocabulary[this.number_Bang2];
            }, 0.4);
            this.scheduleOnce(function () {
                this.bang3_voca.string = arrayVocabulary[this.number_Bang3];
            }, 0.6);
        }
    }
    update(deltaTime: number) {

    }
}


