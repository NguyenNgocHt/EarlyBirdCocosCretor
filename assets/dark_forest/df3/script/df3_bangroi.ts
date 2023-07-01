import { _decorator, Component, Node, Vec3, log, Color, Sprite } from 'cc';
import { df3_manager } from './df3_manager';
const { ccclass, property } = _decorator;
enum BOARDSTATE {
    NOSTATE,
    UP,
    DOWN,
    FALLING,
    STOP,
}
enum COLORSTATE {
    NOCOLOR,
    BLUE,
    CAROT,
    GREEN,
    VIOLET,
    YELLOW,
    RED,
    BLACK,
    WHITE,
    PINK,
    GREY,
    BROWN,
}
enum getcolorstate {
    nostate,
    takingColorOK,
    drawingColorCorrec,
    drawingcolorWrong,
}
enum fruitState {
    nostate,
    qua1,
    qua2,
    qua3,
}
enum drawingcolorEnd {
    nostate,
    notover,
    end,
}
@ccclass('df3_bangroi')
export class df3_bangroi extends Component {
    @property({ type: Node })
    private blue: Node = null;
    @property({ type: Node })
    private carot: Node = null;
    @property({ type: Node })
    private green: Node = null;
    @property({ type: Node })
    private violet: Node = null;
    @property({ type: Node })
    private yellow: Node = null;
    @property({ type: Node })
    private red: Node = null;
    @property({ type: Node })
    private pink: Node = null;
    @property({ type: Node })
    private black: Node = null;
    @property({ type: Node })
    private white: Node = null;
    @property({ type: Node })
    private brown: Node = null;
    @property({ type: Node })
    private grey: Node = null;
    @property({ type: Node })
    private emitfromDF3: Node = null;
    @property({ type: Node })
    private emitfromNamecolorControler_qua1: Node = null;
    @property({ type: Node })
    private emitfromNamecolorControler_qua2: Node = null;
    @property({ type: Node })
    private emitfromNamecolorControler_qua3: Node = null;
    @property({ type: Node })
    private emitfromMainpainter: Node = null;
    @property({ type: Node })
    private canhbang: Node = null;
    private boardState: BOARDSTATE = BOARDSTATE.NOSTATE;
    private boardStateOK: BOARDSTATE = BOARDSTATE.NOSTATE;
    private colorState: COLORSTATE = COLORSTATE.NOCOLOR;
    private drawingColorState: getcolorstate = getcolorstate.nostate;
    private fruitstate: fruitState = fruitState.nostate;
    private fruitstate_drawingOk: fruitState = fruitState.nostate;
    private drawingColorEndState: drawingcolorEnd = drawingcolorEnd.nostate;
    private get_color: Color;
    private get_nameNode: string = " ";
    private fallingSpeed: number = 25;
    private speedBrake: number = 0;
    private speed: number = 5;
    private dx: number = 0;
    private dy: number = 0;
    private count: number = 0;
    private getColorstate: getcolorstate = getcolorstate.nostate;
    private boardVachamOk: BOARDSTATE = BOARDSTATE.NOSTATE;
    private positionCanhbang: Vec3 = new Vec3(0, 0, 0);
    private colorname_qua1: string = " ";
    private randomNumber_qua1: number = 0;

    private colorname_qua2: string = " ";
    private randomNumber_qua2: number = 0;

    private colorname_qua3: string = " ";
    private randomNumber_qua3: number = 0;
    private point_gamePlay_VOCAB: number = 0;
    start() {
        this.emitfromDF3.on('falling start', this.setFalling, this);
        this.emitfromDF3.on('set name color', this.setEmitRandomColor, this);
        this.blue.on('send color and name node', this.setColorState, this);
        this.carot.on('send color and name node', this.setColorState, this);
        this.green.on('send color and name node', this.setColorState, this);
        this.violet.on('send color and name node', this.setColorState, this);
        this.yellow.on('send color and name node', this.setColorState, this);
        this.red.on('send color and name node', this.setColorState, this);
        this.black.on('send color and name node', this.setColorState, this);
        this.white.on('send color and name node', this.setColorState, this);
        this.grey.on('send color and name node', this.setColorState, this);
        this.brown.on('send color and name node', this.setColorState, this);
        this.pink.on('send color and name node', this.setColorState, this);
        this.emitfromMainpainter.on('drawing color state', this.setDrawingcolorState, this);
        this.emitfromMainpainter.on('zoom state for dwaing node ok', this.setstateBangroi, this);

        this.emitfromNamecolorControler_qua1.on('drawing color end', this.setEnd, this);
        this.emitfromNamecolorControler_qua2.on('drawing color end', this.setEnd, this);
        this.emitfromNamecolorControler_qua3.on('drawing color end', this.setEnd, this);
    }
    //set state bang roi
    setstateBangroi() {
        this.boardState = BOARDSTATE.UP;
        this.fallingSpeed = 1;
    }
    // set drawing end
    setEnd(fruitstate: number, drawingColorState: number) {
        if (fruitstate == fruitState.qua1) {
            if (drawingColorState == drawingcolorEnd.end) {
                this.drawingColorEndState = drawingcolorEnd.end;
                this.fruitstate = fruitState.qua1;
            }
        }
        if (fruitstate == fruitState.qua2) {
            if (drawingColorState == drawingcolorEnd.end) {
                this.drawingColorEndState = drawingcolorEnd.end;
                this.fruitstate = fruitState.qua2;
            }
        }
        if (fruitstate == fruitState.qua3) {
            if (drawingColorState == drawingcolorEnd.end) {
                this.drawingColorEndState = drawingcolorEnd.end;
                this.fruitstate = fruitState.qua3;
            }
        }
    }
    //emit random name color
    setEmitRandomColor() {
        var array_nameColor = [];
        array_nameColor = [" ", "Blue", "Black", "Brown", "Green", "Grey", "Orange", "Pink", "Purple", "Red", "White", "Yellow"];
        var random_qua1 = Math.floor(Math.random() * 11) + 1;
        this.randomNumber_qua1 = random_qua1;
        this.colorname_qua1 = array_nameColor[this.randomNumber_qua1];
        let random_qua2 = Math.floor(Math.random() * 11) + 1;
        while (random_qua2 == this.randomNumber_qua1) {
            random_qua2 = Math.floor(Math.random() * 11) + 1;
        }
        this.randomNumber_qua2 = random_qua2;
        this.colorname_qua2 = array_nameColor[this.randomNumber_qua2];

        let random_qua3 = Math.floor(Math.random() * 11) + 1;
        while (random_qua3 == this.randomNumber_qua1 || random_qua3 == this.randomNumber_qua2) {
            random_qua3 = Math.floor(Math.random() * 11) + 1;
        }
        this.randomNumber_qua3 = random_qua3;
        this.colorname_qua3 = array_nameColor[this.randomNumber_qua3];
        this.emittoNameColorControler();
    }
    emittoNameColorControler() {
        this.node.emit('name color qua 1', this.colorname_qua1);
        this.node.emit('name color qua 2', this.colorname_qua2);
        this.node.emit('name color qua 3', this.colorname_qua3);
    }
    //set color state
    setColorState(color: Color, nameNode: string) {
        this.get_nameNode = nameNode;
        var spriteBlue = this.blue.getComponent(Sprite);
        var blue = spriteBlue.color.clone();
        var spritecarot = this.carot.getComponent(Sprite);
        var spriteGreen = this.green.getComponent(Sprite);
        var spriteViolet = this.violet.getComponent(Sprite);
        var spriteYellow = this.yellow.getComponent(Sprite);
        var spriteBlack = this.black.getComponent(Sprite);
        var spriteWhite = this.white.getComponent(Sprite);
        var spriteRed = this.red.getComponent(Sprite);
        var spritePink = this.pink.getComponent(Sprite);
        var spriteBrown = this.brown.getComponent(Sprite);
        var spriteGrey = this.grey.getComponent(Sprite);
        if (spriteBlue.color.equals(color)) {
            this.colorState = COLORSTATE.BLUE;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spritecarot.color.equals(color)) {
            this.colorState = COLORSTATE.CAROT;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteGreen.color.equals(color)) {
            this.colorState = COLORSTATE.GREEN;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteViolet.color.equals(color)) {
            this.colorState = COLORSTATE.VIOLET;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteYellow.color.equals(color)) {
            this.colorState = COLORSTATE.YELLOW;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteRed.color.equals(color)) {
            this.colorState = COLORSTATE.RED;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteBlack.color.equals(color)) {
            this.colorState = COLORSTATE.BLACK;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteWhite.color.equals(color)) {
            this.colorState = COLORSTATE.WHITE;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spritePink.color.equals(color)) {
            this.colorState = COLORSTATE.PINK;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteGrey.color.equals(color)) {
            this.colorState = COLORSTATE.GREY;
            this.get_color = color;
            this.emittoPainter();
        }
        if (spriteBrown.color.equals(color)) {
            this.colorState = COLORSTATE.BROWN;
            this.get_color = color;
            this.emittoPainter();
        }
        this.getColorstate = getcolorstate.takingColorOK;
        this.emittoDf3();
        this.emittoColornameControler();
    }
    //emit to painter
    emittoPainter() {
        var spriteBlue = this.blue.getComponent(Sprite);
        var blue = spriteBlue.color.clone();
        var spritecarot = this.carot.getComponent(Sprite);
        var spriteGreen = this.green.getComponent(Sprite);
        var spriteViolet = this.violet.getComponent(Sprite);
        var spriteYellow = this.yellow.getComponent(Sprite);
        var spriteBlack = this.black.getComponent(Sprite);
        var spriteWhite = this.white.getComponent(Sprite);
        var spriteRed = this.red.getComponent(Sprite);
        var spritePink = this.pink.getComponent(Sprite);
        var spriteBrown = this.brown.getComponent(Sprite);
        var spriteGrey = this.grey.getComponent(Sprite);
        if (this.colorState == COLORSTATE.BLUE) {
            let r = spriteBlue.color.r;
            let g = spriteBlue.color.g;
            let b = spriteBlue.color.b;
            let a = spriteBlue.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.CAROT) {
            let r = spritecarot.color.r;
            let g = spritecarot.color.g;
            let b = spritecarot.color.b;
            let a = spritecarot.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.GREEN) {
            let r = spriteGreen.color.r;
            let g = spriteGreen.color.g;
            let b = spriteGreen.color.b;
            let a = spriteGreen.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.VIOLET) {
            let r = spriteViolet.color.r;
            let g = spriteViolet.color.g;
            let b = spriteViolet.color.b;
            let a = spriteViolet.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.YELLOW) {
            let r = spriteYellow.color.r;
            let g = spriteYellow.color.g;
            let b = spriteYellow.color.b;
            let a = spriteYellow.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.BLACK) {
            let r = spriteBlack.color.r;
            let g = spriteBlack.color.g;
            let b = spriteBlack.color.b;
            let a = spriteBlack.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.WHITE) {
            let r = spriteWhite.color.r;
            let g = spriteWhite.color.g;
            let b = spriteWhite.color.b;
            let a = spriteWhite.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.RED) {
            let r = spriteRed.color.r;
            let g = spriteRed.color.g;
            let b = spriteRed.color.b;
            let a = spriteRed.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.PINK) {
            let r = spritePink.color.r;
            let g = spritePink.color.g;
            let b = spritePink.color.b;
            let a = spritePink.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.BROWN) {
            let r = spriteBrown.color.r;
            let g = spriteBrown.color.g;
            let b = spriteBrown.color.b;
            let a = spriteBrown.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
        if (this.colorState == COLORSTATE.GREY) {
            let r = spriteGrey.color.r;
            let g = spriteGrey.color.g;
            let b = spriteGrey.color.b;
            let a = spriteGrey.color.a;
            this.node.emit('send color to Painter', r, g, b, a);
        }
    }
    //set falling
    setFalling(state: number) {
        if (state == BOARDSTATE.FALLING) {
            this.boardState = BOARDSTATE.FALLING;
        }
    }
    setDrawingcolorState(drawingstate: number, fruitstate: number) {
        if (fruitstate == fruitState.qua1) {
            if (drawingstate == getcolorstate.drawingColorCorrec) {
                this.getColorstate = getcolorstate.drawingColorCorrec;
                this.emittoDf3();
                this.node.emit('drawing color qua 1', this.getColorstate);
            }
            if (drawingstate == getcolorstate.drawingcolorWrong) {
                this.getColorstate = getcolorstate.drawingcolorWrong;
                this.emittoDf3();
                this.node.emit('drawing color qua 1', this.getColorstate);
            }

        }
        if (fruitstate == fruitState.qua2) {
            if (drawingstate == getcolorstate.drawingColorCorrec) {
                this.getColorstate = getcolorstate.drawingColorCorrec;
                this.emittoDf3();
                this.node.emit('drawing color qua 2', this.getColorstate);
            }
            if (drawingstate == getcolorstate.drawingcolorWrong) {
                this.getColorstate = getcolorstate.drawingcolorWrong;
                this.emittoDf3();
                this.node.emit('drawing color qua 2', this.getColorstate);
            }
        }
        if (fruitstate == fruitState.qua3) {
            if (drawingstate == getcolorstate.drawingColorCorrec) {
                this.getColorstate = getcolorstate.drawingColorCorrec;
                this.emittoDf3();
                this.node.emit('drawing color qua 3', this.getColorstate);
            }
            if (drawingstate == getcolorstate.drawingcolorWrong) {
                this.getColorstate = getcolorstate.drawingcolorWrong;
                this.emittoDf3();
                this.node.emit('drawing color qua 3', this.getColorstate);
            }
        }
    }
    emittoColornameControler() {
        this.node.emit('name node color', this.get_nameNode);
    }
    emittoDf3() {
        if (this.getColorstate == getcolorstate.takingColorOK) {
            this.node.emit('get color ok', this.getColorstate, this.get_nameNode);
        }
        if (this.getColorstate == getcolorstate.drawingColorCorrec) {
            this.node.emit('get color ok', this.getColorstate);
        }
        if (this.getColorstate == getcolorstate.drawingcolorWrong) {
            this.node.emit('get color ok', this.getColorstate);
        }
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.fallingSpeed * this.dx, p.y + this.fallingSpeed * this.dy, 0);
        let p_canhbang = this.canhbang.getWorldPosition();
        this.positionCanhbang = p_canhbang;
        if (this.boardState == BOARDSTATE.FALLING) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.setBoardMove(this.node.worldPosition);
            this.node.emit('position canh bang', p_canhbang, this.boardState);
        }
        if (this.boardState == BOARDSTATE.UP) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.setboarMoveUp(this.node.worldPosition);

        }
        if (this.boardState == BOARDSTATE.STOP) {

        }
    }
    setboarMoveUp(position: Vec3) {
        this.fallingSpeed = this.fallingSpeed + 0.1;
        if (position.y <= 2500) {
            this.dy = 1;
        }
        else {
            this.dy = 0;
            this.boardState = BOARDSTATE.NOSTATE;
            this.boardStateOK = BOARDSTATE.UP;
            this.node.emit('falling end', this.boardStateOK);
        }

    }
    setBoardMove(position: Vec3) {
        if (position.y >= 700) {
            this.dy = -1;
            if (position.y <= 825 && this.fallingSpeed >= 1) {
                this.fallingSpeed = this.fallingSpeed - 1;
            }
        }
        else {
            this.count = this.count + 1;
            if (this.count == 1) {
                this.dy = 1;
            }
            if (this.count == 2) {
                this.dy = 2;
            }
            if (this.count == 3) {
                this.dy = 3;
            }
            if (this.count == 4) {
                this.dy = 4;
            }
            if (this.count == 5) {
                this.dy = 5;
                this.boardState = BOARDSTATE.STOP;
                this.boardStateOK = BOARDSTATE.FALLING;
                this.boardVachamOk = BOARDSTATE.DOWN;
                this.scheduleOnce(function () {
                    this.node.emit('falling end', this.boardStateOK);
                }, 1.5);
                this.node.emit('position canh bang', this.positionCanhbang, this.boardVachamOk);
                this.count = 0;
            }
        }
    }
}


