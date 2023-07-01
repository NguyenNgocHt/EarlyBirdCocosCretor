import { _decorator, Component, Node, Vec3, bezier, ITweenOption, tween, Vec2, math, PHYSICS_2D_PTM_RATIO } from 'cc';
import { numberContro } from '../../df4/script/numberContro';
const { ccclass, property } = _decorator;
enum fallingstate {
    nostate,
    falling,
    stop,
    jumbUp,
}
enum collideState {
    nostate,
    true,
    false,
}
enum basketState {
    nodtate,
    eat,
    pushOut,
}
enum pointState {
    nostate,
    plusPoint,
    minusPoint,
}
enum startingHungHinh {
    nostate,
    start,
    pause,
    stop,
    endGame,
}
const g: number = 9.8;
@ccclass('df3_nodeMoving')
export class df3_nodeMoving extends Component {
    @property({ type: Node })
    public emitfromInitprefab: Node = null;
    private randomX: number = 0;
    private randomY: number = 0;
    public fallingSpeed: number = 0;
    private dx: number = 0;
    private dy: number = 0;
    private fallingstart = fallingstate.falling;
    private collidestate: collideState = collideState.nostate;
    private basketstate: basketState = basketState.nodtate;
    private pointstate: pointState = pointState.nostate;
    private startinghunghinh: startingHungHinh = startingHungHinh.nostate;
    public limitPosition: number = 0;
    public traveldistance: number = 0;
    public randomfalling: number = 0;
    private randomScaleX_Y: number = 0;
    private position_gio: Vec3 = new Vec3(0, 0, 0);
    private distanceNodeAndGio: number = 0;
    private indexNumber: number = 0;
    private gio: Node = null;
    private pointNumber: number = 0;

    start() {
        this.fallingStart();
        this.emitfromInitprefab.on('position gio hoa qua', this.getposition_Gio, this);
        this.emitfromInitprefab.on('basket state', this.setBasketState, this);
        this.emitfromInitprefab.on('gui gio cho con', this.get_gio, this);
        this.emitfromInitprefab.on('gui end game', this.end_GAME_Seting, this);
    }
    end_GAME_Seting(state: number) {
        if (state == startingHungHinh.endGame) {
            this.fallingstart = fallingstate.stop;
            tween(this.node)
                .to(1, { scale: new Vec3(2, 2, 2) })
                .to(1, { scale: new Vec3(0, 0, 0) })
                .call(() => {
                    this.node.emit('destoy childs');
                })
                .start();
        }
    }
    get_gio(node: Node) {
        this.gio = node;
    }
    setBasketState(state: number) {
        if (state == basketState.eat) {
            console.log('nhan an', this.node.name);
            this.basketstate = basketState.eat;
        }
        if (state == basketState.pushOut) {
            console.log('nhan pushout', this.node.name);
            this.basketstate = basketState.pushOut;
        }
    }
    getposition_Gio(position: Vec3) {
        this.position_gio = position;
    }
    fallingStart() {
        if (this.fallingSpeed == fallingstate.falling) {
            this.fallingstart = fallingstate.falling;
            this.node.active = true;
        }
    }

    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.fallingSpeed * this.dx, p.y + this.fallingSpeed * this.dy, 0);
        if (this.fallingstart == fallingstate.falling) {
            this.sawp_PositionGio();
            this.node.setWorldPosition(q.x, q.y, 0);
            this.falling_Start(this.node.worldPosition);
        }
        if (this.fallingstart == fallingstate.stop) {
        }
    }
    sawp_PositionGio() {
        this.distanceNodeAndGio = this.calculate_distance_node_and_gio()
        if (this.position_gio.y <= this.node.worldPosition.y && this.distanceNodeAndGio <= 150 && this.basketstate == basketState.eat) {
            this.fallingstart = fallingstate.stop;
            this.pointstate = pointState.plusPoint;
            this.pointNumber = 10;
            let p = this.node.getPosition();
            console.log('an', this.node.name);
            this.node.emit('point for game', this.pointstate, this.pointNumber, this.node.name);
            let p1;
            let p2;
            let p3;
            if (this.node.worldPosition.x > this.position_gio.x) {
                p1 = new Vec2(p.x - 10, p.y + 200);
                p2 = new Vec2(p.x - 30, p.y + 200);
                p3 = new Vec2(p.x - 40, p.y);
                this.tweenBezier2DTo(this.node, 0.2, p1, p2, p3, () => {
                    tween(this.node)
                        .to(0.2, { scale: new Vec3(0, 0, 0) })
                        .call(() => {
                            this.reset();
                        })
                        .start();
                });
            }
            if (this.node.worldPosition.x < this.position_gio.x) {
                p1 = new Vec2(p.x + 10, p.y + 200);
                p2 = new Vec2(p.x + 30, p.y + 200);
                p3 = new Vec2(p.x + 40, p.y);
                this.tweenBezier2DTo(this.node, 0.2, p1, p2, p3, () => {
                    tween(this.node)
                        .to(0.2, { scale: new Vec3(0, 0, 0) })
                        .call(() => {
                            this.reset();
                        })
                        .start();
                });
            }
            if (this.node.worldPosition.x == this.position_gio.x) {
                tween(this.node)
                    .to(0.2, { scale: new Vec3(0, 0, 0) })
                    .call(() => {
                        this.reset();
                    })
                    .start();
            }
        }
        if (this.position_gio.y + 100 <= this.node.worldPosition.y && this.distanceNodeAndGio <= 150 && this.basketstate == basketState.pushOut) {
            this.fallingstart = fallingstate.stop;
            this.pointstate = pointState.minusPoint;
            this.pointNumber = 10;
            this.node.emit('point for game', this.pointstate, this.pointNumber, this.node.name);
            let p = this.node.getPosition();
            let p1;
            let p2;
            let p3;
            if (this.node.worldPosition.x > this.position_gio.x) {
                p1 = new Vec2(p.x + 50, p.y + 250);
                p2 = new Vec2(p.x + 150, p.y + 250);
                p3 = new Vec2(p.x + 200, p.y);
                this.tweenBezier2DTo(this.node, 0.25, p1, p2, p3, () => {
                    this.fallingstart = fallingstate.falling;
                });
            }
            if (this.node.worldPosition.x < this.position_gio.x) {
                p1 = new Vec2(p.x - 50, p.y + 250);
                p2 = new Vec2(p.x - 150, p.y + 250);
                p3 = new Vec2(p.x - 200, p.y);
                this.tweenBezier2DTo(this.node, 0.25, p1, p2, p3, () => {
                    this.fallingstart = fallingstate.falling;
                });
            }
            if (this.node.worldPosition.x == this.position_gio.x) {
                p1 = new Vec2(p.x - 50, p.y + 250);
                p2 = new Vec2(p.x - 150, p.y + 250);
                p3 = new Vec2(p.x - 200, p.y);
                this.tweenBezier2DTo(this.node, 0.25, p1, p2, p3, () => {
                    this.fallingstart = fallingstate.falling;
                });
            }

        }
    }
    calculate_distance_node_and_gio(): number {
        let a = Math.abs(this.node.worldPosition.x - this.position_gio.x);
        let b = Math.abs(this.node.worldPosition.y - this.position_gio.y);
        let c = Math.sqrt(a * a + b * b);
        return c;
    }
    falling_Start(position: Vec3) {
        if (position.y > this.limitPosition) {
            this.dy = -1;
        }
        else {
            this.dy = 0;
            this.fallingstart = fallingstate.stop;
            let p;
            let p1;
            let p2;
            let p3;
            if (this.randomfalling == 1) {
                let p = this.node.position;
                p1 = new Vec2(p.x + 40, p.y + 100);
                p2 = new Vec2(p.x + 80, p.y + 100);
                p3 = new Vec2(p.x + 120, p.y);
            }
            else if (this.randomfalling == 2) {
                p = this.node.position;
                p1 = new Vec2(p.x - 40, p.y + 100);
                p2 = new Vec2(p.x - 80, p.y + 100);
                p3 = new Vec2(p.x - 120, p.y);
            }

            this.tweenBezier2DTo(this.node, 0.25, p1, p2, p3, () => {
                tween(this.node)
                    .to(0.2, { scale: new Vec3(0, 0, 0) })
                    .call(() => {
                        this.reset();
                    })
                    //.union() 
                    //.repeatForever() 
                    .start();
            });
        }
    }
    reset() {
        let random = Math.floor(Math.random() * 10) + 6;
        this.randomScaleX_Y = random / 10;
        this.node.setScale(this.randomScaleX_Y, this.randomScaleX_Y, 0);
        this.randomX = Math.floor(Math.random() * 1200) + 700;
        this.randomY = Math.floor(Math.random() * 1100) + 5000;
        this.node.setWorldPosition(this.randomX, this.randomY, 0);
        this.limitPosition = Math.floor(Math.random() * 150) + 1;
        this.fallingstart = fallingstate.falling;

    }

    tweenBezier2DTo(target: Node, duration: number, c1: Vec2, c2
        : Vec2, to: Vec2, finishcallback?: any, opts?: ITweenOption) {
        if (target['bezierX']) target['bezierX'].stop();
        if (target['bezierY']) target['bezierY'].stop();

        let c0x = c1.x, c0y = c1.y,
            c1x = c2.x, c1y = c2.y;
        const _targetX = { value: target.getPosition().x };
        const _targetY = { value: target.getPosition().y };
        const aOpts: ITweenOption = opts || Object.create(null);
        aOpts.progress = function (startX: number, endX: number, currentX: number, t: number) {
            currentX = bezier(startX, c0x, c1x, endX, t);
            return currentX;
        }
        aOpts.onUpdate = function () {
            target.setPosition(new Vec3(_targetX.value, target.position.y, target.position.z));
        }
        const bOpts: ITweenOption = opts || Object.create(null);
        bOpts.progress = function (startY: number, endY: number, currentY: number, t: number) {
            currentY = bezier(startY, c0y, c1y, endY, t);
            return currentY;
        }
        bOpts.onUpdate = function () {
            target.setPosition(new Vec3(target.position.x, _targetY.value, target.position.z));
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
}


