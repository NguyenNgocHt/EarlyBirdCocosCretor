import { _decorator, Component, Node, AudioSource } from 'cc';
import { AudioManager } from '../../loading/script/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('df2')
export class df2 extends Component {
    @property({ type: AudioSource })
    audioSource: AudioSource = null;
    start() {
        AudioManager.instance().init(this.audioSource);
    }
    update(deltaTime: number) {

    }
}


