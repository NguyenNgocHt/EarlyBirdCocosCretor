import { _decorator, Component, Node, AssetManager, Prefab, instantiate, log, AudioSource, sys } from 'cc';
import { AudioManager } from '../loading/script/AudioManager';
import { BundleManager } from './BundleManager';
import { local_Storage } from '../loading/script/local_Storage';
const { ccclass, property } = _decorator;

@ccclass('Boot')
export class Boot extends Component {
    POINT_GAME_PLAY = [0, 0, 0, 0];
    NAME_SKILL_GAME_PLAY = ["VOCAB", "LISTEN", "WRITE", "READ"];
    static instance: Boot;
    @property({ type: Node })
    ui: Node = null;
    @property({ type: Node })
    popup: Node = null;
    @property({ type: AudioSource })
    audioSource: AudioSource = null;
    start() {
        AudioManager.instance().init(this.audioSource);
        this.set_local_storage();
    }
    onLoad() {
        Boot.instance = this;
        this.showLoading();
    }
    showLoading() {
        BundleManager.instance().loadBundle('loading', (error: number, bundle: AssetManager.Bundle) => {
            if (error == 0) {
                log('load loading prefab');
                bundle.load('prefab/Index', Prefab, (err, prefab) => {
                    if (!err) {
                        let loading = instantiate(prefab);
                        Boot.instance.ui.addChild(loading);
                        log('showLoading');
                    } else {
                        log('load loading prefab error', err);
                    }
                });
            }
        });
    }
    set_local_storage() {
        console.log('set local stogare');
        sys.localStorage.setItem('POINT_GAME_PLAY', JSON.stringify(this.POINT_GAME_PLAY));
        sys.localStorage.setItem('NAME_SKILL_GAME_PLAY', JSON.stringify(this.NAME_SKILL_GAME_PLAY));
    }
}


