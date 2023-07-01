import { _decorator, Component, Prefab, instantiate, Node, Label, CCInteger, Vec3 } from 'cc';
import { df3 } from '../df3';
import { df3_nodeMoving } from './df3_nodeMoving';
import { df3_setcolorname } from './df3_setcolorname';
const { ccclass, property } = _decorator;
enum BlockType {
    BT_NONE,
    BT_STONE,
};
enum fallingstate {
    nostate,
    falling,
    stop,
}
enum correc_wrong_state {
    nostate,
    correc,
    wrong,
}
enum collideState {
    nostate,
    true,
    false,
}
enum basketState {
    nodtate,
    eat,
    pushOut,
}
enum pointState {
    nostate,
    plusPoint,
    minusPoint,
}
enum startingHungHinh {
    nostate,
    start,
    pause,
    stop,
    endGame,
}
@ccclass('df3_initprefab')
export class df3_initprefab extends Component {
    @property({ type: Node })
    private emitfromMainHunghinh: Node = null;
    @property({ type: Prefab })
    private nodePrefab: Prefab = null;
    private arrayNode: number[] = [];
    private arrayNodeLenth: number = 15;
    private randomX: number = 0;
    private randomY: number = 0;
    private randomScaleX_Y: number = 0;
    private FallingSpeed: number[] = [];
    private fallingstate: fallingstate = fallingstate.nostate;
    private correc_wrongstate_star: correc_wrong_state = correc_wrong_state.nostate;
    private correc_wrongstate_square: correc_wrong_state = correc_wrong_state.nostate;
    private correc_wrongstate_circle: correc_wrong_state = correc_wrong_state.nostate;
    private correc_wrongstate_triangle: correc_wrong_state = correc_wrong_state.nostate;
    private correc_wrongstate: correc_wrong_state = correc_wrong_state.nostate;
    private statinghunghinh: startingHungHinh = startingHungHinh.nostate;
    private pointstate: pointState = pointState.nostate;
    private basketstate: basketState = basketState.nodtate;
    private collide_state: collideState = collideState.nostate;
    private nameQuestion: string = " ";
    private nameQuestion_2: string = " ";
    private nodeforBear: Node = null;
    private positionForBear: Vec3 = new Vec3(0, 0, 0);
    private gio: Node = null;
    private Sum_point: number = 0;
    private point_star: number = 0;
    private point_square: number = 0;
    private point_triangle: number = 0;
    private point_circle: number = 0;
    start() {
        this.initnode();
        this.emitfromMainHunghinh.on('name for audio play question', this.getNameQuestion, this);
        this.emitfromMainHunghinh.on('name for audio play question_2', this.getNameQuestion_2, this);
        this.emitfromMainHunghinh.on('position for bear', this.getPositionForBear, this);
        this.emitfromMainHunghinh.on('gio', this.get_gio, this);
        this.emitfromMainHunghinh.on('win_end game', this.setEND, this);
        let childs1 = this.node.children;
        for (let i = 0; i < childs1.length; i++) {
            childs1[i].on('point for game', this.setPointGame, this);
        }
        let childs2 = this.node.children;
        for (let i = 0; i < childs2.length; i++) {
            childs2[i].on('destoy childs', this.destroychilds, this);
        }
    }
    destroychilds() {
        if (this.node.name == 'star') {
            this.node.destroyAllChildren();
        }
        if (this.node.name == 'circle') {
            this.node.destroyAllChildren();
        }
        if (this.node.name == 'square') {
            this.node.destroyAllChildren();
        }
        if (this.node.name == 'triangle') {
            this.node.destroyAllChildren();
        }
    }
    setPointGame(state: number, point: number, name: string) {
        if (this.node.name == 'star') {
            if (state == pointState.plusPoint && this.node.name == name) {
                this.pointstate = pointState.plusPoint;
                this.point_star = this.point_star + point;
                this.node.emit('sum point game star', this.point_star, this.pointstate);
            }
            if (state == pointState.minusPoint && this.node.name == name) {
                this.pointstate = pointState.minusPoint;
                this.point_star = this.point_star - point;
                this.node.emit('sum point game star', this.point_star, this.pointstate);
            }
        }
        if (this.node.name == 'circle') {
            if (state == pointState.plusPoint && this.node.name == name) {
                this.pointstate = pointState.plusPoint;
                this.point_circle = this.point_circle + point;
                this.node.emit('sum point game circle', this.point_circle, this.pointstate);
            }
            if (state == pointState.minusPoint && this.node.name == name) {
                this.pointstate = pointState.minusPoint;
                this.point_circle = this.point_circle - point;
                this.node.emit('sum point game circle', this.point_circle, this.pointstate);
            }
        }
        if (this.node.name == 'square') {
            if (state == pointState.plusPoint && this.node.name == name) {
                this.pointstate = pointState.plusPoint;
                this.point_square = this.point_square + point;
                this.node.emit('sum point game square', this.point_square, this.pointstate);
            }
            if (state == pointState.minusPoint && this.node.name == name) {
                this.pointstate = pointState.minusPoint;
                this.point_square = this.point_square - point;
                this.node.emit('sum point game square', this.point_square, this.pointstate);
            }
        }
        if (this.node.name == 'triangle') {
            if (state == pointState.plusPoint && this.node.name == name) {
                this.pointstate = pointState.plusPoint;
                this.point_triangle = this.point_triangle + point;
                this.node.emit('sum point game triangle', this.point_triangle, this.pointstate);
            }
            if (state == pointState.minusPoint && this.node.name == name) {
                this.pointstate = pointState.minusPoint;
                this.point_triangle = this.point_triangle - point;
                this.node.emit('sum point game triangle', this.point_triangle, this.pointstate);
            }
        }
    }
    setEND(state: number, numberEND: number) {
        this.statinghunghinh = startingHungHinh.endGame;
        this.node.emit('gui end game', this.statinghunghinh);
    }
    get_gio(node: Node) {
        this.gio = node;
        this.node.emit('gui gio cho con', this.gio);
    }
    getNameQuestion(name: string) {
        this.nameQuestion = name;
        this.checkCorrecAndWrong(this.nameQuestion);
    }
    getNameQuestion_2(name: string) {
        this.correc_wrongstate = correc_wrong_state.nostate;
        this.basketstate = basketState.nodtate;
        this.nameQuestion_2 = name;
        this.checkCorrecAndWrong(this.nameQuestion_2);
    }
    getPositionForBear(nodeForBear: Node) {
        this.nodeforBear = nodeForBear;
        this.positionForBear = this.nodeforBear.getWorldPosition();
        this.node.emit('position gio hoa qua', this.positionForBear);
    }
    checkCorrecAndWrong(name_question: string) {
        if (this.node.name == name_question) {
            this.correc_wrongstate = correc_wrong_state.correc;
            this.emit_to_node_moving_1();
        }
        else if (this.node.name != name_question) {
            this.correc_wrongstate = correc_wrong_state.wrong;
            this.emit_to_node_moving_1();
        }
    }
    emit_to_node_moving_1() {
        if (this.correc_wrongstate == correc_wrong_state.correc) {
            this.basketstate = basketState.eat;
            this.node.emit('basket state', this.basketstate);
        }
        if (this.correc_wrongstate == correc_wrong_state.wrong) {
            this.basketstate = basketState.pushOut;
            this.node.emit('basket state', this.basketstate);
        }
    }
    initnode() {
        this.node.removeAllChildren();
        this.arrayNode = [];
        this.arrayNode.push(BlockType.BT_NONE);
        for (let i = 0; i <= this.arrayNodeLenth; i++) {
            this.arrayNode.push(BlockType.BT_STONE);
        }
        for (let j = 0; j <= this.arrayNodeLenth; j++) {
            let block: Node = this.spawnBlockByType(this.arrayNode[j]);
            if (block) {
                this.randomX = Math.floor(Math.random() * 1200) + 700;
                this.randomY = Math.floor(Math.random() * 1100) + 5000;
                let random = Math.floor(Math.random() * 10) + 5;
                this.randomScaleX_Y = random / 10;
                this.node.addChild(block);
                block.setWorldPosition(this.randomX, this.randomY, 0);
                block.setWorldScale(this.randomScaleX_Y, this.randomScaleX_Y, 0);
                block.addComponent(df3_nodeMoving);
                let falling = block.getComponent(df3_nodeMoving);
                if (this.node.name == 'star') {
                    falling.emitfromInitprefab = this.node;
                    let name = 'star';
                    let numberString = `${j}`;
                    falling.name = name.concat(numberString);
                }
                if (this.node.name == 'circle') {
                    falling.emitfromInitprefab = this.node;
                    let name = 'circle';
                    let numberString = `${j}`;
                    falling.name = name.concat(numberString);
                }
                if (this.node.name == 'square') {
                    falling.emitfromInitprefab = this.node;
                    let name = 'square';
                    let numberString = `${j}`;
                    falling.name = name.concat(numberString);
                }
                if (this.node.name == 'triangle') {
                    falling.emitfromInitprefab = this.node;
                    let name = 'triangle';
                    let numberString = `${j}`;
                    falling.name = name.concat(numberString);
                }
                falling.emitfromInitprefab = this.node
                falling.fallingSpeed = Math.floor(Math.random() * 6) + 2;
                falling.limitPosition = Math.floor(Math.random() * 150) + 1;
                falling.traveldistance = this.randomY - falling.limitPosition;
                falling.randomfalling = Math.floor(Math.random() * 2) + 1;
            }
        }
    }
    spawnBlockByType(type: BlockType) {
        if (!this.nodePrefab) {
            return null;
        }
        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                {
                    block = instantiate(this.nodePrefab);
                    break;
                }
        }
        return block;

    }
    update(deltaTime: number) {


    }
}


