import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
enum buttonMoveState {
    nostate,
    toleft,
    toright,
}
@ccclass('df3_buttonColorMove')
export class df3_buttonColorMove extends Component {
    @property({ type: Node })
    private emitfromColorControler: Node = null;
    private buttonMoveState = buttonMoveState.nostate;
    private speed: number = 3;
    private dx: number = 0;
    private dy: number = 0;
    private countMove: number = 0;
    private buttonLeftPosition: Vec3 = new Vec3(0, 0, 0);
    private buttonRightPosition: Vec3 = new Vec3(0, 0, 0);
    start() {
        this.emitfromColorControler.on('to move', this.buttonMoveSeting, this);
    }
    buttonMoveSeting(state: number) {
        if (state == buttonMoveState.toleft) {
            this.buttonMoveState = buttonMoveState.toright;
        }
        if (state == buttonMoveState.toright) {
            this.buttonMoveState = buttonMoveState.toleft;
        }
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.speed * this.dx, p.y + this.speed * this.dy);
        if (this.buttonMoveState == buttonMoveState.toleft) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.movetoleft(this.node.worldPosition);
        }
        if (this.buttonMoveState == buttonMoveState.toright) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.movetoRight(this.node.worldPosition);
        }
    }
    movetoleft(position: Vec3) {
        this.countMove = this.countMove + 1;
        if (this.countMove <= 50) {
            this.dx = -1;
        }
        else {
            this.dx = 0;
            this.countMove = 0;
            this.buttonMoveState = buttonMoveState.nostate;
        }
    }
    movetoRight(position: Vec3) {
        this.countMove = this.countMove + 1;
        if (this.countMove <= 50) {
            this.dx = 1;
        }
        else {
            this.dx = 0;
            this.countMove = 0;
            this.buttonMoveState = buttonMoveState.nostate;
        }
    }
}


