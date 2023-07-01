import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gate_getPositionBuffterFly_moving')
export class gate_getPositionBuffterFly_moving extends Component {
    @property(Node)
    private postition1: Node = null;
    @property(Node)
    private postition2: Node = null;
    @property(Node)
    private postition3: Node = null;
    @property(Node)
    private postition4: Node = null;
    @property(Node)
    private postition5: Node = null;
    @property(Node)
    private postition6: Node = null;
    @property(Node)
    private postition7: Node = null;
    private p1: Vec3 = new Vec3(0, 0, 0);
    private p2: Vec3 = new Vec3(0, 0, 0);
    private p3: Vec3 = new Vec3(0, 0, 0);
    private p4: Vec3 = new Vec3(0, 0, 0);
    private p5: Vec3 = new Vec3(0, 0, 0);
    private p6: Vec3 = new Vec3(0, 0, 0);
    private p7: Vec3 = new Vec3(0, 0, 0);
    private p8: Vec3 = new Vec3(0, 0, 0);
    private p9: Vec3 = new Vec3(0, 0, 0);
    private p10: Vec3 = new Vec3(0, 0, 0);
    private p11: Vec3 = new Vec3(0, 0, 0);
    private p12: Vec3 = new Vec3(0, 0, 0);
    private p13: Vec3 = new Vec3(0, 0, 0);
    private p14: Vec3 = new Vec3(0, 0, 0);
    private p15: Vec3 = new Vec3(0, 0, 0);
    position_moving_list: Vec3[];
    onLoad() {
        if (!this.position_moving_list) {
            this.position_moving_list = [];
        }
        let childs = this.node.children;
        for (let i = 0; i < childs.length; i++) {
            var name_sounce = 'position_moving';
            var name_taget = `${i}`;
            this.position_moving_list[i] = childs[i].getWorldPosition();
        }
    }
    start() {
        this.scheduleOnce(function () {
            this.getPosition_moving();
        }, 0.1);

    }
    getPosition_moving() {
        this.node.emit('arr moving position_buffter fly', this.position_moving_list);
    }
    update(deltaTime: number) {
    }
}


