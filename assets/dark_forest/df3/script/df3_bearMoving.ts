import { _decorator, Component, Node, Vec3, bezier, ITweenOption, tween, Vec2, EventTouch } from 'cc';
const { ccclass, property } = _decorator;
enum bearMovingState {
    nostate,
    tien,
    lui,
    moving,
};
enum mouseStateforBear {
    nostate,
    start,
    stop,
}
@ccclass('df3_bearMoving')
export class df3_bearMoving extends Component {
    @property({ type: Node })
    private emitfromMainHunghinh: Node = null;
    @property({ type: Node })
    private Gio: Node = null;
    @property({ type: Node })
    private Bag: Node = null;
    @property({ type: Node })
    private gio1: Node = null;
    @property({ type: Node })
    private gio2: Node = null;
    private bearmovingstate: bearMovingState = bearMovingState.nostate;
    private bearmovingstateEND: bearMovingState = bearMovingState.nostate;
    private mousestate_bear: mouseStateforBear = mouseStateforBear.nostate;
    private movingSpeed: number = 3;
    private dx: number = 0;
    private dy: number = 0;
    private bearStartposition: Vec3 = new Vec3(0, 0, 0);
    onLoad() {
        this.bearStartposition = this.node.getWorldPosition();
    }
    start() {
        this.emitfromMainHunghinh.on('bear moving', this.bearmovingSeting, this);
        this.emitfromMainHunghinh.on('nha trang thai cua bear', this.setMouseState_Bear, this);
        this.emitfromMainHunghinh.on('bear moving to start position', this.setBearMovingto_startPosition, this);
        this.node.on(Node.EventType.TOUCH_START, this.touchStart_Bear, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove_Bear, this);
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd_Bear, this);
    }
    setBearMovingto_startPosition() {
        this.node.setWorldPosition(this.bearStartposition.x, this.bearStartposition.y, 0);
    }
    setMouseState_Bear(state: number) {
        if (state == mouseStateforBear.start) {
            this.mousestate_bear = mouseStateforBear.start;
        }
    }
    touchStart_Bear() {
        if (this.mousestate_bear == mouseStateforBear.start) {
            this.node.emit('GIO node', this.Bag);
        }
    }
    touchMove_Bear(event: EventTouch) {
        if (this.mousestate_bear == mouseStateforBear.start) {
            let p = event.getUILocation();
            this.node.setWorldPosition(p.x - 10, p.y - 150, 0);
            this.node.emit('i am moving', this.node);
        }
    }
    touchEnd_Bear() {

    }
    bearmovingSeting(state: number, p_bear: Vec3, p_origin: Vec3) {
        if (state == bearMovingState.tien) {
            this.bearmovingstate = bearMovingState.tien;
            this.Gio.active = false;
        }
        if (state == bearMovingState.moving) {
            this.bearmovingstate = bearMovingState.moving;
            this.bearmoving(p_origin);
            tween(this.gio1)
                .to(0.25, { scale: new Vec3(0, 0, 0) })
                .start();
            tween(this.gio2)
                .to(0.25, { scale: new Vec3(0, 0, 0) })
                .start();
        }
    }
    bearmoving(p_origin: Vec3) {
        tween(this.node)
            .to(1, { position: new Vec3(p_origin.x, p_origin.y, 0) })
            .call(() => {
                this.emit_moving_end();
            })
            .start();
    }
    emit_moving_end() {
        this.bearmovingstateEND = bearMovingState.moving;
        this.node.emit('bear moving ok', this.bearmovingstateEND);
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.movingSpeed * this.dx, p.y + this.movingSpeed * this.dy, 0);
        if (this.bearmovingstate == bearMovingState.tien) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.bearTienStart(this.node.worldPosition);
        }
    }
    bearTienStart(position: Vec3) {
        if (position.x > 1400) {
            this.dx = -1;
        }
        else {
            this.dx = 0;
            this.bearmovingstate = bearMovingState.nostate;
            this.bearmovingstateEND = bearMovingState.tien;
            this.node.emit('bear moving ok', this.bearmovingstateEND);
        }
    }
}


