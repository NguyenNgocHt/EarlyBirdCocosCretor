import { _decorator, Component, Node, tween, Vec3, NodeSpace } from 'cc';
const { ccclass, property } = _decorator;
enum blockstate {
    nostate,
    block,
    open,
}
@ccclass('df2_direction_3la_controler')
export class df2_direction_3la_controler extends Component {
    @property(Node)
    private turnLeft: Node = null;
    @property(Node)
    private gostraight: Node = null;
    @property(Node)
    private turnRight: Node = null;
    @property(Node)
    private emitfromDirection: Node = null;
    private positionTo: Vec3 = new Vec3(0, 0, 0);
    private block_state: blockstate = blockstate.block;
    private positionPress: Vec3 = new Vec3(0, 0, 0);
    private nameButtonPress: string = " ";
    start() {
        this.emitfromDirection.on('3la falling', this.set_falling, this);
        this.emitfromDirection.on('mo khoa press button', this.openBlock, this);
        this.emitfromDirection.on('mo khoa press buttion_', this.openBlock, this);
        this.emitfromDirection.on('block press button', this.setBlockPressButton, this);
        let nodeParent = this.turnLeft.parent;
        let childs = nodeParent.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('press node', this.getNodePress, this);
        }
    }
    setBlockPressButton() {
        this.node.emit('block button');
    }
    getNodePress(nodePress: Node, blockstate: number) {
        this.positionPress = nodePress.getWorldPosition();
        this.nameButtonPress = nodePress.name;
        if (this.nameButtonPress == this.turnRight.name) {
            this.node.emit('correc');
        } else {
            this.node.emit('wrong');
            this.node.emit('block all', blockstate);
        }

    }
    openBlock() {
        this.block_state = blockstate.open;
        this.node.emit('mo khoa press bt', this.block_state);
    }
    set_falling(positionto: Vec3) {
        this.positionTo = positionto;
        tween(this.node)
            .to(1, { worldPosition: new Vec3(this.positionTo.x, this.positionTo.y, 0) })
            .start();
    }
    update(deltaTime: number) {

    }
}


