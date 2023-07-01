import { _decorator, Component, Node, tween, Vec3, Sprite, SpriteFrame } from 'cc';
import { BundleManager } from '../../../boot/BundleManager';
import { AssetManager } from 'cc';
const { ccclass, property } = _decorator;
enum CharFlyState {
    nostate,
    fly,
    stop,
}
@ccclass('df1_charFly')
export class df1_charFly extends Component {
    NUMBER_LIST = [0, 1, 2, 3, 4, 5];
    CHAR_LIST = ["T", "I", "G", "E", "R"];
    @property(Node)
    private emitfromNAM: Node = null;
    private charflystate: CharFlyState = CharFlyState.nostate;
    private positionOrigin: Vec3 = new Vec3(0, 0, 0);
    CHAR_NEW: string[];
    start() {
        this.emitfromNAM.on('char_flying', this.char_flying, this);
        this.emitfromNAM.on('set new char_position', this.set_Char_position, this);
        this.emitfromNAM.on('char_new_seting', this.set_char_new, this);
    }
    set_char_new(char_new: string) {
        let images_sounce = 'df1/art/mushroom/';
        let sprite_frame = images_sounce.concat(char_new) + '/spriteFrame';
        let sprite_mushroom = this.node.getComponent(Sprite);
        BundleManager.instance().loadBundle('dark_forest', (err: number, bundle: AssetManager.Bundle) => {
            if (err == 0) { // OK
                bundle.load(sprite_frame, SpriteFrame, (Err, spriteFrame) => {
                    if (Err) {
                        console.error(`Failed to load sprite frame: ${Err}`);
                        return;
                    }
                    sprite_mushroom.spriteFrame = spriteFrame;
                    let p = this.node.getWorldPosition();
                    this.node.setScale(1, 1, 1);
                });
            }
        });
    }
    char_flying(state: number, position: Vec3) {
        this.positionOrigin = new Vec3(position.x, position.y, 0);
        if (state == CharFlyState.fly) {
            this.charflystate = CharFlyState.fly;
            this.flyingStart();
        }
    }
    set_Char_position(position: Vec3) {
        this.node.setWorldPosition(position.x, position.y, 0);
        let sprite_char = this.node.getComponent(Sprite);
        sprite_char.spriteFrame = null;
    }
    flyingStart() {
        if (this.charflystate == CharFlyState.fly) {
            tween(this.node)
                .to(1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 10, 0) })
                .to(0.1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 80, 0) })
                .to(1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 90, 0) })
                .to(0.5, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 300, 0) })
                .to(1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 500, 0) })
                .call(() => {
                    this.scale_char();
                })
                .start();
        }
    }
    scale_char() {
        tween(this.node)
            .to(0.5, { scale: new Vec3(1, 1, 1) })
            .to(0.5, { scale: new Vec3(0.9, 0.9, 0.9) })
            .union()
            .repeat(2)
            .call(() => {
                tween(this.node)
                    .to(0.5, { scale: new Vec3(1.5, 1.5, 1.5) })
                    .to(1, { scale: new Vec3(0, 0, 0) })
                    .start();
            })
            .start();
    }
    update(deltaTime: number) {
    }
}


