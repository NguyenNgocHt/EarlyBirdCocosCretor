import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df1_getPosition_buffterfly_moving')
export class df1_getPosition_buffterfly_moving extends Component {
    position_moving_list = [];
    start() {
        this.getPosition_moving();
    }
    onLoad() {
        if (!this.position_moving_list) {
            this.position_moving_list = [];
        }
        let childs = this.node.children;
        for (let i = 0; i < childs.length; i++) {
            var name_sounce = 'position';
            var name_taget = `${i}`;
            this.position_moving_list[i] = childs[i].getWorldPosition();
        }
    }
    getPosition_moving() {
        this.scheduleOnce(function () {
            this.node.emit('arr moving position_buffter fly', this.position_moving_list);
        }, 0.1);
    }

    update(deltaTime: number) {

    }
}


