import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
enum blockstate {
    nostate,
    block,
    open,
}
@ccclass('df2_direction_getButtonPosition')
export class df2_direction_getButtonPosition extends Component {
    @property(Node)
    private emitfrom3la: Node = null;
    block_state: blockstate = blockstate.nostate;
    start() {
        this.emitfrom3la.on('mo khoa press bt', this.setOpenButton, this);
        this.emitfrom3la.on('block all', this.setBlock_all, this);
        this.emitfrom3la.on('block button', this.blockButton, this);
        this.node.on(Node.EventType.TOUCH_START, this.getStartPosition, this);
    }
    blockButton() {
        this.block_state = blockstate.block;
    }
    setBlock_all(state: number) {
        if (state == blockstate.block) {
            this.block_state = blockstate.block;
        }
    }
    setOpenButton(state: number) {
        if (state == blockstate.open) {
            this.block_state = blockstate.open;
        }
    }
    getStartPosition() {
        if (this.block_state == blockstate.open) {
            this.block_state = blockstate.block;
            this.node.emit('press node', this.node, this.block_state);
        }
    }
    update(deltaTime: number) {

    }
}


