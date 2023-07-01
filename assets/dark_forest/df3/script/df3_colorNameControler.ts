import { _decorator, Component, Node, log, Color, UITransform, Vec3 } from 'cc';
import { numberContro } from '../../df4/script/numberContro';
import { setStateFruits } from '../../df4/script/setStateFruits';
import { df3_setcolorname } from './df3_setcolorname';
const { ccclass, property } = _decorator;
enum getcolorState {
    nostate,
    TRUE,
    FALSE,
};
enum zoomState {
    nostate,
    zoomIn1,
    zoomOut1,
    shakingRight,
    shakingLeft,
    zoomout2,
    zoomIn2,
    zoomInX2,
};
enum drawingcolorEnd {
    nostate,
    notover,
    end,
};
enum getcolorstate {
    nostate,
    takingColorOK,
    drawingColorCorrec,
    drawingcolorWrong,
};
enum fruitState {
    nostate,
    qua1,
    qua2,
    qua3,
};
@ccclass('df3_colorNameControler')
export class df3_colorNameControler extends Component {
    @property({ type: Node })
    private blue: Node = null;
    @property({ type: Node })
    private blueglow: Node = null;
    @property({ type: Node })
    private black: Node = null;
    @property({ type: Node })
    private blackglow: Node = null;
    @property({ type: Node })
    private brown: Node = null;
    @property({ type: Node })
    private brownglow: Node = null;
    @property({ type: Node })
    private green: Node = null;
    @property({ type: Node })
    private greenglow: Node = null;
    @property({ type: Node })
    private grey: Node = null;
    @property({ type: Node })
    private greyglow: Node = null;
    @property({ type: Node })
    private orange: Node = null;
    @property({ type: Node })
    private orangeglow: Node = null;
    @property({ type: Node })
    private pink: Node = null;
    @property({ type: Node })
    private pinkglow: Node = null;
    @property({ type: Node })
    private purple: Node = null;
    @property({ type: Node })
    private purpleglow: Node = null;
    @property({ type: Node })
    private red: Node = null;
    @property({ type: Node })
    private redglow: Node = null;
    @property({ type: Node })
    private white: Node = null;
    @property({ type: Node })
    private whiteglow: Node = null;
    @property({ type: Node })
    private yellow: Node = null;
    @property({ type: Node })
    private yellowglow: Node = null;
    @property({ type: Node })
    private true: Node = null;
    @property({ type: Node })
    private false: Node = null;
    @property({ type: Node })
    private falseimage: Node = null;
    @property({ type: Node })
    private emitfromBangroi: Node = null;
    @property({ type: Node })
    private false1: Node = null;
    private colorCorrec: Color;
    private getcolorstate_Qua1: getcolorState = getcolorState.nostate;
    private getcolorstate_Qua2: getcolorState = getcolorState.nostate;
    private getcolorstate_Qua3: getcolorState = getcolorState.nostate;
    private drawingColorState: getcolorstate = getcolorstate.nostate;
    private fruitstate: fruitState = fruitState.nostate;
    private zoomstate: zoomState = zoomState.nostate;
    private drawingcolorend: drawingcolorEnd = drawingcolorEnd.nostate;
    private fruitstate_qua1: fruitState = fruitState.nostate;
    private fruitstate_qua2: fruitState = fruitState.nostate;
    private fruitstate_qua3: fruitState = fruitState.nostate;
    private colorname_qua1: string = " ";
    private randomNumber_qua1: number = 0;

    private colorname_qua2: string = " ";
    private randomNumber_qua2: number = 0;

    private colorname_qua3: string = " ";
    private randomNumber_qua3: number = 0;
    private namcolorGlow_width: number;
    private namecolorGlow: string = " ";
    private zoomSpeed: number = 5;
    private dx: number = 0;
    private dy: number = 0;
    private node_namecolorglow: Node = null;

    start() {
        this.emitfromBangroi.on('name color qua 1', this.setnamecolor_qua1, this);
        this.emitfromBangroi.on('name color qua 2', this.setnamecolor_qua2, this);
        this.emitfromBangroi.on('name color qua 3', this.setnamecolor_qua3, this);
        this.emitfromBangroi.on('name node color', this.compareNameAndColor, this);
        this.emitfromBangroi.on('color correc', this.emitDoiMauChu, this);
        this.emitfromBangroi.on('drawing color qua 1', this.emit_shakingAndSwapColorQua1, this);
        this.emitfromBangroi.on('drawing color qua 2', this.emit_shakingAndSwapColorQua2, this);
        this.emitfromBangroi.on('drawing color qua 3', this.emit_shakingAndSwapColorQua3, this);
        let nodeParent2 = this.blue.parent!;
        if (nodeParent2) {
            let childs = nodeParent2.children;
            for (let i = 0; i < childs.length; i++) {
                childs[i].on('zoom state ok', this.setglowName, this);
            }
        }
    }
    setglowName(name: string, state: number) {
        if (this.node.name == 'colorName_qua1') {
            if (state == zoomState.zoomOut1) {
                this.namecolorGlow = name;
                this.node.emit('state change', name, state);
            }
            if (state == zoomState.zoomout2) {
                //set bao true
                this.node_namecolorglow = this.node.getChildByName(this.namecolorGlow);
                var uitransform_glow = this.node_namecolorglow.getComponent(UITransform);
                let width_namecolorglow = uitransform_glow.width;
                let p_true = this.true.getWorldPosition();
                let q_true = new Vec3(p_true.x - width_namecolorglow / 2, p_true.y, 0);
                //set bao false
                let uitransform = this.falseimage.getComponent(UITransform);
                let width = uitransform.width;
                let p = this.false.getWorldPosition();
                let q_false = new Vec3(p.x - width / 2, p.y, 0);
                this.node.emit('state change', this.false.name, state, this.true.name, q_false, q_true);
            }
            if (state == zoomState.zoomIn2) {
                this.fruitstate_qua1 = fruitState.qua1;
                this.drawingcolorend = drawingcolorEnd.end;
                this.node.emit('drawing color end', this.fruitstate_qua1, this.drawingcolorend);
            }
        }
        if (this.node.name == 'colorName_qua2') {
            if (state == zoomState.zoomOut1) {
                this.namecolorGlow = name;
                this.node.emit('state change', name, state);
            }
            if (state == zoomState.zoomout2) {
                this.node_namecolorglow = this.node.getChildByName(this.namecolorGlow);
                var uitransform_glow = this.node_namecolorglow.getComponent(UITransform);
                let width_namecolorglow = uitransform_glow.width;
                let p_true = this.true.getWorldPosition();
                let q_true = new Vec3(p_true.x - width_namecolorglow / 2, p_true.y, 0);
                let uitransform = this.falseimage.getComponent(UITransform);
                let width = uitransform.width;
                let p = this.false.getWorldPosition();
                let q_false = new Vec3(p.x - width / 2, p.y, 0);
                this.node.emit('state change', this.false.name, state, this.true.name, q_false, q_true);
            }
            if (state == zoomState.zoomIn2) {
                this.fruitstate_qua2 = fruitState.qua2;
                this.drawingcolorend = drawingcolorEnd.end;
                this.node.emit('drawing color end', this.fruitstate_qua2, this.drawingcolorend);
            }
        }
        if (this.node.name == 'colorName_qua3') {
            if (state == zoomState.zoomOut1) {
                this.namecolorGlow = name;
                this.node.emit('state change', name, state);
            }
            if (state == zoomState.zoomout2) {
                this.node_namecolorglow = this.node.getChildByName(this.namecolorGlow);
                var uitransform_glow = this.node_namecolorglow.getComponent(UITransform);
                let width_namecolorglow = uitransform_glow.width;
                let p_true = this.true.getWorldPosition();
                let q_true = new Vec3(p_true.x - width_namecolorglow / 2, p_true.y, 0);
                let uitransform = this.falseimage.getComponent(UITransform);
                let width = uitransform.width;
                let p = this.false.getWorldPosition();
                let q_false = new Vec3(p.x - width / 2, p.y, 0);
                this.node.emit('state change', this.false.name, state, this.true.name, q_false, q_true);
            }
            if (state == zoomState.zoomIn2) {
                this.fruitstate_qua3 = fruitState.qua3;
                this.drawingcolorend = drawingcolorEnd.end;
                this.node.emit('drawing color end', this.fruitstate_qua3, this.drawingcolorend);
            }
        }
    }
    emit_shakingAndSwapColorQua1(state: number) {
        if (this.node.name == 'colorName_qua1') {
            if (state == getcolorstate.drawingColorCorrec) {
                this.drawingColorState = getcolorstate.drawingColorCorrec;
                this.node.emit('shaking and sawp color', this.drawingColorState);
            }
            if (state == getcolorstate.drawingcolorWrong) {
                this.drawingColorState = getcolorstate.drawingcolorWrong;
                this.node.emit('shaking and sawp color', this.drawingColorState);
            }
        }
    }
    emit_shakingAndSwapColorQua2(state: number) {
        if (this.node.name == 'colorName_qua2') {
            if (state == getcolorstate.drawingColorCorrec) {
                this.drawingColorState = getcolorstate.drawingColorCorrec;
                this.node.emit('shaking and sawp color', this.drawingColorState);
            }
            if (state == getcolorstate.drawingcolorWrong) {
                this.drawingColorState = getcolorstate.drawingcolorWrong;
                this.node.emit('shaking and sawp color', this.drawingColorState);
            }

        }
    }
    emit_shakingAndSwapColorQua3(state: number) {
        if (this.node.name == 'colorName_qua3') {
            if (state == getcolorstate.drawingColorCorrec) {
                this.drawingColorState = getcolorstate.drawingColorCorrec;
                this.node.emit('shaking and sawp color', this.drawingColorState);
            }
            if (state == getcolorstate.drawingcolorWrong) {
                this.drawingColorState = getcolorstate.drawingcolorWrong;
                this.node.emit('shaking and sawp color', this.drawingColorState);
            }

        }
    }
    emitDoiMauChu(color: Color) {
        this.colorCorrec = color;
        this.node.emit('doi mau', this.colorCorrec);
    }
    setnamecolor_qua1(nameColor: string) {
        if (this.node.name == 'colorName_qua1') {
            this.colorname_qua1 = nameColor;
            this.node.emit('set color name', this.colorname_qua1);
        }
    }
    setnamecolor_qua2(nameColor: string) {
        if (this.node.name == 'colorName_qua2') {
            this.colorname_qua2 = nameColor;
            this.node.emit('set color name', this.colorname_qua2);
        }
    }
    setnamecolor_qua3(nameColor: string) {
        if (this.node.name == 'colorName_qua3') {
            this.colorname_qua3 = nameColor;
            this.node.emit('set color name', this.colorname_qua3);
        }
    }
    compareNameAndColor(nameNode: string) {
        if (this.node.name == 'colorName_qua1') {
            if (nameNode == this.colorname_qua1) {
                this.getcolorstate_Qua1 = getcolorState.TRUE;
                this.node.emit('get color state qua 1', this.getcolorstate_Qua1);
            }
            else {
                this.getcolorstate_Qua1 = getcolorState.FALSE;
                this.node.emit('get color state qua 1', this.getcolorstate_Qua1);
            }

        }
        if (this.node.name == 'colorName_qua2') {
            if (nameNode == this.colorname_qua2) {
                this.getcolorstate_Qua2 = getcolorState.TRUE;
                this.node.emit('get color state qua 2', this.getcolorstate_Qua2);
            }
            else {
                this.getcolorstate_Qua2 = getcolorState.FALSE;
                this.node.emit('get color state qua 2', this.getcolorstate_Qua2);
            }
        }
        if (this.node.name == 'colorName_qua3') {
            if (nameNode == this.colorname_qua3) {
                this.getcolorstate_Qua3 = getcolorState.TRUE;
                this.node.emit('get color state qua 3', this.getcolorstate_Qua3);
            }
            else {
                this.getcolorstate_Qua3 = getcolorState.FALSE;
                this.node.emit('get color state qua 3', this.getcolorstate_Qua3);
            }
        }
    }
    update(deltaTime: number) {
    }

}


