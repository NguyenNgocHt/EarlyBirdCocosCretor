import { _decorator, Component, Node, labelAssembler, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df3_showPointHunghinh')
export class df3_showPointHunghinh extends Component {
    @property({ type: Node })
    private emitfromHunghinh: Node = null;
    @property({ type: Label })
    private showpoint: Label = null
    start() {
        this.emitfromHunghinh.on('show point', this.showPoint, this);
    }
    showPoint(point: number) {
        this.showpoint.string = `${point}`;
    }

    update(deltaTime: number) {

    }
}


