import { _decorator, Component, Node, Vec3, Vec2, ITweenOption, bezier, tween, math, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gate_buffterFly_spine')
export class gate_buffterFly_spine extends Component {
    private spine: sp.Skeleton = null;
    @property(Node)
    public emitfom_gate_main: Node = null;
    @property(Node)
    public emitfrom_buffterfly: Node = null;
    private moving_position_buffterFly_list: Vec3[];
    private number_random_list: number[];
    private position_moving: Vec3[];
    private arr_length: number = 0;
    private count_movingPlay: number = 0;
    private Node_scale: Vec3 = new Vec3(0.07, 0.07, 0.07);
    onLoad() {
        this.node.setWorldScale(this.Node_scale);
        this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
    }
    start() {
        this.spineStart();
        this.emitfom_gate_main.on('moving_position_buffter_fly_list', this.get_position_list, this);
        this.emitfom_gate_main.on('moving start', this.moving_start_buffter_fly, this);
        this.emitfrom_buffterfly.on('moving start', this.moving_start_buffter_fly, this);
    }

    onDisable() {
        this.emitfom_gate_main.off('moving start');
    }
    spineStart() {
        this.scheduleOnce(function () {
            this.spine?.setAnimation(0, 'animation', true);
        }, (Math.floor(Math.random() * 50) + 1) / 100)
    }
    get_position_list(position_list: Vec3[]) {
        if (!this.moving_position_buffterFly_list) {
            this.moving_position_buffterFly_list = [];
        }
        this.moving_position_buffterFly_list = position_list;
        if (!this.number_random_list) {
            this.number_random_list = [];
        }
        this.arr_length = this.moving_position_buffterFly_list.length;
        for (let i = 0; i < 15; i++) {
            this.number_random_list[i] = i;
        }
        for (let i = 14; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.number_random_list[j];
            this.number_random_list[j] = this.number_random_list[i];
            this.number_random_list[i] = temp;
        }
        if (!this.position_moving) {
            this.position_moving = [];
        }
        for (let i = 0; i < 15; i++) {
            this.position_moving[i] = this.moving_position_buffterFly_list[this.number_random_list[i]];
        }
        this.moving_start_buffter_fly(this.node.getWorldPosition(), this.count_movingPlay);
    }
    moving_start_buffter_fly(positionStart: Vec3, count_movingPlay: number) {
        let p = positionStart;
        let p1 = new Vec2(0, 0);
        let p2 = new Vec2(0, 0);
        let p3 = new Vec2(0, 0);
        let moving_hight = 600;
        let speed_moving = 200;
        if (count_movingPlay < 15) {
            let X = Math.abs(this.position_moving[count_movingPlay].x - p.x);
            let Y = Math.abs(this.position_moving[count_movingPlay].y - p.y);
            let distance = Math.sqrt(X * X + Y * Y);
            let mot_phan_ba_distance = distance / 3;
            if (X != 0 && Y != 0) {
                if (p.x >= this.position_moving[count_movingPlay].x && p.y < this.position_moving[count_movingPlay].y) {
                    this.node.setScale(this.Node_scale);
                    p1 = new Vec2(p.x - mot_phan_ba_distance, p.y + Y + moving_hight);
                    p2 = new Vec2(p.x - 2 * mot_phan_ba_distance, p.y + Y + moving_hight);
                    p3 = new Vec2(this.position_moving[count_movingPlay].x, this.position_moving[count_movingPlay].y);
                }
                if (p.x < this.position_moving[count_movingPlay].x && p.y < this.position_moving[count_movingPlay].y) {
                    this.node.setScale(-this.Node_scale.x, this.Node_scale.y, this.Node_scale.z);
                    p1 = new Vec2(p.x + mot_phan_ba_distance, p.y + Y + moving_hight);
                    p2 = new Vec2(p.x + 2 * mot_phan_ba_distance, p.y + Y + moving_hight);
                    p3 = new Vec2(this.position_moving[count_movingPlay].x, this.position_moving[count_movingPlay].y);
                }
                if (p.x >= this.position_moving[count_movingPlay].x && p.y > this.position_moving[count_movingPlay].y) {
                    this.node.setScale(this.Node_scale);
                    p1 = new Vec2(p.x - mot_phan_ba_distance, p.y + moving_hight);
                    p2 = new Vec2(p.x - 2 * mot_phan_ba_distance, p.y + moving_hight);
                    p3 = new Vec2(this.position_moving[count_movingPlay].x, this.position_moving[count_movingPlay].y);
                }
                if (p.x < this.position_moving[count_movingPlay].x && p.y > this.position_moving[count_movingPlay].y) {
                    this.node.setScale(-this.Node_scale.x, this.Node_scale.y, this.Node_scale.z);
                    p1 = new Vec2(p.x + mot_phan_ba_distance, p.y + moving_hight);
                    p2 = new Vec2(p.x + 2 * mot_phan_ba_distance, p.y + moving_hight);
                    p3 = new Vec2(this.position_moving[count_movingPlay].x, this.position_moving[count_movingPlay].y);
                }
                this.node.emit('set index', this.position_moving[count_movingPlay], this.node.name);
                this.tweenBezier2DTo(this.node, Math.floor(Math.random() * 20) + 10, p1, p2, p3, () => {
                    p = new Vec3(this.position_moving[count_movingPlay].x, this.position_moving[count_movingPlay].y, 0);
                    count_movingPlay = count_movingPlay + 1;
                    if (count_movingPlay == 15) {
                        count_movingPlay = 0;
                    }
                    this.node.emit('loop moving start', p, count_movingPlay);
                });
            }
        }
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
            .delay(Math.floor(Math.random() * 6) + 2)
            .call(() => {
                target['bezierX'] = null;
                finishcallback && finishcallback();
            })
            .start();

        target['bezierY'] = tween(_targetY)
            .to(duration, { value: to.y }, bOpts)
            .delay(Math.floor(Math.random() * 6) + 2)
            .call(() => {
                target['bezierY'] = null;
            })
            .start();
    }
    update(deltaTime: number) {

    }
}


