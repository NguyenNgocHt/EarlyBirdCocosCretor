import { _decorator, Component, Node, tween, v3} from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
const { ccclass, property } = _decorator;


@ccclass('gate')
export class gate extends Component {
    @property(Node)
    gateSpine : Node = null!;
    start(){
    }
}


