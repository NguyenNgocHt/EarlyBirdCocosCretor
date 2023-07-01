import { _decorator, Component, Node, tween, Vec3, math } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { audioContro } from '../../df4/script/audioContro';
const { ccclass, property } = _decorator;

@ccclass('fireworks_moving')
export class fireworks_moving extends Component {
    @property(audioContro)
    public fireworks_fly_up: audioContro = null;
    @property(Node)
    public emit_from_init_prefab_phao_hoa: Node = null;
    start() {
        this.emit_from_init_prefab_phao_hoa.on('fireWorks moving', this.node_fly_up, this);
    }
    node_fly_up() {
        console.log('nhan emit tu init prefab');
        let p = this.node.getWorldPosition();
        tween(this.node)
            .delay(0.1)
            .call(() => {
                if (this.node.getSiblingIndex() < 20) {
                    this.fireworks_fly_up.play();
                    tween(this.node)
                        .to(this.random_time_flyup(), { worldPosition: new Vec3(p.x, p.y + 800, 0) })
                        .call(() => {
                            this.node.emit('state change fireworks bang', this.node.getSiblingIndex());
                        })
                        .start();
                }
            })
            .delay(1.5)
            .call(() => {
                if (this.node.getSiblingIndex() >= 20 && this.node.getSiblingIndex() < 40) {
                    this.fireworks_fly_up.play();
                    tween(this.node)
                        .to(this.random_time_flyup(), { worldPosition: new Vec3(p.x, p.y + 1000, 0) })
                        .call(() => {
                            this.node.emit('state change fireworks bang', this.node.getSiblingIndex());
                        })
                        .start();
                }
            })
            .delay(1.5)
            .call(() => {
                if (this.node.getSiblingIndex() >= 40 && this.node.getSiblingIndex() < 60) {
                    this.fireworks_fly_up.play();
                    tween(this.node)
                        .to(this.random_time_flyup(), { worldPosition: new Vec3(p.x, p.y + 1200, 0) })
                        .call(() => {
                            this.node.emit('state change fireworks bang', this.node.getSiblingIndex());
                        })
                        .start();
                }
            })
            .start();



    }
    random_time_flyup(): number {
        let random_time = (Math.floor(Math.random() * 10) + 1) / 10;
        return random_time;
    }
    update(deltaTime: number) {

    }
}


