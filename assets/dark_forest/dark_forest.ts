import { _decorator, Component, Node, AudioSource } from 'cc';
import { AudioManager } from '../loading/script/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('dark_forest')
export class dark_forest extends Component {
    @property({ type: AudioSource })
    audioSource: AudioSource = null;
    start() {
        AudioManager.instance().init(this.audioSource);
    }

    update(deltaTime: number) {

    }
}


