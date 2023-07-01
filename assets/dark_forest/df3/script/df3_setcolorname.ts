import { _decorator, Component, Node, Vec3, Color, Sprite, BoxCollider, UITransform } from 'cc';
const { ccclass, property } = _decorator;



enum zoomState {
    nostate,
    zoomIn1,
    zoomOut1,
    shakingRight,
    shakingLeft,
    zoomout2,
    zoomIn2,
    zoomInX2,
}
enum movetoState {
    nostate,
    move,
    nomove,
}
enum correc_wrongState {
    nostate,
    correc,
    wrong,
}
enum glowstate {
    nostate,
    glow,
    noglow,
}
enum getcolorState {
    nostate,
    takingColorOK,
    drawingColorCorrec,
    drawingcolorWrong,
}
@ccclass('df3_setcolorname')
export class df3_setcolorname extends Component {
    @property({ type: Node })
    private emitfromcolornamecontroler: Node = null;
    private zoomstate: zoomState = zoomState.nostate;
    private zoomstateEnd: zoomState = zoomState.nostate;
    private getcolorstate: getcolorState = getcolorState.nostate;
    private movetostate: movetoState = movetoState.nostate;
    private zoomSpeed: number = 1;
    private dx: number = 0;
    private dy: number = 0;
    private shakingSpeed: number = 1;
    private dx_shaking: number = 0;
    private dy_shaking: number = 0;
    private countShaking: number = 0;
    private countWalk: number = 0;
    private nameColor: string = " ";
    private nameColorglow: string = " ";
    private namecolorFalse: string = " ";
    private namecolor_True: string = " ";
    private namecolor_False: string = " ";
    private moveto: Vec3 = new Vec3(0, 0, 0);

    callbackFinish(name: string, state: number) {

    }

    start() {
        this.emitfromcolornamecontroler.on('set color name', this.setcolorName, this);
        this.emitfromcolornamecontroler.on('shaking and sawp color', this.shakingAndSwapColor, this);
        this.emitfromcolornamecontroler.on('state change', this.setStateChange, this);
    }
    setStateChange(namecolor_false: string, state: number, namecolor_True: string, positionFalse: Vec3, positionTrue: Vec3) {

        if (state == zoomState.zoomOut1) {
            if (this.getcolorstate == getcolorState.drawingColorCorrec) {
                if (this.node.name == namecolor_false) {
                    this.nameColorglow = this.node.name;
                    this.zoomstate = zoomState.zoomInX2;
                }
            }
            if (this.getcolorstate == getcolorState.drawingcolorWrong) {
                if (this.node.name == 'falseImage') {
                    this.namecolorFalse = this.node.name;
                    this.zoomstate = zoomState.zoomInX2;
                }
            }
        }
        if (state == zoomState.zoomout2) {
            if (this.getcolorstate == getcolorState.drawingColorCorrec) {
                if (this.node.name == namecolor_True) {
                    this.moveto = positionTrue;
                    this.movetostate = movetoState.move;
                    this.namecolor_True = this.node.name;
                    this.node.setSiblingIndex(25);
                    this.zoomstate = zoomState.zoomIn2;
                }
            }
            if (this.getcolorstate == getcolorState.drawingcolorWrong) {
                if (this.node.name == namecolor_false) {
                    this.namecolor_False = this.node.name;
                    this.moveto = positionFalse;
                    this.movetostate = movetoState.move;
                    this.node.setSiblingIndex(25);
                    this.zoomstate = zoomState.zoomIn2;
                }
            }
        }
    }
    shakingAndSwapColor(state: number) {
        if (state == getcolorState.drawingColorCorrec) {
            this.getcolorstate = getcolorState.drawingColorCorrec;
            this.zoomstate = zoomState.shakingRight;
        }
        if (state == getcolorState.drawingcolorWrong) {
            this.getcolorstate = getcolorState.drawingcolorWrong;
            this.zoomstate = zoomState.shakingRight;
        }

    }
    setcolorName(name: string) {
        if (this.node.name == name) {
            this.nameColor = name;
            this.zoomstate = zoomState.zoomIn1;
            let glow = 'glow';
            this.nameColorglow = this.nameColor.concat(glow);
        }
        else {
            this.node.setWorldScale(0, 0, 0);
        }
    }

    update(deltaTime: number) {
        let p = this.node.getScale();
        let q = new Vec3(p.x + this.zoomSpeed * this.dx, p.y + this.zoomSpeed * this.dy);
        let a = this.node.getWorldPosition();
        let b = new Vec3(a.x + this.shakingSpeed * this.dx_shaking, a.y + this.shakingSpeed * this.dy_shaking, 0);
        if (this.zoomstate == zoomState.zoomIn1) {
            if (this.getcolorstate == getcolorState.nostate) {
                this.node.setScale(q.x, q.y, 0);
                this.zoomIn1(this.node.scale);
            }
        }
        if (this.zoomstate == zoomState.zoomInX2) {
            if (this.getcolorstate == getcolorState.drawingColorCorrec ||
                this.getcolorstate == getcolorState.drawingcolorWrong) {
                if (this.node.name == this.nameColorglow || this.node.name == 'falseImage') {
                    this.node.setScale(q.x, q.y, 0);
                    this.zoomInX2(this.node.scale);
                }
            }
        }
        if (this.zoomstate == zoomState.zoomIn2) {
            if (this.getcolorstate == getcolorState.drawingColorCorrec ||
                this.getcolorstate == getcolorState.drawingcolorWrong) {
                if (this.node.name == this.namecolor_True || this.node.name == this.namecolor_False) {
                    this.node.setScale(q.x, q.y, 0);
                    this.zoomIn2(this.node.scale);
                }
            }
        }

        if (this.getcolorstate == getcolorState.drawingColorCorrec ||
            this.getcolorstate == getcolorState.drawingcolorWrong) {
            if (this.zoomstate == zoomState.zoomOut1) {

                if (this.node.name == this.nameColor) {
                    this.node.setScale(q.x, q.y, 0);
                    this.zoomOut1(this.node.scale);
                }
            }
            if (this.zoomstate == zoomState.zoomout2) {
                if (this.node.name == this.nameColorglow) {
                    this.node.setScale(q.x, q.y, 0);
                    this.zoomOut2(this.node.scale);
                }
                if (this.node.name == this.namecolorFalse) {
                    this.node.setScale(q.x, q.y, 0);
                    this.zoomOut2(this.node.scale);
                }
            }
        }

        if (this.zoomstate == zoomState.shakingRight) {
            this.node.setWorldPosition(b.x, b.y, 0);
            this.shakingRight(this.node.worldPosition);

        }
        if (this.zoomstate == zoomState.shakingLeft) {
            this.node.setWorldPosition(b.x, b.y, 0);
            this.shakingLeft(this.node.worldPosition);
        }
        if (this.movetostate == movetoState.move) {
            if (this.getcolorstate == getcolorState.drawingColorCorrec) {
                if (this.node.name == this.namecolor_True) {
                    this.node.setWorldPosition(this.moveto.x - 15, this.moveto.y + 8, 0);
                }
            }
            if (this.getcolorstate == getcolorState.drawingcolorWrong) {
                if (this.node.name == this.namecolor_False) {
                    this.node.setWorldPosition(this.moveto.x - 30, this.moveto.y, 0);
                }
            }
        }
    }
    zoomIn1(scale: Vec3) {
        if (this.getcolorstate == getcolorState.nostate) {
            if (scale.x <= 1 || scale.y <= 1) {
                this.dx = 0.02;
                this.dy = 0.02;
            }
            if (scale.x > 1 && scale.y > 1) {
                this.dx = 0;
                this.dy = 0;
                this.zoomstate = zoomState.nostate;
            }
        }
    }
    zoomIn2(scale: Vec3) {

        if (scale.x <= 1 || scale.y <= 1) {
            this.dx = 0.05;
            this.dy = 0.05;
        }
        if (scale.x > 1 && scale.y > 1) {
            this.dx = 0;
            this.dy = 0;
            this.zoomstate = zoomState.nostate;
            this.zoomstateEnd = zoomState.zoomIn2;
            this.node.emit('zoom state ok', this.nameColorglow, this.zoomstateEnd);
        }
    }
    zoomInX2(scale: Vec3) {
        if (scale.x <= 6 || scale.y <= 6) {
            this.dx = 0.1;
            this.dy = 0.1;
        }
        if (scale.x > 6 && scale.y > 6) {
            this.dx = 0;
            this.dy = 0;
            this.zoomstate = zoomState.zoomout2;
        }
    }
    zoomOut1(scale: Vec3) {
        if (scale.x > 0 || scale.y > 0) {
            this.dx = -0.02;
            this.dy = -0.02;
        }
        if (scale.x <= 0 && scale.y <= 0) {
            this.dx = 0;
            this.dy = 0;
            this.zoomstateEnd = zoomState.zoomOut1;
            this.zoomstate = zoomState.nostate;
            this.node.emit('zoom state ok', this.nameColorglow, this.zoomstateEnd);
        }

    }
    zoomOut2(scale: Vec3) {
        if (scale.x > 0 || scale.y > 0) {
            this.dx = -0.15;
            this.dy = -0.15;
        }
        if (scale.x <= 1 && scale.y <= 1) {
            this.dx = 0;
            this.dy = 0;
            this.zoomstate = zoomState.nostate;
            this.zoomstateEnd = zoomState.zoomout2;
            if (this.node.emit) {
                this.node.emit('zoom state ok', this.nameColorglow, this.zoomstateEnd);
            }
            else {

                if (this.node) {
                    console.warn("active => ", this.node.activeInHierarchy);
                }
                else {
                    console.error("NODE => NULL");
                }
            }

        }
    }
    shakingRight(position: Vec3) {
        this.countWalk = this.countWalk + 1;
        if (this.countWalk <= 3) {
            this.dx_shaking = 0.5;
        }
        if (this.countWalk > 3) {
            this.dx_shaking = -0.5;
        }
        if (this.countWalk == 6) {
            this.dx_shaking = 0;
            this.countWalk = 0;
            this.zoomstate = zoomState.shakingLeft;
        }
    }
    shakingLeft(position: Vec3) {
        this.countWalk = this.countWalk + 1;
        if (this.countWalk <= 3) {
            this.dx_shaking = -0.5;
        }
        if (this.countWalk > 3) {
            this.dx_shaking = 0.5;
        }
        if (this.countWalk == 6) {
            this.dx_shaking = 0;
            this.countWalk = 0;
            this.zoomstate = zoomState.shakingRight;
            this.countShaking = this.countShaking + 1;
            if (this.countShaking <= 10) {
                this.shakingSpeed = this.shakingSpeed + 1;
            }
            if (this.countShaking > 10) {
                this.shakingSpeed = this.shakingSpeed - 1;
            }
            if (this.countShaking == 20) {
                this.shakingSpeed = 0;
                this.dx_shaking = 0;
                this.countShaking = 0;
                this.zoomstate = zoomState.zoomOut1;
            }
        }
    }
}


