import { _decorator, Component, Node, labelAssembler, Label, Vec3 } from 'cc';
import { AudioManager } from '../../../loading/script/AudioManager';
import { df3_starting_hunghinh } from '../../df3/script/df3_starting_hunghinh';
const { ccclass, property } = _decorator;
enum hacanhState {
    nostate,
    hacanh,
    catcanh,
    stop,
}
enum openDoorState {
    nostate,
    open,
    block,
}
enum socSpine {
    nostate,
    run,
    ilde,
    jump,
}
@ccclass('gate_mainControler')
export class gate_mainControler extends Component {
    @property(Node)
    private NodeMovingList: Node = null;
    @property(Node)
    private boxChat: Node = null;
    @property(Label)
    private label: Label = null;
    @property(Node)
    private button_pause: Node = null;
    @property(Node)
    private cua1: Node = null;
    @property(Node)
    private cua2: Node = null;
    @property(Node)
    private position1: Node = null;
    @property(Node)
    private position2: Node = null;
    @property(Node)
    private position3: Node = null;
    @property(Node)
    private position4: Node = null;
    @property(Node)
    private UFO: Node = null;
    @property(Node)
    private socSpine: Node = null;
    @property(Node)
    private groupTree1: Node = null;
    @property(Node)
    private position_moving1: Node = null;
    @property(Node)
    private position_moving2: Node = null;
    @property(Node)
    private position_moving3: Node = null;
    @property(Node)
    private blue_buffterFly: Node = null;
    @property(Node)
    private yellow_buffterFly: Node = null;
    @property(Node)
    private red_buffterFly: Node = null;
    private hacanhstate: hacanhState = hacanhState.nostate;
    private opendoor_state: openDoorState = openDoorState.block;
    private soc_spine: socSpine = socSpine.nostate;
    private position_moving_buffterfly = [];
    private index_red_buffterFly: number = 0;
    private index_blue_buffterFly: number = 0;
    private index_yellow_buffterFly: number = 0;
    onLoad() {
        this.boxChat.active = false;
        this.index_blue_buffterFly = this.blue_buffterFly.getSiblingIndex();
        this.index_red_buffterFly = this.red_buffterFly.getSiblingIndex();
        this.index_yellow_buffterFly = this.yellow_buffterFly.getSiblingIndex();
    }
    start() {
        this.cua1.on(Node.EventType.TOUCH_START, this.emitDoorOpen, this);
        this.cua2.on(Node.EventType.TOUCH_START, this.emitDoorOpen, this);
        this.UFO.on('cho phep mo cua', this.set_openDoor, this);
        this.UFO.on('show bird audio play and box chat', this.set_audioPlay_and_showBoxChat, this);
        this.socSpine.on('soc chuyen spine', this.set_Soc_spine, this);
        this.socSpine.on('set index after tree', this.setIndex_after_tree, this);
        this.socSpine.on('set index befor tree', this.setIndex_befor_tree, this);
        this.NodeMovingList.on('arr moving position_buffter fly', this.getArr_position_moving_buffterfly, this);
        let parentNode = this.socSpine.parent;
        let childs = parentNode.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('loop moving start', this.emit_to_Buffter_fly, this);
            childs[i].on('set index', this.setSblIndex, this);
        }
    }
    setSblIndex(position_moving: Vec3, nodeName: string) {
        let p1 = this.position_moving_buffterfly[0];
        let p2 = this.position_moving_buffterfly[1];
        let p3 = this.position_moving_buffterfly[2];
        let index = this.groupTree1.getSiblingIndex();
        if (position_moving == p1 || position_moving == p2 || position_moving == p3) {
            let node_name = this.node.getChildByName(nodeName);
            node_name.setSiblingIndex(index + 2);
        } else {
        }
    }
    emit_to_Buffter_fly(position_moving: Vec3, moving_number: number) {


        this.node.emit('moving start', position_moving, moving_number);
    }
    getArr_position_moving_buffterfly(arr_position_moving: Vec3[]) {
        if (!this.position_moving_buffterfly) {
            this.position_moving_buffterfly = [];
        }
        this.position_moving_buffterfly = arr_position_moving;
        this.node.emit('moving_position_buffter_fly_list', this.position_moving_buffterfly);
    }
    set_openDoor() {
        this.opendoor_state = openDoorState.open;
    }
    setIndex_after_tree() {
        let index_groupTree1 = this.groupTree1.getSiblingIndex();
        this.socSpine.setSiblingIndex(index_groupTree1 - 1);
    }
    setIndex_befor_tree() {
        let index_groupTree1 = this.groupTree1.getSiblingIndex();
        this.socSpine.setSiblingIndex(index_groupTree1 + 2);
    }
    emitDoorOpen() {
        if (this.opendoor_state == openDoorState.open) {
            this.soc_spine = socSpine.run;
            this.node.emit('spine state_2', this.soc_spine);
            this.node.emit('door open', this.position1, this.position2, this.position3, this.position4);
        }
    }
    set_audioPlay_and_showBoxChat() {
        this.boxChat.active = true;
        this.scheduleOnce(function () {
            this.label.string = 'We are just landing in the English planet.\n Let’s explore this world'
        }, 0.1);
        AudioManager.instance().playShort('dark_forest', 'gate/sound/We are just landing in the English planet. Let’s explore this world', true);
        AudioManager.instance().audioSource.volume = 1;
        this.scheduleOnce(function () {
            this.boxChat.active = false;
        }, 4.7);
    }
    set_Soc_spine(state: number) {
        if (state == socSpine.ilde) {
            this.soc_spine = socSpine.run;
            this.node.emit('spine state', this.soc_spine);
        }
    }
    update(deltaTime: number) {

    }
}


