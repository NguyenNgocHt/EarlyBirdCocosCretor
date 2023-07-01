import { _decorator, Component, Node, Vec3, log, NodeSpace, tween, random } from 'cc';
const { ccclass, property } = _decorator;
import { df3_manager } from './df3_manager';
enum MOVINGSTATE {
    NOTMOVING,
    TIEN,
    LUI,
    ABOUT_THE_POINT_ORIGIN,
};
enum LOCKSTATE {
    NOLOCK,
    LOCKUP,
    OPEN,
}
enum ZOOMSTATE {
    NOZOOM,
    ZOOMIN,
    ZOOMOUT,
}
enum NODESTATE {
    NOSTATE,
    TOIDICH,
    CHUATOIDICH,
}
@ccclass('df3_moveforchicken')
export class df3_moveforchicken extends Component {
    MOVING_POSITION_LIST: Vec3[];
    INDEX_NUMBER_LIST: number[];
    MOVING_POSITION_NAME_LIST: string[];
    @property(Node)
    private onthe_tree: Node = null;
    @property(Node)
    private grove_Tree: Node = null;
    // @property(Node)
    // private root_a: Node = null;
    // @property(Node)
    // private root_b: Node = null;
    @property(Node)
    private under_tree: Node = null;
    @property(Node)
    private under_ground: Node = null;
    @property(Node)
    private left_tree: Node = null;
    @property(Node)
    private right_tree: Node = null;
    @property(Node)
    private behind_tree: Node = null;
    @property(Node)
    private infront_tree: Node = null;
    @property({ type: Node })
    private emitfromdf3: Node = null;
    private positionCHICKEN: Vec3 = new Vec3(0, 0, 0);
    private chickenMoving: MOVINGSTATE = MOVINGSTATE.NOTMOVING;
    private lockstate: LOCKSTATE = LOCKSTATE.OPEN;
    private zoomState: ZOOMSTATE = ZOOMSTATE.NOZOOM;
    private numberindex: number = 0;
    private speed: number = 2;
    private dx: number = 0;
    private speedScale: number = 1;
    private dx_scale: number = 0;
    private dy_scale: number = 0;
    private positionA: Vec3 = new Vec3(0, 0, 0);
    private positionB: Vec3 = new Vec3(0, 0, 0);
    private nodeGrove: NODESTATE = NODESTATE.CHUATOIDICH;
    private nodeUndertree: NODESTATE = NODESTATE.CHUATOIDICH;
    private nodeLeftTree: NODESTATE = NODESTATE.CHUATOIDICH;
    private randomnumber: number = 0;
    private position_grove: Vec3 = new Vec3(0, 0, 0);
    private position_undertree: Vec3 = new Vec3(0, 0, 0);
    private position_lefttree: Vec3 = new Vec3(0, 0, 0);
    private position_dich: Vec3 = new Vec3(0, 0, 0);
    private position_0: Vec3 = new Vec3(0, 0, 0);
    private cout: number = 0;
    private limit_moving_position_number: number = 0;
    private position_starting: Vec3 = new Vec3(0, 0, 0);
    private index_position_start: number = 0;
    private i: number = 1;
    private
    onLoad() {
        if (!this.MOVING_POSITION_NAME_LIST) {
            this.MOVING_POSITION_NAME_LIST = [];
        }
        this.MOVING_POSITION_NAME_LIST = [" ", "onthetree", "groveoftree", "underthetree", "ontheground", "lefttree", "behindtree", "righttree", "infronttree"];

    }
    start() {
        this.emitfromdf3.on('emit to move chicken', this.setPositionandIndex, this);
        this.emitfromdf3.on('chicken moving', this.setMoving, this);
        this.emitfromdf3.on('chicken moving to position', this.set_chicken_moving, this);
        this.emitfromdf3.on('chicken_keep_moving', this.set_chicken_moving, this);
    }
    set_chicken_moving(random_number_before: number, randomNumber: number, MOVING_POSITION_LIST: Vec3[], INDEX_NUMBER_LIST: number[]) {
        this.i = this.i + 1;
        console.log('vao lan ', this.i);
        let p = this.node.getWorldPosition();
        this.position_starting = p;
        let movingSpeed = 4000;
        if (!this.MOVING_POSITION_LIST) {
            this.MOVING_POSITION_LIST = [];
        }
        if (!this.INDEX_NUMBER_LIST) {
            this.INDEX_NUMBER_LIST = [];
        }
        //di xuoi
        this.MOVING_POSITION_LIST = MOVING_POSITION_LIST;
        this.INDEX_NUMBER_LIST = INDEX_NUMBER_LIST;
        console.log(random_number_before, randomNumber);
        if (random_number_before < randomNumber) {
            console.log(this.MOVING_POSITION_LIST[random_number_before].x);
            let X = Math.abs(this.position_starting.x - this.MOVING_POSITION_LIST[random_number_before + 1].x);
            let Y = Math.abs(this.position_starting.y - this.MOVING_POSITION_LIST[random_number_before + 1].y);
            let distance = Math.sqrt(X * X + Y * Y);
            if (this.position_starting.x > this.MOVING_POSITION_LIST[random_number_before + 1].x) {
                this.node.setScale(0.5, 0.5, 0.5);
            }
            if (this.position_starting.x < this.MOVING_POSITION_LIST[random_number_before + 1].x) {
                this.node.setScale(-0.5, 0.5, 0.5);
            }
            this.node.setSiblingIndex(INDEX_NUMBER_LIST[random_number_before + 1] + 1);
            tween(this.node)
                .to(distance / movingSpeed, { worldPosition: new Vec3(this.MOVING_POSITION_LIST[random_number_before + 1]) })
                .call(() => {
                    if (random_number_before == randomNumber - 1) {
                        console.log('chuyen spine');
                        this.node.emit('chicken swap spine');
                    } else {
                        this.position_starting = this.MOVING_POSITION_LIST[random_number_before + 1];
                        random_number_before = random_number_before + 1;
                        this.node.emit('chicken keep moving', random_number_before, randomNumber, this.MOVING_POSITION_LIST, this.INDEX_NUMBER_LIST);
                    }
                })
                .start();
        }
        //di nguoc
        if (random_number_before > randomNumber) {
            console.log(this.MOVING_POSITION_LIST[random_number_before].x);
            let X = Math.abs(this.position_starting.x - this.MOVING_POSITION_LIST[random_number_before - 1].x);
            let Y = Math.abs(this.position_starting.y - this.MOVING_POSITION_LIST[random_number_before - 1].y);
            let distance = Math.sqrt(X * X + Y * Y);
            if (this.position_starting.x > this.MOVING_POSITION_LIST[random_number_before - 1].x) {
                this.node.setScale(0.5, 0.5, 0.5);
            }
            if (this.position_starting.x < this.MOVING_POSITION_LIST[random_number_before - 1].x) {
                this.node.setScale(-0.5, 0.5, 0.5);
            }
            this.node.setSiblingIndex(INDEX_NUMBER_LIST[random_number_before - 1] + 1);
            tween(this.node)
                .to(distance / movingSpeed, { worldPosition: new Vec3(this.MOVING_POSITION_LIST[random_number_before - 1]) })
                .call(() => {
                    if (random_number_before == randomNumber + 1) {
                        console.log('chuyen spine');
                        this.node.emit('chicken swap spine');
                    } else {
                        this.position_starting = this.MOVING_POSITION_LIST[random_number_before - 1];
                        random_number_before = random_number_before - 1;
                        this.node.emit('chicken keep moving', random_number_before, randomNumber, this.MOVING_POSITION_LIST, this.INDEX_NUMBER_LIST);
                    }
                })
                .start();
        }
    }
    setPositionandIndex(position: Vec3, indexNumber: number) {
        if (this.node.name == 'Ga') {
            this.node.setWorldPosition(position.x, position.y, 0);
            this.node.setSiblingIndex(indexNumber + 2);
        }
        if (this.node.name == 'bongden') {
            this.node.setWorldPosition(position.x, position.y, 0);
            this.node.setSiblingIndex(indexNumber + 1);
        }
    }
    setMoving(state: number, positionB: Vec3, randomnumber: number, positionC: Vec3, positionD: Vec3) {
        var positionArray = [];
        positionArray = [" ", "onthetree", "groveoftree", "underthetree", "ontheground", "lefttree", "behindtree", "righttree", "infronttree"];
        var speedZoomArray = [];
        speedZoomArray = [0, 0.8, 1.2, 1.5, 4, 2, 1.55, 1.2, 1.6];
        this.randomnumber = randomnumber;
        this.position_dich = positionB;
        if (state == MOVINGSTATE.ABOUT_THE_POINT_ORIGIN) {

            this.chickenMoving = MOVINGSTATE.ABOUT_THE_POINT_ORIGIN;
            this.zoomState = ZOOMSTATE.ZOOMIN;
            if (randomnumber == 1) {
                this.position_grove = positionC;
                this.position_undertree = positionD;
                this.speedScale = speedZoomArray[randomnumber];
                if (this.cout == 0) {
                    this.positionA = this.node.getWorldPosition();
                    this.positionB = this.position_grove;
                }
            }
            if (randomnumber == 2) {
                this.speedScale = speedZoomArray[randomnumber];
                this.position_undertree = positionC;
                if (this.cout == 0) {
                    this.positionA = this.node.getWorldPosition();
                    this.positionB = this.position_undertree;
                }
            }
            if (randomnumber == 3 || randomnumber == 4 || randomnumber == 5 || randomnumber == 8) {
                this.speedScale = speedZoomArray[randomnumber];
                this.positionA = this.node.getWorldPosition();
                this.positionB = this.position_dich;
            }
            if (randomnumber == 6 || randomnumber == 7) {
                this.speedScale = speedZoomArray[randomnumber];
                this.position_lefttree = positionC;
                if (this.cout == 0) {
                    this.positionA = this.node.getWorldPosition();
                    this.positionB = this.position_lefttree;
                }
            }
            if (this.positionA.x > this.positionB.x) {
                let p = this.node.getScale();
                this.node.scale = new Vec3(p.x, p.y, 0);
            }
            if (this.positionA.x < this.positionB.x) {
                let p = this.node.getScale();
                this.node.scale = new Vec3(-p.x, p.y, 0);
            }
        }
    }
    setPosition() {
        if (this.randomnumber == 1) {
            if (this.nodeGrove == NODESTATE.TOIDICH && this.cout == 1) {
                this.positionA = this.position_grove;
                this.positionB = this.position_undertree;
            }
            if (this.nodeUndertree == NODESTATE.TOIDICH && this.cout == 2) {
                this.positionA = this.position_undertree;
                this.positionB = this.position_dich;
            }
        }
        if (this.randomnumber == 2) {
            if (this.nodeUndertree == NODESTATE.TOIDICH && this.cout == 1) {
                this.positionA = this.position_undertree;
                this.positionB = this.position_dich;
            }

        }
        if (this.randomnumber == 6 || this.randomnumber == 7) {
            if (this.nodeLeftTree == NODESTATE.TOIDICH && this.cout == 1) {
                this.positionA = this.position_lefttree;
                this.positionB = this.position_dich;
            }
        }

        if (this.positionA.x > this.positionB.x) {
            let p = this.node.getScale();
            this.node.scale = new Vec3(p.x, p.y, 0);
        }
        if (this.positionA.x < this.positionB.x) {
            let p = this.node.getScale();
            this.node.scale = new Vec3(-p.x, p.y, 0);
        }
    }
    aboutThePoinOrigin(poinChicken: number) {
    }
    update(deltaTime: number) {
        let p = this.node.getWorldPosition();
        let q = new Vec3(p.x + this.speed * this.dx, (p.x + this.speed * this.dx) * ((this.positionA.y - this.positionB.y) / (this.positionA.x - this.positionB.x)) +
            ((this.positionA.x * this.positionB.y - this.positionA.y * this.positionB.x) / (this.positionA.x - this.positionB.x)), 0);
        if (this.zoomState == ZOOMSTATE.ZOOMIN) {
            if (this.positionA.x > this.positionB.x && this.lockstate == LOCKSTATE.OPEN) {
                let a = this.node.getScale();
                let b = new Vec3(a.x + this.speedScale * this.dx_scale, a.y + this.speedScale * this.dy_scale, 0);
                this.node.setScale(b.x, b.y, 0);
                this.zoomIn_Phai(this.node.scale);
            }

            if (this.positionA.x < this.positionB.x && this.lockstate == LOCKSTATE.OPEN) {
                log('scale trai', this.node.scale.x, this.node.scale.y);
                let a = this.node.getScale();
                let b = new Vec3(a.x + this.speedScale * this.dx_scale, a.y + this.speedScale * this.dy_scale, 0);
                this.node.setScale(b.x, b.y, 0);
                this.zoomIn_Trai(this.node.scale);
            }

        }
        if (this.positionA.x > this.positionB.x && this.lockstate == LOCKSTATE.OPEN) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.negativeMovingPoint(this.node.worldPosition);
        }
        if (this.positionA.x < this.positionB.x && this.lockstate == LOCKSTATE.OPEN) {
            this.node.setWorldPosition(q.x, q.y, 0);
            this.positiveMovingPoint(this.node.worldPosition);
        }
    }
    negativeMovingPoint(position: Vec3) {
        if (position.x >= this.positionB.x) {
            this.dx = -1;
        }
        else {
            this.cout = this.cout + 1;
            if (this.cout == 1) {
                if (this.randomnumber == 1) {
                    this.nodeGrove = NODESTATE.TOIDICH;
                    this.setPosition();
                }
                if (this.randomnumber == 2) {
                    this.nodeUndertree = NODESTATE.TOIDICH;
                    this.setPosition();
                }
                if (this.randomnumber == 3 || this.randomnumber == 4 || this.randomnumber == 5 || this.randomnumber == 8) {
                    this.dx = 0;
                    this.node.emit('move to origin OK');
                    this.lockstate = LOCKSTATE.LOCKUP;
                }

                if (this.randomnumber == 6 || this.randomnumber == 7) {
                    this.nodeLeftTree = NODESTATE.TOIDICH;
                    this.setPosition();
                }

            }
            if (this.cout == 2) {
                if (this.randomnumber == 1) {
                    this.nodeUndertree = NODESTATE.TOIDICH;
                    this.setPosition();
                }
                if (this.randomnumber == 2) {
                    this.dx = 0;
                    this.node.emit('move to origin OK');
                    this.lockstate = LOCKSTATE.LOCKUP;
                }
                if (this.randomnumber == 6 || this.randomnumber == 7) {
                    this.dx = 0;
                    this.node.emit('move to origin OK');
                    this.lockstate = LOCKSTATE.LOCKUP;
                }

            }
            if (this.cout == 3) {
                if (this.randomnumber == 1) {
                    this.dx = 0;
                    this.node.emit('move to origin OK');
                    this.lockstate = LOCKSTATE.LOCKUP;
                }
            }
        }
    }
    positiveMovingPoint(position: Vec3) {
        if (position.x <= this.positionB.x) {
            this.dx = 1;
        }
        else {
            this.dx = 0;
            this.node.emit('move to origin OK');
            this.lockstate = LOCKSTATE.LOCKUP;
        }
    }
    zoomIn_Phai(scale: Vec3) {
        if (scale.x <= 1 && scale.y <= 1) {
            this.dx_scale = 0.001;
            this.dy_scale = 0.001;
        }
        else {
            this.dx_scale = 0;
            this.dy_scale = 0;
        }
    }
    zoomIn_Trai(scale: Vec3) {
        if (scale.x >= -1 && scale.y <= 1) {
            this.dx_scale = -0.001;
            this.dy_scale = 0.001;
        }
        else {
            this.dx_scale = 0;
            this.dy_scale = 0;
        }
    }
}


