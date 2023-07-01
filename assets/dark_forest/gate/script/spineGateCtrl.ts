import { _decorator, Component, Input, Node, sp, Prefab, instantiate, log, tween, PrivateNode } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { gate } from './gate';
import { ScreenManager } from '../../../loading/script/ScreenManager';
import { PrefabManager } from '../../../loading/script/PrefabManager';
const { ccclass, property } = _decorator;

@ccclass('spineGateCtrl')
export class spineGateCtrl extends Component {
    private spine?: sp.Skeleton;
    @property(Node)
    private emitfromMainGate: Node = null;
    @property(Node)
    private next_screen: Node = null;
    onLoad() {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this.close_idle(true);

    }
    start() {
        this.emitfromMainGate.on('door open', this.onOpen, this);
        this.next_screen.on(Node.EventType.TOUCH_START, this.loadDf1, this);
    }
    onOpen() {
        AudioManager.instance().playShort('dark_forest', 'gate/sound/dooropening', true);
        this.open(false);
        this.spine.setCompleteListener(() => {
            this.node.emit('tween stop');
            this.loadDf1();

        })
    }
    loadDf1() {
        PrefabManager.instance().loadPrefab('dark_forest', 'scene_change/prefab/sceneChange', true, this.show_scene_change.bind(this));
        PrefabManager.instance().loadPrefab('dark_forest', 'df1/prefab/Index', true, this.showDf1.bind(this));
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
    showDf1(error: number, prefab: Prefab) {
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen Df1');
        } else {
            console.log('showScreen Df1 error', error);
        }
    }

    open(isLoop: boolean) {
        this.spine.setAnimation(0, 'open', isLoop);
    }
    open_idle(isLoop: boolean) {
        this.spine.setAnimation(0, 'open_idle', isLoop);
    }
    close_idle(isLoop: boolean) {
        this.spine.setAnimation(0, 'close_idle', isLoop);
    }

}


