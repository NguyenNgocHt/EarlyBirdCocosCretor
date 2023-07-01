import { _decorator, Component, Node, Vec3, log } from 'cc';
const { ccclass, property } = _decorator;
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
@ccclass('df3_nodeStartMoving')
export class df3_nodeStartMoving extends Component {
    @property({ type: Node })
    private emitfromStarting: Node = null;
    private movingState: nodeMovingState = nodeMovingState.nostate;
    private movingStateEnd: nodeMovingState = nodeMovingState.nostate;
    private nodestate: nodeState = nodeState.nostate;
    private movingSpeed: number = 40;
    private movingSpeed_Slow: number = 1;
    private movingSpeed_hight: number = 35;
    private limitNumber: number = 0;
    private numberOPAcity_up: number = 0;
    private number_up: number = 1;
    private numberOPAcity_down: number = 255;
    private namefornodeMoving: string = " ";
    private dx: number = 0;
    private dy: number = 0;
    start() {
        this.emitfromStarting.on('to right', this.setmoving, this);
    }
    setmoving(state: number, node_state: number) {
        if (state == nodeMovingState.toright && node_state == nodeState.start) {
            this.nodestate = nodeState.start;
            this.movingState = nodeMovingState.toright;
            if (this.movingSpeed == 35) {
                this.limitNumber = this.slowCalculation();
            }
        }
        if (state == nodeMovingState.torightEND && node_state == nodeState.start) {
            this.nodestate = nodeState.start;
            this.movingState = nodeMovingState.torightEND;
        }
        if (state == nodeMovingState.torightEND && node_state == nodeState.so3) {
            this.nodestate = nodeState.so3;
            this.movingState = nodeMovingState.torightEND;
        }
        if (state == nodeMovingState.torightEND && node_state == nodeState.so2) {
            this.nodestate = nodeState.so2;
            this.movingState = nodeMovingState.torightEND;
        }
        if (state == nodeMovingState.torightEND && node_state == nodeState.so1) {
            this.nodestate = nodeState.so1;
            this.movingState = nodeMovingState.torightEND;
        }
        if (state == nodeMovingState.torightEND && node_state == nodeState.go) {
            this.nodestate = nodeState.go;
            this.movingState = nodeMovingState.torightEND;
        }
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.movingSpeed * this.dx, p.y + this.movingSpeed * this.dy, 0);
        if (this.movingState == nodeMovingState.stop) {

        }
        if (this.movingState == nodeMovingState.toright && this.nodestate == nodeState.start && this.node.name == 'start') {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.toright(this.node.position);
        }
        if (this.movingState == nodeMovingState.torightEND && this.nodestate == nodeState.start && this.node.name == 'start') {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.torightEND(this.node.position);
        }
        if (this.movingState == nodeMovingState.torightEND && this.nodestate == nodeState.so3 && this.node.name == '3') {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.torightEND1(this.node.position);
        }
        if (this.movingState == nodeMovingState.torightEND && this.nodestate == nodeState.so2 && this.node.name == '2') {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.torightEND1(this.node.position);
        }
        if (this.movingState == nodeMovingState.torightEND && this.nodestate == nodeState.so1 && this.node.name == '1') {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.torightEND1(this.node.position);
        }
        if (this.movingState == nodeMovingState.torightEND && this.nodestate == nodeState.go && this.node.name == 'go') {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.torightEND1(this.node.position);
        }
    }
    toright(position: Vec3) {
        if (position.x < -400) {
            this.node.setNodeOpacity(0);
        }
        else if (position.x > -400 && position.x < -100) {
            this.node.setNodeOpacity(this.numberOPAcity_up = this.numberOPAcity_up + this.number_UP());
        }
        else if (position.x < -100) {
            this.movingSpeed = this.movingSpeed_hight;
        }
        else if (position.x >= -100 && position.x <= 100) {
            this.movingSpeed = this.movingSpeed_Slow;
            this.number_up = 1;
            this.node.setNodeOpacity(255);
        }
        else if (position.x >= -this.limitNumber + 40) {
            this.movingSpeed = this.movingSpeed - 1;
        }
        else if (position.x > 0) {
            this.movingSpeed = 0;
        }
        if (position.x < 0) {
            this.dx = 1;
        }
        else if (position.x >= 0) {
            console.log('nhay vao day stop moving');
            this.dx = 0;
            this.movingState = nodeMovingState.stop;
            this.node.emit('unlock start node');
            this.movingSpeed = 40;
        }
    }
    torightEND(position: Vec3) {
        if (position.x > 250 && position.x < 600) {
            this.movingSpeed = this.movingSpeed_hight;
            this.node.setNodeOpacity(this.numberOPAcity_down = this.numberOPAcity_down - 25);
        }
        this.movingSpeed = this.movingSpeed + 1;
        if (position.x < 2000) {
            this.dx = 1;
        }
        else {
            this.dx = 0;
            this.movingState = nodeMovingState.stop;
            this.movingSpeed = 35;
            this.movingStateEnd = nodeMovingState.torightEND;
            this.node.emit('moving ok', this.movingStateEnd, this.nodestate);
        }
    }
    torightEND1(position: Vec3) {
        if (position.x < -300) {
            this.node.setNodeOpacity(0);
        }
        if (position.x > -300 && position.x < -50) {
            this.node.setNodeOpacity(this.numberOPAcity_up = this.numberOPAcity_up + this.number_UP());
        }
        if (position.x < -50) {
            this.movingSpeed = this.movingSpeed_hight;
        }
        if (position.x >= -50 && position.x <= 50) {
            this.movingSpeed = this.movingSpeed_Slow;
            this.number_up = 1;
            this.node.setNodeOpacity(255);
        }
        if (position.x > 50 && position.x < 400) {
            this.movingSpeed = this.movingSpeed_hight;
            this.node.setNodeOpacity(this.numberOPAcity_down = this.numberOPAcity_down - 25);
        }
        if (position.x < 2000) {
            this.dx = 1;
        }
        else {
            this.dx = 0;
            this.movingState = nodeMovingState.stop;
            this.movingSpeed = 35;
            this.movingStateEnd = nodeMovingState.torightEND;
            this.numberOPAcity_down = 255;
            this.numberOPAcity_up = 0;
            this.number_up = 1;
            this.node.emit('moving ok', this.movingStateEnd, this.nodestate);
        }
    }
    number_UP(): number {
        return this.number_up = this.number_up + 12;
    }
    slowCalculation(): number {
        var limitNumber = 0;
        for (let i = this.movingSpeed; i >= 0; i--) {
            limitNumber = limitNumber + i;
        }
        return limitNumber;
    }
}



