import { _decorator, Component, Node, EventTouch, UITransform, v3, Vec2} from 'cc';
const { ccclass, property } = _decorator;
import { df3_DrawHelper } from './df3_DrawHelper';
@ccclass('df3_hitTest')
export class df3_hitTest extends Component {
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.checkhitTest, this);
    }
    checkhitTest(e: EventTouch)
    {
        
        var mouse = e.getUILocation();
        let out = v3();
        this.node.inverseTransformPoint(out, v3(mouse.x, mouse.y));
        let v2 = new Vec2(out.x, out.y);
        var UITransform_qua = this.node.getComponent(UITransform);
        var hit = UITransform_qua.hitTest(v2);
        if(hit)
        {
            if(this.node.name == 'Button_test1')
            {
                console.log('chuot nam tren hinh anh qua 1');
            }
            if(this.node.name == 'Button_test2')
            {
                console.log('chuot nam tren hinh anh qua 2');
            }
           
        } else {
            console.log('chuot nam ngoai hinh anh');
        }
       
    }

    update(deltaTime: number) {
        
    }
}


