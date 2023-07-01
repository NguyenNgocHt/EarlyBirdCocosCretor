import { _decorator, Component, Node, log, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('home_nodeMoving')
export class home_nodeMoving extends Component {
    @property({ type: Node })
    private emitfrom_menuContro: Node = null;
    private _startPosition: Vec3 = new Vec3(0, 0, 0);
    private startingPosiiton: Vec3 = new Vec3(0, 0, 0);
    private ENDPosiiton: Vec3 = new Vec3(0, 0, 0);
    private cancelPosition: Vec3 = new Vec3(0, 0, 0);
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.setStatePositionStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.setStatePositionEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.setstatePositionCancel, this);
    }
    setstatePositionCancel() {
        let p = this.node.getPosition();
        this._startPosition = new Vec3(p.x, p.y, 0);
        this.node.emit('i-am-cancel-positon', this._startPosition);
    }
    setStatePositionStart() {
        let p = this.node.getPosition();
        this._startPosition = new Vec3(p.x, p.y, 0);
        this.node.emit('i-am-start-positon', this._startPosition);
    }
    setStatePositionEnd() {
        let p = this.node.getPosition();
        this._startPosition = new Vec3(p.x, p.y, 0);
        this.node.emit('i-am-end-positon', this._startPosition);

    }
    update(deltaTime: number) {

    }
}


