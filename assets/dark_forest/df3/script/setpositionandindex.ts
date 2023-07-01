import { _decorator, Component, Node, Vec3 } from 'cc';
import { df3_manager } from './df3_manager';
const { ccclass, property } = _decorator;

@ccclass('setpositionandindex')
export class setpositionandindex extends Component {
    @property({ type: Node })
    private emitfromDF3: Node = null;
    private positionforNode: Vec3 = new Vec3(0, 0, 0);
    private numberIndex: number = 0;
    start() {
        this.emitfromDF3.on('position name', this.setpositionAndIndex, this);
    }
    setpositionAndIndex(nameNode: string) {
        if (nameNode == this.node.name) {
            let p = this.node.getWorldPosition();
            let t = this.node.getSiblingIndex();
            this.positionforNode = p;
            this.numberIndex = t;
            this.node.emit('emit position and index chicken', this.positionforNode, this.numberIndex);
        }

    }
    update(deltaTime: number) {

    }
}


