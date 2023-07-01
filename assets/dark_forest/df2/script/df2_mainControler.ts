import { _decorator, Component, Node, enumerableProps, Prefab, log, instantiate, sys, tween, Vec3 } from 'cc';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
const { ccclass, property } = _decorator;
enum sceneState {
    nostate,
    direction,
}
@ccclass('df2_mainControler')
export class df2_mainControler extends Component {
    POINT_GAME_PLAY: number[];
    NAME_SKILL_GAME_PLAY: string[];
    POSITION_MOVING_FOR_BUFFTERFLLY_LIST: Vec3[];
    @property(Node)
    private sceneDirection: Node = null;
    @property(Node)
    private next_screen: Node = null;
    @property(Node)
    private position_moving_for_buffterflys: Node = null;
    private scene_state: sceneState = sceneState.nostate;
    private limit_number: number = 0;
    onLoad() {
        this.scene_state = sceneState.direction;
        this.setscene();
        this.get_local_storage();
    }
    start() {
        this.sceneDirection.on('moving df3', this.loadDf3, this);
        this.next_screen.on(Node.EventType.TOUCH_START, this.loadDf3, this);
        this.position_moving_for_buffterflys.on('arr moving position_buffter fly', this.get_position_for_buffterfly_list, this);
    }
    get_position_for_buffterfly_list(position_moving_list: Vec3[]) {
        if (!this.position_moving_for_buffterflys) {
            this.POSITION_MOVING_FOR_BUFFTERFLLY_LIST = [];
        }
        this.POSITION_MOVING_FOR_BUFFTERFLLY_LIST = position_moving_list;
        console.log('position_moving_list', this.POSITION_MOVING_FOR_BUFFTERFLLY_LIST);
        this.node.emit('moving_position_buffter_fly_list', this.POSITION_MOVING_FOR_BUFFTERFLLY_LIST);
    }
    get_local_storage() {
        if (!this.POINT_GAME_PLAY) {
            this.POINT_GAME_PLAY = [];
        }
        this.POINT_GAME_PLAY = JSON.parse(sys.localStorage.getItem('POINT_GAME_PLAY'));
        var string_name_skill = sys.localStorage.getItem('NAME_SKILL_GAME_PLAY');
        this.NAME_SKILL_GAME_PLAY = JSON.parse(string_name_skill);
    }
    setscene() {
        if (this.scene_state == sceneState.direction) {
            this.node.emit('direction start');
        }
    }
    loadDf3(point_gamePlay_listen: number) {
        if (this.limit_number == 0) {
            for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                if (this.NAME_SKILL_GAME_PLAY[i] == 'LISTEN') {
                    this.POINT_GAME_PLAY[i] = this.POINT_GAME_PLAY[i] + point_gamePlay_listen;
                }
            }
            this.limit_number = 1;
        }
        sys.localStorage.setItem('POINT_GAME_PLAY', JSON.stringify(this.POINT_GAME_PLAY));
        sys.localStorage.setItem('NAME_SKILL_GAME_PLAY', JSON.stringify(this.NAME_SKILL_GAME_PLAY));
        PrefabManager.instance().loadPrefab('dark_forest', 'df3/prefab/Index', true, this.showDf3.bind(this));
        tween(this.node)
            .delay(0.8)
            .call(() => {
                PrefabManager.instance().loadPrefab('dark_forest', 'scene_change/prefab/sceneChange', true, this.show_scene_change.bind(this));
            })
            .start();
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
    showDf3(error: number, prefab: Prefab) {
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen Df3');
        } else {
            log('showScreen Df3 error', error);
        }
    }
    update(deltaTime: number) {
    }
}


