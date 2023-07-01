import { _decorator, Component, Node, Prefab, Vec3, instantiate, ParticleSystem, ParticleSystem2D, color } from 'cc';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
import { fireworks_moving } from '../../effect_fireworks/scrip/fireworks_moving';
import { AudioManager } from '../../../loading/script/AudioManager';
import { audioContro } from '../../df4/script/audioContro';
const { ccclass, property } = _decorator;
enum BlockType {
    BT_NONE,
    BT_STONE,
};
@ccclass('df1_init_prefab_phao_hoa')
export class df1_init_prefab_phao_hoa extends Component {
    @property(Node)
    private emitform_gate_manager: Node = null;
    @property(Prefab)
    private phaohoa_prefab: Prefab = null;
    @property(audioContro)
    private fireworks_bang: audioContro = null;
    @property(audioContro)
    private fireworks_fly_up: audioContro = null;
    BUFFTER_FLY_ARR: number[];
    MOVING_POSITION_LIST: Vec3[];
    arrayNodeLenth: number = 60;
    random_position_X: number = 0;
    random_position_Y: number = 0;
    private random_scale: number = 0;
    private random_red: number = 0;
    private random_green: number = 0;
    private random_blue: number = 0;
    onLoad() {
    }
    start() {
        this.init_prefab();
        this.scheduleOnce(function () {
            this.emit_to_node_fly_up();
        }, 0.1);
        let childs = this.node.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('state change fireworks bang', this.set_state_change_node, this);
        }
    }
    init_prefab() {
        this.node.removeAllChildren();
        if (!this.BUFFTER_FLY_ARR) {
            this.BUFFTER_FLY_ARR = [];
        }
        this.BUFFTER_FLY_ARR.push(BlockType.BT_NONE);
        for (let i = 0; i < this.arrayNodeLenth; i++) {
            this.BUFFTER_FLY_ARR.push(BlockType.BT_STONE);
        }
        for (let j = 0; j < this.BUFFTER_FLY_ARR.length; j++) {
            let block: Node = this.spawnBlockByType(this.BUFFTER_FLY_ARR[j]);
            if (block) {
                this.random_position_X = Math.floor(Math.random() * 1500) + 700;
                this.random_position_Y = Math.floor(Math.random() * -500) + -100;
                this.node.addChild(block);
                block.setWorldPosition(this.random_position_X, this.random_position_Y, 0);
                this.random_scale = (Math.floor(Math.random() * 5) + 1) / 10;
                block.setScale(this.random_scale, this.random_scale, this.random_scale);
                block.addComponent(fireworks_moving);
                let fire_works_moving = block.getComponent(fireworks_moving);
                fire_works_moving.emit_from_init_prefab_phao_hoa = this.node;
                fire_works_moving.fireworks_fly_up = this.fireworks_fly_up;
                let confetti = block.getChildByName('confetti');
                let sprite_phao_hoa = block.getChildByName('sprite_phao');
                let confetti_2 = block.getChildByName('confetti_2');
                let confetti_3 = block.getChildByName('confetti_3');
                let confetti_4 = block.getChildByName('confetti_4');
                confetti.active = false;
                confetti_2.active = false;
                confetti_3.active = false;
                confetti_4.active = false;
                sprite_phao_hoa.active = true;
            }
        }
    }
    set_state_change_node(index_for_node: number) {
        let childs = this.node.children;
        for (let i = 0; i < childs.length; i++) {
            if (i == index_for_node) {
                this.random_red = Math.floor(Math.random() * 255) + 1;
                this.random_green = Math.floor(Math.random() * 255) + 1;
                this.random_blue = Math.floor(Math.random() * 255) + 1;
                let confetti_4 = childs[i].getChildByName('confetti_4');
                let confetti_3 = childs[i].getChildByName('confetti_3');
                let confetti_2 = childs[i].getChildByName('confetti_2');
                let confetti = childs[i].getChildByName('confetti');
                let sprite_phao_hoa = childs[i].getChildByName('sprite_phao');
                sprite_phao_hoa.active = false;
                confetti.active = true;
                confetti_2.active = true;
                confetti_3.active = true;
                confetti_4.active = true;
                let start_color = confetti.getComponent(ParticleSystem2D);
                let start_color_2 = confetti_2.getComponent(ParticleSystem2D);
                let start_color_3 = confetti_2.getComponent(ParticleSystem2D);
                let start_color_4 = confetti_2.getComponent(ParticleSystem2D);
                start_color.startColor = color(this.random_red, this.random_green, this.random_blue, 255);
                start_color.endColor = color(this.random_red + 1, this.random_green + 1, this.random_blue + 1, 255);
                start_color_2.startColor = color(this.random_red, this.random_green, this.random_blue, 255);
                start_color_2.endColor = color(this.random_red + 1, this.random_green + 1, this.random_blue + 1, 255);
                start_color_3.startColor = color(this.random_red, this.random_green, this.random_blue, 255);
                start_color_3.endColor = color(this.random_red + 1, this.random_green + 1, this.random_blue + 1, 255);
                start_color_4.startColor = color(this.random_red, this.random_green, this.random_blue, 255);
                start_color_4.endColor = color(this.random_red + 1, this.random_green + 1, this.random_blue + 1, 255);
                this.fireworks_bang.play();
            }
        }
    }
    emit_to_node_fly_up() {
        this.node.emit('fireWorks moving');
    }
    spawnBlockByType(type: BlockType) {
        if (!this.phaohoa_prefab) {
            return null;
        }
        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                {
                    block = instantiate(this.phaohoa_prefab);
                    break;
                }
        }
        return block;
    }
    update(deltaTime: number) {
    }
}


