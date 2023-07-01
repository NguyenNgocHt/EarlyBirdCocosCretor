import { _decorator, Component, Node, Label, sp, tween, Vec3, UITransform, labelAssembler, instantiate, Prefab } from 'cc';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { AudioManager } from '../../../loading/script/AudioManager';
import { spineBear } from '../../df4/script/spineBear';
import { ScreenManager } from '../../../loading/script/ScreenManager';
const { ccclass, property } = _decorator;
enum audioPlaylist {
    nostate,
    choose,
    correc,
    wrong,
    goodjob,
    bird,
    congxu,
    notfull,
    you_can_go_now,
}
enum getingFuitsState {
    nostate,
    banana,
    apple,
    strawberry,
}
enum touchEND_State {
    nostate,
    open,
    block,
}
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
enum MonsterSpine {
    nostate,
    an,
    idle,
    idle2,
    idle3,
    ngu,
    nhayra,
    tucgian,
}
@ccclass('df1_eatFruits_mainControler')
export class df1_eatFruits_mainControler extends Component {
    QUESTIONCONTENT = ["Choose the right fruit to the monster", "I want a strawberry", "I want a banana", "I want a apple", "Very good ! You can go now", "Very good! but i'm still not full"];
    @property(Node)
    private emitfrom_DF1main: Node = null;
    @property(Node)
    private position_BirdMoving: Node = null;
    @property(Node)
    private emitAudioPlay: Node = null;
    @property(Node)
    private loa: Node = null;
    @property(Node)
    private Bird: Node = null;
    @property(Node)
    private position_BirdIdle: Node = null;
    @property(Node)
    private position_BirdJump1: Node = null;
    @property(Node)
    private position_BirdJump2: Node = null;
    @property(Node)
    private Monster: Node = null;
    @property(Node)
    private monster_QL: Node = null;
    @property(Node)
    private position_monsterMoving1: Node = null;
    @property(Node)
    private position_monsterMoving2: Node = null;
    @property(Node)
    private position_monsterMoving3: Node = null;
    @property(Node)
    private position_monsterMoving4: Node = null;
    @property(Node)
    private banana: Node = null;
    @property(Node)
    private banana_QL: Node = null;
    @property(Node)
    private banana_fruits: Node = null;
    @property(Node)
    private strawberry: Node = null;
    @property(Node)
    private strawberry_QL: Node = null;
    @property(Node)
    private strawberry_fruits: Node = null;
    @property(Node)
    private apple: Node = null;
    @property(Node)
    private apple_QL: Node = null;
    @property(Node)
    private apple_fruits: Node = null;
    @property(Node)
    private boxChat: Node = null;
    @property(Label)
    private label: Label = null;
    @property(Node)
    private buiconho4: Node = null;
    @property(Node)
    private position_end1: Node = null;
    @property(Node)
    private position_end2: Node = null;
    @property(Node)
    private position_end3: Node = null;
    @property(Node)
    private position_end4: Node = null;
    @property(Node)
    private position_end5: Node = null;
    @property(Node)
    private box_chat_monster: Node = null;
    @property(Label)
    private label_monster_question: Label = null;
    private audioPlayList: audioPlaylist = audioPlaylist.nostate;
    private getting_fruits_state: getingFuitsState = getingFuitsState.nostate;
    private question_fruits_state: getingFuitsState = getingFuitsState.nostate;
    private questionAndGeting_fruits_OK: getingFuitsState = getingFuitsState.nostate;
    private touchEndstate: touchEND_State = touchEND_State.nostate;
    private bird_spine: birdSpine = birdSpine.nostate;
    private monster_spine: MonsterSpine = MonsterSpine.nostate;
    private blockLoa: touchEND_State = touchEND_State.block;
    private startPosition: Vec3 = new Vec3(0, 0, 0);
    private movePosition: Vec3 = new Vec3(0, 0, 0);
    private nodeTree: Node = null;
    private number_loa_audioPlay: number = 0;
    random_question: number = 0;
    private random_number: number[];
    private random_number_before: number = 0;
    private point_gamePlay_VOCAB: number = 0;
    private count_wrong_aswer: number = 0;
    onLoad() {
        let spine_chuoi = this.banana.getComponent(sp.Skeleton);
        spine_chuoi.setAttachment('chuoi1', 'chuoi1');
        let spine_tao = this.apple.getComponent(sp.Skeleton);
        spine_tao.setAttachment('chuoi1', 'tao1');
        let spine_dau = this.strawberry.getComponent(sp.Skeleton);
        spine_dau.setAttachment('chuoi1', 'dau1');
    }
    start() {
        this.loa.on(Node.EventType.TOUCH_START, this.set_loa_Audio_Play, this);
        this.emitfrom_DF1main.on('node tree', this.getNodeTree, this);
        this.emitfrom_DF1main.on('eat fruits start', this.setBirdMoving, this);
        this.Monster.on('am thanh huong dan', this.setAudioPlay, this);
        this.Monster.on('bird nhay quay lai_hoang hot', this.set_indexMonster, this);
        this.Monster.on('chuyen bird spine Sai/khoc', this.setBirdSpine_Sai_khoc, this);
        this.Monster.on('bird chuyen spine like', this.setBird_like, this);
        this.Monster.on('i want to eat more', this.set_question_monster, this);
        this.Monster.on('block fruits moving state', this.set_block_fruits_moving_state, this);
        this.Bird.on('bird moving_game end', this.set_bird_Moving, this);
        this.Bird.on('moving end chuyen scene df2', this.emit_chuyenScene, this);
        this.emitAudioPlay.on('choose_audio play end', this.set_ramdom_question, this);
        this.emitAudioPlay.on('question end', this.setBirdSpine, this);
        this.emitAudioPlay.on('show vocabulary', this.show_vocabulary, this);
        this.emitAudioPlay.on('vocabulary end', this.end_Vocabulary, this);
        let parent = this.apple_QL.parent;
        let childs = parent.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('start node', this.check_StartPosition, this);
            childs[i].on('end node', this.check_Position_Monster, this);
            childs[i].on('open_block_fruits_state', this.open_block_fruits, this);
        }
    }
    open_block_fruits() {
        this.node.emit('mo khoa gio hoa qua');
    }
    set_block_fruits_moving_state() {
        this.node.emit('block_fruits_moving');
    }
    set_question_monster() {
        this.box_chat_monster.active = true;
        this.label_monster_question.string = this.QUESTIONCONTENT[5];
        this.audioPlayList = audioPlaylist.notfull;
        this.node.emit('audioPlay list', this.audioPlayList);
        tween(this.node)
            .delay(3)
            .call(() => {
                this.set_ramdom_question();
            })
            .start();

    }
    //play loa
    set_loa_Audio_Play() {
        if (this.blockLoa == touchEND_State.open) {
            this.number_loa_audioPlay = this.number_loa_audioPlay + 1;
            if (this.number_loa_audioPlay == 1) {
                let audioSounce = 'df1/sound/';
                let audio_taget = this.QUESTIONCONTENT[0];
                let audioPlay = audioSounce.concat(audio_taget);
                AudioManager.instance().playShort('dark_forest', audioPlay, true);
                this.boxChat.active = true;
                this.label.string = this.QUESTIONCONTENT[0];
                this.scheduleOnce(function () {
                    this.boxChat.active = false;
                }, 2.1);
            }
            if (this.number_loa_audioPlay == 2) {
                let audioSounce = 'df1/sound/';
                let audio_taget = this.QUESTIONCONTENT[this.random_question];
                let audioPlay = audioSounce.concat(audio_taget);
                AudioManager.instance().playShort('dark_forest', audioPlay, true);
                this.boxChat.active = true;
                this.label.string = this.QUESTIONCONTENT[this.random_question];
                this.scheduleOnce(function () {
                    this.boxChat.active = false;
                }, 1.5);
                this.number_loa_audioPlay = 0;
            }
        }
    }
    //get node tree
    getNodeTree(NodeTree: Node) {
        this.nodeTree = NodeTree;
    }
    emit_chuyenScene() {
        this.node.emit('chuyen scene df2', this.point_gamePlay_VOCAB);
    }
    end_Vocabulary() {
        this.boxChat.active = false;
        this.audioPlayList = audioPlaylist.goodjob;
        this.node.emit('audioPlay list', this.audioPlayList);
    }
    show_vocabulary(vocabulary: string) {
        this.boxChat.active = true;
        this.label.string = vocabulary;
    }
    set_bird_Moving() {
        this.boxChat.active = false;
        let p1 = this.position_end1.getWorldPosition();
        let p2 = this.position_end2.getWorldPosition();
        let p3 = this.position_end3.getWorldPosition();
        let p4 = this.position_end4.getWorldPosition();
        let p5 = this.position_end5.getWorldPosition();
        this.node.emit('bird moving_eat fruits end', p1, p2, p3, p4, p5);
        this.removeNodoChilds(this.nodeTree, this.buiconho4);
    }
    setBird_like() {
        if (this.count_wrong_aswer == 0) {
            this.point_gamePlay_VOCAB = this.point_gamePlay_VOCAB + 1;
        }
        if (this.count_wrong_aswer == 1) {
            this.point_gamePlay_VOCAB = this.point_gamePlay_VOCAB + 1 / 2;
            this.count_wrong_aswer = 0;
        }
        if (this.count_wrong_aswer == 2) {
            this.point_gamePlay_VOCAB = this.point_gamePlay_VOCAB + 1 / 4;
            this.count_wrong_aswer = 0;
        }
        this.load_effect_fireworks();
        this.bird_spine = birdSpine.dung_like;
        this.emit_to_bird_spine();
        this.audioPlayList = audioPlaylist.correc;
        this.node.emit('audioPlay list', this.audioPlayList);
    }
    load_effect_fireworks() {
        PrefabManager.instance().loadPrefab('dark_forest', 'effect_fireworks/prefab/fireworks', true, this.show_screen.bind(this));
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
    setBirdSpine_Sai_khoc() {
        this.count_wrong_aswer = this.count_wrong_aswer + 1;
        this.bird_spine = birdSpine.sai_khoc;
        this.audioPlayList = audioPlaylist.wrong;
        this.node.emit('audioPlay list', this.audioPlayList);
        this.emit_to_bird_spine();
    }
    set_touchEND_state() {
        this.touchEndstate = touchEND_State.open;
    }
    setBirdMoving() {
        this.boxChat.active = false;
        let p = this.position_BirdMoving.getWorldPosition();
        let p1 = this.position_monsterMoving1.getWorldPosition();
        let p2 = this.position_monsterMoving2.getWorldPosition();
        let p3 = this.position_monsterMoving3.getWorldPosition();
        let p4 = this.position_monsterMoving4.getWorldPosition();
        let bird_p1 = this.position_BirdJump1.getWorldPosition();
        let bird_p2 = this.position_BirdJump2.getWorldPosition();
        let bird_idle = this.position_BirdIdle.getWorldPosition();
        this.bird_spine = birdSpine.di_bo_ronren;
        this.node.emit('bird moving_eat fruits', p, bird_p1, bird_p2, bird_idle, this.bird_spine);
        this.scheduleOnce(function () {
            this.node.emit('monster nhay ra', p, p1, p2, p3, p4);
        }, 3);
    }
    setAudioPlay() {
        this.boxChat.active = true;
        let p = this.boxChat.getWorldPosition();
        this.boxChat.setWorldPosition(p.x, p.y - 400, 0);
        this.label.string = this.QUESTIONCONTENT[0];
        this.audioPlayList = audioPlaylist.choose;
        this.node.emit('audioPlay list', this.audioPlayList);
        this.bird_spine = birdSpine.idle;
        this.fruit_falling();
        this.emit_to_bird_spine();
    }
    set_ramdom_question() {
        let random_question = Math.floor(Math.random() * 3) + 1;
        while (random_question == this.random_question) {
            random_question = Math.floor(Math.random() * 3) + 1;
        }
        this.random_question = random_question;
        this.boxChat.active = false;
        this.box_chat_monster.active = true;
        this.label_monster_question.string = this.QUESTIONCONTENT[random_question];
        this.node.emit('audio play_random number', random_question);
        this.node.emit('monster gao thet');
        if (random_question == 1) {
            this.question_fruits_state = getingFuitsState.strawberry;
        }
        if (random_question == 2) {
            this.question_fruits_state = getingFuitsState.banana;
        }
        if (random_question == 3) {
            this.question_fruits_state = getingFuitsState.apple;
        }
    }
    setBirdSpine() {
        this.bird_spine = birdSpine.suy_nghi;
        this.emit_to_bird_spine();
        this.boxChat.active = false;
        this.box_chat_monster.active = false;
        this.blockLoa = touchEND_State.open;
        this.node.emit('open block state fruits');
    }
    fruit_falling() {
        let banana_QL = this.banana_QL.getWorldPosition();
        let strawberry_QL = this.strawberry_QL.getWorldPosition();
        let apple_QL = this.apple_QL.getWorldPosition();
        tween(this.banana_QL)
            .to(2, { worldPosition: new Vec3(banana_QL.x, banana_QL.y - 600, 0) })
            .call(() => {
                this.node.emit('mo khoa gio hoa qua');
            })
            .start();
        tween(this.strawberry_QL)
            .to(2, { worldPosition: new Vec3(strawberry_QL.x, strawberry_QL.y - 600, 0) })
            .call(() => {
                this.node.emit('mo khoa gio hoa qua');
            })
            .start();
        tween(this.apple_QL)
            .to(2, { worldPosition: new Vec3(apple_QL.x, apple_QL.y - 600, 0) })
            .call(() => {
                this.node.emit('mo khoa gio hoa qua');
            })
            .start();
    }
    set_indexMonster() {
        let index = this.buiconho4.getSiblingIndex();
        this.monster_QL.setSiblingIndex(index + 1);
    }
    check_StartPosition(startNode: Node) {
        this.bird_spine = birdSpine.idle2;
        this.emit_to_bird_spine();
        this.startPosition = startNode.getWorldPosition();
        let p_banana = this.banana_QL.getWorldPosition();
        let p_strawberry = this.strawberry_QL.getWorldPosition();
        let p_apple = this.apple_QL.getWorldPosition();
        if (this.startPosition.x == p_banana.x && this.startPosition.y == p_banana.y) {
            this.getting_fruits_state = getingFuitsState.banana;
            this.check_NodeTouchAndQuestion();
        }
        if (this.startPosition.x == p_apple.x && this.startPosition.y == p_apple.y) {
            this.getting_fruits_state = getingFuitsState.apple;
            this.check_NodeTouchAndQuestion();
        }
        if (this.startPosition.x == p_strawberry.x && this.startPosition.y == p_strawberry.y) {
            this.getting_fruits_state = getingFuitsState.strawberry;
            this.check_NodeTouchAndQuestion();
        }
    }
    check_NodeTouchAndQuestion() {
        if (this.getting_fruits_state == getingFuitsState.apple &&
            this.question_fruits_state == getingFuitsState.apple) {
            this.questionAndGeting_fruits_OK = getingFuitsState.apple;
        }
        else if (this.getting_fruits_state == getingFuitsState.banana &&
            this.question_fruits_state == getingFuitsState.banana) {
            this.questionAndGeting_fruits_OK = getingFuitsState.banana;
        }
        else if (this.getting_fruits_state == getingFuitsState.strawberry &&
            this.question_fruits_state == getingFuitsState.strawberry) {
            this.questionAndGeting_fruits_OK = getingFuitsState.strawberry;
        }
        else {
            this.questionAndGeting_fruits_OK = getingFuitsState.nostate;
        }
    }
    check_Position_Monster(endNode: Node) {
        let p_end = endNode.getWorldPosition();
        let p_monster_QL = this.monster_QL.getWorldPosition();
        let p_monster_convert = new Vec3(p_monster_QL.x - 70, p_monster_QL.y + 270, 0);
        let X = Math.abs(p_monster_convert.x - p_end.x);
        let Y = Math.abs(p_monster_convert.y - p_end.y);
        let distanceNode_moving_monster = Math.sqrt(X * X + Y * Y);
        if (this.questionAndGeting_fruits_OK == getingFuitsState.apple) {
            if (distanceNode_moving_monster <= 200) {
                this.node.emit('fruits moving to origin position', this.questionAndGeting_fruits_OK, p_monster_convert);
                this.node.emit('monster eat start');
            } else {
                this.node.emit('fruits moving to origin_out_monster');
            }
        }
        else if (this.questionAndGeting_fruits_OK == getingFuitsState.banana) {
            if (distanceNode_moving_monster <= 200) {
                this.node.emit('fruits moving to origin position', this.questionAndGeting_fruits_OK, p_monster_convert);
                this.node.emit('monster eat start');
            } else {
                this.node.emit('fruits moving to origin_out_monster');
            }
        }
        else if (this.questionAndGeting_fruits_OK == getingFuitsState.strawberry) {
            if (distanceNode_moving_monster <= 200) {
                this.node.emit('fruits moving to origin position', this.questionAndGeting_fruits_OK, p_monster_convert);
                this.node.emit('monster eat start');
            } else {
                this.node.emit('fruits moving to origin_out_monster');
            }
        }
        else if (this.questionAndGeting_fruits_OK == getingFuitsState.nostate) {
            this.questionAndGeting_fruits_OK = getingFuitsState.nostate;
            this.node.emit('fruits moving to origin position', this.questionAndGeting_fruits_OK);
            if (distanceNode_moving_monster <= 200) {
                this.node.emit('fruits moving to origin position_inMonster', p_monster_convert);
                this.node.emit('monster eat_false');
            }
        }
    }
    emit_to_bird_spine() {
        if (this.bird_spine == birdSpine.idle) {
            this.node.emit('bird chuyen spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.suy_nghi) {
            this.node.emit('bird chuyen spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.idle2) {
            this.node.emit('bird chuyen spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.sai_khoc) {
            this.node.emit('bird chuyen spine', this.bird_spine);
        }
        if (this.bird_spine == birdSpine.dung_like) {
            this.node.emit('bird chuyen spine', this.bird_spine);
        }
    }
    removeNodoChilds(parentNode: Node, nodeChild: Node) {
        let pos = this.getPostionInOtherNode(parentNode, nodeChild) as Vec3;
        nodeChild.setPosition(pos);
        nodeChild.parent = parentNode;
    }
    getPostionInOtherNode(spaceNode: any, targetNode: any) {
        if (targetNode.parent == null) {
            return null;
        }
        let pos = new Vec3(0, 0, 0);
        const targetNodeComponent = targetNode.parent.getComponent(UITransform);
        const spaceNodeComponent = spaceNode.getComponent(UITransform);
        if (!targetNodeComponent) {
            targetNode.parent.addComponent(UITransform);
        }
        if (!spaceNodeComponent) {
            spaceNode.addComponent(UITransform);
        }
        pos = targetNodeComponent.convertToWorldSpaceAR(targetNode.getPosition());
        return spaceNodeComponent ? spaceNodeComponent.convertToNodeSpaceAR(pos) : pos;
    };
    update(deltaTime: number) {
    }
}


