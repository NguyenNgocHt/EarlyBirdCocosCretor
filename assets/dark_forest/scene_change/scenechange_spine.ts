import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('scenechange_spine')
export class scenechange_spine extends Component {
    private spine: sp.Skeleton = null;
    onLoad() {
        this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
    }
    start() {
        this.spineStart();
    }
    spineStart() {
        this.spine.setAnimation(0, 'animation', false);
    }
    update(deltaTime: number) {

    }
}


