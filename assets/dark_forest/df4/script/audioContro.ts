import { _decorator, Component, Node, AudioSource, assert, TERRAIN_HEIGHT_BASE, AudioClip, EventTouch, log, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioContro')
export class audioContro extends Component {
    @property(AudioSource)
    public _audioSour: AudioSource = null!

    @property(AudioClip)
    public clip: AudioClip = null!

    @property(AudioSource)
    public audioSource: AudioSource = null!

    onLoad() {
        //lay thanh phan audio nguon
        const audioSource = this.node.getComponent(AudioSource)!;
        //kiem tra xem no co lay duoc nguon audio ko , neu khong bao loi
        assert(audioSource)
        {
            this._audioSour = audioSource;
        }
    }

    play() {
        //play music
        this._audioSour.play();
    }
    playOneShot() {
        this.audioSource.playOneShot(this.clip, 1);

    }

    start() {
    }

    update(deltaTime: number) {

    }
}


