import { _decorator, Component, Node, EventTouch, TERRAIN_NORTH_INDEX, Vec3, log, TerrainLayer } from 'cc';
import { home } from './home';
const { ccclass, property } = _decorator;
enum PressButtonState {
    NOSTATE,
    HOME,
    ECA,
    INBOX,
    ACCOUNT,
};
@ccclass('menuContro')
export class menuContro extends Component {
    @property({ type: Node })
    private emitFromHome: Node = null;
    @property({ type: Node })
    private button_home: Node = null;
    @property({ type: Node })
    private button_eca: Node = null;
    @property({ type: Node })
    private button_inbox: Node = null;
    @property({ type: Node })
    private button_acc: Node = null;
    @property({ type: Node })
    private vienHome: Node = null;
    @property({ type: Node })
    private vienacc: Node = null;
    @property({ type: Node })
    private vienInbox: Node = null;
    @property({ type: Node })
    private vienEca: Node = null;
    private pressButton: PressButtonState = PressButtonState.NOSTATE;
    private positionStart: Vec3 = new Vec3(0, 0, 0);
    private positionEND: Vec3 = new Vec3(0, 0, 0);
    private positionCancel: Vec3 = new Vec3(0, 0, 0);
    start() {
        this.button_home.on(Node.EventType.TOUCH_START, this.setHome, this);
        this.button_acc.on(Node.EventType.TOUCH_START, this.setACC, this);
        this.button_eca.on(Node.EventType.TOUCH_START, this.setEca, this);
        this.button_inbox.on(Node.EventType.TOUCH_START, this.setInbox, this);
    }
    setHome() {
        this.pressButton = PressButtonState.HOME;
        this.button_home.setSiblingIndex(5);
        this.vienEca.active = false;
        this.vienInbox.active = false;
        this.vienacc.active = false;
        this.vienHome.active = true;
        this.initScence();
    }
    setACC() {
        this.pressButton = PressButtonState.ACCOUNT;
        this.button_acc.setSiblingIndex(5);
        this.vienEca.active = false;
        this.vienInbox.active = false;
        this.vienHome.active = false;
        this.vienacc.active = true;
        this.initScence();
    }
    setEca() {
        this.pressButton = PressButtonState.ECA;
        this.button_eca.setSiblingIndex(5);
        this.vienInbox.active = false;
        this.vienHome.active = false;
        this.vienacc.active = false;
        this.vienEca.active = true;
        this.initScence();
    }
    setInbox() {
        this.pressButton = PressButtonState.INBOX;
        this.button_inbox.setSiblingIndex(5);
        this.vienHome.active = false;
        this.vienacc.active = false;
        this.vienEca.active = false;
        this.vienInbox.active = true;
        this.initScence();
    }
    initScence() {
        if (this.pressButton == PressButtonState.ACCOUNT) {

        }
        if (this.pressButton == PressButtonState.ECA) {

        }
        if (this.pressButton == PressButtonState.HOME) {

        }
        if (this.pressButton == PressButtonState.INBOX) {

        }
    }
    update(deltaTime: number) {

    }
}


