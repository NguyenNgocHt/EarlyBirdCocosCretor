import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
enum chuyencanhState {
    nostate,
    chuyencanh,
    dungim,
}
@ccclass('df3_chuyencanh')
export class df3_chuyencanh extends Component {
    @property({ type: Node })
    private emitfromDf3: Node = null;
    private chuyencanhstate: chuyencanhState = chuyencanhState.dungim;
    start() {
        this.spineStart();
        this.emitfromDf3.on('chuyen canh state', this.chuyencanhseting, this);
    }
    chuyencanhseting(state: number) {
        if (state == chuyencanhState.chuyencanh) {
            this.chuyencanhstate = chuyencanhState.chuyencanh;
            this.spineStart();

        }
    }
    spineStart() {
        if (this.chuyencanhstate == chuyencanhState.dungim) {
            this.node.active = false;
        }
        if (this.chuyencanhstate == chuyencanhState.chuyencanh) {
            this.node.active = true;
            this.scheduleOnce(function () {
                this.node.active = false;
            }, 2.8);
        }
    }

    update(deltaTime: number) {

    }
}


