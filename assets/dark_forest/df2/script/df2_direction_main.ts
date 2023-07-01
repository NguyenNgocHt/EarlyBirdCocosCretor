import { _decorator, Component, Node, Label, Prefab, instantiate } from 'cc';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
const { ccclass, property } = _decorator;
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
};
enum chicken_spine {
    nostate,
    bidanh,
    buon,
    di_bo,
    gat_dau,
    idle_gaimong,
    idle,
    like,
    like2,
    lo_lang,
    noichuyen,
    so_hai,
    tucgian,
    votay,
    votay2,
    votay3,
    vuimung,
};
enum blockstate {
    nostate,
    block,
    open,
};
enum AUDIOPLAYLIST {
    nostate,
    correc,
    wrong,
    turnRight,
    goodjob,
    congxu,
}
@ccclass('df2_direction_main')
export class df2_direction_main extends Component {
    AUDIOPLAYLIST = ["We are still lost in this dark forest.\n Let's ask for some help!\n", "Which is the right way?",
        "Turn right, please!"];
    AUDIOPLAYLIST1 = ["We are still lost in this dark forest.Let's ask for some help!", "Which is the right way",
        "Turn right, please!"];
    @property(Node)
    private main_DF2: Node = null;
    @property(Node)
    private chicken: Node = null;
    @property(Node)
    private chickenBox: Node = null;
    @property(Node)
    private bird: Node = null;
    @property(Node)
    private boxchat_bird: Node = null;
    @property(Label)
    private label_bird: Label = null;
    @property(Node)
    private boxchat_chicken: Node = null;
    @property(Label)
    private label_chicken: Label = null;
    @property(Node)
    private audioPlay: Node = null;
    @property(Node)
    private positionTo: Node = null;
    @property(Node)
    private emitfrom_3la: Node = null;
    private bird_state: birdSpine = birdSpine.nostate;
    private blockBoxchat_chicken: blockstate = blockstate.nostate;
    private chicken_spine: chicken_spine = chicken_spine.nostate;
    private audioPlayList: AUDIOPLAYLIST = AUDIOPLAYLIST.nostate;
    private point_game_play_LISTEN: number = 0;
    private count_wrong_answer: number = 0;
    onLoad() {
        this.boxchat_bird.active = false;
        this.boxchat_chicken.active = false;
    }
    start() {
        this.chicken.on('bird chuyen trang thai hoi duong', this.setBirdSpine1, this);
        this.chicken.on('chuyen sang chicken moving', this.chickenMoving_end, this);
        this.audioPlay.on('audio end', this.set_audio_end, this);
        this.audioPlay.on('audio end 1', this.set_audio_end1, this);
        this.audioPlay.on('audio end 2', this.set_audio_end2, this);
        this.audioPlay.on('hoi duong audio end', this.setBirdSpine2, this);
        this.audioPlay.on('chicken audio play end', this.setBirdSpine3, this);
        this.audioPlay.on('chicken audio play end2', this.eraseBoxchat_chicken, this);
        this.audioPlay.on('turn right show boxchat play', this.showBoxchat, this);
        this.audioPlay.on('turn right show boxchat end', this.closeBoxchat, this);
        this.chickenBox.on(Node.EventType.TOUCH_START, this.audioPlay_chicken, this);
        this.emitfrom_3la.on('correc', this.set_correc, this);
        this.emitfrom_3la.on('wrong', this.set_wrong, this);
        this.bird.on('bird moving to positon origin', this.setBirdMoving, this);
        this.bird.on('turn right please', this.audioPlay_chicken, this);
        this.bird.on('chuyen df3', this.setmovingDF3, this);
        this.bird.on('bird move inside', this.set_bird_moving, this);
    }
    set_bird_moving() {
        this.node.emit('bird moving inside');
    }
    showBoxchat() {
        this.boxchat_bird.active = true;
        let boxchat = this.boxchat_bird.getWorldPosition();
        this.boxchat_bird.setWorldPosition(boxchat.x, boxchat.y - 300, 0);
        this.label_bird.string = 'turn right';
    }
    closeBoxchat() {
        this.boxchat_bird.active = false;
    }
    chickenMoving_end() {
        this.node.emit('chicken moving end');
    }
    setBirdMoving() {
        this.node.emit('bird moving position origin', this.chicken.getWorldPosition());
    }
    set_correc() {
        if (this.count_wrong_answer == 0) {
            this.point_game_play_LISTEN = this.point_game_play_LISTEN + 1;
        }
        if (this.count_wrong_answer == 1) {
            this.point_game_play_LISTEN = this.point_game_play_LISTEN + 1 / 2;
            this.count_wrong_answer = 0;
        }
        if (this.count_wrong_answer == 2) {
            this.point_game_play_LISTEN = this.point_game_play_LISTEN + 1 / 4;
            this.count_wrong_answer = 0;
        }
        this.load_effect_fireworks();
        this.chicken_spine = chicken_spine.vuimung;
        this.node.emit('chicken chuyen spine', this.chicken_spine);
        this.bird_state = birdSpine.dung_like;
        this.node.emit('bird chuyen spine', this.bird_state);
        this.audioPlayList = AUDIOPLAYLIST.correc;
        this.node.emit('audio play list', this.audioPlayList);
        this.node.emit('block press button');

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
    set_wrong() {
        this.count_wrong_answer = this.count_wrong_answer + 1;
        this.chicken_spine = chicken_spine.buon;
        this.node.emit('chicken chuyen spine', this.chicken_spine);
        this.bird_state = birdSpine.sai_buon;
        this.node.emit('bird chuyen spine', this.bird_state);
        this.audioPlayList = AUDIOPLAYLIST.wrong;
        this.node.emit('audio play list', this.audioPlayList);
    }
    set_audio_end1() {
        this.bird_state = birdSpine.idle;
        this.node.emit('bird chuyen spine', this.bird_state);
    }
    set_audio_end2() {
        this.bird_state = birdSpine.traloi;
        this.node.emit('bird chuyen spine', this.bird_state);
    }
    eraseBoxchat_chicken() {
        this.boxchat_chicken.active = false;
        this.node.emit('mo khoa press buttion_');
    }
    setBirdSpine3() {
        this.blockBoxchat_chicken = blockstate.open;
        this.bird_state = birdSpine.idle2;
        this.node.emit('bird chuyen spine', this.bird_state);
        this.boxchat_chicken.active = false;
        this.chicken_spine = chicken_spine.idle;
        this.node.emit('chicken chuyen spine', this.chicken_spine);
        this.node.emit('mo khoa press button');

    }
    audioPlay_chicken() {
        if (this.blockBoxchat_chicken == blockstate.open) {
            this.boxchat_chicken.active = true;
            this.label_chicken.string = this.AUDIOPLAYLIST1[2];
            this.node.emit('audio play hoi duong_chicken', this.AUDIOPLAYLIST1[2]);
            this.chicken_spine = chicken_spine.noichuyen;
            this.node.emit('chicken chuyen spine', this.chicken_spine);
        }
    }
    setBirdSpine2() {
        this.bird_state = birdSpine.idle;
        this.node.emit('bird chuyen spine', this.bird_state);
        this.boxchat_bird.active = false;
        this.node.emit('3la falling', this.positionTo.getWorldPosition());
        this.scheduleOnce(function () {
            this.boxchat_chicken.active = true;
            this.label_chicken.string = this.AUDIOPLAYLIST1[2];
            this.node.emit('audio play hoi duong', this.AUDIOPLAYLIST1[2]);
            this.chicken_spine = chicken_spine.noichuyen;
            this.node.emit('chicken chuyen spine', this.chicken_spine);
            this.scheduleOnce(function () {
                this.boxchat_chicken.active = false;
            }, 4);
        }, 2);
    }
    setBirdSpine1() {
        this.bird_state = birdSpine.traloi;
        this.node.emit('bird chuyen spine', this.bird_state);
        this.boxchat_bird.active = true;
        this.label_bird.string = this.AUDIOPLAYLIST[0];
        this.node.emit('audio play hoi duong', this.AUDIOPLAYLIST1[0]);

    }
    set_audio_end() {
        this.bird_state = birdSpine.idle;
        this.node.emit('bird chuyen spine', this.bird_state);
        this.boxchat_bird.active = false;
        this.scheduleOnce(function () {
            this.boxchat_bird.active = true;
            this.bird_state = birdSpine.traloi;
            this.node.emit('bird chuyen spine', this.bird_state);
            let p = this.label_bird.node.getWorldPosition();
            this.label_bird.node.setWorldPosition(p.x, p.y + 30, 0);
            this.label_bird.string = this.AUDIOPLAYLIST[1];
            this.node.emit('audio play hoi duong', this.AUDIOPLAYLIST1[1]);
        }, 1);
    }
    setmovingDF3() {
        this.node.emit('moving df3', this.point_game_play_LISTEN);
    }
    update(deltaTime: number) {

    }
}


