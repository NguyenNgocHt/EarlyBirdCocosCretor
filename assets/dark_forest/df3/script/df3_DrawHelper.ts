import { _decorator, Component, Node, UITransform, Vec2, Vec3, assetManager,
    AssetManager, Button, EventHandler, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df3_DrawHelper')
export class df3_DrawHelper extends Component {
    private static tempVec3 = new Vec3();

    static convertToDrawNodePos(drawNode: Node, worldPos: Vec2): Vec2 {
        this.tempVec3.set(worldPos.x, worldPos.y, 0);
        let pos = drawNode.getComponent(UITransform).convertToNodeSpaceAR(this.tempVec3);
        pos.x += drawNode.getComponent(UITransform).width * drawNode.getComponent(UITransform).anchorX;
        pos.y += drawNode.getComponent(UITransform).height * drawNode.getComponent(UITransform).anchorY;
        pos.y = drawNode.getComponent(UITransform).height - pos.y;
        return new Vec2(pos.x, pos.y);
    }

    /**
     * tải tài nguyên
     * @param bundlePath bundle的路径
     * @param prefabPath Đường dẫn đến prefab tài nguyên
     * @param resType loại tài nguyên được tải
     * @param parent nút cha
     * @param callback goi lai
     */
    static loadRes (bundlePath: string, prefabPath: string, resType: any, callback:Function = null!) {
        assetManager.loadBundle(bundlePath, (err: any, bundle: AssetManager.Bundle) => {
            if (err) {
                console.log(`bundle load error, reason :${err}`);
                return ;
            }

            bundle.load(prefabPath, resType, (err: any, data: any) => {
                if (err) {
                    console.log(`prefab load error, reason :${err}`);
                    return ;
                }

                if (callback) {
                    callback(data);
                }
            })
        });
    }

    /**
     * Thêm phương thức nghe nút
     * @param child nút con
     * @param target nút đích
     * @param component tên kịch bản
     * @param handler Tên chức năng
     * @param customEventData Thông số tùy chỉnh
     */
    static addButtonEvent (child: Node, target: Node, component: string, handler: string, customEventData: any) {
        let button = child.addComponent(Button);
        let evt = new EventHandler();
        evt.target = target;
        evt.component = component;
        evt.handler = handler;
        evt.customEventData = customEventData;
        button.clickEvents.push(evt);
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


