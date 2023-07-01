import { _decorator, Component, Node, sp, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
enum chickenState {
    nostate,
    bidanh,
    buon,
    di_bo,
    gat_dau,
    idle_gaimong,
    idle,
    like,
    like2,
    lo_lang,
    noichuyen,
    so_hai,
    tucgian,
    votay,
    votay2,
    votay3,
    vuimung,
};
@ccclass('df2_direction_chickenSpine')
export class df2_direction_chickenSpine extends Component {
    CHICKEN_SPINE_LIST = ["bidanh", "buon", "di_bo", "gat_dau", "idle_gaimong", "idle", "like", "like2", "lo_lang",
        "noichuyen", "so_hai", "tucgian", "votay", "votay2", "votay3", "vuimung"];
    @property(Node)
    private emitfromDirection: Node = null;
    @property(Node)
    private positionTo: Node = null;
    private spine: sp.Skeleton = null;
    private positionStart: Vec3 = new Vec3(0, 0, 0);
    private chicken_spine: chickenState = chickenState.nostate;
    private positionEnd: Vec3 = new Vec3(0, 0, 0);
    onLoad() {
        this.positionEnd = this.node.getWorldPosition();
        this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this.positionStart = this.positionTo.getWorldPosition();
        for (let i = 0; i < this.CHICKEN_SPINE_LIST.length; i++) {
            for (let j = i + 1; j < this.CHICKEN_SPINE_LIST.length; j++) {
                this._setMix(this.CHICKEN_SPINE_LIST[i], this.CHICKEN_SPINE_LIST[j]);
            }
        }
    }
    start() {
        this.scheduleOnce(function () {
            this.setChickenMoving_start();
        }, 24);
        this.emitfromDirection.on('chicken chuyen spine', this.set_chicken_spine, this);
        this.emitfromDirection.on('chicken moving end', this.setMoving_end, this);
    }
    //chicken start moving
    setChickenMoving_start() {
        this.chicken_di_bo(true);
        if (this.node.name == 'Ga') {
            tween(this.node)
                .to(2, { worldPosition: new Vec3(this.positionStart.x, this.positionStart.y, 0) })
                .call(() => {
                    this.chicken_idle(true);
                    this.scheduleOnce(function () {
                        this.node.emit('bird chuyen trang thai hoi duong');
                    }, 1);
                })
                .start();
        }
        if (this.node.name == 'chicken') {
            tween(this.node)
                .to(2, { worldPosition: new Vec3(this.positionStart.x, this.positionStart.y + 200, 0) })
                .call(() => {
                    this.chicken_idle(true);
                    this.scheduleOnce(function () {
                        this.node.emit('bird chuyen trang thai hoi duong');
                    }, 1);
                })
                .start();
        }
    }
    //chicken moving end
    setMoving_end() {
        this.node.setScale(-1, 1, 1);
        tween(this.node)
            .to(2, { worldPosition: new Vec3(this.positionEnd.x, this.positionEnd.y, 0) })
            .start();
    }
    //set chicken spine
    set_chicken_spine(state: number) {
        if (state == chickenState.idle) {
            this.chicken_idle(true);
        }
        if (state == chickenState.noichuyen) {
            this.chicken_noichuyen(false);
            this.scheduleOnce(function () {
                this.chicken_idle(true);

            }, 3)
        }
        if (state == chickenState.vuimung) {
            this.chicken_vuimung(true);
            this.scheduleOnce(function () {
                this.chicken_votay(true);
                this.scheduleOnce(function () {
                    this.chicken_idle(true);
                    this.scheduleOnce(function () {
                        this.chicken_di_bo(true);
                        this.node.emit('chuyen sang chicken moving');
                    }, 3);
                }, 3);
            }, 3);
        }
        if (state == chickenState.buon) {
            this.scheduleOnce(function () {
                this.chicken_buon(false)
                this.scheduleOnce(function () {
                    this.chicken_idle(true);
                }, 2);
            }, 1);
        }
    }
    //spine chicken setanimation
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
    chicken_noichuyen(active: boolean) {
        this.spine?.setAnimation(0, 'noichuyen', active);
    }
    _setMix(anim1: string, anim2: string) {
        this.spine?.setMix(anim1, anim2, 0.2);
        this.spine?.setMix(anim2, anim1, 0.2);
    }
    update(deltaTime: number) {
    }
}


