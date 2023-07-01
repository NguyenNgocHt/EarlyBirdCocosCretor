import { _decorator, Component, AudioSource } from 'cc';
import { AudioManager } from '../../loading/script/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('df4')
export class df4 extends Component {
    @property({type: AudioSource})
    audioSource: AudioSource = null;
    start() {
        AudioManager.instance().init(this.audioSource);
    }

    update(deltaTime: number) {
        
    }
}


