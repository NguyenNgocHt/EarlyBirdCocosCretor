import { _decorator, Component, Node } from 'cc';
import { AudioManager } from '../../loading/script/AudioManager';
import { audioContro } from '../../dark_forest/df4/script/audioContro';
const { ccclass, property } = _decorator;

@ccclass('audioControler')
export class audioControler extends Component {
    @property({ type: audioContro })
    private flying_UFO: audioContro = null;
    @property({ type: Node })
    private emitfromHOME: Node = null;
    @property(audioContro)
    private am_thanh_nen: audioContro = null;
    start() {
        //this.am_thanh_nen_play();
        this.emitfromHOME.on('audio play', this.audioPlay, this);
    }
    am_thanh_nen_play() {
        this.am_thanh_nen.play();
    }
    audioPlay() {
        this.flying_UFO.play();
    }
    update(deltaTime: number) {

    }
}


