import { _decorator, Component, Node, log, EventTarget, Vec3 } from 'cc';
import { df4Manager } from './df4Manager';
const { ccclass, property } = _decorator;
enum stateMOVE {
    NOMOVE,
    TIEN,
    LUI,
    STOP,
};
@ccclass('moveBird')
export class moveBird extends Component {
    @property({ type: df4Manager })
    private emitfromDf4: df4Manager = null;
    private stateMOVE: stateMOVE = stateMOVE.NOMOVE;
    private stateMOVE_OK: stateMOVE = stateMOVE.NOMOVE;
    private speed: number = 2;
    private dx: number = 0;
    private dy: number = 0;
    onLoad() {
        this.stateMOVE = stateMOVE.TIEN;
    }
    start() {
        this.emitfromDf4.node.on('bird_tien', this.setstatemoveBird, this);
    }
    setstatemoveBird(state: number) {

        if (state == stateMOVE.TIEN) {
            this.stateMOVE = stateMOVE.TIEN;
        }
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.speed * this.dx, p.y + this.speed * this.dy, 0);
        this.node.setWorldPosition(q.x, q.y, 0);
        if (this.stateMOVE == stateMOVE.TIEN) {
            this.setpositionTien(this.node.worldPosition);
        }
        if (this.stateMOVE == stateMOVE.STOP) {

        }
    }
    setpositionTien(position: Vec3) {
        if (position.x <= 500) {
            this.dx = 1;
            this.dy = 0;
        }
        else {
            this.dx = 0;
            this.dy = 0;
            this.stateMOVE = stateMOVE.STOP;
            this.stateMOVE_OK = stateMOVE.NOMOVE;
            this.node.emit('chuyen_spine_bird', this.stateMOVE_OK);
        }
    }
}


