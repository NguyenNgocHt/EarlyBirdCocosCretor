import { _decorator, Component, Node, } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('background')
export class background extends Component {
    start() {
        AudioManager.instance().playShort('dark_forest', 'gate/sound/landing-ufo', true);
    }

    update(deltaTime: number) {

    }
}


