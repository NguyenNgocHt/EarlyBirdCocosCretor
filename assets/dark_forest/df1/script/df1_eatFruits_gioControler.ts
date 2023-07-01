import { _decorator, Component, Node, tween, Vec2, Vec3, Sprite, Canvas, game } from 'cc';
const { ccclass, property } = _decorator;
enum controState {
    nostate,
    open,
    block,
}
@ccclass('df1_eatFruits_gioControler')
export class df1_eatFruits_gioControler extends Component {
    @property(Node)
    private emitfromEat_Fruits_main: Node = null;
    @property(Node)
    private fruits: Node = null;
    private contro_state: controState = controState.nostate;
    private startPosition: Vec3 = new Vec3(0, 0, 0);
    private movingPosition: Vec3 = new Vec3(0, 0, 0);
    private endPosition: Vec3 = new Vec3(0, 0, 0);
    private indexNumber_start: number = 0;
    onLoad() {
        this.indexNumber_start = this.node.getSiblingIndex();
    }
    start() {
        this.emitfromEat_Fruits_main.on('block_fruits_moving', this.block_fruits_moving, this);
        this.emitfromEat_Fruits_main.on('mo khoa gio hoa qua', this.set_OpenBlock, this);
        this.emitfromEat_Fruits_main.on('open block state fruits', this.open_block, this);
        this.node.on(Node.EventType.TOUCH_START, this.setStartPosition, this);
        this.fruits.on('i am start position', this.getStartPosition, this);
        this.fruits.on('i am end', this.getEndPosition, this);
        this.fruits.on('move origin position end', this.set_touchEND, this);
    }
    open_block() {
        this.contro_state = controState.open;
    }
    block_fruits_moving() {
        this.node.emit('block_moving_fruits');
        this.contro_state = controState.block;
    }
    set_touchEND() {
        this.node.emit('open_block_fruits_state');
        this.node.setSiblingIndex(this.indexNumber_start);
    }
    getStartPosition(startNode: Node) {
        this.startPosition = startNode.getWorldPosition();
        this.node.setSiblingIndex(6);
    }
    getEndPosition(endNode: Node) {
        this.movingPosition = endNode.getWorldPosition();
        this.node.emit('end node', endNode);
    }
    set_OpenBlock() {
        this.contro_state = controState.open;
    }
    setStartPosition() {
        if (this.contro_state == controState.open) {
            this.node.emit('start node', this.node);
            tween(this.fruits)
                .to(0.1, { scale: new Vec3(1, 1, 1) })
                .call(() => {
                    this.node.emit('mo khoa di chuyen hoa qua bang touch move');
                })
                .start();
        }
    }



    update(deltaTime: number) {

    }
}


