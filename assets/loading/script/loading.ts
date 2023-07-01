import { _decorator, Component, log, Prefab, instantiate, AudioSource } from 'cc';
import { Boot } from '../../boot/Boot';
import { AudioManager } from './AudioManager';
import { PrefabManager } from './PrefabManager';
import { ScreenManager } from './ScreenManager';
const { ccclass } = _decorator;

@ccclass('loading')
export class loading extends Component {
    onLoad() {
        AudioManager.instance().init(Boot.instance.audioSource);
        ScreenManager.instance().init(Boot.instance.node, Boot.instance.ui, Boot.instance.popup);
        this.loadHome();
    }

    loadHome() {
        PrefabManager.instance().loadPrefab('home', 'prefab/Index', true, this.showHome.bind(this));
    }
    loadGate() {
        PrefabManager.instance().loadPrefab('dark_forest', 'gate/prefab/Index', true, this.showGate.bind(this));
    }
    loaddf4() {
        PrefabManager.instance().loadPrefab('df4', 'prefab/Index', true, this.showDf4.bind(this));
    }
    showDf4(error: number, prefab: Prefab) {
        log('showDf4');
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            this.node.removeFromParent();
            log('showScreen fd4');
        } else {
            log('showScreen gate error', error);
        }
    }
    showGate(error: number, prefab: Prefab) {
        log('showGate');
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            this.node.removeFromParent();
            log('showScreen gate');
        } else {
            log('showScreen gate error', error);
        }
    }
    showHome(error: number, prefab: Prefab) {
        log('showHome');
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            this.node.removeFromParent();
            log('showScreen home');
        } else {
            log('showScreen home error', error);
        }
    }
}


