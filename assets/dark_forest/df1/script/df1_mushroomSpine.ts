import { _decorator, Component, Node, sp, tween, random, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum mushroomState {
    nostate,
    walk,
    jump,
    jump2,
}
enum questionState {
    nostate,
    bird,
    tiger,
    cat,
}
@ccclass('df1_mushroomSpine')
export class df1_mushroomSpine extends Component {
    private spine: sp.Skeleton;
    @property(Node)
    private emitfrom_mushroom: Node = null;
    private mushroomstate: mushroomState = mushroomState.nostate;
    private mushroomstateEND: mushroomState = mushroomState.nostate;
    private question_state: questionState = questionState.nostate;
    private position_origin: Vec3 = new Vec3(0, 0, 0);
    private position_moving_ogirin: Vec3 = new Vec3(0, 0, 0);
    start() {
        this.emitfrom_mushroom.on('mushroom spine moving', this.mushroomSpineSeting, this);
        this.emitfrom_mushroom.on('mushroom moving', this.mushroom_moving, this);
        this.emitfrom_mushroom.on('emit question state', this.set_question_state, this);
        this.emitfrom_mushroom.on('mushroom_moving_position_origin', this.get_position_origin, this);
    }
    get_position_origin(position: Vec3) {
        this.position_moving_ogirin = position;
    }
    set_question_state(state: number) {
        if (state == questionState.tiger) {
            this.question_state = questionState.tiger;
        }
        if (state == questionState.cat) {
            this.question_state = questionState.cat;
        }
    }
    mushroomSpineSeting(state: number) {
        if (state == mushroomState.jump) {
            this.mushroomstate = mushroomState.jump;
            this.spineStart();
        }
        if (state == mushroomState.jump2) {
            this.mushroomstate = mushroomState.jump2;
            this.spineStart();
        }
    }
    spineStart() {
        if (this.mushroomstate == mushroomState.jump) {
            this.spine.setMix('idle', 'nhay', 0.24);
            this.node.setWorldScale(1, 1, 1);
            this.mushroom_jump(false);
            this.scheduleOnce(function () {
                this.mushroomstateEND = mushroomState.jump;
                this.node.emit('spine state end', this.mushroomstateEND);
            }, 0.5)
        }
        if (this.mushroomstate == mushroomState.jump2) {
            this.spine.setMix('nhay', 'nhay2', 0.24);
            this.mushroom_jump2(true);
            if (this.question_state == questionState.bird) {
                this.scheduleOnce(function () {
                    this.mushroom_walk(true);
                    this.mushroomstateEND = mushroomState.jump2;
                    this.node.emit('spine state end', this.mushroomstateEND);
                }, 3)
            }
            if (this.question_state == questionState.tiger) {
                tween(this.node)
                    .delay(3)
                    .call(() => {
                        this.set_mushroom_moving();
                    })
                    .start();
            }
            if (this.question_state == questionState.cat) {
                this.node.setScale(1, 1, 1);
                tween(this.node)
                    .delay(3)
                    .call(() => {
                        this.mushroom_walk(true);
                        this.node.emit('bird moving to position origin');
                    })
                    .to(Math.floor(Math.random() * 5) + 2, { worldPosition: new Vec3(this.position_moving_ogirin.x, this.position_moving_ogirin.y, 0) })
                    .start();
            }
        }
    }
    set_mushroom_moving() {
        let p = this.node.getWorldPosition();
        if (p.x <= 800) {
            this.node.setScale(-1, 1, 1);
            let p = this.node.getWorldPosition();
            this.mushroom_walk(true);
            tween(this.node)
                .to(3, { worldPosition: new Vec3(p.x - 800, p.y, 0) })
                .call(() => {
                    this.node.setScale(0, 0, 0);
                    this.node.emit('set sprite frame mushroom', this.node.name);
                })
                .start();
        }
        if (p.x >= 1950) {
            let p = this.node.getWorldPosition();
            this.node.setScale(1, 1, 1);
            this.mushroom_walk(true);
            tween(this.node)
                .to(3, { worldPosition: new Vec3(p.x + 800, p.y, 0) })
                .call(() => {
                    this.node.setScale(0, 0, 0);
                    this.node.emit('set sprite frame mushroom', this.node.name);
                })
                .start();
        }
    }
    mushroom_moving(position: Vec3) {
        let p = this.node.getWorldPosition();
        this.spine?.setMix('dibo', 'idle', 0.24);
        if (this.node.name == 'UInam5') {
            this.node.setScale(-1, 1, 1);
            this.position_origin = position;
            tween(this.node)
                .to(2, { worldPosition: new Vec3(this.position_origin.x - 200, this.position_origin.y, 0) })
                .call(() => {
                    this.mushroom_idle(true);
                    tween(this.node)
                        .delay(0.3)
                        .call(() => {
                            this.node.emit('set lai trang thai sprite frame cua mushroom');
                        })
                        .start();
                })
                .start();
        } else {
            this.node.setScale(-1, 1, 1);
            tween(this.node)
                .to(2, { worldPosition: new Vec3(p.x - 200, p.y, 0) })
                .call(() => {
                    this.mushroom_idle(true);
                    tween(this.node)
                        .delay(0.3)
                        .call(() => {
                            this.node.emit('set lai trang thai sprite frame cua mushroom');
                        })
                        .start();
                })
                .start();
        }

    }
    onLoad() {

        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this.question_state = questionState.bird;
    }
    mushroom_walk(active: boolean) {
        this.spine?.setAnimation(0, 'dibo', active);
    }
    mushroom_jump(active: boolean) {
        this.spine?.setAnimation(0, 'nhay', active);
    }
    mushroom_jump2(active: boolean) {
        this.spine?.setAnimation(0, 'nhay2', active);
    }
    mushroom_idle(active: boolean) {
        this.spine?.setAnimation(0, 'idle', active);
    }
    update(deltaTime: number) {

    }
}


