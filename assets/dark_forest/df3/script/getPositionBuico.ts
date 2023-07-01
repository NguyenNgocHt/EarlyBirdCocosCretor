import { _decorator, Component, Node, EventTouch, log, Vec3 } from 'cc';
import { df3_displayAnswer } from './df3_displayAnswer';
const { ccclass, property } = _decorator;

@ccclass('getPositionBuico')
export class getPositionBuico extends Component {
    @property({ type: Node })
    private emitfromDisplayAnswer: Node = null;
    private startPosition: Vec3 = new Vec3(0, 0, 0);
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.getpositionTouch, this);
    }
    getpositionTouch() {
        let p = this.node.getWorldPosition();
        this.startPosition = p;
        this.node.emit('click position', this.node);
    }

    update(deltaTime: number) {

    }
}


