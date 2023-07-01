import { _decorator, Component, Node, Touch, tween, Vec3, enumerableProps } from 'cc';
const { ccclass, property } = _decorator;
enum startingHungHinh {
    nostate,
    start,
    pause,
    stop,
}
enum nodeMovingState {
    nostate,
    toright,
    torightEND,
    toleft,
    stop,
};
enum nodeState {
    nostate,
    start,
    so1,
    so2,
    so3,
    go,
}
enum unlockState {
    nostate,
    unlock,
    lock,
}
@ccclass('df3_starting_hunghinh')
export class df3_starting_hunghinh extends Component {
    @property({ type: Node })
    private emitfromHunghinh: Node = null;
    @property({ type: Node })
    private so1: Node = null;
    @property({ type: Node })
    private so2: Node = null;
    @property({ type: Node })
    private so3: Node = null;
    @property({ type: Node })
    private GO: Node = null;
    @property({ type: Node })
    private bl: Node = null;
    @property({ type: Node })
    private startNode: Node = null;
    private startState: startingHungHinh = startingHungHinh.nostate;
    private nodemovingstate: nodeMovingState = nodeMovingState.nostate;
    private nodestate: nodeState = nodeState.nostate;
    private unlock_state: unlockState = unlockState.nostate;
    start() {
        this.emitfromHunghinh.on('starting', this.startingHungHinh, this);
        this.startNode.on(Node.EventType.TOUCH_START, this.setnumber, this);
        this.startNode.on('moving ok', this.setmovingState_start, this);
        this.startNode.on('unlock start node', this.set_unlock_start_node, this);
        this.so1.on('moving ok', this.setmovingState_so1, this);
        this.so2.on('moving ok', this.setmovingState_so2, this);
        this.so3.on('moving ok', this.setmovingState_so3, this);
        this.GO.on('moving ok', this.setmovingState_go, this);
    }
    set_unlock_start_node() {
        this.unlock_state = unlockState.unlock;
    }
    setmovingState_start(state: number, nodestate: number) {

        if (state == nodeMovingState.torightEND && nodestate == nodeState.start) {
            this.nodemovingstate = nodeMovingState.torightEND;
            this.nodestate = nodeState.so3;
            this.node.emit('to right', this.nodemovingstate, this.nodestate);
        }
    }
    setmovingState_so3(state: number, nodestate: number) {

        if (state == nodeMovingState.torightEND && nodestate == nodeState.so3) {
            this.nodemovingstate = nodeMovingState.torightEND;
            this.nodestate = nodeState.so2;
            this.node.emit('to right', this.nodemovingstate, this.nodestate);
        }
    }
    setmovingState_so2(state: number, nodestate: number) {

        if (state == nodeMovingState.torightEND && nodestate == nodeState.so2) {
            this.nodemovingstate = nodeMovingState.torightEND;
            this.nodestate = nodeState.so1;
            this.node.emit('to right', this.nodemovingstate, this.nodestate);
        }
    }
    setmovingState_so1(state: number, nodestate: number) {

        if (state == nodeMovingState.torightEND && nodestate == nodeState.so1) {
            this.nodemovingstate = nodeMovingState.torightEND;
            this.nodestate = nodeState.go;
            this.node.emit('to right', this.nodemovingstate, this.nodestate);
        }
    }
    setmovingState_go(state: number, nodestate: number) {

        if (state == nodeMovingState.torightEND && nodestate == nodeState.go) {
            tween(this.bl)
                .to(0.3, { scale: new Vec3(6, 6, 6) })
                .to(0.2, { scale: new Vec3(0, 0, 0) })
                .call(() => {
                    this.emitto_mainHunghinh();
                })
                .start();
        }
    }
    emitto_mainHunghinh() {
        this.node.emit('start state end');
    }
    startingHungHinh(state: number) {
        if (state == startingHungHinh.start) {
            this.startState = startingHungHinh.start;
            this.start_hunghinh();
        }
    }
    start_hunghinh() {
        if (this.startState == startingHungHinh.start) {
            tween(this.bl)
                .to(0.5, { scale: new Vec3(1, 1, 1) })
                .call(() => {
                    this.movingstateSeting();
                })
                .start();
        }
    }
    movingstateSeting() {
        this.nodestate = nodeState.start;
        this.nodemovingstate = nodeMovingState.toright;
        this.node.emit('to right', this.nodemovingstate, this.nodestate);
    }
    setnumber() {
        if (this.unlock_state == unlockState.unlock) {
            this.nodemovingstate = nodeMovingState.torightEND
            this.nodestate = nodeState.start;
            this.node.emit('to right', this.nodemovingstate, this.nodestate);
        }
    }
    update(deltaTime: number) {

    }
}


