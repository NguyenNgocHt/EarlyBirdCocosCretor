import { _decorator, Component, Node, Input, Label, v3, Sprite, Vec3, log, instantiate, Prefab, tween, Skeleton, sp, math, sys, ModelRenderer } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
import { numberContro } from '../../df4/script/numberContro';
import { spinebird_df1 } from './spinebird_df1';
import { local_Storage } from '../../../loading/script/local_Storage';
const { ccclass, property } = _decorator;
enum sceneState {
    nostate,
    mushroomPlay,
    eatFruits,
}
enum birdMoving {
    nostate,
    tien,
    lui,
    stop,
}
enum birdSpine {
    nostate,
    buon,
    di_bo,
    gat_dau,
    idle,
    idle_gaimong,
    like,
    like2,
    lo_kang,
    so_hai,
    suy_nghi,
    votay,
    votay2,
    votay3,
}
@ccclass('df1_DF1Manager')
export class df1_DF1Manager extends Component {
    POINT_GAME_PLAY: number[];
    NAME_SKILL_GAME_PLAY: string[];
    BUFFTER_FLY_POSITION_LIST: Vec3[];
    @property(Node)
    private tree: Node = null;
    @property(Node)
    private next_screen: Node = null;
    @property(Node)
    private bird: Node = null
    @property(Node)
    private bongden_bird: Node = null;
    @property(Node)
    private sceneMushroom: Node = null;
    @property(Node)
    private sceneEatFruits: Node = null;
    @property(sp.Skeleton)
    private chuyencanhSpine: sp.Skeleton = null;
    @property(Node)
    private button_pauseTest: Node = null;
    @property(Node)
    private position_buffterfly_moving: Node = null;
    @property(Node)
    private blue_buffterfly: Node = null;
    @property(Node)
    private yellow_buffterfly: Node = null;
    @property(Node)
    private red_buffterfly: Node = null;
    private sceneState: sceneState = sceneState.nostate;
    private BIRD_START_POSITION: Vec3 = new Vec3(0, 0, 0);
    private countScene: number = 0;
    private point_gamePlay_WRITE: number = 0;
    private point_gamePlay_VOCAB: number = 0;
    private limit_number: number = 0;
    onLoad() {
        this.BIRD_START_POSITION = this.bird.getWorldPosition();
    }
    start() {
        this.SceneStateSeting();
        this.sceneMushroom.on('mushroom end _ chuyen_canh', this.set_sceneState, this);
        this.sceneEatFruits.on('chuyen scene df2', this.loadDf2, this);
        this.next_screen.on(Node.EventType.TOUCH_START, this.loadDf2, this);
        this.position_buffterfly_moving.on('arr moving position_buffter fly', this.getPosition_buffterfly_moving, this);
        this.get_local_storage();
    }

    getPosition_buffterfly_moving(position_buffterfly_moving: Vec3[]) {
        this.BUFFTER_FLY_POSITION_LIST = position_buffterfly_moving;
        console.log(this.BUFFTER_FLY_POSITION_LIST);
        this.node.emit('moving_position_buffter_fly_list', this.BUFFTER_FLY_POSITION_LIST);
    }
    get_local_storage() {
        if (!this.POINT_GAME_PLAY) {
            this.POINT_GAME_PLAY = [];
        }
        this.POINT_GAME_PLAY = JSON.parse(sys.localStorage.getItem('POINT_GAME_PLAY'));
        var string_name_skill = sys.localStorage.getItem('NAME_SKILL_GAME_PLAY');
        this.NAME_SKILL_GAME_PLAY = JSON.parse(string_name_skill);
    }
    SceneStateSeting() {
        this.sceneState = sceneState.mushroomPlay;
        this.setactiveScene();
    }
    setactiveScene() {
        if (this.sceneState == sceneState.mushroomPlay) {
            this.sceneEatFruits.active = false;
            this.sceneMushroom.active = true;
        }
    }
    set_sceneState(point_game_play_write: number) {
        let j = 0;
        this.point_gamePlay_WRITE = point_game_play_write;
        if (this.limit_number == 0) {
            for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                if (this.NAME_SKILL_GAME_PLAY[i] == 'WRITE') {
                    this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + this.point_gamePlay_WRITE;
                }
            }
            this.limit_number = 1;
        }
        sys.localStorage.setItem('POINT_GAME_PLAY', JSON.stringify(this.POINT_GAME_PLAY));
        sys.localStorage.setItem('NAME_SKILL_GAME_PLAY', JSON.stringify(this.NAME_SKILL_GAME_PLAY));
        this.chuyencanhSpine.enabled = true;
        this.sceneMushroom.active = false;
        tween(this.node)
            .delay(1)
            .call(() => {
                this.bird.setWorldPosition(this.BIRD_START_POSITION);
                this.bongden_bird.setWorldPosition(this.BIRD_START_POSITION);
                this.sceneEatFruits.active = true;
            })
            .start();
        this.chuyencanhSpine.setCompleteListener(() => {
            this.startDf1_2();
        })

    }
    startDf1_2() {
        this.node.emit('eat fruits start');
        this.node.emit('node tree', this.tree);
    }

    loadDf2(point_game_play_vocab: number) {
        this.point_gamePlay_VOCAB = point_game_play_vocab;
        for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
            if (this.NAME_SKILL_GAME_PLAY[i] == 'VOCAB') {
                this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + this.point_gamePlay_VOCAB;
            }
        }
        sys.localStorage.setItem('POINT_GAME_PLAY', JSON.stringify(this.POINT_GAME_PLAY));
        sys.localStorage.setItem('NAME_SKILL_GAME_PLAY', JSON.stringify(this.NAME_SKILL_GAME_PLAY));
        //load next ccreen and scene change
        PrefabManager.instance().loadPrefab('dark_forest', 'scene_change/prefab/sceneChange', true, this.show_scene_change.bind(this));
        PrefabManager.instance().loadPrefab('dark_forest', 'df2/prefab/Index', true, this.showDf2.bind(this));
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
    showDf2(error: number, prefab: Prefab) {
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            log('showScreen Df2');
        } else {
            log('showScreen Df2 error', error);
        }
    }
    update(deltaTime: number) {
    }
}


