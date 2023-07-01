import { _decorator, Component, Node, sp, Vec3, tween, Vec2, ITweenOption, bezier } from 'cc';
import { numberContro } from '../../df4/script/numberContro';
const { ccclass, property } = _decorator;
enum socSpine {
    nostate,
    run,
    ilde,
    jump,
}
@ccclass('gate_socSpine')
export class gate_socSpine extends Component {
    @property(Node)
    emit_from_GateMain: Node = null;
    private spine: sp.Skeleton = null;
    @property(Node)
    private position_moving1: Node = null;
    @property(Node)
    private position_moving1_1: Node = null;
    @property(Node)
    private position_moving2: Node = null;
    @property(Node)
    private position_moving3: Node = null;
    @property(Node)
    private position_moving4: Node = null;
    @property(Node)
    private position_moving5: Node = null;
    @property(Node)
    private position_moving6: Node = null;
    private position_Mv1: Vec3 = new Vec3(0, 0, 0);
    private position_Mv1_1: Vec3 = new Vec3(0, 0, 0);
    private position_Mv2: Vec3 = new Vec3(0, 0, 0);
    private position_Mv3: Vec3 = new Vec3(0, 0, 0);
    private position_Mv4: Vec3 = new Vec3(0, 0, 0);
    private position_Mv5: Vec3 = new Vec3(0, 0, 0);
    private position_Mv6: Vec3 = new Vec3(0, 0, 0);
    private soc_spine: socSpine = socSpine.nostate;
    onLoad() {
        this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this.position_Mv1 = this.position_moving1.getWorldPosition();
        this.position_Mv1_1 = this.position_moving1_1.getWorldPosition();
        this.position_Mv2 = this.position_moving2.getWorldPosition();
        this.position_Mv3 = this.position_moving3.getWorldPosition();
        this.position_Mv4 = this.position_moving4.getWorldPosition();
        this.position_Mv5 = this.position_moving5.getWorldPosition();
        this.position_Mv6 = this.position_moving6.getWorldPosition();
        this.soc_spine = socSpine.ilde;

    }
    start() {
        this.scheduleOnce(function () {
            this.spineStart();
        }, 0.1);
        this.emit_from_GateMain.on('spine state', this.set_soc_spine_1, this);
        this.emit_from_GateMain.on('spine state_2', this.set_soc_spine_2, this);
    }
    set_soc_spine_1(state: number) {
        if (state == socSpine.run) {
            tween(this.node)
                .to(3, { worldPosition: new Vec3(this.position_Mv1_1.x, this.position_Mv1_1.y, 0) })
                .call(() => {
                    this.node.emit('set index after tree');
                })
                .to(1, { worldPosition: new Vec3(this.position_Mv1.x, this.position_Mv1.y, 0) })
                .call(() => {
                    this.soc_ilde(true);
                })
                .delay(1)
                .call(() => {
                    this.node.setScale(-0.3, 0.3, 0);
                    this.soc_ilde(true);
                })
                .delay(1)
                .call(() => {
                    this.soc_run(true)
                })
                .to(1, { worldPosition: new Vec3(this.position_Mv1_1.x, this.position_Mv1_1.y, 0) })
                .call(() => {
                    this.soc_ilde(true);
                    this.node.emit('set index befor tree');
                })
                .delay(1)
                .call(() => {
                    this.soc_run(true);
                })
                .to(1, { worldPosition: new Vec3(this.position_Mv3.x, this.position_Mv3.y, 0) })
                .to(2, { worldPosition: new Vec3(this.position_Mv4.x, this.position_Mv4.y, 0) })
                .call(() => {
                    this.soc_ilde(true);
                })
                .start();
        }
    }
    set_soc_spine_2(state: number) {
        if (state == socSpine.run) {
            this.node.setScale(0.3, 0.3, 0.3);
            tween(this.node)
                .delay(1)
                .call(() => {
                    this.soc_run(true);
                })
                .to(2, { worldPosition: new Vec3(this.position_Mv5.x, this.position_Mv5.y, 0) })
                .call(() => {
                    this.soc_ilde(true);
                })
                .delay(1)
                .call(() => {
                    this.soc_jump(true);
                    this.set_soc_jump();
                })
                .start();
        }
    }
    set_soc_jump() {
        let p = this.node.getWorldPosition();
        let X = Math.abs(this.position_Mv6.x - p.x);
        let Y = Math.abs(this.position_Mv6.y - p.y);
        let distance = X / 3;
        let p1 = new Vec2(p.x + distance, p.y + Y + 100);
        let p2 = new Vec2(p.x + 2 * distance, p.y + Y + 100);
        let p3 = new Vec2(this.position_Mv6.x, this.position_Mv6.y);
        this.tweenBezier2DTo(this.node, 0.5, p1, p2, p3, () => {
            this.soc_ilde(true);
            tween(this.node)
                .delay(1)
                .call(() => {
                    this.node.setScale(-0.3, 0.3, 0.3);
                    this.soc_ilde(true);
                })
                .start();
        });
    }
    spineStart() {
        if (this.soc_spine == socSpine.ilde) {
            this.soc_ilde(true);
            this.scheduleOnce(function () {
                this.soc_run(true);
                this.node.emit('soc chuyen spine', this.soc_spine);
            }, 3);
        }
    }
    soc_run(active: boolean) {
        this.spine?.setAnimation(0, 'run', active);
    }
    soc_jump(active: boolean) {
        this.spine?.setAnimation(0, 'animation', active);
    }
    soc_ilde(active: boolean) {
        this.spine?.setAnimation(0, 'idle', active);
    }
    tweenBezier2DTo(target: Node, duration: number, c1: Vec2, c2
        : Vec2, to: Vec2, finishcallback?: any, opts?: ITweenOption) {
        if (target['bezierX']) target['bezierX'].stop();
        if (target['bezierY']) target['bezierY'].stop();

        let c0x = c1.x, c0y = c1.y,
            c1x = c2.x, c1y = c2.y;
        const _targetX = { value: target.getWorldPosition().x };
        const _targetY = { value: target.getWorldPosition().y };
        const aOpts: ITweenOption = opts || Object.create(null);
        aOpts.progress = function (startX: number, endX: number, currentX: number, t: number) {
            currentX = bezier(startX, c0x, c1x, endX, t);
            return currentX;
        }
        aOpts.onUpdate = function () {
            target.setWorldPosition(new Vec3(_targetX.value, target.worldPosition.y, target.worldPosition.z));
        }
        const bOpts: ITweenOption = opts || Object.create(null);
        bOpts.progress = function (startY: number, endY: number, currentY: number, t: number) {
            currentY = bezier(startY, c0y, c1y, endY, t);
            return currentY;
        }
        bOpts.onUpdate = function () {
            target.setWorldPosition(new Vec3(target.worldPosition.x, _targetY.value, target.worldPosition.z));
            target.emit('position update', target.getWorldPosition());
        }
        target['bezierX'] = tween(_targetX)
            .to(duration, { value: to.x }, aOpts)
            .call(() => {
                target['bezierX'] = null;
                finishcallback && finishcallback();
            })
            .start();

        target['bezierY'] = tween(_targetY)
            .to(duration, { value: to.y }, bOpts)
            .call(() => {
                target['bezierY'] = null;
            })
            .start();
    }
    update(deltaTime: number) {

    }
}


