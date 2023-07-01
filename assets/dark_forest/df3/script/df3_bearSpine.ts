import { _decorator, Component, Node, sp, TERRAIN_MAX_LAYER_COUNT } from 'cc';
const { ccclass, property } = _decorator;
enum bearSpine {
    nostate,
    idle,
    idle2,
    idle3,
    run,
    toleft,
    toright,
    idle_happy,
    idle_sad,
    walk,
    win,
    dung_lai2,
}
@ccclass('df3_bearSpine')
export class df3_bearSpine extends Component {
    private spine: sp.Skeleton;
    @property({ type: Node })
    private emitfromMainHunghinh: Node = null;
    @property({ type: Node })
    private Gio: Node = null;
    private bearSpinestate: bearSpine = bearSpine.nostate
    private bearSpinestateEnd: bearSpine = bearSpine.nostate;
    start() {
        this.emitfromMainHunghinh.on('bear spine swap', this.bearSpineSeting, this);
    }
    bearSpineSeting(state: number) {
        if (state == bearSpine.walk) {
            this.bearSpinestate = bearSpine.walk;
            this.spineStart();
        }
        if (state == bearSpine.dung_lai2) {
            this.bearSpinestate = bearSpine.dung_lai2;
            this.scheduleOnce(function () {
                this.Gio.active = true;
            }, 0.5)
            this.spineStart();
        }
        if (state == bearSpine.idle3) {
            this.bearSpinestate = bearSpine.idle3;
            this.spineStart();
        }
        if (state == bearSpine.toleft) {
            this.bearSpinestate = bearSpine.toleft;
            this.spineStart();
        }
        if (state == bearSpine.toright) {
            this.bearSpinestate = bearSpine.toright;
            this.spineStart();
        }
        if (state == bearSpine.idle_happy) {
            this.bearSpinestate = bearSpine.idle_happy;
            this.spineStart();
        }
    }
    spineStart() {
        if (this.bearSpinestate == bearSpine.walk) {
            this.spine.setMix('sang_trai', 'walk', 0.1);
            this.Bear_walk(true);
        }
        if (this.bearSpinestate == bearSpine.dung_lai2) {
            this.spine.setMix('walk', 'dung_lai2', 0.1);
            this.Bear_dung_lai2(false);
            this.scheduleOnce(function () {
                this.bearSpinestateEnd = bearSpine.dung_lai2;
                this.node.emit('bear spine ok', this.bearSpinestateEnd);
            }, 1.2);
        }
        if (this.bearSpinestate == bearSpine.idle3) {
            this.spine.setMix('dung_lai2', 'idle3', 0.24);
            this.Bear_idle3(true);
        }
        if (this.bearSpinestate == bearSpine.toright) {
            this.Bear_sang_trai2(true);
        }
        if (this.bearSpinestate == bearSpine.toleft) {
            this.spine.setMix('idle3', 'sang_trai', 0.24);
            this.Bear_sang_trai(true);
        }
        if (this.bearSpinestate == bearSpine.idle_happy) {
            this.spine.setMix('walk', 'idle_happy2', 0.24);
            this.Bear_idle_happy2(true);
            this.scheduleOnce(function () {
                this.bearSpinestateEnd = bearSpine.idle_happy;
                this.node.emit('bear spine ok', this.bearSpinestateEnd);
            }, 2);
        }

    }
    // setMIX(spine_before: string, spine_after: string) {
    //     this.spine.setMix(spine_before, spine_after, 0.24);
    // }
    onLoad() {

        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
    }
    Bear_dung_lai(state: boolean) {
        this.spine?.setAnimation(0, 'dung_lai', state);
    }
    Bear_dung_lai2(state: boolean) {
        this.spine?.setAnimation(0, 'dung_lai2', state);
    }
    Bear_idle(state: boolean) {
        this.spine?.setAnimation(0, 'idle', state);
    }
    Bear_idle2(state: boolean) {
        this.spine?.setAnimation(0, 'idle2', state);
    }
    Bear_idle_happy(state: boolean) {
        this.spine?.setAnimation(0, 'idle_happy', state);
    }
    Bear_idle_happy2(state: boolean) {
        this.spine?.setAnimation(0, 'idle_happy2', state);
    }
    Bear_idle_sad(state: boolean) {
        this.spine?.setAnimation(0, 'idle_sad', state);
    }
    Bear_run(state: boolean) {
        this.spine?.setAnimation(0, 'run', state);
    }
    Bear_walk(state: boolean) {
        this.spine?.setAnimation(0, 'walk', state);
    }
    Bear_win(state: boolean) {
        this.spine?.setAnimation(0, 'win', state);
    }
    Bear_idle3(state: boolean) {
        this.spine?.setAnimation(0, 'idle3', state);
    }
    Bear_sang_trai(state: boolean) {
        this.spine?.setAnimation(0, 'sang_trai', state);
    }
    Bear_sang_trai2(state: boolean) {
        this.spine?.setAnimation(0, 'sang_trai2', state);
    }
    update(deltaTime: number) {

    }
}


