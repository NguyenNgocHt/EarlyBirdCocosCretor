import { _decorator, Component, Node, EventTouch, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
enum STATELOOK_CLICK
{
    NOLOCK,
    LOCK,
    OPEN,
}
@ccclass('clickPosition')
export class clickPosition extends Component {
    private stateLock: STATELOOK_CLICK = STATELOOK_CLICK.NOLOCK;
    private startPosition:Vec3 = new Vec3(0,0,0);
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.getpositionTouch, this);
    }
    getpositionTouch()
    {
        let p = this.node.getWorldPosition();
        this.startPosition = p;
        this.node.emit('click position', this.node);
    }

    update(deltaTime: number) {
        
    }
}


