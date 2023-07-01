import { _decorator, Component, Node, log } from 'cc';
import { df4Manager } from './df4Manager';
const { ccclass, property } = _decorator;
enum AMOUNTFRUITS {
    NOTHING,
    APPLES,
    STRAWBERRYS,
    BANANA,
};
enum stateZoom {
    NOSTATE,
    ZOOMIN,
    ZOOMOUT,
}
@ccclass('reportnumberFruit')
export class reportnumberFruit extends Component {
    @property({ type: Node })
    private emitfromDf4: Node = null;
    @property({ type: Node })
    private apple: Node = null;
    @property({ type: Node })
    private banana: Node = null;
    @property({ type: Node })
    private strawberry: Node = null;
    private amountApples: number = 0;
    private amountStrawberrys: number = 0;
    private amountBananas: number = 0;
    private stateFuits: AMOUNTFRUITS = AMOUNTFRUITS.NOTHING;
    private statezoomFruits: stateZoom = stateZoom.NOSTATE;
    onLoad() {
        this.stateFuits = AMOUNTFRUITS.NOTHING;
    }
    start() {
        this.startstateFruit();
        this.emitfromDf4.on('state fruits', this.setStateFruits, this);
        this.emitfromDf4.on('zoom', this.setstateZoom, this);
    }
    setStateFruits(state: number, amountFruits: number) {
        if (state == AMOUNTFRUITS.NOTHING) {
            this.stateFuits = AMOUNTFRUITS.NOTHING;
            this.startstateFruit()
        }
        if (state == AMOUNTFRUITS.APPLES) {
            this.stateFuits = AMOUNTFRUITS.APPLES;
            this.amountApples = amountFruits;
            this.startstateFruit();
        }
        if (state == AMOUNTFRUITS.BANANA) {
            this.stateFuits = AMOUNTFRUITS.BANANA;
            this.amountBananas = amountFruits;
            this.startstateFruit();
        }
        if (state == AMOUNTFRUITS.STRAWBERRYS) {
            this.stateFuits = AMOUNTFRUITS.STRAWBERRYS;
            this.amountStrawberrys = amountFruits;
            this.startstateFruit();
        }
    }
    setstateZoom(state: number) {
        if (state == stateZoom.ZOOMOUT) {
            this.statezoomFruits = stateZoom.ZOOMOUT;
            this.emittoFruits()
        }
        if (state == stateZoom.ZOOMIN) {
            this.statezoomFruits = stateZoom.ZOOMIN;
            this.emittoFruits()
        }
    }
    startstateFruit() {
        if (this.stateFuits == AMOUNTFRUITS.NOTHING) {
            this.apple.active = false;
            this.banana.active = false;
            this.strawberry.active = false;
        }
        if (this.stateFuits == AMOUNTFRUITS.APPLES) {
            this.banana.active = false;
            this.strawberry.active = false;
            this.apple.active = true;
            this.scheduleOnce(function () {
                this.node.emit('amount_fruits', this.amountApples);
            }, 0.5);

        }

        if (this.stateFuits == AMOUNTFRUITS.BANANA) {
            this.strawberry.active = false;
            this.apple.active = false;
            this.banana.active = true;
            this.scheduleOnce(function () {
                this.node.emit('amount_fruits', this.amountBananas);
            }, 0.5);

        }
        if (this.stateFuits == AMOUNTFRUITS.STRAWBERRYS) {
            this.apple.active = false;
            this.banana.active = false;
            this.strawberry.active = true;
            this.scheduleOnce(function () {
                this.node.emit('amount_fruits', this.amountStrawberrys);
            }, 0.5);

        }
    }
    emittoFruits() {
        if (this.statezoomFruits == stateZoom.ZOOMIN) {
            this.node.emit('zoom', this.statezoomFruits);
        }
        if (this.statezoomFruits == stateZoom.ZOOMOUT) {
            this.node.emit('zoom', this.statezoomFruits);
        }
    }
    update(deltaTime: number) {

    }
}


