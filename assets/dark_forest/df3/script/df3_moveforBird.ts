import { _decorator, Component, Node, Vec3 } from 'cc';
import { df3_manager } from './df3_manager';
const { ccclass, property } = _decorator;
enum MOVINGSTATE {
    NOTMOVING,
    TIEN,
    LUI,
    ABOUT_THE_POINT_ORIGIN,
    ABOUT_STATING_POSITION,
    stop,
};
enum sceneState {
    noState,
    findLocation,
    drawingColor,
    collectPictures,
}
@ccclass('df3_moveforBird')
export class df3_moveforBird extends Component {
    @property({ type: Node })
    private emitfromDF3: Node = null;
    private movingstate: MOVINGSTATE = MOVINGSTATE.NOTMOVING;
    private movingstateOK: MOVINGSTATE = MOVINGSTATE.NOTMOVING;
    private scenestate: sceneState = sceneState.noState;
    private originPosition: Vec3 = new Vec3(0, 0, 0);
    private starttingPosition: Vec3 = new Vec3(0, 0, 0);
    private speed: number = 2;
    private dx: number = 0;
    private dy: number = 0;
    private countMovingBird: number = 0;
    private count_ABOUT_STATING_POSITION: number = 0;
    onLoad() {
        this.movingstate = MOVINGSTATE.TIEN;
    }
    start() {
        this.emitfromDF3.on('bird move', this.setMovingstate, this);
    }
    setMovingstate(state: number, originPosition: Vec3, scenestate: number) {
        if (scenestate == sceneState.findLocation) {
            this.scenestate = sceneState.findLocation;
            if (state == MOVINGSTATE.TIEN) {
                this.movingstate = MOVINGSTATE.TIEN;
            }
            if (state == MOVINGSTATE.LUI) {
                this.movingstate = MOVINGSTATE.LUI;
            }
            if (state == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                this.originPosition = originPosition;
                this.movingstate = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
            }
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.movingstate = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.starttingPosition = originPosition;
                this.setBirdPosition();
            }
        }
        if (scenestate == sceneState.drawingColor) {
            this.scenestate = sceneState.drawingColor;
            if (state == MOVINGSTATE.TIEN) {
                console.log('nhan va set bird di ra ngoai man hinh');
                this.movingstate = MOVINGSTATE.TIEN;
                console.log(this.movingstate);
                console.log(state);
            }
            if (state == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                this.originPosition = originPosition;
                this.movingstate = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
            }
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION) {
                console.log('lenh ve diem goc trong man hinh');
                this.movingstate = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.starttingPosition = originPosition;
                this.setBirdPosition();
            }
        }
        if (scenestate == sceneState.collectPictures) {
            console.log('set collect');
            this.scenestate = sceneState.collectPictures;
            if (state == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.movingstate = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.starttingPosition = originPosition;
                this.setBirdPosition();
            }
        }
    }
    setBirdPosition() {
        if (this.scenestate == sceneState.findLocation) {
            if (this.movingstate == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.node.setWorldPosition(this.starttingPosition.x, this.starttingPosition.y, 0);
                this.movingstateOK = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.node.emit('moving end', this.movingstateOK);
            }
        }
        if (this.scenestate == sceneState.drawingColor) {
            if (this.movingstate == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.count_ABOUT_STATING_POSITION = this.count_ABOUT_STATING_POSITION + 1;
                console.log('ve diem goc trong man hinh ok');
                this.node.setWorldPosition(this.starttingPosition.x, this.starttingPosition.y, 0);
                this.movingstateOK = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.node.emit('moving end', this.movingstateOK, this.count_ABOUT_STATING_POSITION);
                if (this.count_ABOUT_STATING_POSITION == 3) {
                    this.count_ABOUT_STATING_POSITION = 0;
                }
            }
        }
        if (this.scenestate == sceneState.collectPictures) {
            if (this.movingstate == MOVINGSTATE.ABOUT_STATING_POSITION) {
                this.node.setWorldPosition(this.starttingPosition.x, this.starttingPosition.y, 0);
                this.movingstateOK = MOVINGSTATE.ABOUT_STATING_POSITION;
                this.node.emit('moving end', this.movingstateOK);
            }
        }
    }

    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.speed * this.dx, p.y + this.speed * this.dy, 0);
        if (this.movingstate == MOVINGSTATE.TIEN) {
            this.node.setWorldPosition(q.x, q.y, 0);
            let p = new Vec3(550, 0, 0);
            this.setBirdTien(this.node.worldPosition, p);
        }
        if (this.movingstate == MOVINGSTATE.LUI) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.setBirdLui(this.node.worldPosition);
        }
        if (this.movingstate == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.setBirdTien(this.node.worldPosition, this.originPosition)
        }
        if (this.movingstate == MOVINGSTATE.stop) {

        }
    }
    setBirdTien(position: Vec3, limitPosiiton: Vec3) {
        if (position.x <= limitPosiiton.x) {
            this.dx = 1;
            this.dy = 0;
        }
        else if (position.x > limitPosiiton.x) {
            if (this.movingstate == MOVINGSTATE.TIEN) {
                this.dx = 0;
                this.dy = 0;
                this.movingstate = MOVINGSTATE.stop;
                this.movingstateOK = MOVINGSTATE.TIEN;
                console.log('bird to position origin_emit to audio play and swap spine');
                this.node.emit('moving end', this.movingstateOK);
            }
            if (this.movingstate == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {
                this.dx = 0;
                this.dy = 0;
                this.movingstate = MOVINGSTATE.stop;
                this.movingstateOK = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
                this.node.emit('moving end', this.movingstateOK);
            }
        }
    }
    setBirdLui(position: Vec3) {
        if (position.x >= -200) {
            this.dx = -1;
            this.dy = 0;
        }
        else {
            this.dx = 0;
            this.dy = 0;
        }
    }
}


