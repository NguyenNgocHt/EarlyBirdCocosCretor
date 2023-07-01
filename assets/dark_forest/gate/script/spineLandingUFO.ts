import { _decorator, Component, Node, sp } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('UFOSpine')
export class UFOSpine extends Component {
    private spine?: sp.Skeleton;
    start() {
        AudioManager.instance().playShort('dark_forest', 'gate/sound/landing-ufo', true);
    }
    onLoad() {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;

    }
    update(deltaTime: number) {

    }
}


