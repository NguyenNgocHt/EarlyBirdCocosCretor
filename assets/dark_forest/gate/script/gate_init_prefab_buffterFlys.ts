import { _decorator, Component, Node, Prefab, Vec3, instantiate } from 'cc';
import { gate_buffterFly_spine } from './gate_buffterFly_spine';
const { ccclass, property } = _decorator;
enum BlockType {
    BT_NONE,
    BT_STONE,
};
@ccclass('gate_init_prefab_buffterFlys')
export class gate_init_prefab_buffterFlys extends Component {
    @property(Node)
    private emitform_gate_manager: Node = null;
    @property(Prefab)
    private buffterFly_prefab: Prefab = null;
    BUFFTER_FLY_ARR: number[];
    MOVING_POSITION_LIST: Vec3[];
    arrayNodeLenth: number = 10;
    random_position_X: number = 0;
    random_position_Y: number = 0;
    onLoad() {
        this.init_prefab();
    }
    start() {
        let childs = this.node.children;
        this.emitform_gate_manager.on('moving_position_buffter_fly_list', this.get_bufferfly_position_list, this);
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('loop moving start', this.emit_to_df1_main, this);
        }
    }
    get_bufferfly_position_list(position_list: Vec3[]) {
        if (!this.MOVING_POSITION_LIST) {
            this.MOVING_POSITION_LIST = [];
        }
        this.MOVING_POSITION_LIST = position_list;
        console.log('position list', this.MOVING_POSITION_LIST);
    }
    emit_to_df1_main(next_position: Vec3, next_number: number) {
        this.node.emit('moving start', next_position, next_number);
    }
    init_prefab() {
        this.node.removeAllChildren();
        if (!this.BUFFTER_FLY_ARR) {
            this.BUFFTER_FLY_ARR = [];
        }
        this.BUFFTER_FLY_ARR.push(BlockType.BT_NONE);
        for (let i = 0; i <= this.arrayNodeLenth; i++) {
            this.BUFFTER_FLY_ARR.push(BlockType.BT_STONE);
        }
        for (let j = 0; j <= this.arrayNodeLenth + 1; j++) {
            let block: Node = this.spawnBlockByType(this.BUFFTER_FLY_ARR[j]);
            if (block) {
                this.random_position_X = Math.floor(Math.random() * 2500) + 1;
                this.random_position_Y = Math.floor(Math.random() * 1000) + 1;
                this.node.addChild(block);
                block.setWorldPosition(this.random_position_X, this.random_position_Y, 0);
                block.setScale(1, 1, 1);
                block.addComponent(gate_buffterFly_spine);
                let buffter_fly_moving = block.getComponent(gate_buffterFly_spine);
                buffter_fly_moving.emitfom_gate_main = this.emitform_gate_manager;
                buffter_fly_moving.emitfrom_buffterfly = this.node;
            }
        }
    }
    spawnBlockByType(type: BlockType) {
        if (!this.buffterFly_prefab) {
            return null;
        }
        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                {
                    block = instantiate(this.buffterFly_prefab);
                    break;
                }
        }
        return block;

    }
    update(deltaTime: number) {

    }
}


