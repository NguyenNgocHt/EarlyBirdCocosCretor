import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
enum runglaSTATE {
    nostate,
    larung,
    dungim,
}
@ccclass('df3_staterungcay')
export class df3_staterungcay extends Component {
    @property({ type: Node })
    private emitfromDf3: Node = null;
    @property({ type: Node })
    private lacay1: Node = null;
    @property({ type: Node })
    private lacay2: Node = null;
    @property({ type: Node })
    private lacay3: Node = null;
    @property({ type: Node })
    private lacay4: Node = null;
    @property({ type: Node })
    private lacay5: Node = null;
    @property({ type: Node })
    private lacay6: Node = null;
    @property({ type: Node })
    private lacay7: Node = null;
    @property({ type: Node })
    private lacay8: Node = null;
    @property({ type: Node })
    private lacay9: Node = null;
    @property({ type: Node })
    private lacay10: Node = null;
    @property({ type: Node })
    private lacay11: Node = null;
    @property({ type: Node })
    private lacay12: Node = null;
    @property({ type: Node })
    private lacay13: Node = null;
    private runglaState = runglaSTATE.dungim;
    onLoad() {
        this.runglaState = runglaSTATE.dungim;
        this.spineStart();
    }
    start() {
        this.emitfromDf3.on('rung la state', this.runglastateSeting, this);
        this.spineStart();
    }
    runglastateSeting(state: number) {
        if (state == runglaSTATE.dungim) {
            this.runglaState = runglaSTATE.dungim;
            this.spineStart();
        }
        if (state == runglaSTATE.larung) {
            this.runglaState = runglaSTATE.larung;
            this.spineStart();
        }
    }
    spineStart() {
        if (this.runglaState == runglaSTATE.dungim) {
            this.lacay1.active = false;
            this.lacay2.active = false;
            this.lacay3.active = false;
            this.lacay4.active = false;
            this.lacay5.active = false;
            this.lacay6.active = false;
            this.lacay7.active = false;
            this.lacay8.active = false;
            this.lacay9.active = false;
            this.lacay10.active = false;
            this.lacay11.active = false;
            this.lacay12.active = false;
            this.lacay13.active = false;
        }
        if (this.runglaState == runglaSTATE.larung) {
            this.scheduleOnce(function () {
                this.lacay1.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay2.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay3.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay4.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay5.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay6.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay7.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay8.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay9.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay10.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay11.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay12.active = true;
            }, Math.floor(Math.random() * 6) + 1);
            this.scheduleOnce(function () {
                this.lacay13.active = true;
            }, Math.floor(Math.random() * 6) + 1);
        }
    }

    update(deltaTime: number) {

    }
}


