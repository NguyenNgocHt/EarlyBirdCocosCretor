import { _decorator, Component, Node, sp, log } from 'cc';
import { indexDf1 } from './indexDf1';
const { ccclass, property } = _decorator;

@ccclass('spineChangeScene')
export class spineChangeScene extends Component {
    @property(indexDf1)
    indexDf1: indexDf1 = null!;
    private _hasStop = true;
    private spine?: sp.Skeleton;
    start() {
        this.node.on('change-scene-df1_2', this.changeDf1_2, this);
    }

    changeDf1_2() {
        this.node.setPosition(-979.626, -567.308, 0);
        this.animation(false);
        this.spine.setCompleteListener(() => {
            this.node.emit('change-df1_2-successfully');
        })
    }

    onLoad() {
        this.node.setWorldPosition(5000, 5000, 0);
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;

    }
    animation(isLoop: boolean) {
        if (this._hasStop) {
            this.spine?.setToSetupPose();
        }
        this.spine?.setAnimation(0, 'animation', isLoop);
        this._hasStop = false;
    }
}


