import { _decorator, Component, Node, Vec3, Event, EventTouch, tween, Vec2, ITweenOption, bezier, TERRAIN_HEIGHT_BASE, WidgetComponent } from 'cc';
const { ccclass, property } = _decorator;
enum blockTouchMoving {
    nostate,
    open,
    block,
}
enum getingFuitsState {
    nostate,
    banana,
    apple,
    strawberry,
}
enum movingOriginState {
    nostate,
    movingEND_true,
    movingEND_fasle,
    movingOrigin,

}
@ccclass('df1_eatFruits_fruitsMoving')
export class df1_eatFruits_fruitsMoving extends Component {
    @property(Node)
    private emitfrom_eatfruitsMain: Node = null;
    @property(Node)
    private emitfrom_gio: Node = null;
    private block_touch_moving: blockTouchMoving = blockTouchMoving.nostate;
    private geting_fruits_state: getingFuitsState = getingFuitsState.nostate;
    private moving_origin_state: movingOriginState = movingOriginState.nostate;
    private startPosition: Vec3 = new Vec3(0, 0, 0);
    private indexStart: number = 0;
    private monster_positionConvert: Vec3 = new Vec3(0, 0, 0);
    onLoad() {
        this.block_touch_moving = blockTouchMoving.block;
        this.indexStart = this.node.getSiblingIndex();

    }
    start() {
        this.emitfrom_gio.on('mo khoa di chuyen hoa qua bang touch move', this.openMoving, this);
        this.emitfrom_gio.on('block_moving_fruits', this.block_moving, this);
        this.emitfrom_eatfruitsMain.on('fruits moving to origin position', this.set_moving_origin_position, this);
        this.emitfrom_eatfruitsMain.on('fruits moving to origin position_inMonster', this.set_moving_fruits, this);
        this.emitfrom_eatfruitsMain.on('fruits moving to origin_out_monster', this.set_Fruits_Moving_Origin, this);
        this.node.on(Node.EventType.TOUCH_START, this.setStartPosition, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.setMovingPosition, this);
        this.node.on(Node.EventType.TOUCH_END, this.setEndPosition, this);
    }
    block_moving() {
        this.block_touch_moving = blockTouchMoving.block;
    }
    set_Fruits_Moving_Origin() {
        this.moving_origin_state = movingOriginState.movingOrigin;
    }
    set_moving_fruits(positionMonster: Vec3) {
        this.monster_positionConvert = positionMonster;
        this.moving_origin_state = movingOriginState.movingEND_fasle;
    }
    set_moving_origin_position(state: number, monster_position_Convert: Vec3) {
        this.monster_positionConvert = monster_position_Convert;
        if (state == getingFuitsState.nostate) {
            this.moving_origin_state = movingOriginState.movingOrigin;
        }
        if (state == getingFuitsState.apple) {
            this.moving_origin_state = movingOriginState.movingEND_true;
        }
        if (state == getingFuitsState.banana) {
            this.moving_origin_state = movingOriginState.movingEND_true;
        }
        if (state == getingFuitsState.strawberry) {
            this.moving_origin_state = movingOriginState.movingEND_true;
        }
    }
    openMoving() {
        this.block_touch_moving = blockTouchMoving.open;
    }
    setStartPosition() {
        if (this.block_touch_moving == blockTouchMoving.open) {
            this.node.setSiblingIndex(6);
            let p = this.node.getWorldPosition();
            this.startPosition = p;
            this.node.emit('i am start position', this.node);
        }
    }
    setMovingPosition(e: EventTouch) {
        if (this.block_touch_moving == blockTouchMoving.open) {
            let p = e.getUILocation();
            this.node.setWorldPosition(p.x, p.y, 0);
            this.node.emit('iam moving', this.node);
        }
    }
    setEndPosition() {
        this.node.emit('i am end', this.node);
        this.node.setSiblingIndex(this.indexStart);
        if (this.moving_origin_state == movingOriginState.movingEND_fasle) {
            let fruits_jump = 450;
            let p = this.node.getWorldPosition();
            let X = Math.abs(this.monster_positionConvert.x - p.x);
            let Y = Math.abs(this.monster_positionConvert.y - p.y);
            let distance = Math.sqrt(X * X + Y * Y);
            let distance_1 = distance / 3;
            let p1;
            let p2;
            let p3;

            if (p.y >= this.monster_positionConvert.y && p.x < this.monster_positionConvert.x) {
                p1 = new Vec2(p.x + distance_1, p.y + fruits_jump);
                p2 = new Vec2(p.x + 2 * distance_1, p.y + fruits_jump);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            if (p.y >= this.monster_positionConvert.y && p.x >= this.monster_positionConvert.x) {
                p1 = new Vec2(p.x - distance_1, p.y + fruits_jump);
                p2 = new Vec2(p.x - 2 * distance_1, p.y + fruits_jump);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            if (p.y < this.monster_positionConvert.y && p.x < this.monster_positionConvert.x) {
                p1 = new Vec2(p.x + distance_1, p.y + Y + fruits_jump);
                p2 = new Vec2(p.x + 2 * distance_1, p.y + Y + fruits_jump);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            if (p.y < this.monster_positionConvert.y && p.x >= this.monster_positionConvert.x) {
                p1 = new Vec2(p.x - distance_1, p.y + fruits_jump + Y);
                p2 = new Vec2(p.x - 2 * distance_1, p.y + fruits_jump + Y);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            this.tweenBezier2DTo(this.node, 1, p1, p2, p3, () => {
                tween(this.node)
                    .to(0, { scale: new Vec3(0, 0, 0) })
                    .delay(2)
                    .call(() => {
                        tween(this.node)
                            .to(0.1, { worldPosition: new Vec3(this.startPosition.x, this.startPosition.y, 0) })
                            .call(() => {
                                this.node.emit('move origin position end');
                            })
                            .start();
                    })
                    .start();
            });
            tween(this.node)
                .to(1, { scale: new Vec3(0.5, 0.5, 0.5) })
                .call(() => {
                })
                .start();
            this.moving_origin_state = movingOriginState.nostate;
        }
        if (this.moving_origin_state == movingOriginState.movingOrigin) {
            this.movingOrigin();
        }
        if (this.moving_origin_state == movingOriginState.movingEND_true) {
            let Fruits_jump = 450;
            let p = this.node.getWorldPosition();
            let X = Math.abs(this.monster_positionConvert.x - p.x);
            let Y = Math.abs(this.monster_positionConvert.y - p.y);
            let distance = Math.sqrt(X * X + Y * Y);
            let distance_1 = distance / 3;
            let p1;
            let p2;
            let p3;
            if (p.y >= this.monster_positionConvert.y && p.x < this.monster_positionConvert.x) {
                p1 = new Vec2(p.x + distance_1, p.y + Fruits_jump);
                p2 = new Vec2(p.x + 2 * distance_1, p.y + Fruits_jump);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            if (p.y >= this.monster_positionConvert.y && p.x >= this.monster_positionConvert.x) {
                p1 = new Vec2(p.x - distance_1, p.y + Fruits_jump);
                p2 = new Vec2(p.x - 2 * distance_1, p.y + Fruits_jump);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            if (p.y < this.monster_positionConvert.y && p.x < this.monster_positionConvert.x) {
                p1 = new Vec2(p.x + distance_1, p.y + Y + Fruits_jump);
                p2 = new Vec2(p.x + 2 * distance_1, p.y + Y + Fruits_jump);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            if (p.y < this.monster_positionConvert.y && p.x >= this.monster_positionConvert.x) {
                p1 = new Vec2(p.x - distance_1, p.y + Fruits_jump + Y);
                p2 = new Vec2(p.x - 2 * distance_1, p.y + Fruits_jump + Y);
                p3 = new Vec2(this.monster_positionConvert.x, this.monster_positionConvert.y);
            }
            this.tweenBezier2DTo(this.node, 1, p1, p2, p3, () => {
                this.node.setWorldScale(0, 0, 0);
                tween(this.node)
                    .to(0.1, { worldPosition: new Vec3(this.startPosition.x, this.startPosition.y, 0) })
                    .start();
            });
            tween(this.node)
                .to(0.5, { scale: new Vec3(0.5, 0.5, 0.5) })
                .call(() => {
                })
                .start();
            this.moving_origin_state = movingOriginState.nostate;
        }
    }
    movingOrigin() {
        let fruits_jump = 450;
        let p = this.node.getWorldPosition();
        let X = Math.abs(this.startPosition.x - p.x);
        let Y = Math.abs(this.startPosition.y - p.y);
        let distance = Math.sqrt(X * X + Y * Y);
        let distance_1 = X / 3;
        let p1;
        let p2;
        let p3;
        if (p.y >= this.startPosition.y && p.x < this.startPosition.x) {
            p1 = new Vec2(p.x + distance_1, p.y + fruits_jump);
            p2 = new Vec2(p.x + 2 * distance_1, p.y + fruits_jump);
            p3 = new Vec2(this.startPosition.x, this.startPosition.y);
        }
        if (p.y >= this.startPosition.y && p.x >= this.startPosition.x) {
            p1 = new Vec2(p.x - distance_1, p.y + fruits_jump);
            p2 = new Vec2(p.x - 2 * distance_1, p.y + fruits_jump);
            p3 = new Vec2(this.startPosition.x, this.startPosition.y);
        }
        if (p.y < this.startPosition.y && p.x >= this.startPosition.x) {
            p1 = new Vec2(p.x - distance_1, p.y + fruits_jump + Y);
            p2 = new Vec2(p.x - 2 * distance_1, p.y + fruits_jump + Y);
            p3 = new Vec2(this.startPosition.x, this.startPosition.y);
        }
        if (p.y < this.startPosition.y && p.x < this.startPosition.x) {
            p1 = new Vec2(p.x + distance_1, p.y + fruits_jump + Y);
            p2 = new Vec2(p.x + 2 * distance_1, p.y + fruits_jump + Y);
            p3 = new Vec2(this.startPosition.x, this.startPosition.y);
        }
        this.tweenBezier2DTo(this.node, 0.5, p1, p2, p3, () => {
            this.toScale_Origin();
        });
        this.moving_origin_state = movingOriginState.nostate;
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
    toScale_Origin() {
        if (this.node.name == 'banana_fruits') {
            tween(this.node)
                .to(0.5, { scale: new Vec3(0.92, 0.92, 0.92) })
                .call(() => {
                    this.node.setScale(0, 0, 0);
                    this.node.emit('move origin position end');
                })
                .start();
        }
        if (this.node.name == 'apple_fruits') {
            tween(this.node)
                .to(0.5, { scale: new Vec3(0.5, 0.5, 0.5) })
                .call(() => {
                    this.node.setScale(0, 0, 0);
                    this.node.emit('move origin position end');
                })
                .start();
        }
        if (this.node.name == 'strawberry_fruits') {
            tween(this.node)
                .to(0.5, { scale: new Vec3(0.53, 0.53, 0.53) })
                .call(() => {
                    this.node.setScale(0, 0, 0);
                    this.node.emit('move origin position end');
                })
                .start();
        }
    }
    update(deltaTime: number) {

    }
}


