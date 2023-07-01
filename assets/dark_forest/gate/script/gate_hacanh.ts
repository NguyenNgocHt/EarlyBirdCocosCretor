import { _decorator, Component, Node, Vec3, tween, sp } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
const { ccclass, property } = _decorator;
enum hacanhState {
    nostate,
    hacanh,
    catcanh,
    stop,
}
@ccclass('gate_hacanh')
export class gate_hacanh extends Component {
    @property(Node)
    private emitfromMainGate: Node = null;
    @property(Node)
    private diabay: Node = null;
    @property(Node)
    private diabay_spine: Node = null;
    @property(sp.Skeleton)
    private bird_spine: sp.Skeleton = null;
    @property(sp.Skeleton)
    private khoi_hacanh: sp.Skeleton = null;
    private hacanhstate: hacanhState = hacanhState.hacanh;
    private UFOspeed: number = 5;
    private dx: number = 0;
    private dy: number = 0;
    private litmitNumber: number = 0;
    private p1: Vec3 = new Vec3(0, 0, 0);
    private p2: Vec3 = new Vec3(0, 0, 0);
    private p3: Vec3 = new Vec3(0, 0, 0);
    private p4: Vec3 = new Vec3(0, 0, 0);
    start() {
        this.setUFO();
        this.emitfromMainGate.on('door open', this.getpositon, this);
    }
    getpositon(p1: Node, p2: Node, p3: Node, p4: Node) {
        this.p1 = p1.getWorldPosition();
        this.p2 = p2.getWorldPosition();
        this.p3 = p3.getWorldPosition();
        this.p4 = p4.getWorldPosition();
        this.birdMoving();
    }
    birdMoving() {
        this.bird_spine.setMix('idle', 'walk', 0.2);
        this.bird_spine.setAnimation(0, 'walk', true);
        tween(this.bird_spine.node)
            .to(this.timeMoving(this.bird_spine.node.getWorldPosition(), this.p1), { worldPosition: new Vec3(this.p1.x, this.p1.y, 0) })
            .to(this.timeMoving(this.p1, this.p2), { worldPosition: new Vec3(this.p2.x, this.p2.y, 0) })
            .to(this.timeMoving(this.p2, this.p3), { worldPosition: new Vec3(this.p3.x, this.p3.y, 0) })
            .to(this.timeMoving(this.p3, this.p4), { worldPosition: new Vec3(this.p4.x, this.p4.y, 0) })
            .call(() => {
                tween(this.bird_spine.node)
                    .to(2, { worldScale: new Vec3(0, 0, 0) })
                    .start();
            })
            .start();
        tween(this.bird_spine.node)
            .to(6, { worldScale: new Vec3(-0.5, 0.5, 0.5) })
            .start();
    }

    timeMoving(A: Vec3, B: Vec3): number {
        let MovingSpeed = 150;
        let X = Math.abs(B.x - A.x);
        let Y = Math.abs(B.y - A.y);
        let distance = Math.sqrt(X * X + Y * Y);
        let time_moving = distance / MovingSpeed;
        return time_moving;
    }
    setUFO() {
        if (this.hacanhstate == hacanhState.hacanh) {
            this.bird_spine.node.active = false;
            this.diabay.active = false;
            this.khoi_hacanh.node.active = false;
            this.diabay_spine.active = true;
            AudioManager.instance().playShort('dark_forest', 'gate/sound/landing-ufo', true);
        }
        if (this.hacanhstate == hacanhState.stop) {
            this.khoi_hacanh.node.active = true;
            tween(this.khoi_hacanh.node)
                .to(1, { scale: new Vec3(2, 4, 2) })
                .start();
            this.diabay_spine.active = false;
            this.scheduleOnce(function () {
                this.diabay.active = true;
                this.diabay.setScale(1.5, 1.5, 1.5);
                this.bird_spine.node.active = true;
            }, 1);
            this.bird_spine?.setAnimation(0, 'idle_gaimong', false);
            this.scheduleOnce(function () {
                this.bird_spine.node.setScale(1, 1, 1);
                this.bird_spine.setMix('idle_gaimong', 'idle2', 0.24);
                this.bird_spine?.setAnimation(0, 'idle2', false);
                this.scheduleOnce(function () {
                    this.bird_spine.node.setScale(-1, 1, 1);
                    this.bird_spine.setMix('idle2', 'idle2', 0.24);
                    this.bird_spine?.setAnimation(0, 'idle2', false);
                    this.scheduleOnce(function () {
                        this.bird_spine.setMix('idle2', 'suy_nghi', 0.24);
                        this.bird_spine?.setAnimation(0, 'suy_nghi', true);
                        this.scheduleOnce(function () {
                            this.node.emit('show bird audio play and box chat');
                            this.bird_spine?.setMix('suy_nghi', 'traloi', 0.24);
                            this.bird_spine?.setAnimation(0, 'traloi', true)
                            this.scheduleOnce(function () {
                                this.node.emit('cho phep mo cua');
                                this.bird_spine?.setMix('traloi', 'idle', 0.24);
                                this.bird_spine?.setAnimation(0, 'idle', true);
                            }, 4.5);
                        }, 1);

                    }, 1);
                }, 1);
            }, 2);
        }
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.UFOspeed * this.dx, p.y + this.UFOspeed * this.dy, 0);
        if (this.hacanhstate == hacanhState.hacanh) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.hacanhStart(this.node.worldPosition);
        }
        if (this.hacanhstate == hacanhState.stop) {

        }
    }
    hacanhStart(position: Vec3) {
        if (this.UFOspeed == 5) {
            this.litmitNumber = this.slowCalculation();

        }
        if (position.y < this.litmitNumber - 5 + 400) {
            this.UFOspeed = this.UFOspeed - 1;
        }
        if (position.y < 600) {
            this.UFOspeed = 1;
        }
        if (position.y > 99) {
            this.dy = -1;
        } else {
            this.dy = 0;
            this.hacanhstate = hacanhState.stop;
            this.setUFO();
        }
    }
    slowCalculation(): number {
        var limitNumber = 0;
        for (let i = this.UFOspeed; i >= 0; i--) {
            limitNumber = limitNumber + i;
        }
        return limitNumber;
    }
}


