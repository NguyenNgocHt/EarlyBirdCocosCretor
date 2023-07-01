import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
enum spineState {
    nostate,
    larung,
    dungim,
}
@ccclass('df3_lacayvachamBangroi')
export class df3_lacayvachamBangroi extends Component {
    @property({ type: Node })
    private emitfromdf3: Node = null;
    private spinestate: spineState = spineState.dungim;
    start() {
        this.emitfromdf3.on('position canh bang va cham', this.setstateSpine, this);
        this.spineStar();
    }
    setstateSpine(position: Vec3, state: number) {
        if (state == spineState.larung) {
            let p = this.node.getWorldPosition();
            if (position.y < p.y) {
                this.spinestate = spineState.larung;
                this.spineStar();
            }
            else {
                this.spinestate = spineState.dungim;
                this.spineStar();
            }
        }
        if (state == spineState.dungim) {
            this.spinestate = spineState.dungim;
            this.spineStar();
        }
    }
    spineStar() {
        if (this.spinestate == spineState.dungim) {
            this.node.active = false;
        }
        if (this.spinestate == spineState.larung) {
            this.node.active = true;
        }
    }
    update(deltaTime: number) {

    }
}


