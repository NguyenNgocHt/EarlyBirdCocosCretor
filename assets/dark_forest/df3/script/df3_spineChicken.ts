import { _decorator, Component, Node, sp, log, tween } from 'cc';
const { ccclass, property } = _decorator;

enum CHICKENSTATE {
    NOSTATE,
    IDLE,
    DIBO,
    BUON,
    LIKE,
    VOTAY,
    VUIMUNG,
}
@ccclass('df3_spineChicken')
export class df3_spineChicken extends Component {
    private spine: sp.Skeleton;
    @property({ type: Node })
    private emitfromDF3: Node = null;
    private chickenSpine: CHICKENSTATE = CHICKENSTATE.NOSTATE;
    private chickenStateOk: CHICKENSTATE = CHICKENSTATE.NOSTATE;
    start() {
        this.emitfromDF3.on('chicken chuyen spine', this.setSpineState, this);
    }
    setSpineState(state: number) {
        if (state == CHICKENSTATE.DIBO) {
            this.chickenSpine = CHICKENSTATE.DIBO;
            this.spineStart();
        }
        if (state == CHICKENSTATE.IDLE) {
            this.chickenSpine = CHICKENSTATE.IDLE;
            this.spineStart();
        }
        if (state == CHICKENSTATE.VUIMUNG) {
            this.chickenSpine = CHICKENSTATE.VUIMUNG;
            this.spineStart();
        }
        if (state == CHICKENSTATE.LIKE) {

            this.chickenSpine = CHICKENSTATE.LIKE;
            this.spineStart();


        }
        if (state == CHICKENSTATE.BUON) {
            this.chickenSpine = CHICKENSTATE.BUON;
            this.spineStart();
        }
    }
    spineStart() {
        if (this.chickenSpine == CHICKENSTATE.DIBO) {
            this.spine.setMix('idle', 'di_bo', 0.2);
            this.chicken_di_bo(true);
        }
        if (this.chickenSpine == CHICKENSTATE.IDLE) {
            this.spine.setMix('di_bo', 'idle', 0.2);
            this.chicken_idle(true);
        }
        if (this.chickenSpine == CHICKENSTATE.VUIMUNG) {
            this.spine.setMix('idle', 'vuimung', 0.2);
            this.chicken_vuimung(true);
        }
        if (this.chickenSpine == CHICKENSTATE.BUON) {
            this.spine.setMix('idle', 'buon', 0.2);
            this.chicken_buon(true);
            tween(this.node)
                .delay(2)
                .call(() => {
                    this.spine.setMix('buon', 'suy_nghi', 0.2);
                    this.chicken_suy_nghi(true);
                    tween(this.node)
                        .delay(2)
                        .call(() => {
                            this.spine.setMix('suy_nghi', 'gat_dau', 0.2);
                            this.chicken_gatdau(true);
                            tween(this.node)
                                .delay(2)
                                .call(() => {
                                    this.chickenStateOk = CHICKENSTATE.BUON;
                                    this.node.emit('spine ok', this.chickenStateOk);
                                })
                                .start();
                        })
                        .start();
                })
                .start();
        }
        if (this.chickenSpine == CHICKENSTATE.LIKE) {
            this.spine.setMix('idle', 'like', 0.2);
            this.chicken_like(true);
            tween(this.node)
                .delay(2)
                .call(() => {
                    this.spine.setMix('like', 'suy_nghi', 0.2);
                    this.chicken_suy_nghi(true);
                    tween(this.node)
                        .delay(2)
                        .call(() => {
                            this.spine.setMix('suy_nghi', 'gat_dau', 0.2);
                            this.chicken_gatdau(true);
                            tween(this.node)
                                .delay(2)
                                .call(() => {
                                    this.chickenStateOk = CHICKENSTATE.LIKE;
                                    this.node.emit('spine ok', this.chickenStateOk);
                                })
                                .start();
                        })
                        .start();
                })
                .start();
        }
    }
    onLoad() {
        this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this.chickenSpine = CHICKENSTATE.IDLE;
    }
    //spine chicken setting
    chicken_idle(active: boolean) {
        this.spine?.setAnimation(0, 'idle', active);
    }
    chicken_buon(active: boolean) {
        this.spine?.setAnimation(0, 'buon', active);
    }
    chicken_like(active: boolean) {
        this.spine?.setAnimation(0, 'like', active);
    }
    chicken_votay(active: boolean) {
        this.spine?.setAnimation(0, 'votay', active);
    }
    chicken_vuimung(active: boolean) {
        this.spine?.setAnimation(0, 'vuimung', active);
    }
    chicken_di_bo(active: boolean) {
        this.spine?.setAnimation(0, 'di_bo', active);
    }
    chicken_gatdau(active: boolean) {
        this.spine?.setAnimation(0, 'gat_dau', active);
    }
    chicken_suy_nghi(active: boolean) {
        this.spine?.setAnimation(0, 'suy_nghi', active);
    }
    update(deltaTime: number) {

    }
}


