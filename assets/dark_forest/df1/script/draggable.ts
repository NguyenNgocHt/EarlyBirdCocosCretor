import { AssetManager } from 'cc';
import { _decorator, Component, Node, Vec3, bezier, ITweenOption, tween, Vec2, math, PHYSICS_2D_PTM_RATIO, EventTouch, Label, Sprite, resources, SpriteFrame, assetManager } from 'cc';
import { BundleManager } from '../../../boot/BundleManager';
import { indexDf1 } from './indexDf1';
const { ccclass, property } = _decorator;
enum CharFlyState {
    nostate,
    fly,
    stop,
}
enum mushroomState {
    nostate,
    walk,
    jump,
    jump2,
}
enum block_moving {
    nostate,
    block,
    open,
}
enum questionState {
    nostate,
    bird,
    tiger,
    cat,
}
@ccclass('draggable')
export class draggable extends Component {
    @property(Node)
    indexDf1: Node = null!;
    @property(Label)
    private char_bird: Label = null;
    @property(Node)
    private Char: Node = null;
    @property(Node)
    private namSpine: Node = null;
    private positionEND: Vec3 = new Vec3(0, 0, 0);
    private fallingPosition: Vec3 = new Vec3(0, 0, 0);
    private startPosition: Vec3 = new Vec3(0, 0, 0);
    private endPosition: Vec3 = new Vec3(0, 0, 0);
    private charflystate: CharFlyState = CharFlyState.nostate;
    private mushroomSpine: mushroomState = mushroomState.nostate;
    private blockMoving: block_moving = block_moving.open;
    private question_state: questionState = questionState.nostate;
    private nameFalling: string = " ";
    private arr_position: Vec3[];
    private arr_bird: string[];
    private onUpdate_Position: Vec3 = new Vec3(0, 0, 0);
    private name_node: string = " ";
    movingENDPosition: Vec3 = new Vec3(0, 0, 0);
    private char_new: string = '';
    onLoad() {
        this.name_node = this.node.name;
        this.question_state = questionState.bird;
    }
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.indexDf1.on('position end', this.swapPositionEnd, this);
        this.indexDf1.on('emit node moving position', this.setfalling, this);
        this.indexDf1.on('falling start', this.falling, this);
        this.indexDf1.on('char fly', this.emit_CharFly, this);
        this.indexDf1.on('start updtate all position', this.updateAllPosition, this);
        this.indexDf1.on('show char', this.set_question, this);
        this.indexDf1.on('char_new_TIGER', this.set_char_new_tiger, this);
        this.indexDf1.on('char_new_CAT', this.set_char_new_cat, this);
        this.indexDf1.on('mushroom_chuyen_sprite_frame', this.emit_setMusroom_state, this);
        this.indexDf1.on('moving position origin_mushroom', this.emit_to_mushroom_spine_moving_origin, this);
        this.namSpine.on('spine state end', this.setSpineMushroom, this);
        this.namSpine.on('set lai trang thai sprite frame cua mushroom', this.emit_setMusroom_state, this);
        this.namSpine.on('set sprite frame mushroom', this.emit_set_sprite_frame, this);
        this.namSpine.on('bird moving to position origin', this.emit_to_bird_moving_position_origin, this);
        this.node.on('position update', this.getpositionUpdate, this);
        this.indexDf1.on('khoa trang thai di chuyen mushroom', this.block_moving_state_mushroom, this);
    }
    block_moving_state_mushroom() {
        this.blockMoving = block_moving.block;
        let sprite_mushroom = this.node.getComponent(Sprite);
        tween(this.node)
            .delay(2.5)
            .call(() => {
                this.blockMoving = block_moving.open;
            })
            .start();
    }
    emit_to_bird_moving_position_origin() {
        this.node.emit('emit_to_df1_mushroom_manager_bird_moving_position_origin');
    }
    emit_to_mushroom_spine_moving_origin(position_origin: Vec3) {
        this.node.emit('mushroom_moving_position_origin', position_origin);
    }
    emit_set_sprite_frame(name_spineNam: string) {
        this.node.emit('set_sprite_frame');
        let p = this.node.getWorldPosition();
        if (p.x <= 800) {
            this.node.destroy();
        }
        if (p.x >= 1950) {
            this.node.destroy();
        }
    }
    set_question(state: number) {
        if (state == questionState.tiger) {
            this.question_state = questionState.tiger;
            this.node.emit('emit question state', this.question_state);
            this.blockMoving = block_moving.open;
        }
        if (state == questionState.cat) {
            this.question_state = questionState.cat;
            this.node.emit('emit question state', this.question_state);
            this.blockMoving = block_moving.open;
        }
    }
    set_char_new_tiger(arr_char_new: string[]) {
        if (this.node.name == 'mushroom_1') {
            this.char_new = arr_char_new[0];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
        }
        if (this.node.name == 'mushroom_2') {
            this.char_new = arr_char_new[1];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
        }
        if (this.node.name == 'mushroom_3') {
            this.char_new = arr_char_new[2];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
        }
        if (this.node.name == 'mushroom_4') {
            this.char_new = arr_char_new[3];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
        }
        if (this.node.name == 'mushroom_5') {
            this.char_new = arr_char_new[4];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
        }
    }
    set_char_new_cat(arr_char_new: string[]) {
        let P = this.node.getWorldPosition();
        if (P.x == 1062) {
            this.char_new = arr_char_new[0];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
            this.node.emit('name node starting', this.node.name, this.node.getWorldPosition());
        }
        if (P.x == 1362) {
            this.char_new = arr_char_new[1];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
            this.node.emit('name node starting', this.node.name, this.node.getWorldPosition());
        }
        if (P.x == 1662) {
            this.char_new = arr_char_new[2];
            this.char_bird.string = this.char_new;
            this.node.emit('char_new_seting', this.char_new);
            this.node.emit('name node starting', this.node.name, this.node.getWorldPosition());
        }
    }
    emit_setMusroom_state() {
        this.node.emit('bong state on', this.node.name);
        let images_sounce = 'df1/art/images/';
        let sprite_frame = images_sounce.concat(this.name_node) + '/spriteFrame';
        let sprite_mushroom = this.node.getComponent(Sprite);
        BundleManager.instance().loadBundle('dark_forest', (err: number, bundle: AssetManager.Bundle) => {
            if (err == 0) { // OK
                bundle.load(sprite_frame, SpriteFrame, (Err, spriteFrame) => {
                    if (Err) {
                        console.error(`Failed to load sprite frame: ${Err}`);
                        return;
                    }
                    sprite_mushroom.spriteFrame = spriteFrame;
                    this.namSpine.setScale(0, 0, 0);
                    let p = this.node.getWorldPosition();
                    if (this.question_state == questionState.bird) {
                        this.node.emit('set new char_position', p);
                    }
                    if (this.question_state == questionState.tiger) {
                        this.node.emit('set new char_position', p);
                    }
                });
            }
        });
    }
    getpositionUpdate(position: Vec3) {
        this.node.emit('emit update position update', position, this.node.name);
    }
    setSpineMushroom(state: number) {
        if (state == mushroomState.jump) {
            this.mushroomSpine = mushroomState.jump2;
            this.emit_to_mushroom_spine();
        }
        if (this.question_state == questionState.bird) {
            if (state == mushroomState.jump2) {
                this.node.emit('mushroom moving', this.node.getWorldPosition());
                let p = this.node.getWorldPosition();
                tween(this.node)
                    .to(2, { worldPosition: new Vec3(p.x - 200, p.y, 0) })
                    .call(() => {
                    })
                    .start();
            }
        }
        if (this.question_state == questionState.tiger) {
        }

    }
    onTouchMove(event: EventTouch) {
        if (this.blockMoving == block_moving.open) {
            let e = event.getUILocation();
            this.node.setWorldPosition(e.x, e.y - 150, 0);
            this.node.emit('i am moving', this.node);
        }

    }
    onTouchStart(event: any) {
        this.node.emit('check-fruit-start-position', this.node);
        this.node.emit('i-started', this.node);
    }
    onTouchEnd(event: any) {
        this.node.emit('i-stopped', this.node);
        this.node.emit('check-fruit-stop-position', this.node);
        this.node.emit('node moving position');
    }
    setfalling(movingENDPosition: Vec3, nameNodefalling: string, distance: number, arr_Position: Vec3[]) {
        this.nameFalling = nameNodefalling;
        this.movingENDPosition = movingENDPosition;
        if (this.question_state == questionState.bird) {
            this.arr_position = arr_Position;
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@ bird position', this.arr_position);
            this.set_question_state_bird();
        }
        if (this.question_state == questionState.tiger) {
            this.arr_position = arr_Position;
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@ tiger position', this.arr_position);
            this.set_question_state_tiger();
        }
        if (this.question_state == questionState.cat) {
            if (this.arr_position) {
                this.arr_position = [];
            }
            this.arr_position = arr_Position;
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@ cat_position ', this.arr_position);
            this.set_question_state_cat();
        }
    }
    set_question_state_bird() {
        if (this.startPosition.x > this.endPosition.x) {
            if (this.movingENDPosition.x >= this.arr_position[1].x && this.movingENDPosition.x < this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[2].x, this.arr_position[2].y, 0);
                let number = 2;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.movingENDPosition.x >= this.arr_position[0].x && this.movingENDPosition.x < this.arr_position[1].x) {
                this.fallingPosition = new Vec3(this.arr_position[1].x, this.arr_position[1].y, 0);
                let number = 1;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.movingENDPosition.x >= 0 && this.movingENDPosition.x < this.arr_position[0].x) {
                this.fallingPosition = new Vec3(this.arr_position[0].x, this.arr_position[0].y, 0);
                let number = 0;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x > this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[3].x, this.arr_position[3].y, 0);
                let number = 3;
                this.node.emit('falling node', this.fallingPosition, number);
            }
        }
        if (this.startPosition.x < this.endPosition.x) {
            if (this.endPosition.x >= this.arr_position[1].x && this.endPosition.x < this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[1].x, this.arr_position[1].y, 0);
                let number = 1;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[2].x && this.endPosition.x < this.arr_position[3].x) {
                this.fallingPosition = new Vec3(this.arr_position[2].x, this.arr_position[2].y, 0);
                let number = 2;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[3].x && this.endPosition.x < 3000) {
                this.fallingPosition = new Vec3(this.arr_position[3].x, this.arr_position[3].y, 0);
                let number = 3;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x < this.arr_position[1].x) {
                this.fallingPosition = new Vec3(this.arr_position[0].x, this.arr_position[0].y, 0);
                let number = 0;
                this.node.emit('falling node', this.fallingPosition, number);
            }
        }
    }
    set_question_state_tiger() {
        if (this.startPosition.x > this.endPosition.x) {
            if (this.movingENDPosition.x >= this.arr_position[2].x && this.movingENDPosition.x < this.arr_position[3].x) {
                this.fallingPosition = new Vec3(this.arr_position[3].x, this.arr_position[3].y, 0);
                let number = 3;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.movingENDPosition.x >= this.arr_position[1].x && this.movingENDPosition.x < this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[2].x, this.arr_position[2].y, 0);
                let number = 2;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.movingENDPosition.x >= this.arr_position[0].x && this.movingENDPosition.x < this.arr_position[1].x) {
                this.fallingPosition = new Vec3(this.arr_position[1].x, this.arr_position[1].y, 0);
                let number = 1;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.movingENDPosition.x >= 0 && this.movingENDPosition.x < this.arr_position[0].x) {
                this.fallingPosition = new Vec3(this.arr_position[0].x, this.arr_position[0].y, 0);
                let number = 0;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x > this.arr_position[3].x) {
                this.fallingPosition = new Vec3(this.arr_position[4].x, this.arr_position[4].y, 0);
                let number = 4;
                this.node.emit('falling node', this.fallingPosition, number);
            }
        }
        if (this.startPosition.x < this.endPosition.x) {
            if (this.endPosition.x >= this.arr_position[1].x && this.endPosition.x < this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[1].x, this.arr_position[1].y, 0);
                let number = 1;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[2].x && this.endPosition.x < this.arr_position[3].x) {
                this.fallingPosition = new Vec3(this.arr_position[2].x, this.arr_position[2].y, 0);
                let number = 2;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[3].x && this.endPosition.x < this.arr_position[4].x) {
                this.fallingPosition = new Vec3(this.arr_position[3].x, this.arr_position[3].y, 0);
                let number = 3;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[4].x && this.endPosition.x < 3000) {
                this.fallingPosition = new Vec3(this.arr_position[4].x, this.arr_position[4].y, 0);
                let number = 4;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x < this.arr_position[1].x) {
                this.fallingPosition = new Vec3(this.arr_position[0].x, this.arr_position[0].y, 0);
                let number = 0;
                this.node.emit('falling node', this.fallingPosition, number);
            }
        }
    }
    set_question_state_cat() {
        if (this.startPosition.x > this.endPosition.x) {
            if (this.movingENDPosition.x >= this.arr_position[0].x && this.movingENDPosition.x < this.arr_position[1].x) {
                this.fallingPosition = new Vec3(this.arr_position[1].x, this.arr_position[1].y, 0);
                let number = 1;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.movingENDPosition.x >= 0 && this.movingENDPosition.x < this.arr_position[0].x) {
                this.fallingPosition = new Vec3(this.arr_position[0].x, this.arr_position[0].y, 0);
                let number = 0;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[1].x && this.endPosition.x < this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[2].x, this.arr_position[2].y, 0);
                let number = 2;
                this.node.emit('falling node', this.fallingPosition, number);
            }
        }
        if (this.startPosition.x < this.endPosition.x) {
            if (this.endPosition.x >= this.arr_position[1].x && this.endPosition.x < this.arr_position[2].x) {
                this.fallingPosition = new Vec3(this.arr_position[1].x, this.arr_position[1].y, 0);
                let number = 1;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x >= this.arr_position[2].x && this.endPosition.x < 3000) {
                this.fallingPosition = new Vec3(this.arr_position[2].x, this.arr_position[2].y, 0);
                let number = 2;
                this.node.emit('falling node', this.fallingPosition, number);
            }
            if (this.endPosition.x <= this.arr_position[1].x && this.endPosition.x > this.arr_position[0].x) {
                this.fallingPosition = new Vec3(this.arr_position[0].x, this.arr_position[0].y, 0);
                let number = 0;
                this.node.emit('falling node', this.fallingPosition, number);
            }
        }
    }
    falling(fallingPosition: Vec3, fallingName: string, arr_number: number) {
        if (this.startPosition.x > this.endPosition.x) {
            if (this.node.name == fallingName) {
                tween(this.node)
                    .to(0.1, { worldPosition: new Vec3(fallingPosition.x - 100, fallingPosition.y, 0) })
                    .call(() => {
                        let p = this.node.getWorldPosition();
                        let p1 = new Vec2(p.x + 25, p.y + 25);
                        let p2 = new Vec2(p.x + 75, p.y + 25);
                        let p3 = new Vec2(p.x + 100, p.y);
                        this.tweenBezier2DTo(this.node, 0.1, p1, p2, p3, () => {
                        });
                    })
                    .start();
            }
        }
        if (this.startPosition.x < this.endPosition.x) {
            if (this.node.name == fallingName) {
                tween(this.node)
                    .to(0.1, { worldPosition: new Vec3(fallingPosition.x + 100, fallingPosition.y, 0) })
                    .call(() => {
                        let p = this.node.getWorldPosition();
                        let p1 = new Vec2(p.x - 25, p.y + 25);
                        let p2 = new Vec2(p.x - 75, p.y + 25);
                        let p3 = new Vec2(p.x - 100, p.y);
                        this.tweenBezier2DTo(this.node, 0.1, p1, p2, p3, () => {
                        });
                    })
                    .start();
            }
        }
        if (this.startPosition.x == this.endPosition.x) {
            if (this.node.name == fallingName) {
                tween(this.node)
                    .to(0.1, { worldPosition: new Vec3(fallingPosition.x, fallingPosition.y, 0) })
                    .to(0.05, { worldPosition: new Vec3(fallingPosition.x, fallingPosition.y + 100, 0) })
                    .to(0.05, { worldPosition: new Vec3(fallingPosition.x, fallingPosition.y, 0) })
                    .start();
            }
        }
    }
    swapPositionEnd(endPosition: Vec3, startPosition: Vec3) {
        this.endPosition = new Vec3(endPosition.x, endPosition.y, 0);
        this.startPosition = new Vec3(startPosition.x, startPosition.y, 0);
        let p = this.node.getWorldPosition();
        if (this.node.worldPosition.x > this.endPosition.x && this.node.worldPosition.x < this.startPosition.x) {
            let p = this.node.getWorldPosition();
            let p1 = new Vec2(p.x + 50, p.y + 50);
            let p2 = new Vec2(p.x + 150, p.y + 50);
            let p3 = new Vec2(p.x + 200, p.y);
            let p4 = new Vec2(p.x + 230, p.y + 30);
            let p5 = new Vec2(p.x + 260, p.y + 30);
            let p6 = new Vec2(p.x + 300, p.y);
            this.tweenBezier2DTo(this.node, 0.3, p1, p2, p3, () => {
                this.tweenBezier2DTo(this.node, 0.1, p4, p5, p6, () => {
                    this.updatePosition();
                });
            })
        }
        if (this.node.worldPosition.x > this.startPosition.x && this.node.worldPosition.x < this.endPosition.x) {
            let p = this.node.getWorldPosition();
            let p1 = new Vec2(p.x - 50, p.y + 50);
            let p2 = new Vec2(p.x - 150, p.y + 50);
            let p3 = new Vec2(p.x - 200, p.y);
            let p4 = new Vec2(p.x - 230, p.y + 30);
            let p5 = new Vec2(p.x - 260, p.y + 30);
            let p6 = new Vec2(p.x - 300, p.y);
            this.tweenBezier2DTo(this.node, 0.3, p1, p2, p3, () => {
                this.tweenBezier2DTo(this.node, 0.1, p4, p5, p6, () => {
                    this.updatePosition();
                });
            });
        }
    }
    updatePosition() {
        this.node.emit('update position');
    }
    updateAllPosition() {
        if (this.question_state == questionState.bird) {
            for (let i = 0; i < this.arr_position.length - 1; i++) {
                if (Math.abs(this.node.worldPosition.x - this.arr_position[i].x) <= 50) {
                    this.node.emit('name and index', this.char_bird.string, i);
                }
            }
        }
        if (this.question_state == questionState.tiger) {
            for (let i = 0; i < this.arr_position.length; i++) {
                if (Math.abs(this.node.worldPosition.x - this.arr_position[i].x) <= 50) {
                    this.node.emit('name and index', this.char_bird.string, i);
                }
            }
        }
        if (this.question_state == questionState.cat) {
            for (let i = 0; i < this.arr_position.length; i++) {
                if (Math.abs(this.node.worldPosition.x - this.arr_position[i].x) <= 50) {
                    this.node.emit('name and index', this.char_bird.string, i);
                }
            }
        }

    }
    emit_CharFly(position: Vec3) {
        this.charflystate = CharFlyState.fly;
        this.blockMoving = block_moving.block;
        tween(this.node)
            .to(0.5, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 5, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.4, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 5, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.3, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 7, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.2, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 8, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 9, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.05, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 10, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 11, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 12, 0) })
            .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
            .call(() => {
                this.node.emit('char_flying', this.charflystate, position);
                tween(this.node)
                    .to(1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 10, 0) })
                    .to(0.1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 80, 0) })
                    .to(1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 90, 0) })
                    .to(0.05, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
                    .to(0.1, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 20, 0) })
                    .to(0.05, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
                    .to(0.075, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 15, 0) })
                    .to(0.05, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })

                    .to(0.05, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 10, 0) })
                    .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
                    .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y + 5, 0) })
                    .to(0.025, { worldPosition: new Vec3(this.node.worldPosition.x, this.node.worldPosition.y, 0) })
                    .call(() => {
                        this.moveSpritePrame();
                    })
                    .start();
            })
            .start();
    }
    moveSpritePrame() {
        let sprite = this.node.getComponent(Sprite);
        this.scheduleOnce(function () {
            sprite.spriteFrame = null;
            this.mushroomSpine = mushroomState.jump;
            this.node.emit('mushroom spine moving', this.mushroomSpine, this.node.name);
        }, (Math.floor(Math.random() * 10) + 1) / 10)
    }
    emit_to_mushroom_spine() {
        if (this.mushroomSpine == mushroomState.jump2) {
            this.node.emit('mushroom spine moving', this.mushroomSpine);
        }
    }
    tweenBezier2DTo(target: Node, duration: number, c1: Vec2, c2
        : Vec2, to: Vec2, finishcallback?: any, opts?: ITweenOption) {
        if (target['bezierX']) target['bezierX'].stop();
        if (target['bezierY']) target['bezierY'].stop();

        let c0x = c1.x, c0y = c1.y,
            c1x = c2.x, c1y = c2.y;
        const _targetX = { value: target.getWorldPosition().x };
        const _targetY = { value: target.getWorldPosition().y };
        const aOpts: ITweenOption = opts || Object.create(null);
        aOpts.progress = function (startX: number, endX: number, currentX: number, t: number) {
            currentX = bezier(startX, c0x, c1x, endX, t);
            return currentX;
        }
        aOpts.onUpdate = function () {
            target.setWorldPosition(new Vec3(_targetX.value, target.worldPosition.y, target.worldPosition.z));
        }
        const bOpts: ITweenOption = opts || Object.create(null);
        bOpts.progress = function (startY: number, endY: number, currentY: number, t: number) {
            currentY = bezier(startY, c0y, c1y, endY, t);
            return currentY;
        }
        bOpts.onUpdate = function () {
            target.setWorldPosition(new Vec3(target.worldPosition.x, _targetY.value, target.worldPosition.z));
            target.emit('position update', target.getWorldPosition());
        }
        target['bezierX'] = tween(_targetX)
            .to(duration, { value: to.x }, aOpts)
            .call(() => {
                target['bezierX'] = null;
                finishcallback && finishcallback();
            })
            .start();

        target['bezierY'] = tween(_targetY)
            .to(duration, { value: to.y }, bOpts)
            .call(() => {
                target['bezierY'] = null;
            })
            .start();
    }
}


