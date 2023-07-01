import {  _decorator, Component, Node, Graphics, Sprite, EventTouch, Vec2, log, v3, spriteAssembler, Vec3, Color, SpriteRenderer, SpriteAtlas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df3_painter')
export class df3_painter extends Component {
    @property({type: Node})
    private emitfromdf3: Node = null;
    @property({type: Graphics})
    private graphics: Graphics = null;
    @property({type: Node})
    private emitfromBangroi: Node = null;
    private get_color: Color;
    private color_r: number;
    private color_g: number;
    private color_b: number;
    start() {
        this.initPainter();
        this.emitfromBangroi.on('send color to Painter', this.setcolor, this);
        this.node.on(Node.EventType.TOUCH_START, this.touchStart.bind(this));
        this.node.on(Node.EventType.TOUCH_MOVE, this.touchMove.bind(this));
        this.node.on(Node.EventType.TOUCH_END, this.touchEnd.bind(this));
    }
    setcolor(color: Color)
    {
        this.graphics.strokeColor.set(color);
    }
    initPainter()
    {
        let g = this.graphics;
        g.lineWidth = 30;
        g.moveTo(0,0);
        g.lineTo(1,1);
        g.stroke();
    }
    touchStart(event: EventTouch)
    {
        let newPoint = event.getUILocation();
        let out = v3();
        this.node.inverseTransformPoint(out, v3(newPoint.x, newPoint.y, 0));
        let g = this.graphics;
        g.moveTo(out.x, out.y);
    }
    touchMove(event: EventTouch)
    {
        let newPoint = event.getUILocation();
        let out = v3();
        this.node.inverseTransformPoint(out, v3(newPoint.x, newPoint.y, 0));
        let g = this.graphics;
        g.lineTo(out.x, out.y);
        g.stroke();
    }
    touchEnd(event: EventTouch)
    {
        let newPoint = event.getUILocation();
        let out = v3();
        this.node.inverseTransformPoint(out, v3(newPoint.x, newPoint.y, 0));
        let g = this.graphics;
        g.lineTo(out.x, out.y);  
        g.stroke();      
    }
    update(deltaTime: number) {
        
    }
}


