import { _decorator, Component, Node, Input, Label, v3, Sprite, Vec3, log, instantiate, Prefab, tween, Skeleton, sp, math, UIOpacity } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
import { numberContro } from '../../df4/script/numberContro';
import { spinebird_df1 } from './spinebird_df1';
const { ccclass, property } = _decorator;


const M1_B = v3(-444, -123, 0);
const M2_I = v3(-104, -123, 0);
const M3_R = v3(236, -123, 0);
const M4_D = v3(576, -123, 0);
enum birdSpine {
    nostate,
    sai_buon,
    cau,
    sai_cahn_nan,
    di_bo,
    di_bo_ronren,
    Dung_gat_dau,
    idle,
    idle2,
    idle_gaimong,
    sai_khoc,
    dung_like,
    dung_like2,
    nhay,
    nhay2,
    nhun_nhay,
    nhun_nhay2,
    nhun_nhay3,
    Sai_so_hai,
    suy_nghi,
    traloi,
    Sai_tucgian,
    Dung_votay,
    Dung_votay2,
    Dung_votay3,
    walk,
}
enum CharState {
    nostate,
    correc,
    wrong,
}
enum mushroomState {
    nostate,
    walk,
    jump,
    jump2,
}
enum mushroomAudioPlay {
    nostate,
    Opps,
    who_am_i,
    correc,
    wrong,
    goodjob,
    bird,
    congxu,
    what_animal,
}
enum blockboxChat {
    nostate,
    block,
    open,
}
enum nam_moving {
    nostate,
    end,
}
enum questionState {
    nostate,
    bird,
    tiger,
    cat,
}
@ccclass('indexDf1')
export class indexDf1 extends Component {
    NUMBER_LIST_TIGER = [0, 1, 2, 3, 4, 5];
    CHAR_LIST_TIGER = ["T", "I", "G", "E", "R"];
    NUMBER_LIST_CAT = [0, 1, 2];
    CHAR_LIST_CAT = ["C", "A", "T"];
    CHAR_NEW: string[];
    CURRENT_M1;
    CURRENT_M2;
    CURRENT_M3;
    CURRENT_M4;
    VOICE_CONTENT = ["Opps, you’re lost into the Dark Forest.\n Let's find out the way!", "Who am i?", "What animal am I thinking?"];
    STATE_VOICE;
    BIRD_START_POSITION;

    QUESTIONTYPE: number;
    QUESTIONCONTENT = ["I need a strawberry", "What do monkey like to eat?", "I want an apple"];
    TOUCHSTATE: number;
    ANSWERSTATE: boolean;
    START_STRAWBERRY;
    START_BANANA;
    START_APPLE;
    MONSTER_POSITION;
    DELTA = 300;
    @property(Node)
    box_thing: Node = null;
    @property(Node)
    tiger: Node = null;
    @property(Node)
    cat: Node = null;
    @property(Node)
    private emit_from_audioControler: Node = null;
    @property(Node)
    bird: Node = null!;
    @property(Node)
    monster: Node = null!;
    @property(Node)
    lostLabel: Node = null!;
    @property(Label)
    voiceContent: Label = null!;
    @property(Node)
    mushroom1: Node = null!;
    @property(Node)
    mushroom2: Node = null!;
    @property(Node)
    mushroom3: Node = null!;
    @property(Node)
    mushroom4: Node = null!;
    @property(Node)
    mushroom5: Node = null!;
    @property(sp.Skeleton)
    change_scene: sp.Skeleton = null!;

    @property(sp.Skeleton)
    strawberry: sp.Skeleton = null!;
    @property(sp.Skeleton)
    banana: sp.Skeleton = null!;
    @property(sp.Skeleton)
    apple: sp.Skeleton = null!;
    @property({ type: Sprite })
    Question0: Sprite = null!;
    @property(Label)
    label0: Label = null!;
    @property(Node)
    private positionOrigin: Node = null;
    @property(Node)
    private positionorigin_Bird: Node = null;
    @property(Node)
    private bongden1: Node = null;
    @property(Node)
    private bongden2: Node = null;
    @property(Node)
    private bongden3: Node = null;
    @property(Node)
    private bongden4: Node = null;
    @property(Node)
    private bongden5: Node = null;
    @property(Node)
    private position_origin_mushroom: Node = null;
    private bird_spine: birdSpine = birdSpine.nostate;
    private mushroomstate: mushroomState = mushroomState.nostate;
    private audiostate: mushroomAudioPlay = mushroomAudioPlay.nostate;
    private block_boxchat: blockboxChat = blockboxChat.block;
    private nam1_MovingEND: nam_moving = nam_moving.nostate;
    private nam2_MovingEND: nam_moving = nam_moving.nostate;
    private nam3_MovingEND: nam_moving = nam_moving.nostate;
    private nam4_MovingEND: nam_moving = nam_moving.nostate;
    private question_state: questionState = questionState.nostate;
    private startPosition: Vec3 = new Vec3(0, 0, 0);
    private moveEndPosition: Vec3 = new Vec3(0, 0, 0);
    private movingPosition: Vec3 = new Vec3(0, 0, 0);
    private nodeMovingPosition_mr1: Vec3 = new Vec3(0, 0, 0);
    private nodeMovingPosition_mr2: Vec3 = new Vec3(0, 0, 0);
    private nodeMovingPosition_mr3: Vec3 = new Vec3(0, 0, 0);
    private nodeMovingPosition_mr4: Vec3 = new Vec3(0, 0, 0);
    private nodeMovingPosition_mr5: Vec3 = new Vec3(0, 0, 0);
    private nameNodefalling: string = " ";
    private distanceNode: number = 0;
    private p1: Vec3 = new Vec3(0, 0, 0);
    private p2: Vec3 = new Vec3(0, 0, 0);
    private p3: Vec3 = new Vec3(0, 0, 0);
    private p4: Vec3 = new Vec3(0, 0, 0);
    private p5: Vec3 = new Vec3(0, 0, 0);
    private arr_Position: Vec3[];
    private fallingPosition: Vec3 = new Vec3(0, 0, 0);
    private arr_bird: string[];
    private pushNumber: number = 0;
    private charBird: string = " ";
    private charIndex: number = 0;
    private charName: string = " ";
    private const_upChar: number = 0;
    private nam1_end
    private string_true: string = " ";
    private number_limit: Number = 0;
    private positionA: Vec3 = new Vec3(0, 0, 0);
    private positionB: Vec3 = new Vec3(0, 0, 0);
    private positionC: Vec3 = new Vec3(0, 0, 0);
    private Name_node_A: string = " ";
    private Name_node_B: string = " ";
    private Name_node_C: string = " ";
    private node_A: Node = null;
    private node_B: Node = null;
    private node_C: Node = null;
    private index_bong1: number = 0;
    private index_bong2: number = 0;
    private index_bong3: number = 0;
    private point_gamePlay_WRITE: number = 0;
    start() {
        this.distance_Node_bird();
        this.change_scene.enabled = false;
        this.bird.on('show-lost-label', this.showLostLabel, this);
        this.bird.on('chuyen_canh', this.set_chuyencanh, this);
        this.bird.on('show question 2', this.show_question_2, this);
        this.bird.on('false box chat_show tiger_thinking', this.show_tiger_thinking, this);
        this.lostLabel.on(Node.EventType.TOUCH_START, this.showNextVoice, this);
        let nodeParent1 = this.mushroom1.parent!
        let childs = nodeParent1.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('i-started', this.startedPosition, this);
            childs[i].on('i am moving', this.getMovingPosition, this);
            childs[i].on('i-stopped', this.checkPositionMushroom, this);
            childs[i].on('node moving position', this.setfalling, this);
            childs[i].on('falling node', this.falling, this);
            childs[i].on('name and index', this.getIndexEndCharName, this);
            childs[i].on('update position', this.updatePosition, this);
            childs[i].on('emit update position update', this.updatePosition2D, this);
            childs[i].on('mushroom spine moving', this.bongden_off, this);
            childs[i].on('set_sprite_frame', this.emit_draggable_chuyen_sprire_frame, this);
            childs[i].on('name node starting', this.get_name_node_starting, this);
            childs[i].on('bong state on', this.set_bong_on, this);
            childs[i].on('emit_to_df1_mushroom_manager_bird_moving_position_origin', this.emit_to_bird_moving, this);
        }
        this.emit_from_audioControler.on('audio end', this.setpreee_boxchat, this);
    }
    onLoad() {
        this.BIRD_START_POSITION = this.bird.getWorldPosition();
        let p = this.node.getWorldPosition();
        this.node.setWorldPosition(p.x + 200, p.y, 0);
        let sprite_mushroom5 = this.mushroom5.getComponent(Sprite);
        sprite_mushroom5.spriteFrame = null;
        this.bongden5.active = false;
        this.question_state = questionState.bird;
    }
    emit_to_bird_moving() {
        this.bird_spine = birdSpine.di_bo;
        this.emit_to_bird_spine();
    }
    get_name_node_starting(name_node: string, position_starting: Vec3) {
        if (position_starting.x == 1062) {
            let node_name_A = this.node.getChildByName(name_node);
            this.index_bong1 = node_name_A.getSiblingIndex();
            this.node_A = node_name_A;
            this.positionA = node_name_A.getWorldPosition();
        }
        if (position_starting.x == 1362) {
            let node_name_B = this.node.getChildByName(name_node);
            this.index_bong2 = node_name_B.getSiblingIndex();
            this.node_B = node_name_B;
            this.positionB = node_name_B.getWorldPosition();
        }
        if (position_starting.x == 1662) {
            let node_name_C = this.node.getChildByName(name_node);
            this.index_bong3 = node_name_C.getSiblingIndex();
            this.node_C = node_name_C;
            this.positionC = node_name_C.getWorldPosition();
        }
    }
    emit_draggable_chuyen_sprire_frame() {
        tween(this.node)
            .delay(1)
            .call(() => {
                this.node.emit('mushroom_chuyen_sprite_frame');
            })
            .start();
    }
    show_tiger_thinking() {
        if (this.question_state == questionState.bird) {
            let ui_opacity = this.box_thing.getComponent(UIOpacity);
            this.tiger.active = true;
            this.cat.active = false
            this.lostLabel.active = false;
            this.distance_Node_tiger();
            tween(ui_opacity)
                .to(1, { opacity: 255 })
                .delay(1)
                .to(1, { opacity: 0 })
                .call(() => {
                    this.question_state = questionState.tiger;
                    this.node.emit('show char', this.question_state);
                    this.random_char_tiger();
                })
                .start();
        }
        if (this.question_state == questionState.tiger) {
            let ui_opacity = this.box_thing.getComponent(UIOpacity);
            this.tiger.active = false;
            this.cat.active = true;
            this.lostLabel.active = false;
            tween(ui_opacity)
                .to(1, { opacity: 255 })
                .delay(1)
                .to(1, { opacity: 0 })
                .call(() => {
                    this.question_state = questionState.cat;
                    this.node.emit('show char', this.question_state);
                    this.random_char_cat();
                })
                .delay(0.2)
                .call(() => {
                    this.distance_Node_Cat();
                })
                .start();
        }
    }
    random_char_cat() {
        for (let i = 2; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.NUMBER_LIST_CAT[j];
            this.NUMBER_LIST_CAT[j] = this.NUMBER_LIST_CAT[i];
            this.NUMBER_LIST_CAT[i] = temp;
        }
        if (!this.CHAR_NEW) {
            this.CHAR_NEW = [];
        }
        for (let i = 0; i < 3; i++) {
            this.CHAR_NEW[i] = this.CHAR_LIST_CAT[this.NUMBER_LIST_CAT[i]];
        }
        this.node.emit('char_new_CAT', this.CHAR_NEW);
    }
    random_char_tiger() {
        for (let i = 4; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.NUMBER_LIST_TIGER[j];
            this.NUMBER_LIST_TIGER[j] = this.NUMBER_LIST_TIGER[i];
            this.NUMBER_LIST_TIGER[i] = temp;
        }
        if (!this.CHAR_NEW) {
            this.CHAR_NEW = [];
        }
        for (let i = 0; i < 5; i++) {
            this.CHAR_NEW[i] = this.CHAR_LIST_TIGER[this.NUMBER_LIST_TIGER[i]];
        }
        this.node.emit('char_new_TIGER', this.CHAR_NEW);
    }
    show_question_2() {
        if (this.question_state == questionState.bird) {
            this.lostLabel.active = true;
            let p = this.lostLabel.getWorldPosition();
            this.lostLabel.setWorldPosition(p.x, p.y - 400, 0);
            this.voiceContent.string = this.VOICE_CONTENT[2];
            this.audiostate = mushroomAudioPlay.what_animal;
            this.node.emit('audio play', this.audiostate);
        }
        if (this.question_state == questionState.tiger) {
            this.lostLabel.active = true;
            let p = this.lostLabel.getWorldPosition();
            this.lostLabel.setWorldPosition(p.x, p.y, 0);
            this.voiceContent.string = this.VOICE_CONTENT[2];
            this.audiostate = mushroomAudioPlay.what_animal;
            this.node.emit('audio play', this.audiostate);
        }

    }
    setpreee_boxchat(state: number) {
        if (state == mushroomAudioPlay.Opps) {
            this.block_boxchat = blockboxChat.open;
            this.bird_spine = birdSpine.idle;
            this.emit_to_bird_spine();
        }
        if (state == mushroomAudioPlay.congxu) {
            this.bird_spine = birdSpine.Dung_votay;
            this.emit_to_bird_spine()
        }
    }
    showNextVoice() {
        if (this.STATE_VOICE == 1) {
            this.lostLabel.active = false;
            this.STATE_VOICE = 2;
            this.mushroom1.active = true;
            this.mushroom2.active = true;
            this.mushroom3.active = true;
            this.mushroom4.active = true;
            this.bongden1.active = true;
            this.bongden2.active = true;
            this.bongden3.active = true;
            this.bongden4.active = true;
        }
        if (this.STATE_VOICE == 0 && this.block_boxchat == blockboxChat.open) {
            this.audiostate = mushroomAudioPlay.who_am_i;
            this.voiceContent.string = this.VOICE_CONTENT[1];
            this.STATE_VOICE = 1;
            this.emit_to_audio_play();
            this.bird_spine = birdSpine.traloi;
            this.emit_to_bird_spine();
        }
    }
    showLostLabel() {
        this.audiostate = mushroomAudioPlay.Opps;
        this.lostLabel.active = true;
        this.voiceContent.string = this.VOICE_CONTENT[0];
        this.STATE_VOICE = 0;
        this.emit_to_audio_play();
    }
    checkAnswer() {
        if (this.mushroom1.position.x == M1_B.x && this.mushroom1.position.y == M1_B.y
            && this.mushroom2.position.x == M2_I.x && this.mushroom2.position.y == M2_I.y
            && this.mushroom3.position.x == M3_R.x && this.mushroom3.position.y == M3_R.y
            && this.mushroom4.position.x == M4_D.x && this.mushroom4.position.y == M4_D.y) {
        } else {
        }
    }
    startedPosition(nodex: Node) {
        this.startPosition = this.getIntPosition(nodex.getWorldPosition());
        this.nameNodefalling = nodex.name;
    }
    getMovingPosition(movingNode: Node) {
        let nameNodeMoving = movingNode.name;
        if (this.question_state == questionState.bird || this.question_state == questionState.tiger) {
            if (nameNodeMoving == this.mushroom1.name) {
                this.nodeMovingPosition_mr1 = movingNode.getWorldPosition();
                this.bongden1.setWorldPosition(this.nodeMovingPosition_mr1.x, this.bongden1.worldPosition.y, 0);
            }
            if (nameNodeMoving == this.mushroom2.name) {
                this.nodeMovingPosition_mr2 = movingNode.getWorldPosition();
                this.bongden2.setWorldPosition(this.nodeMovingPosition_mr2.x, this.bongden2.worldPosition.y, 0);
            }
            if (nameNodeMoving == this.mushroom3.name) {
                this.nodeMovingPosition_mr3 = movingNode.getWorldPosition();
                this.bongden3.setWorldPosition(this.nodeMovingPosition_mr3.x, this.bongden3.worldPosition.y, 0);
            }
            if (nameNodeMoving == this.mushroom4.name) {
                this.nodeMovingPosition_mr4 = movingNode.getWorldPosition();
                this.bongden4.setWorldPosition(this.nodeMovingPosition_mr4.x, this.bongden4.worldPosition.y, 0);
            }
            if (nameNodeMoving == this.mushroom5.name) {
                this.nodeMovingPosition_mr5 = movingNode.getWorldPosition();
                this.bongden5.setWorldPosition(this.nodeMovingPosition_mr5.x, this.bongden5.worldPosition.y, 0);
            }
        }
        if (this.question_state == questionState.cat) {
            if (nameNodeMoving == this.node_A.name) {
                this.bongden1.setWorldPosition(movingNode.worldPosition.x, this.bongden1.worldPosition.y, 0);
            }
            if (nameNodeMoving == this.node_B.name) {
                this.bongden2.setWorldPosition(movingNode.worldPosition.x, this.bongden2.worldPosition.y, 0);
            }
            if (nameNodeMoving == this.node_C.name) {
                this.bongden3.setWorldPosition(movingNode.worldPosition.x, this.bongden3.worldPosition.y, 0);
            }
        }
    }
    updatePosition2D(position2D: Vec3, nameNode: string) {
        if (this.question_state == questionState.bird || this.question_state == questionState.tiger) {
            if (nameNode == this.mushroom1.name) {
                this.bongden1.setWorldPosition(position2D.x, this.bongden1.worldPosition.y, 0);
            }
            if (nameNode == this.mushroom2.name) {
                this.bongden2.setWorldPosition(position2D.x, this.bongden2.worldPosition.y, 0);
            }
            if (nameNode == this.mushroom3.name) {
                this.bongden3.setWorldPosition(position2D.x, this.bongden3.worldPosition.y, 0);
            }
            if (nameNode == this.mushroom4.name) {
                this.bongden4.setWorldPosition(position2D.x, this.bongden4.worldPosition.y, 0);
            }
            if (nameNode == this.mushroom5.name) {
                this.bongden5.setWorldPosition(position2D.x, this.bongden5.worldPosition.y, 0);
            }
        }
        if (this.question_state == questionState.cat) {
            if (nameNode == this.node_A.name) {
                this.bongden1.setWorldPosition(position2D.x, this.bongden1.worldPosition.y, 0);
            }
            if (nameNode == this.node_B.name) {
                this.bongden2.setWorldPosition(position2D.x, this.bongden2.worldPosition.y, 0);
            }
            if (nameNode == this.node_C.name) {
                this.bongden3.setWorldPosition(position2D.x, this.bongden3.worldPosition.y, 0);
            }
        }
    }
    bongden_off(state: number, nameNode: string) {
        if (this.question_state == questionState.bird ||
            this.question_state == questionState.tiger) {
            if (nameNode == this.mushroom1.name) {
                this.bongden1.active = false;
            }
            if (nameNode == this.mushroom2.name) {
                this.bongden2.active = false;
            }
            if (nameNode == this.mushroom3.name) {
                this.bongden3.active = false;
            }
            if (nameNode == this.mushroom4.name) {
                this.bongden4.active = false;
            }
            if (nameNode == this.mushroom5.name) {
                this.bongden5.active = false;
            }
        }
        if (this.question_state == questionState.cat) {
            if (nameNode == this.node_A.name) {
                this.bongden1.active = false;
            }
            if (nameNode == this.node_B.name) {
                this.bongden2.active = false;
            }
            if (nameNode == this.node_C.name) {
                this.bongden3.active = false;
            }
        }
    }
    set_bong_on(Name_node: string) {
        if (this.question_state == questionState.bird) {
            if (Name_node == this.mushroom1.name) {
                this.bongden1.active = true;
                this.bongden1.setWorldPosition(this.mushroom1.getWorldPosition());
            }
            if (Name_node == this.mushroom2.name) {
                this.bongden2.active = true;
                this.bongden2.setWorldPosition(this.mushroom2.getWorldPosition());
            }
            if (Name_node == this.mushroom3.name) {
                this.bongden3.active = true;
                this.bongden3.setWorldPosition(this.mushroom3.getWorldPosition());
            }
            if (Name_node == this.mushroom4.name) {
                this.bongden4.active = true;
                this.bongden4.setWorldPosition(this.mushroom4.getWorldPosition());
            }
            if (Name_node == this.mushroom5.name) {
                this.bongden5.active = true;
                this.bongden5.setWorldPosition(this.mushroom5.getWorldPosition());
            }
        }
        if (this.question_state == questionState.tiger) {
            this.bongden1.active = true;
            this.bongden1.setWorldPosition(1062, 265, 0);
            this.bongden2.active = true;
            this.bongden2.setWorldPosition(1362, 265, 0);
            this.bongden3.active = true;
            this.bongden3.setWorldPosition(1662, 265, 0);
        }
    }
    distance_Node_tiger() {
        this.p1 = this.getIntPosition(this.mushroom3.getWorldPosition());
        this.mushroom3.setWorldPosition(this.p1.x, this.p1.y, 0);
        this.p2 = this.getIntPosition(this.mushroom4.getWorldPosition());
        this.mushroom4.setWorldPosition(this.p2.x, this.p2.y, 0);
        this.p3 = this.getIntPosition(this.mushroom2.getWorldPosition());
        this.mushroom2.setWorldPosition(this.p3.x, this.p3.y, 0);
        this.p4 = this.getIntPosition(this.mushroom1.getWorldPosition());
        this.mushroom1.setWorldPosition(this.p4.x, this.p4.y, 0);
        this.p5 = this.getIntPosition(this.mushroom5.getWorldPosition());
        this.mushroom5.setWorldPosition(this.p5.x, this.p5.y, 0);
        this.arr_Position = [this.p4, this.p3, this.p1, this.p2, this.p5];
        this.distanceNode = this.p2.x - this.p1.x;
    }
    distance_Node_bird() {
        this.p1 = this.getIntPosition(this.mushroom1.getWorldPosition());
        this.mushroom1.setWorldPosition(this.p1.x, this.p1.y, 0);
        this.p2 = this.getIntPosition(this.mushroom2.getWorldPosition());
        this.mushroom2.setWorldPosition(this.p2.x, this.p2.y, 0);
        this.p3 = this.getIntPosition(this.mushroom3.getWorldPosition());
        this.mushroom3.setWorldPosition(this.p3.x, this.p3.y, 0);
        this.p4 = this.getIntPosition(this.mushroom4.getWorldPosition());
        this.mushroom4.setWorldPosition(this.p4.x, this.p4.y, 0);
        this.p5 = this.getIntPosition(this.mushroom5.getWorldPosition());
        this.mushroom5.setWorldPosition(this.p5.x, this.p5.y, 0);
        this.arr_Position = [this.p4, this.p3, this.p1, this.p2, this.p5];
        this.distanceNode = this.p2.x - this.p1.x;
    }
    distance_Node_Cat() {

        this.arr_Position = [this.positionA, this.positionB, this.positionC];
        this.distanceNode = this.p2.x - this.p1.x;
        this.setfalling();
    }
    setfalling() {
        this.node.emit('emit node moving position', this.moveEndPosition, this.nameNodefalling, this.distanceNode, this.arr_Position);
    }
    falling(positionFalling: Vec3, arr_number: number) {
        this.pushNumber = arr_number;
        this.fallingPosition = new Vec3(positionFalling.x, positionFalling.y, 0);
        this.node.emit('falling start', this.fallingPosition, this.nameNodefalling, arr_number);
    }
    checkPositionMushroom(nodex: Node) {
        this.moveEndPosition = this.getIntPosition(nodex.getWorldPosition())
        this.node.emit('position end', this.moveEndPosition, this.startPosition);
    }
    getIndexEndCharName(charName: string, index: number) {
        if (this.question_state == questionState.bird) {
            this.string_true = 'BIRD';
            this.number_limit = 4;
        }
        if (this.question_state == questionState.tiger) {
            this.string_true = 'TIGER';
            this.number_limit = 5;
        }
        if (this.question_state == questionState.cat) {
            this.string_true = 'CAT';
            this.number_limit = 3;
        }
        this.const_upChar = this.const_upChar + 1;
        var arr_char = [];
        this.charIndex = index;
        this.charName = charName;
        var str_true = new String(this.string_true);
        let length = str_true.length;
        if (!this.arr_bird) {
            this.arr_bird = [];
        }
        this.arr_bird[index] = charName;
        let stringBird = this.arr_bird.join();
        let stringBird_replace = stringBird.replace(/,/g, "");
        if (this.const_upChar == this.number_limit) {
            if (stringBird_replace == str_true) {
                let p = this.positionOrigin.getWorldPosition();
                let p1_origin_mushroom = this.position_origin_mushroom.getWorldPosition();
                this.scheduleOnce(function () {
                    this.node.emit('char fly', p);
                    this.node.emit('moving position origin_mushroom', p1_origin_mushroom);
                    this.node.emit('bird spine swap like');
                    this.load_effect_fireworks();
                    this.audiostate = mushroomAudioPlay.correc;
                    this.point_gamePlay_WRITE = this.point_gamePlay_WRITE + 1;
                    this.emit_to_audio_play();
                    this.arr_bird = this.arr_bird.slice(0, 0);
                    stringBird_replace = "";
                    stringBird = "";
                    this.const_upChar = 0;
                }, 0.5);
            } else {
                //this.node.emit('bird spine swap lac dau');
                //this.node.emit('khoa trang thai di chuyen mushroom');
                this.audiostate = mushroomAudioPlay.wrong;
                this.emit_to_audio_play();
                this.arr_bird = this.arr_bird.slice(0, 0);
                stringBird_replace = "";
                stringBird = "";
                this.const_upChar = 0;
            }
        }
    }
    load_effect_fireworks() {
        PrefabManager.instance().loadPrefab('dark_forest', 'effect_paper_cannons/prefab/fireworks', true, this.show_screen.bind(this));
    }
    show_screen(error: number, prefab: Prefab) {
        if (error == 0) {
            let node = instantiate(prefab);
            console.log('showScreen', node);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen');
        } else {
            console.log('showScreen  error', error);
        }
    }
    getIntPosition(position: Vec3): Vec3 {
        let int_X = Math.round(position.x);
        let int_Y = Math.round(position.y);
        let P = new Vec3(int_X, int_Y, 0);
        return P;
    }
    emit_to_audio_play() {
        if (this.audiostate == mushroomAudioPlay.Opps) {
            this.node.emit('audio play', this.audiostate);
        }
        if (this.audiostate == mushroomAudioPlay.who_am_i) {
            this.node.emit('audio play', this.audiostate);
        }
        if (this.audiostate == mushroomAudioPlay.correc) {
            this.node.emit('audio play', this.audiostate);
        }
        if (this.audiostate == mushroomAudioPlay.wrong) {
            this.node.emit('audio play', this.audiostate);
        }
    }
    updatePosition() {
        this.node.emit('start updtate all position');
    }
    emit_to_bird_spine() {
        if (this.bird_spine == birdSpine.Dung_votay) {
            this.node.emit('bird_chuyen_spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.idle) {
            this.node.emit('bird_chuyen_spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.traloi) {
            this.node.emit('bird_chuyen_spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.di_bo) {
            let p = this.position_origin_mushroom.getWorldPosition();
            this.node.emit('bird_chuyen_spine', this.bird_spine, p);
        }
    }
    set_chuyencanh(nodeName: string) {
        this.node.emit('mushroom end _ chuyen_canh', this.point_gamePlay_WRITE);
    }
}


