import { _decorator, Component, Node , color, Color, Sprite, log,v3, SpriteComponent, spriteAssembler, SpriteFrame} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df3_getcolor')
export class df3_getcolor extends Component {
    private get_Color: Color;
    private get_sprite: Sprite;
    private nameNode: string = " ";
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.getColor, this);
    }
    getColor()
    {
        this.node.setSiblingIndex(11);
        this.nameNode = this.node.name;
        var sprite = this.node.getComponent(Sprite);
        let p = sprite.color.clone();
        this.get_Color = p;
        this.node.emit('send color and name node',this.get_Color, this.nameNode);
    }
    update(deltaTime: number) {
        
    }
}


