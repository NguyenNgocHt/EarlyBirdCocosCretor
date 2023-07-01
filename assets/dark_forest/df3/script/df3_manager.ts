import { _decorator, Component, Node, math, Vec3, log, random, Prefab, instantiate, tween, sys, JsonAsset } from 'cc';
import { moveBird } from '../../df4/script/moveBird';
import { ScreenManager } from '../../../loading/script/ScreenManager';
import { PrefabManager } from '../../../loading/script/PrefabManager';
const { ccclass, property } = _decorator;

enum MOVINGSTATE {
    NOTMOVING,
    TIEN,
    LUI,
    ABOUT_THE_POINT_ORIGIN,
    ABOUT_STATING_POSITION,
};
enum BOARDSTATE {
    NOSTATE,
    UP,
    DOWN,
    FALLING,
}
enum BIRDSTATE {
    NOSTATE,
    SETUP,
    BUON,
    DI_BO,
    GAT_DAU,
    IDLE,
    IDLE_GAIMONG,
    LIKE,
    LIKE2,
    LO_KANG,
    SO_HAI,
    SUY_NGHI,
    VOTAY,
    VOTAY2,
    VOTAY3,
    TRALOI,
    NHUN_NHAY,
    IDLE2,
};
enum bearSpine {
    nostate,
    idle,
    idle2,
    idle3,
    run,
    toleft,
    toright,
    idle_happy,
    idle_sad,
    walk,
    win,
    dung_lai2,
}
enum CHICKENSTATE {
    NOSTATE,
    IDLE,
    DIBO,
    BUON,
    LIKE,
    VOTAY,
    VUIMUNG,
}
enum AUDIOSTATE {
    NOSTATE,
    CHOOSETHERIGHTANSWER,
    OPPS_WHEREISOURFRIEND,
    SOUNDCORRECT,
    GOODJOB,
    SOUNDXU,
    WRONG,
    AREYOUOK,
    HAVEYOUFOUND,
    PLEASEDRAWTHECORRECTCOLOR,
    HAVEYOUCHOSENANYCOLOR,
    STAR,
    CIRCLE,
    SQUARE,
    TRIANGLE,
};
enum BUICOSTATE {
    NOSTATE,
    BUICO1,
    BUICO2,
    BUICO3,
}
enum CORRECTORWRONG {
    NO,
    CORRECT,
    WRONG,
}
enum runglaSTATE {
    nostate,
    larung,
    dungim,
}
enum chuyencanhState {
    nostate,
    chuyencanh,
    dungim,
}
enum getcolorstate {
    nostate,
    takingColorOK,
    drawingColorCorrec,
    drawingcolorWrong,
}
enum sceneState {
    noState,
    findLocation,
    drawingColor,
    collectPictures,
}
enum DISPLAYSTATE {
    NOSTATE,
    CHOOSETHERIGHTANSWER,
    OPPS_WHEREISOURFRIEND,
    PLEASEDRAWTHECORRECTCOLOR,
    STAR,
    CIRCLE,
    SQUARE,
    TRIANGLE,
};
enum startingHungHinh {
    nostate,
    start,
    pause,
    stop,
    endGame,
}
@ccclass('df3_manager')
export class df3_manager extends Component {
    MOVING_POSITION_LIST: Vec3[];
    INDEX_NUMBER_LIST: number[];
    POINT_GAME_PLAY: number[];
    NAME_SKILL_GAME_PLAY: string[];
    POSITION_BUFFTERFLY_MOVING_LIST: Vec3[];
    @property(Node)
    layer1: Node = null
    @property({ type: Node })
    private button_setting: Node = null;
    @property({ type: Node })
    private OntheTree: Node = null;
    @property({ type: Node })
    private OntheGround: Node = null;
    @property({ type: Node })
    private BehindTree: Node = null;
    @property({ type: Node })
    private InfrontTree: Node = null;
    @property({ type: Node })
    private LeftTree: Node = null;
    @property({ type: Node })
    private RightTree: Node = null;
    @property({ type: Node })
    private underthetree: Node = null;
    @property({ type: Node })
    private groveoftree: Node = null;
    @property({ type: Node })
    private emitfromBird: Node = null;
    @property({ type: Node })
    private emitfromChicken: Node = null;
    @property({ type: Node })
    private emitfromaudiocontroler: Node = null;
    @property({ type: Node })
    private emitfromBangroi: Node = null;
    @property({ type: Node })
    private lumcay: Node = null;
    @property({ type: Node })
    private boxchat: Node = null;
    @property({ type: Node })
    private tomau: Node = null
    @property({ type: Node })
    private chickenOrigin: Node = null;
    @property({ type: Node })
    private birdOrigin: Node = null;
    @property({ type: Node })
    private birdStartingPosition: Node = null;
    @property({ type: Node })
    private bongden: Node = null;
    @property({ type: Node })
    private board: Node = null;
    @property({ type: Node })
    private spineChuyenCanh: Node = null;
    @property({ type: Node })
    private emitfrom_Hunghinh: Node = null;
    @property(Node)
    private position_buffterfly_moving_list: Node = null;
    private movingstate_bird: MOVINGSTATE = MOVINGSTATE.NOTMOVING;
    private movingstate_chicken: MOVINGSTATE = MOVINGSTATE.NOTMOVING;
    private birdSpine: BIRDSTATE = BIRDSTATE.NOSTATE;
    private chickenSpine: CHICKENSTATE = CHICKENSTATE.NOSTATE;
    private audiostate: AUDIOSTATE = AUDIOSTATE.NOSTATE;
    private showquestion: DISPLAYSTATE = DISPLAYSTATE.NOSTATE;
    private buicoState: BUICOSTATE = BUICOSTATE.NOSTATE;
    private correctORwrong: CORRECTORWRONG = CORRECTORWRONG.NO;
    private boardState: BOARDSTATE = BOARDSTATE.NOSTATE;
    private runglaState: runglaSTATE = runglaSTATE.nostate;
    private vachamrunglaState: runglaSTATE = runglaSTATE.nostate;
    private chuyencanhstate: chuyencanhState = chuyencanhState.nostate;
    private getColorstate: getcolorstate = getcolorstate.nostate;
    private Scenestate: sceneState = sceneState.noState;
    private bearspine: bearSpine = bearSpine.nostate;
    private StartHunghinhState: startingHungHinh = startingHungHinh.nostate;
    private positionChicken: Vec3 = new Vec3(0, 0, 0);
    private numberIndex: number = 0;
    private randomNumber: number = 0;
    private random_number_before: number = 0;
    private nameAudioPlay: string = " ";
    private nameNodeforchicken: string = " ";
    private nameNode_getColor: string = " ";
    private numberAnswerfromPressBuico: number = 0;
    private countScene: number = 0;
    private count_ABOUT_STATING_POSITION: number = 0;
    private count_findLocation_number: number = 0;
    private position_0: Vec3 = new Vec3(0, 0, 0);
    private point_gamePlay_read: number = 0;
    private point_gamePlay_vocab: number = 0;
    private point_gamePlay_listen: number = 0;
    private count_wrong_answer: number = 0;
    private limit_number: number = 0;

    start() {
        this.button_setting.on(Node.EventType.TOUCH_START, this.loadDf4, this);
        this.position_buffterfly_moving_list.on('arr moving position_buffter fly', this.get_position_buffterfly_moving_list, this);
        //emit from setpositonandindex
        this.OntheTree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.OntheGround.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.groveoftree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.underthetree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.BehindTree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.InfrontTree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.LeftTree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        this.RightTree.on('emit position and index chicken', this.setPositionandIndexForChicken, this);
        //emit from movingBird
        this.emitfromBird.on('moving end', this.setBirdState, this);
        this.emitfromBird.on('spine_ok', this.setBirdSpine, this);
        this.emitfromBird.on('spine chuyen canh', this.setchuyencanh, this);
        //emit from audiocontroler
        this.emitfromaudiocontroler.on('audio end', this.setshowAnswer, this);
        this.emitfromaudiocontroler.on('audio state', this.setshowQuestion, this);
        this.emitfromaudiocontroler.on('answer audio OK', this.check_CorrectOrWrong, this);
        this.emitfromaudiocontroler.on('audio end_main_hunghinh', this.setstarting_Mainhunghinh, this);
        this.emitfromaudiocontroler.on('audio_end_for_next_picture_for_main_hung_hinh', this.set_box_chat, this);
        this.emitfromaudiocontroler.on('audio play end', this.set_end, this);
        this.emitfromaudiocontroler.on('spine bear seting', this.emito_hunghinh, this);
        //emit from displayAnswer(lumcay)
        this.lumcay.on('press buico', this.setAudioPlay_answerQuestion, this);
        //emit from chicken
        this.emitfromChicken.on('move to origin OK', this.setspineChicken, this);
        this.emitfromChicken.on('spine ok', this.setmoveChicken, this);
        this.emitfromChicken.on('chicken keep moving', this.emit_chicken_keep_moving, this);
        this.emitfromChicken.on('chicken swap spine', this.set_spine_chicken, this);
        //emit from board
        this.board.on('falling end', this.setAudioPlayBoard, this);
        this.board.on('position canh bang', this.setlarung, this);
        //emit from bangroi
        this.emitfromBangroi.on('get color ok', this.setStateBirdfromBangroi, this);
        //emit from hung hinh
        this.emitfrom_Hunghinh.on('bear spine ok', this.audiocontrolerSetting, this);
        this.emitfrom_Hunghinh.on('correc', this.setaudioPlay_correc, this);
        this.emitfrom_Hunghinh.on('wrong', this.setaudioPlay_wrong, this);
        this.emitfrom_Hunghinh.on('name_audio_play', this.set_name_audioPlay_and_show_boxChat, this);
        this.emitfrom_Hunghinh.on('win_end game', this.set_endGame, this);
        this.emitfrom_Hunghinh.on('goi chuyen man', this.setchuyenman, this);
    }
    //get position buffterfly moving list
    get_position_buffterfly_moving_list(position_moving_list: Vec3[]) {
        if (!this.POSITION_BUFFTERFLY_MOVING_LIST) {
            this.MOVING_POSITION_LIST = [];
        }
        this.MOVING_POSITION_LIST = position_moving_list;
        console.log('position_moving_list', this.MOVING_POSITION_LIST);
        this.node.emit('moving_position_buffter_fly_list', this.MOVING_POSITION_LIST);
    }
    //set chuyen man
    setchuyenman() {
        sys.localStorage.setItem('POINT_GAME_PLAY', JSON.stringify(this.POINT_GAME_PLAY));
        sys.localStorage.setItem('NAME_SKILL_GAME_PLAY', JSON.stringify(this.NAME_SKILL_GAME_PLAY));
        this.loadDf4();
    }
    loadDf4() {
        this.scheduleOnce(function () {
            PrefabManager.instance().loadPrefab('dark_forest', 'df4/prefab/Index', true, this.showDf4.bind(this));
            tween(this.node)
                .delay(0.8)
                .call(() => {
                    PrefabManager.instance().loadPrefab('dark_forest', 'scene_change/prefab/sceneChange', true, this.show_scene_change.bind(this));
                })
                .start();
        }, 0.8)
    }
    show_scene_change(error: number, prefab: Prefab) {
        console.log('show_scene_change');
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen scene_change');
        } else {
            console.log('showScreen scene_change error', error);
        }
    }
    showDf4(error: number, prefab: Prefab) {
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen Df4');
        } else {
            console.log('showScreen Df4 error', error);
        }
    }
    //set end_game
    set_endGame(state: number, point_gamePlay_Listen: number) {
        if (state == startingHungHinh.endGame) {
            this.point_gamePlay_listen = point_gamePlay_Listen;
            if (this.limit_number == 0) {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'LISTEN') {
                        this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + this.point_gamePlay_listen;
                    }
                }
                this.limit_number = 1;
            }
            this.StartHunghinhState = startingHungHinh.endGame;
            this.audiostate = AUDIOSTATE.SOUNDCORRECT;
            this.node.emit('end game');
        }
    }
    //set la rung
    setlarung(position: Vec3, boardstate: number) {
        if (boardstate == BOARDSTATE.FALLING) {
            this.vachamrunglaState = runglaSTATE.larung;
            this.node.emit('position canh bang va cham', position, this.vachamrunglaState);
        }
        if (boardstate == BOARDSTATE.DOWN) {
            this.vachamrunglaState = runglaSTATE.dungim;
            this.scheduleOnce(function () {
                this.node.emit('position canh bang va cham', position, this.vachamrunglaState);
            }, 0.8);
        }
    }
    //set next picture_name_audioPlay_and_show_boxchat
    set_name_audioPlay_and_show_boxChat(name_audioPlay: string) {
        this.nameAudioPlay = name_audioPlay;
        this.boxchat.active = true;
        this.node.emit('audioPlaying_nex_picture', this.nameAudioPlay);
        this.setboxQuestion();
    }
    //set box chat
    set_box_chat() {
        this.boxchat.active = false;
    }
    //set end game
    set_end() {

    }
    emito_hunghinh() {
        this.node.emit('spine bear seting');
    }
    //set starting_main hung hinh
    setstarting_Mainhunghinh() {
        this.boxchat.active = false;
        this.StartHunghinhState = startingHungHinh.start;
        this.node.emit('starting hung hinh', this.StartHunghinhState);
    }
    //set audio controler from hung hinh
    audiocontrolerSetting(state: number) {
        this.boxchat.active = true;
        var audioContro_array_hunghinh = [];
        audioContro_array_hunghinh = [" ", "star", "circle", "square", "triangle"];
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        this.nameAudioPlay = audioContro_array_hunghinh[randomNumber];
        if (state == bearSpine.idle3) {
            this.node.emit('audio play_hunghinh', this.nameAudioPlay);
            this.node.emit('number for audioPlay', randomNumber);
        }
        this.setboxQuestion();
    }
    setaudioPlay_correc() {
        this.audiostate = AUDIOSTATE.SOUNDCORRECT;
        this.emitToAudioControler();
    }
    setaudioPlay_wrong() {
        this.audiostate = AUDIOSTATE.WRONG;
        this.emitToAudioControler();
    }
    //set box question
    setboxQuestion() {
        if (this.nameAudioPlay == 'star') {
            this.showquestion = DISPLAYSTATE.STAR;
            this.emittoShowQuestion();
        }
        if (this.nameAudioPlay == 'circle') {
            this.showquestion = DISPLAYSTATE.CIRCLE;
            this.emittoShowQuestion();
        }
        if (this.nameAudioPlay == 'square') {
            this.showquestion = DISPLAYSTATE.SQUARE;
            this.emittoShowQuestion();
        }
        if (this.nameAudioPlay == 'triangle') {
            this.showquestion = DISPLAYSTATE.TRIANGLE;
            this.emittoShowQuestion();
        }
    }
    //set audio play for board
    setAudioPlayBoard(state: number) {
        if (state == BOARDSTATE.FALLING) {
            this.boxchat.active = true;
            this.audiostate = AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR;
            this.showquestion = DISPLAYSTATE.PLEASEDRAWTHECORRECTCOLOR;
            this.runglaState = runglaSTATE.dungim;
            this.scheduleOnce(function () {
                this.emittorungla();
            }, 3);
            this.emitToAudioControler();
            this.node.emit('rung la state end', this.runglaState);
            this.emittoShowQuestion();
        }
        if (state == BOARDSTATE.UP) {
            this.birdSpine = BIRDSTATE.DI_BO;
            this.movingstate_bird = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
            this.emittoBirdSpine();
            this.emittoMovingBird();
        }
    }
    //remind setting

    //set spine chicken
    set_spine_chicken() {
        this.chickenSpine = CHICKENSTATE.IDLE;
        this.audiostate = AUDIOSTATE.CHOOSETHERIGHTANSWER;
        this.boxchat.active = true;
        this.emitToAudioControler();
        this.emittoChickenSpine();
    }
    //chicken keep moving
    emit_chicken_keep_moving(keep_moving_index: number, random_number: number, moving_position_list: Vec3[], index_number_list: number[]) {
        this.node.emit('chicken_keep_moving', keep_moving_index, random_number, moving_position_list, index_number_list);
    }
    //set move chicken
    setmoveChicken(state: number) {
        var positionArray = [];
        positionArray = [" ", "onthetree", "groveoftree", "underthetree", "ontheground", "lefttree", "behindtree", "righttree", "infronttree"];
        let p1 = this.OntheTree.getWorldPosition();
        let p2 = this.groveoftree.getWorldPosition();
        let p3 = this.underthetree.getWorldPosition();
        let p4 = this.OntheGround.getWorldPosition();
        let p5 = this.LeftTree.getWorldPosition();
        let p6 = this.BehindTree.getWorldPosition();
        let p7 = this.RightTree.getWorldPosition();
        let p8 = this.InfrontTree.getWorldPosition();
        if (!this.MOVING_POSITION_LIST) {
            this.MOVING_POSITION_LIST = [];
        }
        this.MOVING_POSITION_LIST = [this.position_0, p1, p2, p3, p4, p5, p6, p7, p8];
        let index1 = this.OntheTree.getSiblingIndex();
        let index2 = this.groveoftree.getSiblingIndex();
        let index3 = this.underthetree.getSiblingIndex();
        let index4 = this.OntheGround.getSiblingIndex();
        let index5 = this.LeftTree.getSiblingIndex();
        let index6 = this.BehindTree.getSiblingIndex();
        let index7 = this.RightTree.getSiblingIndex();
        let index8 = this.InfrontTree.getSiblingIndex();
        if (!this.INDEX_NUMBER_LIST) {
            this.INDEX_NUMBER_LIST = [];
        }
        this.INDEX_NUMBER_LIST = [0, index1, index2, index3, index4, index5, index6, index7, index8];
        this.random_number_before = this.randomNumber;
        this.count_findLocation_number = this.count_findLocation_number + 1;
        if (this.count_findLocation_number == 1) {
            if (state == CHICKENSTATE.BUON || state == CHICKENSTATE.LIKE) {
                let randomnumber = Math.floor(Math.random() * 8) + 1;
                while (randomnumber == this.randomNumber) {
                    randomnumber = Math.floor(Math.random() * 8) + 1;
                }
                this.randomNumber = randomnumber;
                let stringP = positionArray[randomnumber];
                this.nameNodeforchicken = stringP;
                this.node.emit('chicken moving to position', this.random_number_before, this.randomNumber, this.MOVING_POSITION_LIST, this.INDEX_NUMBER_LIST);
                this.chickenSpine = CHICKENSTATE.DIBO;
                this.emittoChickenSpine();
            }
        }
        if (this.count_findLocation_number == 2) {
            if (state == CHICKENSTATE.BUON) {
                this.emitfromChicken.setScale(0.5, 0.5, 0.5);
                this.bongden.setScale(0.5, 0.5, 0.5);
                this.chickenSpine = CHICKENSTATE.DIBO;
                this.movingstate_chicken = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.birdSpine = BIRDSTATE.DI_BO;
                this.movingstate_bird = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.emittoBirdSpine();
                this.emittoMovingBird();
                this.emittochickenMove();
                this.emittoChickenSpine();
            }
            if (state == CHICKENSTATE.LIKE) {
                this.bongden.setScale(0.5, 0.5, 0.5);
                this.emitfromChicken.setScale(0.5, 0.5, 0.5);
                this.chickenSpine = CHICKENSTATE.DIBO;
                this.movingstate_chicken = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.birdSpine = BIRDSTATE.DI_BO;
                this.movingstate_bird = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.emittoBirdSpine();
                this.emittoMovingBird();
                this.emittochickenMove();
                this.emittoChickenSpine();
            }
        }
    }
    //set spine chicken
    setspineChicken() {
        this.chickenSpine = CHICKENSTATE.VUIMUNG;
        this.emittoChickenSpine();
    }
    //set audio play for answer question
    setAudioPlay_answerQuestion(state: number, numberAnswerQuestion: number) {
        if (state == BUICOSTATE.BUICO1) {
            this.buicoState = BUICOSTATE.BUICO1;
            this.birdSpine = BIRDSTATE.TRALOI;
            this.numberAnswerfromPressBuico = numberAnswerQuestion;
            this.node.emit('press number', this.numberAnswerfromPressBuico);
            this.emittoBirdSpine();
        }
        if (state == BUICOSTATE.BUICO2) {
            this.buicoState = BUICOSTATE.BUICO2;
            this.birdSpine = BIRDSTATE.TRALOI;
            this.numberAnswerfromPressBuico = numberAnswerQuestion;
            this.node.emit('press number', this.numberAnswerfromPressBuico);
            this.emittoBirdSpine();
        }
        if (state == BUICOSTATE.BUICO3) {
            this.buicoState = BUICOSTATE.BUICO3;
            this.birdSpine = BIRDSTATE.TRALOI;
            this.numberAnswerfromPressBuico = numberAnswerQuestion;
            this.node.emit('press number', this.numberAnswerfromPressBuico);
            this.emittoBirdSpine();
        }
    }
    //check correct or wrong
    check_CorrectOrWrong() {
        if (this.numberAnswerfromPressBuico == this.randomNumber) {
            this.point_gamePlay_read = this.point_gamePlay_read + 1;
            this.load_effect_fireworks();
            this.correctORwrong = CORRECTORWRONG.CORRECT;
            this.setAudioPlayCorrectOrWrong()
        }
        else if (this.numberAnswerfromPressBuico != this.randomNumber) {
            this.correctORwrong = CORRECTORWRONG.WRONG;
            this.setAudioPlayCorrectOrWrong()
        }
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
    //set audio play correct or wrong
    setAudioPlayCorrectOrWrong() {
        if (this.correctORwrong == CORRECTORWRONG.CORRECT) {
            this.audiostate = AUDIOSTATE.SOUNDCORRECT;
            this.emitToAudioControler();
        }
        if (this.correctORwrong == CORRECTORWRONG.WRONG) {
            this.audiostate = AUDIOSTATE.WRONG;
            this.emitToAudioControler();
        }
    }
    //set show question
    setshowQuestion(state: number) {
        if (state == AUDIOSTATE.CHOOSETHERIGHTANSWER) {
            this.showquestion = DISPLAYSTATE.CHOOSETHERIGHTANSWER;
            this.emittoShowQuestion();
        }
        if (state == AUDIOSTATE.OPPS_WHEREISOURFRIEND) {
            this.showquestion = DISPLAYSTATE.OPPS_WHEREISOURFRIEND;
            this.emittoShowQuestion();
        }
    }
    //set show answer
    setshowAnswer(state: number) {
        if (this.Scenestate == sceneState.findLocation) {
            if (state == AUDIOSTATE.OPPS_WHEREISOURFRIEND) {
                this.boxchat.active = false;
                this.lumcay.active = true;
                this.scheduleOnce(function () {
                    this.node.emit('random number', this.randomNumber);
                    this.node.emit('open block');
                    this.birdSpine = BIRDSTATE.SUY_NGHI;
                    this.emittoBirdSpine();
                }, 0.1);
            }
            if (state == AUDIOSTATE.WRONG) {
                this.birdSpine = BIRDSTATE.BUON;
                this.chickenSpine = CHICKENSTATE.BUON;
                this.node.emit('clear answer');
                tween(this.node)
                    .delay(0.1)
                    .call(() => {
                        this.lumcay.active = false;
                    })
                    .start();
                this.emittoBirdSpine();
                this.emittoChickenSpine();
            }
            if (state == AUDIOSTATE.SOUNDCORRECT) {
                this.birdSpine = BIRDSTATE.LIKE;
                this.chickenSpine = CHICKENSTATE.LIKE;
                this.node.emit('clear answer');
                tween(this.node)
                    .delay(0.1)
                    .call(() => {
                        this.lumcay.active = false;
                    })
                    .start();
                this.emittoBirdSpine();
                this.emittoChickenSpine();
            }
        }
        if (this.Scenestate == sceneState.drawingColor) {
            if (state == AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR) {
                this.boxchat.active = false;
                this.node.emit('set name color');
                this.birdSpine = BIRDSTATE.SUY_NGHI;
                this.emittoBirdSpine();
            }
        }
    }
    //set audio controler
    setBirdSpine(state: number, countSpine: number) {
        if (this.Scenestate == sceneState.findLocation) {
            if (state == BIRDSTATE.IDLE) {
                this.audiostate = AUDIOSTATE.CHOOSETHERIGHTANSWER;
                this.emitToAudioControler();
            }
            if (state == BIRDSTATE.TRALOI) {
                this.birdSpine = BIRDSTATE.IDLE_GAIMONG;
                this.emittoBirdSpine();
            }
            if (state == BIRDSTATE.LIKE) {
                this.birdSpine = BIRDSTATE.DI_BO;
                this.movingstate_bird = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.emittoBirdSpine();
                this.emittoMovingBird();
            }
            if (state == BIRDSTATE.BUON) {
                this.birdSpine = BIRDSTATE.DI_BO;
                this.movingstate_bird = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.emittoBirdSpine();
                this.emittoMovingBird();
            }
            if (state == BIRDSTATE.NHUN_NHAY) {
                this.movingstate_bird = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.emitfromChicken.active = false;
                this.bongden.active = false;
                this.runglaState = runglaSTATE.larung;
                this.emittoMovingBird();
                this.emittorungla();
            }
        }
        if (this.Scenestate == sceneState.drawingColor) {
            if (state == BIRDSTATE.IDLE) {
                this.boardState = BOARDSTATE.FALLING;
                this.tomau.active = true;
                this.scheduleOnce(function () {
                    this.emittoBangroi();
                }, 0.1);

            }
            if (state == BIRDSTATE.LIKE) {
                this.birdSpine = BIRDSTATE.IDLE;
                this.emittoBirdSpine();
            }
            if (state == BIRDSTATE.BUON) {
                this.birdSpine = BIRDSTATE.IDLE;
                this.emittoBirdSpine();
            }
            if (state == BIRDSTATE.NHUN_NHAY) {
                this.movingstate_bird = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.emittoMovingBird();
            }
        }
    }
    setchuyencanh() {
        if (this.Scenestate == sceneState.findLocation) {
            if (this.limit_number == 0) {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'READ') {
                        this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + this.point_gamePlay_read;
                    }
                }
                this.limit_number = 1;
            }
            this.spineChuyenCanh.active = true;
            this.scheduleOnce(function () {
                this.limit_number = 0;
                this.chuyencanhstate = chuyencanhState.chuyencanh;
                this.emittochuyencanh();
            }, 0.1);
        }
        if (this.Scenestate == sceneState.drawingColor) {
            if (this.limit_number == 0) {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'VOCAB') {
                        this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + this.point_gamePlay_vocab;
                    }
                }
                this.limit_number = 1;
            }
            this.spineChuyenCanh.active = true;
            this.scheduleOnce(function () {
                this.limit_number = 0;
                this.chuyencanhstate = chuyencanhState.chuyencanh;
                this.emittochuyencanh();
            }, 0.1);
        }

    }
    setPositionandIndexForChicken(positionforChicken: Vec3, numberindex: number) {
        this.positionChicken = positionforChicken;
        this.numberIndex = numberindex;
        this.node.emit('emit to move chicken', this.positionChicken, this.numberIndex);
    }
    onLoad() {
        this.Scenestate = sceneState.findLocation;
        var positionArray = [];
        positionArray = [" ", "onthetree", "groveoftree", "underthetree", "ontheground", "lefttree", "behindtree", "righttree", "infronttree"];
        let randomnumber = Math.floor(Math.random() * 8) + 1;
        this.randomNumber = randomnumber;
        let stringP = positionArray[randomnumber];
        this.nameNodeforchicken = stringP;
        let nodeParent = this.LeftTree.parent;
        let childs = nodeParent.children;
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].name == this.nameNodeforchicken) {
                let p = childs[i].getWorldPosition();
                let index = childs[i].getSiblingIndex();
                this.emitfromChicken.setWorldPosition(p.x, p.y, 0);
                this.emitfromChicken.setSiblingIndex(index + 2);
                this.bongden.setWorldPosition(p.x, p.y, 0);
                this.bongden.setSiblingIndex(index + 1);
            }
        }
        this.lumcay.active = false;
        this.boxchat.active = false;
        this.tomau.active = false;
        this.emitfrom_Hunghinh.active = false;
        this.spineChuyenCanh.active = false;
        this.get_local_storage();
    }
    get_local_storage() {
        if (!this.POINT_GAME_PLAY) {
            this.POINT_GAME_PLAY = [];
        }
        this.POINT_GAME_PLAY = JSON.parse(sys.localStorage.getItem('POINT_GAME_PLAY'));
        var string_name_skill = sys.localStorage.getItem('NAME_SKILL_GAME_PLAY');
        this.NAME_SKILL_GAME_PLAY = JSON.parse(string_name_skill);
    }
    //set bird state
    setBirdState(state: number, count: number) {
        if (this.Scenestate == sceneState.findLocation) {
            if (state == MOVINGSTATE.TIEN) {
                this.birdSpine = BIRDSTATE.IDLE;
                this, this.scheduleOnce(function () {
                    this.boxchat.active = true;
                }, 0.9);
                this.emittoBirdSpine();
            }
            if (state == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                this.birdSpine = BIRDSTATE.NHUN_NHAY;
                this.emittoBirdSpine();
            }
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.Scenestate = sceneState.drawingColor;
            }
        }
        else if (this.Scenestate == sceneState.drawingColor) {
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION && count == 2) {
                this.birdSpine = BIRDSTATE.DI_BO;
                this.movingstate_bird = MOVINGSTATE.TIEN;
                this.emittoBirdSpine();
                this.emittoMovingBird();
            }
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION && count == 3) {
                this.Scenestate = sceneState.collectPictures;
                this.emitfrom_Hunghinh.active = true;

            }
            if (state == MOVINGSTATE.TIEN) {
                this.birdSpine = BIRDSTATE.IDLE;
                this.emittoBirdSpine();
                this.count_ABOUT_STATING_POSITION = 0;
            }
            if (state == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                this.birdSpine = BIRDSTATE.NHUN_NHAY;
                this.emittoBirdSpine();
            }
        }
        else if (this.Scenestate == sceneState.collectPictures) {
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.scheduleOnce(function () {
                    this.node.emit('collectPictures start', this.Scenestate);
                }, 0.1)
            }
        }
    }
    setStateBirdfromBangroi(state: number, nameNodeColor: string) {
        if (state == getcolorstate.takingColorOK) {
            this.nameNode_getColor = nameNodeColor;
            this.node.emit('name node get color', this.nameNode_getColor);
            this.birdSpine = BIRDSTATE.IDLE2;
            this.emittoBirdSpine();
        }
        if (state == getcolorstate.drawingColorCorrec) {
            this.point_gamePlay_vocab = this.point_gamePlay_vocab + 1;
            this.load_effect_fireworks();
            this.birdSpine = BIRDSTATE.LIKE;
            this.audiostate = AUDIOSTATE.SOUNDCORRECT;
            this.emittoBirdSpine();
            this.emitToAudioControler();
        }
        if (state == getcolorstate.drawingcolorWrong) {
            this.birdSpine = BIRDSTATE.BUON;
            this.audiostate = AUDIOSTATE.WRONG;
            this.emittoBirdSpine();
            this.emitToAudioControler();
        }
    }
    //emit to moving bird
    emittoMovingBird() {
        if (this.Scenestate == sceneState.findLocation) {
            if (this.movingstate_bird == MOVINGSTATE.TIEN) {
                this.node.emit('bird move', this.movingstate_bird, 0, this.Scenestate);
            }
            if (this.movingstate_bird == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                let p = this.birdOrigin.getWorldPosition();
                this.node.emit('bird move', this.movingstate_bird, p, this.Scenestate);
            }
            if (this.movingstate_bird == MOVINGSTATE.ABOUT_STATING_POSITION) {
                let p = this.birdStartingPosition.getWorldPosition();
                this.node.emit('bird move', this.movingstate_bird, p, this.Scenestate);
            }
        }
        if (this.Scenestate == sceneState.drawingColor) {
            if (this.movingstate_bird == MOVINGSTATE.TIEN) {
                let p = this.birdStartingPosition.getWorldPosition();
                this.node.emit('bird move', this.movingstate_bird, p, this.Scenestate);
            }
            if (this.movingstate_bird == MOVINGSTATE.ABOUT_STATING_POSITION) {
                let p = this.birdStartingPosition.getWorldPosition();
                this.node.emit('bird move', this.movingstate_bird, p, this.Scenestate);
            }
            if (this.movingstate_bird == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                let p = this.birdOrigin.getWorldPosition();
                this.node.emit('bird move', this.movingstate_bird, p, this.Scenestate);
            }
        }
        if (this.Scenestate == sceneState.collectPictures) {
            if (this.movingstate_bird == MOVINGSTATE.ABOUT_STATING_POSITION) {
                let p = this.birdStartingPosition.getWorldPosition();
                this.node.emit('bird move', this.movingstate_bird, p, this.Scenestate);
            }
        }
    }
    //emit to chicken
    emittoChickenSpine() {
        if (this.chickenSpine == CHICKENSTATE.LIKE) {
            this.node.emit('chicken chuyen spine', this.chickenSpine);
        }
        if (this.chickenSpine == CHICKENSTATE.DIBO) {
            this.node.emit('chicken chuyen spine', this.chickenSpine);
        }
        if (this.chickenSpine == CHICKENSTATE.IDLE) {
            this.node.emit('chicken chuyen spine', this.chickenSpine);
        }
        if (this.chickenSpine == CHICKENSTATE.VUIMUNG) {
            this.node.emit('chicken chuyen spine', this.chickenSpine);
        }
        if (this.chickenSpine == CHICKENSTATE.BUON) {
            this.node.emit('chicken chuyen spine', this.chickenSpine);
        }
    }
    //emit to chicken move
    emittochickenMove() {
        var positionArray = [];
        positionArray = [" ", "onthetree", "groveoftree", "underthetree", "ontheground", "lefttree", "behindtree", "righttree", "infronttree",];
        if (this.movingstate_chicken == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
            let positionOrigin = this.chickenOrigin.getWorldPosition();
            let positionChicken = this.emitfromChicken.getWorldPosition();
            let p = this.emitfromChicken.getWorldScale();
            let Pgrove = this.groveoftree.getWorldPosition();
            let Punder = this.underthetree.getWorldPosition();
            let lefttree = this.LeftTree.getWorldPosition();
            if (positionArray[this.randomNumber] == "onthetree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber, Pgrove, Punder);

            }
            if (positionArray[this.randomNumber] == "groveoftree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber, Punder);
            }
            if (positionArray[this.randomNumber] == "underthetree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber);
            }
            if (positionArray[this.randomNumber] == "ontheground") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber);
            }
            if (positionArray[this.randomNumber] == "behindtree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber, lefttree);
            }
            if (positionArray[this.randomNumber] == "infronttree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber);
            }
            if (positionArray[this.randomNumber] == "lefttree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber);
            }
            if (positionArray[this.randomNumber] == "righttree") {
                this.node.emit('chicken moving', this.movingstate_chicken, positionOrigin, this.randomNumber, lefttree);
            }
        }
    }
    //emit to bird spine
    emittoBirdSpine() {
        if (this.Scenestate == sceneState.findLocation) {
            if (this.birdSpine == BIRDSTATE.IDLE) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.DI_BO) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.SUY_NGHI) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.TRALOI) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.IDLE_GAIMONG) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.LIKE) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.BUON) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.NHUN_NHAY) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
        }
        if (this.Scenestate == sceneState.drawingColor) {
            if (this.birdSpine == BIRDSTATE.DI_BO) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.IDLE) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.IDLE2) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.LIKE) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.BUON) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.SUY_NGHI) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
            if (this.birdSpine == BIRDSTATE.NHUN_NHAY) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
        }
        if (this.Scenestate == sceneState.collectPictures) {
            if (this.birdSpine == BIRDSTATE.IDLE) {
                this.node.emit('bird chuyen spine', this.birdSpine, this.Scenestate);
            }
        }
    }
    //emit to audio controler
    emitToAudioControler() {
        if (this.Scenestate == sceneState.findLocation) {
            if (this.audiostate == AUDIOSTATE.CHOOSETHERIGHTANSWER) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.HAVEYOUFOUND) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.AREYOUOK) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
        }
        if (this.Scenestate == sceneState.drawingColor) {
            if (this.audiostate == AUDIOSTATE.PLEASEDRAWTHECORRECTCOLOR) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.HAVEYOUCHOSENANYCOLOR) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.AREYOUOK) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
        }
        if (this.Scenestate == sceneState.collectPictures) {
            if (this.audiostate == AUDIOSTATE.SOUNDCORRECT) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.audiostate == AUDIOSTATE.WRONG) {
                this.node.emit('audio play', this.audiostate, this.Scenestate);
            }
            if (this.StartHunghinhState == startingHungHinh.endGame) {
                this.node.emit('audio play', this.audiostate, this.Scenestate, this.StartHunghinhState);
            }
        }
    }
    //emit to show question
    emittoShowQuestion() {
        if (this.showquestion == DISPLAYSTATE.CHOOSETHERIGHTANSWER) {
            this.node.emit('display to boxchat', this.showquestion);
        }
        if (this.showquestion == DISPLAYSTATE.OPPS_WHEREISOURFRIEND) {
            this.node.emit('display to boxchat', this.showquestion);
        }
        if (this.showquestion == DISPLAYSTATE.PLEASEDRAWTHECORRECTCOLOR) {
            this.node.emit('display to boxchat', this.showquestion);
        }
        if (this.showquestion == DISPLAYSTATE.STAR) {
            this.node.emit('display to boxchat', this.showquestion);
        }
        if (this.showquestion == DISPLAYSTATE.CIRCLE) {
            this.node.emit('display to boxchat', this.showquestion);
        }
        if (this.showquestion == DISPLAYSTATE.SQUARE) {
            this.node.emit('display to boxchat', this.showquestion);
        }
        if (this.showquestion == DISPLAYSTATE.TRIANGLE) {
            this.node.emit('display to boxchat', this.showquestion);
        }
    }
    //emit to bang roi
    emittoBangroi() {
        if (this.boardState == BOARDSTATE.FALLING) {
            this.node.emit('falling start', this.boardState);
        }
    }
    emittorungla() {
        if (this.runglaState == runglaSTATE.dungim) {
            this.node.emit('rung la state', this.runglaState);
        }
        if (this.runglaState == runglaSTATE.larung) {
            this.node.emit('rung la state', this.runglaState);
        }
    }
    emittochuyencanh() {
        if (this.chuyencanhstate == chuyencanhState.chuyencanh) {
            this.node.emit('chuyen canh state', this.chuyencanhstate);
        }
    }
    update(deltaTime: number) {

    }
}


