import { _decorator, Component, Node, log, Vec3, EventTarget } from 'cc';
import { df4Manager } from './df4Manager';
const { ccclass, property } = _decorator;
enum stateMOVE {
    NOMOVE,
    TIEN,
    LUI,
    STOP,
};
enum STATESPINE {
    NOSPINE,
    DUNG_LAI,
    IDLE,
    IDLE2,
    IDLE_HAPPY,
    IDLE_SAD,
    RUN,
    WALK,
    WIN,

};
@ccclass('moveforBear')
export class moveforBear extends Component {
    @property({ type: df4Manager })
    private emitFromdf4: df4Manager = null;
    private stateMove: stateMOVE = stateMOVE.NOMOVE;
    private stateMove_OK: stateMOVE = stateMOVE.NOMOVE;
    private stateSpine: STATESPINE = STATESPINE.NOSPINE;
    private speed: number = 3;
    private dx: number = 0;
    private dy: number = 0;
    private count: number = 0;
    onLoad() {
        this.stateMove = stateMOVE.TIEN;
    }
    start() {
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.speed * this.dx, p.y + this.speed * this.dy, 0);
        this.node.setWorldPosition(q.x, q.y, 0);
        if (this.stateMove == stateMOVE.TIEN) {
            this.setpositionTien(this.node.worldPosition);
        }
        if (this.stateMove == stateMOVE.STOP) {

        }
    }
    setpositionTien(position: Vec3) {
        if (this.count == 1) {
            this.node.emit('chuyen spine bear');
        }
        if (this.count <= 701) {
            this.dx = -1;
            this.count = this.count + 1;
        }
        else {
            this.stateMove = stateMOVE.STOP;
            this.stateMove_OK = stateMOVE.NOMOVE;
            this.node.emit('bear_move_end', this.stateMove_OK);
            this.dx = 0;
        }
    }
}


