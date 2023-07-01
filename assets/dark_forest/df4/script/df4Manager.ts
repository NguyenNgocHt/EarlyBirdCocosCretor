import {
    _decorator, Component, Vec3, input, Input, EventMouse, Animation,
    SkeletalAnimation, Sprite, Prefab, Node, Vec2, EventTouch, VERSION,
    lerp, log, EventTarget, absMax, Button, AudioSource, math, absMaxComponent,
    TERRAIN_HEIGHT_BASE, TERRAIN_NORTH_INDEX, tween, sys, instantiate
} from 'cc';
import { df4AudioControler } from './df4AudioControler';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
const { ccclass, property } = _decorator;
const eventTarget = new EventTarget();
enum START_DF4 {
    NO,
    ON,
    OFF,
};
enum STATEMOVE {
    NOMOVE,
    TIEN,
    LUI,
};
enum STATESPINEBIRD {
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
};
enum STATESPINEBEAR {
    NOSPINE,
    DUNG_LAI,
    IDLE,
    IDLE2,
    IDLE_HAPPY,
    IDLE_SAD,
    RUN,
    WALK,
    WIN,
    SHOWNUMBER,
};
enum STATESOUND {
    NOPLAY,
    CHOOSENUMBERR,
    HOWMANYAPPLE,
    HOWMANYBANANA,
    HOWMANYSTRAWBERRY,
    GOOGJOB,
    CORRECT,
    WRONG,
    NUMBER,
    CONG_XU,
    WHATAPITY,
    COUNTOVER,
    WHATYOURNUMBER,
    AREYOU_OK,
};
enum STATEFRUIT {

    NOTHING,
    APPLES,
    STRAWBERRYS,
    BANANA,
};
enum STATEREPLY {
    NOSTATE,
    CORRECT,
    WRONG,
}
enum stateZoom {
    NOSTATE,
    ZOOMIN,
    ZOOMOUT,
}
enum STATEBANG {
    NOSTATE,
    BANG1,
    BANG2,
    BANG3,
}
@ccclass('df4Manager')
export class df4Manager extends Component {
    POINT_GAME_PLAY: number[];
    NAME_SKILL_GAME_PLAY: string[];
    POSITION_BUFFTERFLY_MOVING_LIST: Vec3[];
    @property(Node)
    private parameter_board: Node = null;
    @property(Node)
    private scene_change: Node = null;
    @property({ type: Node })
    private pause: Node = null;
    @property({ type: Node })
    private bird: Node = null;
    @property({ type: Node })
    private bearSpineManager: Node = null;
    @property({ type: Node })
    private bear1: Node = null;
    @property({ type: Node })
    private bear2: Node = null;
    @property({ type: Node })
    private bear3: Node = null;
    @property({ type: Node })
    private emitfromdf4audio: Node = null;
    @property({ type: Node })
    private emitfromGroup1: Node = null
    @property(Node)
    private position_buffterfly_moving_list: Node = null;
    private stateDF4: START_DF4 = START_DF4.ON;
    private stateMOVEBIRD: STATEMOVE = STATEMOVE.NOMOVE;
    private stateMOVEBEAR: STATEMOVE = STATEMOVE.NOMOVE;
    private stateSpineBird: STATESPINEBIRD = STATESPINEBIRD.NOSTATE;
    private stateSpineBear: STATESPINEBEAR = STATESPINEBEAR.NOSPINE;
    private stateSound: STATESOUND = STATESOUND.NOPLAY;
    private stateFruits: STATEFRUIT = STATEFRUIT.NOTHING;
    private stateReply: STATEREPLY = STATEREPLY.NOSTATE;
    private statebang: STATEBANG = STATEBANG.NOSTATE;
    private amountApples: number = 0;
    private amountStrawberrys: number = 0;
    private amountBananas: number = 0;
    private readingNUMBER: number = 0;
    private statezoomFruits: stateZoom = stateZoom.NOSTATE;
    private countQuestion: number = 0;
    private numberOfquestion: number = 1;
    private point_gamePlay_read: number = 0;
    private limit_number: number = 0;
    onLoad() {
        this.scene_change.active = false;
        this.parameter_board.active = false;
        this.get_local_storage();
    }
    start() {
        //nhan emit
        this.position_buffterfly_moving_list.on('arr moving position_buffter fly', this.get_position_buffterfly_moving_list, this);
        this.bird.on('chuyen_spine_bird', this.setspineBird, this);
        this.bird.on('state ok', this.setStateSpineBird, this);
        this.bird.on('emit reminder', this.setreminder, this);
        this.bird.on('call scene change', this.set_call_scene_change, this);
        this.bear1.on('bear_move_end', this.setspineBear1, this);
        //emit from bear spine manager
        this.bearSpineManager.on('move_idle', this.setspineBear, this);
        this.bearSpineManager.on('number Press', this.readingNumbers, this);
        //emit from audio controler
        this.emitfromdf4audio.on('play sound ok', this.setStateBirdAndBear, this);
        //emit to audioControler
        this.emitfromdf4audio.on('end sound number', this.checkQuestion, this);
    }
    get_position_buffterfly_moving_list(position_moving_list: Vec3[]) {
        if (!this.POSITION_BUFFTERFLY_MOVING_LIST) {
            this.POSITION_BUFFTERFLY_MOVING_LIST = [];
        }
        this.POSITION_BUFFTERFLY_MOVING_LIST = position_moving_list;
        console.log('position buffterfly moving', this.POSITION_BUFFTERFLY_MOVING_LIST);
        this.node.emit('moving_position_buffter_fly_list', this.POSITION_BUFFTERFLY_MOVING_LIST);
    }
    get_local_storage() {
        if (!this.POINT_GAME_PLAY) {
            this.POINT_GAME_PLAY = [];
        }
        this.POINT_GAME_PLAY = JSON.parse(sys.localStorage.getItem('POINT_GAME_PLAY'));
        var string_name_skill = sys.localStorage.getItem('NAME_SKILL_GAME_PLAY');
        this.NAME_SKILL_GAME_PLAY = JSON.parse(string_name_skill);
    }
    set_call_scene_change() {
        if (this.limit_number == 0) {
            for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                if (this.NAME_SKILL_GAME_PLAY[i] == 'READ') {
                    this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + this.point_gamePlay_read;
                }
            }
            sys.localStorage.setItem('POINT_GAME_PLAY', JSON.stringify(this.POINT_GAME_PLAY));
            sys.localStorage.setItem('NAME_SKILL_GAME_PLAY', JSON.stringify(this.NAME_SKILL_GAME_PLAY));
            this.get_local_storage();
            this.scene_change.active = true;
            tween(this.node)
                .delay(1.2)
                .call(() => {
                    let i = 0
                    this.bird.active = false;
                    this.bearSpineManager.active = false;
                    this.parameter_board.active = true;
                    this.scheduleOnce(function () {
                        this.node.emit('point game and name skill', this.POINT_GAME_PLAY, this.NAME_SKILL_GAME_PLAY);
                    }, 0.1);
                    tween(this.node)
                        .delay(1.6)
                        .call(() => {
                            this.scene_change.active = false;
                            this.load_effect_fireworks();
                        })
                        .start();
                })
                .start();
            this.limit_number = 1;
        }
    }
    setreminder(state: number, timedelay: number) {
        if (state == STATESPINEBIRD.SUY_NGHI) {
            if (timedelay == 15) {
                this.stateSound = STATESOUND.WHATYOURNUMBER;
                this.emittoAudioContro();
            }
            if (timedelay == 20) {
                this.stateSound = STATESOUND.AREYOU_OK;
                this.emittoAudioContro();
            }

        }
    }
    //check question
    checkQuestion(state: number) {
        if (state == STATESOUND.NUMBER) {
            if (this.stateFruits == STATEFRUIT.APPLES) {
                if (this.readingNUMBER == this.amountApples) {
                    this.stateReply = STATEREPLY.CORRECT;
                }
                else {
                    this.stateReply = STATEREPLY.WRONG;
                }

            }
            if (this.stateFruits == STATEFRUIT.BANANA) {
                if (this.readingNUMBER == this.amountBananas) {
                    this.stateReply = STATEREPLY.CORRECT;
                }
                else {
                    this.stateReply = STATEREPLY.WRONG;
                }
            }
            if (this.stateFruits == STATEFRUIT.STRAWBERRYS) {
                if (this.readingNUMBER == this.amountStrawberrys) {
                    this.stateReply = STATEREPLY.CORRECT;
                }
                else {
                    this.stateReply = STATEREPLY.WRONG;
                }
            }
            this.setstateReply();
        }
    }
    setstateReply() {
        if (this.stateReply == STATEREPLY.CORRECT) {
            this.point_gamePlay_read = this.point_gamePlay_read + 1;
            this.load_effect_fireworks();
            this.stateSpineBear = STATESPINEBEAR.IDLE_HAPPY;
            this.stateSpineBird = STATESPINEBIRD.LIKE;
            this.stateSound = STATESOUND.CORRECT;
            this.statezoomFruits = stateZoom.ZOOMOUT;
            this.readingNUMBER = 0;
        }
        if (this.stateReply == STATEREPLY.WRONG) {
            this.stateSpineBear = STATESPINEBEAR.IDLE_SAD;
            this.stateSpineBird = STATESPINEBIRD.BUON;
            this.stateSound = STATESOUND.WRONG;
            this.statezoomFruits = stateZoom.ZOOMOUT;
            this.readingNUMBER = 0;
        }
        this.emittoBear();
        this.emittoBird();
        this.emittoAudioContro();
        this.emitToGroup1_stateZoom();

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
    readingNumbers(Readingnumber: number, statebang: number) {
        if (statebang == STATEBANG.BANG1) {
            this.statebang = STATEBANG.BANG1;
        }
        if (statebang == STATEBANG.BANG2) {
            this.statebang = STATEBANG.BANG2;
        }
        if (statebang == STATEBANG.BANG3) {
            this.statebang = STATEBANG.BANG3;
        }
        this.readingNUMBER = Readingnumber;
        this.stateSpineBird = STATESPINEBIRD.TRALOI;
        this.stateSound = STATESOUND.NUMBER;
        this.emittoBird();
        this.emittoAudioContro();
    }
    //set spine bear from move bird
    setspineBear1(state: number) {
        if (state == STATEMOVE.NOMOVE) {
            this.stateSpineBear = STATESPINEBEAR.DUNG_LAI;
            this.emittoBear();
        }
    }
    //set state bear and bird from audio
    setStateBirdAndBear(state: number) {
        if (state == STATESOUND.HOWMANYAPPLE || state == STATESOUND.HOWMANYBANANA || state == STATESOUND.HOWMANYSTRAWBERRY) {
            this.stateSpineBird = STATESPINEBIRD.SUY_NGHI;
            this.stateSpineBear = STATESPINEBEAR.SHOWNUMBER;
            this.emittoBear();
            this.emittoBird();
        }
        if (state == STATESOUND.CONG_XU) {
            if (this.countQuestion < this.numberOfquestion) {
                this.countQuestion = this.countQuestion + 1;
                this.stateSpineBird = STATESPINEBIRD.IDLE;
                this.stateSpineBear = STATESPINEBEAR.IDLE;
                this.stateSound = STATESOUND.CHOOSENUMBERR;
                this.emittoBear();
                this.emittoBird();
                this.randomstateFuits();
                this.emittoAudioContro();
                this.node.emit('clear_bang_true');
            }
            else {
                this.stateSound = STATESOUND.COUNTOVER;
                this.emittoAudioContro();
            }
        }
        if (state == STATESOUND.WHATAPITY) {
            if (this.countQuestion < this.numberOfquestion) {
                this.countQuestion = this.countQuestion + 1;
                this.stateSpineBird = STATESPINEBIRD.IDLE;
                this.stateSpineBear = STATESPINEBEAR.IDLE;
                this.stateSound = STATESOUND.CHOOSENUMBERR;
                this.emittoBear();
                this.emittoBird();
                this.randomstateFuits();
                this.emittoAudioContro();
            }
            else {
                this.stateSound = STATESOUND.COUNTOVER;
                this.emittoAudioContro();
            }
        }
        if (state == STATESOUND.COUNTOVER) {
            this.stateSpineBear = STATESPINEBEAR.WIN;
            this.stateSpineBird = STATESPINEBIRD.NHUN_NHAY;
            this.emittoBear();
            this.emittoBird();
        }

    }
    //set state spine bird
    setspineBird(state: number) {
        if (state == STATEMOVE.NOMOVE) {
            this.stateSpineBird = STATESPINEBIRD.IDLE;
            this.emittoBird();
        }
    }
    setStateSpineBird(state: number) {
        if (state == STATESPINEBIRD.TRALOI) {
            this.stateSpineBird = STATESPINEBIRD.IDLE;
            this.emittoBird();
        }
    }
    //set state spine bear
    setspineBear(state: number) {
        if (state == STATESPINEBEAR.DUNG_LAI) {
            this.stateSpineBear = STATESPINEBEAR.IDLE;
            this.stateSound = STATESOUND.CHOOSENUMBERR;
            this.emittoBear();
            this.emittoAudioContro();
            this.randomstateFuits();
        }
    }
    //random state fruits
    randomstateFuits() {
        let randomstate = Math.floor(Math.random() * 3) + 1;
        if (randomstate == 1) {
            this.stateFruits = STATEFRUIT.APPLES;
        }
        if (randomstate == 2) {
            this.stateFruits = STATEFRUIT.BANANA;
        }
        if (randomstate == 3) {
            this.stateFruits = STATEFRUIT.STRAWBERRYS;
        }
        this.setrandomstateFruits();
    }
    //set emit to bird
    emittoBird() {

        if (this.stateSpineBird == STATESPINEBIRD.IDLE) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
        if (this.stateSpineBird == STATESPINEBIRD.SUY_NGHI) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
        if (this.stateSpineBird == STATESPINEBIRD.TRALOI) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
        if (this.stateSpineBird == STATESPINEBIRD.NHUN_NHAY) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
        if (this.stateSpineBird == STATESPINEBIRD.LIKE) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
        if (this.stateSpineBird == STATESPINEBIRD.BUON) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
        if (this.stateSpineBird == STATESPINEBIRD.NHUN_NHAY) {
            this.node.emit('bird_chuyen_spine', this.stateSpineBird);
        }
    }
    //set emit to bear
    emittoBear() {

        if (this.stateSpineBear == STATESPINEBEAR.DUNG_LAI) {
            this.node.emit('bear_chuyen_spine', this.stateSpineBear)
        }
        if (this.stateSpineBear == STATESPINEBEAR.IDLE) {
            if (this.statebang == STATEBANG.NOSTATE) {
                this.node.emit('bear_chuyen_spine', this.stateSpineBear, this.statebang);
            }
            else {
                this.node.emit('bear_chuyen_spine', this.stateSpineBear, this.statebang);
            }
        }
        if (this.stateSpineBear == STATESPINEBEAR.SHOWNUMBER) {
            this.node.emit('bear_chuyen_spine', this.stateSpineBear);
        }
        if (this.stateSpineBear == STATESPINEBEAR.IDLE_HAPPY) {
            this.node.emit('bear_chuyen_spine', this.stateSpineBear);
            this.node.emit('bear_bang_off', this.stateSpineBear);
        }
        if (this.stateSpineBear == STATESPINEBEAR.IDLE_SAD) {
            this.node.emit('bear_chuyen_spine', this.stateSpineBear);
            this.node.emit('bear_bang_off', this.stateSpineBear);
        }
        if (this.stateSpineBear == STATESPINEBEAR.WIN) {
            this.node.emit('bear_chuyen_spine', this.stateSpineBear);
            this.node.emit('bear_bang_off', this.stateSpineBear);
        }
    }
    //emit to audio controler
    emittoAudioContro() {
        if (this.stateSound == STATESOUND.CHOOSENUMBERR) {
            this.node.emit('play_sound', this.stateSound);
        }
        if (this.stateSound == STATESOUND.NUMBER) {
            this.node.emit('play_sound', this.stateSound, this.readingNUMBER);
            this.node.emit('reading number', this.readingNUMBER);
        }
        if (this.stateSound == STATESOUND.CORRECT) {
            this.node.emit('play_sound', this.stateSound);
            this.node.emit('reading number', this.readingNUMBER);
        }
        if (this.stateSound == STATESOUND.WRONG) {
            this.node.emit('play_sound', this.stateSound);
            this.node.emit('reading number', this.readingNUMBER);
        }
        if (this.stateSound == STATESOUND.COUNTOVER) {
            this.node.emit('play_sound', this.stateSound);
            this.node.emit('reading number', this.readingNUMBER);
        }
        if (this.stateSound == STATESOUND.WHATYOURNUMBER) {
            this.node.emit('play_sound', this.stateSound);
        }
        if (this.stateSound == STATESOUND.AREYOU_OK) {
            this.node.emit('play_sound', this.stateSound);
        }
    }
    //set random state fruits
    setrandomstateFruits() {
        var arrayApple = [];
        var arrayBanana = [];
        var arrayStrawberry = [];
        this.emittoGroup1();
        if (this.stateFruits == STATEFRUIT.APPLES) {
            //emit  so luong va chung loai hoa qua
            let p = Math.floor(Math.random() * 20) + 1;
            var length = arrayApple.length;
            for (let i = 0; i < length; i++) {
                while (p == arrayApple[i]) {
                    p = Math.floor(Math.random() * 20) + 1;
                }
            }
            arrayApple.push(p);
            this.amountApples = p;
            this.emittoGroup1();
        }
        if (this.stateFruits == STATEFRUIT.BANANA) {
            //emit  so luong va chung loai hoa qua
            let p = Math.floor(Math.random() * 20) + 1;
            var length = arrayBanana.length;
            for (let i = 0; i < length; i++) {
                while (p == arrayBanana[i]) {
                    p = Math.floor(Math.random() * 20) + 1;
                }
            }
            arrayBanana.push(p);
            this.amountBananas = p;
            this.emittoGroup1();
        }
        if (this.stateFruits == STATEFRUIT.STRAWBERRYS) {
            //emit  so luong va chung loai hoa qua
            let p = Math.floor(Math.random() * 20) + 1;
            var length = arrayStrawberry.length;
            for (let i = 0; i < length; i++) {
                while (p == arrayStrawberry[i]) {
                    p = Math.floor(Math.random() * 20) + 1;
                }
            }
            arrayStrawberry.push(p);
            this.amountStrawberrys = p;
            this.emittoGroup1();
        }
    }
    //emit to group 1
    emittoGroup1() {
        if (this.stateFruits == STATEFRUIT.NOTHING) {
            this.node.emit('state fruits', this.stateFruits, 0);
        }
        if (this.stateFruits == STATEFRUIT.APPLES) {
            this.node.emit('state fruits', this.stateFruits, this.amountApples);
            this.node.emit('send_bear_amount_fruits', this.amountApples);
        }
        if (this.stateFruits == STATEFRUIT.BANANA) {
            this.node.emit('state fruits', this.stateFruits, this.amountBananas);
            this.node.emit('send_bear_amount_fruits', this.amountBananas);
        }
        if (this.stateFruits == STATEFRUIT.STRAWBERRYS) {
            this.node.emit('state fruits', this.stateFruits, this.amountStrawberrys);
            this.node.emit('send_bear_amount_fruits', this.amountStrawberrys);
        }
    }
    emitToGroup1_stateZoom() {
        if (this.statezoomFruits == stateZoom.ZOOMIN) {
            this.node.emit('zoom', this.statezoomFruits);
        }

        if (this.statezoomFruits == stateZoom.ZOOMOUT) {
            this.node.emit('zoom', this.statezoomFruits);
        }
    }
    //set move bird and bear
    setStateMove() {
        if (this.stateMOVEBIRD == STATEMOVE.TIEN) {
            this.node.emit('bird_tien', this.stateMOVEBIRD);
        }
        if (this.stateMOVEBEAR == STATEMOVE.TIEN) {
            this.node.emit('bear_tien', this.stateMOVEBEAR);
        }
    }
    update(deltaTime: number) {

    }
}


