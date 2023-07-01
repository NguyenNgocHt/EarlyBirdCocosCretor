import { _decorator, Component, Node, Label, labelAssembler, Vec3, log } from 'cc';
const { ccclass, property } = _decorator;
enum BUICOSTATE {
    NOSTATE,
    BUICO1,
    BUICO2,
    BUICO3,
}
enum LOCKSTATE {
    NOSTATE,
    LOCKUP,
    OPEN,
}
@ccclass('df3_displayAnswer')
export class df3_displayAnswer extends Component {
    @property({ type: Node })
    private emitfromfd3: Node = null;
    @property({ type: Label })
    private label_buico1: Label = null;
    @property({ type: Label })
    private label_buico2: Label = null;
    @property({ type: Label })
    private label_buico3: Label = null;
    @property({ type: Node })
    private button_buico1: Node = null;
    @property({ type: Node })
    private button_buico2: Node = null;
    @property({ type: Node })
    private button_buico3: Node = null;
    private correct_buico: BUICOSTATE = BUICOSTATE.NOSTATE;
    private pressBuico: BUICOSTATE = BUICOSTATE.NOSTATE;
    private lockState: LOCKSTATE = LOCKSTATE.OPEN;
    private correctNumber: number = 0;
    private numberBuico1: number = 0;
    private numberBuico2: number = 0;
    private numberBuico3: number = 0;
    private rightAnswer: string = ' ';
    private numberArray: number = 0;
    start() {
        this.emitfromfd3.on('random number', this.answerStateSeting, this);
        this.emitfromfd3.on('open block', this.open_block, this);
        this.emitfromfd3.on('clear answer', this.clear_answer, this);
        this.button_buico1.on('click position', this.checkPositionBuico, this);
        this.button_buico2.on('click position', this.checkPositionBuico, this);
        this.button_buico3.on('click position', this.checkPositionBuico, this);
    }
    open_block() {
        this.lockState = LOCKSTATE.OPEN;
    }
    answerStateSeting(randomNumber: number) {
        this.correctNumber = randomNumber;
        this.randomAnswer();
    }
    randomAnswer() {
        let p = Math.floor(Math.random() * 3) + 1;
        if (p == 1) {
            this.correct_buico = BUICOSTATE.BUICO1;
            this.setdisplay();
        }
        if (p == 2) {
            this.correct_buico = BUICOSTATE.BUICO2;
            this.setdisplay();
        }
        if (p == 3) {
            this.correct_buico = BUICOSTATE.BUICO3;
            this.setdisplay();
        }
    }
    setdisplay() {
        var AnswerArray = [];
        AnswerArray = [" ", "Above the big tree\n on the left", "In the canopy of the\n big tree on the left", "Under the big tree\n on the left", "On the ground", "On the left side of the\n big tree on the right", "Behind the big tree\n on the right",
            "On the right side of the \nbig tree on the right", "In front of the \nbig tree on the right"];
        if (this.correct_buico == BUICOSTATE.BUICO1) {
            this.label_buico1.string = AnswerArray[this.correctNumber];
            let randomLabel2 = Math.floor(Math.random() * 8) + 1;
            while (randomLabel2 == this.correctNumber) {
                randomLabel2 = Math.floor(Math.random() * 8) + 1;
            }
            this.label_buico2.string = AnswerArray[randomLabel2];
            let randomlabel3 = Math.floor(Math.random() * 8) + 1;
            while (randomlabel3 == this.correctNumber || randomlabel3 == randomLabel2) {
                randomlabel3 = Math.floor(Math.random() * 8) + 1;
            }
            this.label_buico3.string = AnswerArray[randomlabel3];
            this.numberBuico1 = this.correctNumber;
            this.numberBuico2 = randomLabel2;
            this.numberBuico3 = randomlabel3;
        }
        if (this.correct_buico == BUICOSTATE.BUICO2) {
            let randomLabel1 = Math.floor(Math.random() * 8) + 1;
            while (randomLabel1 == this.correctNumber) {
                randomLabel1 = Math.floor(Math.random() * 8) + 1;
            }
            this.label_buico1.string = AnswerArray[randomLabel1];
            this.label_buico2.string = AnswerArray[this.correctNumber];
            let randomlabel3 = Math.floor(Math.random() * 8) + 1;
            while (randomlabel3 == this.correctNumber || randomlabel3 == randomLabel1) {
                randomlabel3 = Math.floor(Math.random() * 8) + 1;
            }
            this.label_buico3.string = AnswerArray[randomlabel3];
            this.numberBuico1 = randomLabel1;
            this.numberBuico2 = this.correctNumber;
            this.numberBuico3 = randomlabel3;
        }
        if (this.correct_buico == BUICOSTATE.BUICO3) {
            let randomLabel1 = Math.floor(Math.random() * 8) + 1;
            while (randomLabel1 == this.correctNumber) {
                randomLabel1 = Math.floor(Math.random() * 8) + 1;
            }
            this.label_buico1.string = AnswerArray[randomLabel1];

            let randomLabel2 = Math.floor(Math.random() * 8) + 1;
            while (randomLabel2 == this.correctNumber || randomLabel2 == randomLabel1) {
                randomLabel2 = Math.floor(Math.random() * 8) + 1;
            }
            this.label_buico2.string = AnswerArray[randomLabel2];
            this.label_buico3.string = AnswerArray[this.correctNumber];
            this.numberBuico1 = randomLabel1;
            this.numberBuico2 = randomLabel2;
            this.numberBuico3 = this.correctNumber;
        }
    }
    checkPositionBuico(positionBuico: Node) {
        let p = positionBuico.getWorldPosition();
        let buico1 = this.button_buico1.getWorldPosition();
        let buico2 = this.button_buico2.getWorldPosition();
        let buico3 = this.button_buico3.getWorldPosition();
        if (p.x == buico1.x && p.y == buico1.y && this.lockState == LOCKSTATE.OPEN) {
            this.pressBuico = BUICOSTATE.BUICO1;
            this.node.emit('press buico', this.pressBuico, this.numberBuico1);
            this.lockState = LOCKSTATE.LOCKUP;
        }
        if (p.x == buico2.x && p.y == buico2.y && this.lockState == LOCKSTATE.OPEN) {
            this.pressBuico = BUICOSTATE.BUICO2;
            this.node.emit('press buico', this.pressBuico, this.numberBuico2);
            this.lockState = LOCKSTATE.LOCKUP;
        }
        if (p.x == buico3.x && p.y == buico3.y && this.lockState == LOCKSTATE.OPEN) {
            this.pressBuico = BUICOSTATE.BUICO3;
            this.node.emit('press buico', this.pressBuico, this.numberBuico3);
            this.lockState = LOCKSTATE.LOCKUP;
        }
    }
    clear_answer() {
        this.label_buico1.string = " ";
        this.label_buico2.string = " ";
        this.label_buico3.string = " ";
    }
    update(deltaTime: number) {

    }
}


