import { _decorator, Component, Node, log, Vec3 } from 'cc';
import { reportnumberFruit } from './reportnumberFruit';

const { ccclass, property } = _decorator;
enum STATESCALE {
    ZOOMNO,
    ZOOMIN,
    ZOOMOUT,
};
@ccclass('setStateFruits')
export class setStateFruits extends Component {
    @property({ type: Node })
    private emitfromReportNumberFruits: Node = null;
    private stateZoom: STATESCALE = STATESCALE.ZOOMNO;
    private dxScale: number = 0;
    private dyScale: number = 0;
    private speedScale: number = 1;
    start() {
        this.emitfromReportNumberFruits.on('amount_fruits', this.setstatefruits, this);
        this.emitfromReportNumberFruits.on('zoom', this.setzoomFruits, this);
    }
    setzoomFruits(state: number) {
        if (state == STATESCALE.ZOOMIN) {
            this.stateZoom = STATESCALE.ZOOMIN;
        }
        if (state == STATESCALE.ZOOMOUT) {
            this.stateZoom = STATESCALE.ZOOMOUT;
        }
    }
    setstatefruits(amoutfruit: number) {
        const a = parseInt(this.node.name, 10);
        if (a <= amoutfruit) {
            this.node.active = true;
            this.setScaleFruits();
        }
        if (a > amoutfruit) {
            this.node.active = false;
        }
    }
    setScaleFruits() {
        this.stateZoom = STATESCALE.ZOOMIN;
    }

    update(deltaTime: number) {

        let I = this.node.getWorldScale();
        let j = new Vec3(I.x + this.speedScale * this.dxScale, I.y + this.speedScale * this.dyScale, 0);
        this.node.setWorldScale(j.x, j.y, 0);
        if (this.stateZoom == STATESCALE.ZOOMIN) {
            this.checkScaleZoomin(this.node.worldScale);
        }
        if (this.stateZoom == STATESCALE.ZOOMOUT) {
            this.checkScaleZoomOut(this.node.worldScale);
        }
    }
    checkScaleZoomOut(scale: Vec3) {
        if (scale.x > 0) {
            this.dxScale = -0.01;
            this.dyScale = -0.01;
        }
        else {
            this.dxScale = 0;
            this.dyScale = 0;
        }
    }
    checkScaleZoomin(scale: Vec3) {
        if (scale.x <= 1) {
            this.dxScale = 0.01;
            this.dyScale = 0.01;
        }
        else {
            this.dxScale = 0;
            this.dyScale = 0;
        }
    }
}


