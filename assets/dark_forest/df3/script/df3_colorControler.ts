import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
enum buttonMoveState
{
    nostate,
    toleft,
    toright,
}
@ccclass('df3_colorControler')
export class df3_colorControler extends Component {
    @property({type: Node})
    private emitfromBangroi: Node = null;
    @property({type: Node})
    private toleft: Node = null;
    @property({type: Node})
    private toRight: Node = null;
    @property({type: Node})
    private yellow: Node = null;
    @property({type: Node})
    private violet: Node = null;
    @property({type: Node})
    private green: Node = null;
    @property({type: Node})
    private orange: Node = null;
    @property({type: Node})
    private blue: Node = null;
    @property({type: Node})
    private brown: Node = null;
    @property({type: Node})
    private pink: Node = null;
    @property({type: Node})
    private black: Node = null;
    @property({type: Node})
    private white: Node = null;
    @property({type: Node})
    private grey: Node = null;
    @property({type: Node})
    private red: Node = null;
    private buttonmoveState = buttonMoveState.nostate;
    private countToleft: number = 0;
    private counttoFight: number = 0;
    start() {
        this.toleft.on(Node.EventType.TOUCH_START, this.buttonmovetoleft, this);
        this.toRight.on(Node.EventType.TOUCH_START, this.buttonMovetoRight, this);
    }
    buttonmovetoleft()
    {
        let p = this.red.getWorldPosition();
        if(p.x <  2261)
        {
            this.buttonmoveState = buttonMoveState.toleft;
            this.node.emit('to move', this.buttonmoveState);   
        }
    }
    buttonMovetoRight()
    {
        let p = this.pink.getWorldPosition();
        if(p.x >  563)
        {
            this.buttonmoveState = buttonMoveState.toright;
            this.node.emit('to move', this.buttonmoveState);
        }
    }
    update(deltaTime: number) {
        
    }
}


