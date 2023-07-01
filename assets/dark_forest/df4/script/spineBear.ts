import { _decorator, Component, Node, sp, log, Label, math, tween } from 'cc';
import { df4Manager } from './df4Manager';
import { showVocabulary } from './showVocabulary';
const { ccclass, property } = _decorator;
enum STATESPINE {
    NOSPINE,
    DUNG_LAI,
    IDLE,
    IDLE2,
    IDLE_HAPPY,
    IDLE_SAD,
    RUN,
    WALK,
    WIN,
    SHOWNUMBER,
};
enum stateMOVE {
    NOMOVE,
    TIEN,
    LUI,
};
enum STATEBANG {
    NO,
    BANG1,
    BANG2,
    BANG3,
};
enum STATENUMBER {
    NO,
    DUNG,
    SAI,
};
enum STATELOOK_CLICK {
    NOLOCK,
    LOCK,
    OPEN,
}
@ccclass('spineBear')
export class spineBear extends Component {
    BEAR_SPINE_LIST = ["dung_lai", "ilde", "idle2", "ilde_happy", "idle_sad", "run", "walk", "win"];
    private spine: sp.Skeleton;
    @property({ type: df4Manager })
    private emitfromDf4: df4Manager = null;
    @property({ type: sp.Skeleton })
    private bear1: sp.Skeleton = null;
    @property({ type: sp.Skeleton })
    private bear2: sp.Skeleton = null;
    @property({ type: sp.Skeleton })
    private bear3: sp.Skeleton = null;
    @property({ type: Label })
    private bang1: Label = null;
    @property({ type: Label })
    private bang2: Label = null;
    @property({ type: Label })
    private bang3: Label = null;
    @property({ type: Label })
    private bang1_voca: Label = null;
    @property({ type: Label })
    private bang2_voca: Label = null;
    @property({ type: Label })
    private bang3_voca: Label = null;
    @property({ type: Node })
    private button_bang1: Node = null;
    @property({ type: Node })
    private button_bang2: Node = null;
    @property({ type: Node })
    private button_bang3: Node = null;
    private stateSpineBear1: STATESPINE = STATESPINE.NOSPINE;
    private stateSpineBear2: STATESPINE = STATESPINE.NOSPINE;
    private stateSpineBear3: STATESPINE = STATESPINE.NOSPINE;
    private stateSpineOK: STATESPINE = STATESPINE.NOSPINE;
    private bearmove: stateMOVE = stateMOVE.NOMOVE;
    private stateBang: STATEBANG = STATEBANG.NO;
    private numberBang1: number = 0;
    private numberBang2: number = 0;
    private numberBang3: number = 0;
    private stateBang_true: STATEBANG = STATEBANG.NO;
    private stateshowVocabulary: STATEBANG = STATEBANG.NO;
    private stateLockClick: STATELOOK_CLICK = STATELOOK_CLICK.OPEN;
    private amoutFruits: number = 0;
    private random_timeSwapSpine_bear1: number = 0;
    private random_timeSwapSpine_bear2: number = 0;
    private random_timeSwapSpine_bear3: number = 0;
    private fruitsNumber: number = 20;
    onLoad() {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this.bear1 = this.bear1.getComponent('sp.Skeleton') as sp.Skeleton;
        this.bear2 = this.bear2.getComponent('sp.Skeleton') as sp.Skeleton;
        this.bear3 = this.bear3.getComponent('sp.Skeleton') as sp.Skeleton;
        this.button_bang1.active = false;
        this.button_bang2.active = false;
        this.button_bang3.active = false;
        for (let i = 0; i < this.BEAR_SPINE_LIST.length; i++) {
            for (let j = i + 1; j < this.BEAR_SPINE_LIST.length; j++) {
                this._setMix_bear1(this.BEAR_SPINE_LIST[i], this.BEAR_SPINE_LIST[j]);
                this._setMix_bear2(this.BEAR_SPINE_LIST[i], this.BEAR_SPINE_LIST[j]);
                this._setMix_bear3(this.BEAR_SPINE_LIST[i], this.BEAR_SPINE_LIST[j]);
            }
        }
        this.stateSpineBear1 = STATESPINE.WALK;
        this.stateSpineBear2 = STATESPINE.WALK;
        this.stateSpineBear3 = STATESPINE.WALK;
    }
    start() {
        //emit from Df4
        this.emitfromDf4.node.on('bear_chuyen_spine', this.setSpineBear, this);
        this.emitfromDf4.node.on('bear_bang_off', this.setsateShowVocabulary, this);
        this.emitfromDf4.node.on('bear_tien', this.setSpineBeartien, this);
        this.emitfromDf4.node.on('send_bear_amount_fruits', this.setAmountFruits, this);
        this.emitfromDf4.node.on('clear_bang_true', this.setclear_bang_true, this);
        //emit from button for bear
        this.button_bang1.on('click position', this.checkPosition, this);
        this.button_bang2.on('click position', this.checkPosition, this);
        this.button_bang3.on('click position', this.checkPosition, this);
        let parent = this.bear1.node.parent;
        let childs = parent.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].on('chuyen spine bear', this.setSpineBear1_2_3, this);
        }
    }
    //set clear bang true
    setclear_bang_true() {
        if (this.stateBang_true == STATEBANG.BANG1) {
            this.node.emit('clear vocabulary', 0, 0, 0, this.stateBang_true);
            this.bang1.string = ' ';
        }
        if (this.stateBang_true == STATEBANG.BANG2) {
            this.node.emit('clear vocabulary', 0, 0, 0, this.stateBang_true);
            this.bang2.string = ' ';
        }
        if (this.stateBang_true == STATEBANG.BANG3) {
            this.node.emit('clear vocabulary', 0, 0, 0, this.stateBang_true);
            this.bang3.string = ' ';
        }
    }
    //set state show vocabulary
    setsateShowVocabulary(state: number) {
        if (state == STATESPINE.IDLE_HAPPY) {
            if (this.stateBang_true == STATEBANG.BANG1) {
                this.node.emit('clear vocabulary', this.amoutFruits, 0, 0, this.stateBang_true);
            }
            if (this.stateBang_true == STATEBANG.BANG2) {
                this.node.emit('clear vocabulary', 0, this.amoutFruits, 0, this.stateBang_true);
            }
            if (this.stateBang_true == STATEBANG.BANG3) {
                this.node.emit('clear vocabulary', 0, 0, this.amoutFruits, this.stateBang_true);
            }
        }
        if (state == STATESPINE.IDLE_SAD) {
            if (this.stateBang_true == STATEBANG.BANG1) {
                this.node.emit('clear vocabulary', 0, 0, 0, this.stateBang_true);
            }
            if (this.stateBang_true == STATEBANG.BANG2) {
                this.node.emit('clear vocabulary', 0, 0, 0, this.stateBang_true);
            }
            if (this.stateBang_true == STATEBANG.BANG3) {
                this.node.emit('clear vocabulary', 0, 0, 0, this.stateBang_true);
            }
        }
    }
    //set amount Fruits
    setAmountFruits(amountFruits: number) {
        this.amoutFruits = amountFruits;

    }
    setSpineBear1_2_3() {
        this.stateSpineBear1 = STATESPINE.WALK;
        this.stateSpineBear2 = STATESPINE.WALK;
        this.stateSpineBear3 = STATESPINE.WALK;
        this.startSpine();
    }
    setSpineBeartien(state: number) {
        if (state == stateMOVE.TIEN) {
            this.stateSpineBear1 = STATESPINE.WALK;
            this.stateSpineBear2 = STATESPINE.WALK;
            this.stateSpineBear3 = STATESPINE.WALK;
            this.startSpine();
        }
    }
    setSpineBear(state: number, stateBang: number) {
        if (state == STATESPINE.DUNG_LAI) {
            this.stateSpineBear1 = STATESPINE.DUNG_LAI;
            this.stateSpineBear2 = STATESPINE.DUNG_LAI;
            this.stateSpineBear3 = STATESPINE.DUNG_LAI;
            this.startSpine();
        }
        if (state == STATESPINE.IDLE) {
            if (stateBang == STATEBANG.NO) {
                this.stateSpineBear1 = STATESPINE.IDLE;
                this.stateSpineBear2 = STATESPINE.IDLE;
                this.stateSpineBear3 = STATESPINE.IDLE;
                this.startSpine();
            }
            if (stateBang == STATEBANG.BANG1) {
                this.stateSpineBear1 = STATESPINE.IDLE;
                this.startSpine();
            }
            if (stateBang == STATEBANG.BANG2) {
                this.stateSpineBear2 = STATESPINE.IDLE;
                this.startSpine();
            }
            if (stateBang == STATEBANG.BANG3) {
                this.stateSpineBear3 = STATESPINE.IDLE;
                this.startSpine();
            }
        }
        if (state == STATESPINE.SHOWNUMBER) {
            this.stateSpineBear1 = STATESPINE.SHOWNUMBER;
            this.stateSpineBear2 = STATESPINE.SHOWNUMBER;
            this.stateSpineBear3 = STATESPINE.SHOWNUMBER;
            this.stateLockClick = STATELOOK_CLICK.OPEN;
            this.setRandomNumber();
        }
        if (state == STATESPINE.IDLE_HAPPY) {
            if (this.stateBang == STATEBANG.BANG1) {
                this.stateSpineBear1 = STATESPINE.IDLE_HAPPY;
                this.startSpine();
            }
            if (this.stateBang == STATEBANG.BANG2) {
                this.stateSpineBear2 = STATESPINE.IDLE_HAPPY;
                this.startSpine();
            }
            if (this.stateBang == STATEBANG.BANG3) {
                this.stateSpineBear3 = STATESPINE.IDLE_HAPPY;
                this.startSpine();
            }
        }
        if (state == STATESPINE.IDLE_SAD) {
            if (this.stateBang == STATEBANG.BANG1) {
                this.stateSpineBear1 = STATESPINE.IDLE_SAD;
                this.startSpine();
            }
            if (this.stateBang == STATEBANG.BANG2) {
                this.stateSpineBear2 = STATESPINE.IDLE_SAD;
                this.startSpine();
            }
            if (this.stateBang == STATEBANG.BANG3) {
                this.stateSpineBear3 = STATESPINE.IDLE_SAD;
                this.startSpine();
            }

        }
        if (state == STATESPINE.WIN) {
            this.stateSpineBear1 = STATESPINE.WIN;
            this.stateSpineBear2 = STATESPINE.WIN;
            this.stateSpineBear3 = STATESPINE.WIN;
            this.startSpine();
        }
    }
    setRandomNumber() {
        this.button_bang1.active = true;
        this.button_bang2.active = true;
        this.button_bang3.active = true;
        let randomNum = Math.floor(Math.random() * 3) + 1;
        if (randomNum == 1) {
            this.stateBang_true = STATEBANG.BANG1;
            this.addAmountFruits();
        }
        if (randomNum == 2) {
            this.stateBang_true = STATEBANG.BANG2;
            this.addAmountFruits();
        }
        if (randomNum == 3) {
            this.stateBang_true = STATEBANG.BANG3;
            this.addAmountFruits();
        }
    }
    addAmountFruits() {
        if (this.stateBang_true == STATEBANG.BANG1) {
            this.numberBang1 = this.amoutFruits;
            let a;
            let b;
            if (this.numberBang1 == 20) {
                a = this.numberBang1 - 1;
                b = a - 1;
            }
            if (this.numberBang1 == 1) {
                a = this.numberBang1 + 1;
                b = a + 1;
            }
            if (this.numberBang1 != 20 && this.numberBang1 != 1) {
                a = this.numberBang1 - 1;
                b = this.numberBang1 + 1;
            }
            this.scheduleOnce(function () {
                this.bang1.string = `${this.amoutFruits}`;
            }, 0.2);
            this.scheduleOnce(function () {
                this.bang2.string = `${a}`;
            }, 0.4);
            this.scheduleOnce(function () {
                this.bang3.string = `${b}`;
            }, 0.6);
            this.numberBang2 = a;
            this.numberBang3 = b;
            this.node.emit('show vocabulary', this.numberBang1, this.numberBang2, this.numberBang3, this.stateBang_true);
        }
        if (this.stateBang_true == STATEBANG.BANG2) {
            this.numberBang2 = this.amoutFruits;
            let a;
            let b;
            if (this.numberBang2 == 20) {
                a = this.numberBang2 - 1;
                b = a - 1;
            }
            if (this.numberBang2 == 1) {
                a = this.numberBang2 + 1;
                b = a + 1;
            }
            if (this.numberBang2 != 20 && this.numberBang2 != 1) {
                a = this.numberBang2 - 1;
                b = this.numberBang2 + 1;
            }
            this.scheduleOnce(function () {
                this.bang1.string = `${a}`;
            }, 0.2);
            this.scheduleOnce(function () {
                this.bang2.string = `${this.amoutFruits}`;
            }, 0.4);
            this.scheduleOnce(function () {
                this.bang3.string = `${b}`;
            }, 0.6);
            this.numberBang1 = a;
            this.numberBang2 = this.amoutFruits;
            this.numberBang3 = b;
            this.node.emit('show vocabulary', this.numberBang1, this.numberBang2, this.numberBang3, this.stateBang_true);
        }
        if (this.stateBang_true == STATEBANG.BANG3) {
            this.numberBang3 = this.amoutFruits;
            let a;
            let b;
            if (this.numberBang3 == 20) {
                a = this.numberBang3 - 1;
                b = a - 1;
            }
            if (this.numberBang3 == 1) {
                a = this.numberBang3 + 1;
                b = a + 1;
            }
            if (this.numberBang3 != 20 && this.numberBang3 != 1) {
                a = this.numberBang3 - 1;
                b = this.numberBang3 + 1;
            }
            this.scheduleOnce(function () {
                this.bang1.string = `${a}`;
            }, 0.2);
            this.scheduleOnce(function () {
                this.bang2.string = `${b}`;
            }, 0.4);
            this.scheduleOnce(function () {
                this.bang3.string = `${this.amoutFruits}`;
            }, 0.6);
            this.numberBang1 = a;
            this.numberBang2 = b;
            this.numberBang3 = this.amoutFruits;
            this.node.emit('show vocabulary', this.numberBang1, this.numberBang2, this.numberBang3, this.stateBang_true);
        }
    }
    startSpine() {
        //spine walk
        if (this.stateSpineBear1 == STATESPINE.WALK) {
            this.scheduleOnce(function () {
                this.bear1?.setAnimation(0, 'walk', true);
            }, this.random_timeSwapSpine_bear1 = (Math.floor(Math.random() * 10) + 1) / 10)

        }
        if (this.stateSpineBear2 == STATESPINE.WALK) {
            this.scheduleOnce(function () {
                this.bear2?.setAnimation(0, 'walk', true);
            }, this.random_timeSwapSpine_bear2 = (Math.floor(Math.random() * 10) + 1) / 10);
        }
        if (this.stateSpineBear3 == STATESPINE.WALK) {
            this.scheduleOnce(function () {
                this.bear3?.setAnimation(0, 'walk', true);
            }, this.random_timeSwapSpine_bear3 = (Math.floor(Math.random() * 10) + 1) / 10);
        }
        //spine dung lai
        if (this.stateSpineBear1 == STATESPINE.DUNG_LAI) {
            this.scheduleOnce(function () {
                this.bear1?.setMix('walk', 'dung_lai', 0.2);
                this.bear1?.setAnimation(0, 'dung_lai', false);
                this.scheduleOnce(function () {
                    this.node.emit('move_idle', this.stateSpineBear1);
                }, 1.4);
            }, this.random_timeSwapSpine_bear1);

        }
        if (this.stateSpineBear2 == STATESPINE.DUNG_LAI) {
            this.scheduleOnce(function () {
                this.bear2?.setMix('walk', 'dung_lai', 0.2);
                this.bear2?.setAnimation(0, 'dung_lai', false);
            }, this.random_timeSwapSpine_bear2);
        }
        if (this.stateSpineBear3 == STATESPINE.DUNG_LAI) {
            this.scheduleOnce(function () {
                this.bear3?.setMix('walk', 'dung_lai', 0.2);
                this.bear3?.setAnimation(0, 'dung_lai', false);
            }, this.random_timeSwapSpine_bear3);
        }
        //spine bear idle
        if (this.stateSpineBear1 == STATESPINE.IDLE) {
            this.bear1?.setMix('dung_lai', 'idle', 0.2);
            this.bear1?.setMix('idle_sad', 'idle', 0.2);
            this.bear1?.setMix('idle_happy', 'idle', 0.2);
            this.bear1?.setMix('idle', 'idle', 0.2);
            this.scheduleOnce(function () {
                this.bear1.setAnimation(0, 'idle', true);
            }, this.random_timeSwapSpine_bear1);

        }
        if (this.stateSpineBear2 == STATESPINE.IDLE) {
            this.scheduleOnce(function () {
                this.bear2.setMix('dung_lai', 'idle', 0.2);
                this.bear2.setMix('idle_sad', 'idle', 0.2);
                this.bear2.setMix('idle_happy', 'idle', 0.2);
                this.bear2.setMix('idle', 'idle', 0.2);
                this.bear2.setAnimation(0, 'idle', true);
            }, this.random_timeSwapSpine_bear2);
        }
        if (this.stateSpineBear3 == STATESPINE.IDLE) {
            this.scheduleOnce(function () {
                this.bear3.setMix('dung_lai', 'idle', 0.2);
                this.bear3.setMix('idle_sad', 'idle', 0.2);
                this.bear3.setMix('idle_happy', 'idle', 0.2);
                this.bear3.setMix('idle', 'idle', 0.2);
                this.bear3.setAnimation(0, 'idle', true);
            }, this.random_timeSwapSpine_bear3);
        }
        //spine happy
        if (this.stateSpineBear1 == STATESPINE.IDLE_HAPPY) {
            this.bear1.setMix('idle', 'idle_happy', 0.2);
            this.bear1.setAnimation(0, 'idle_happy', true);
            this.bang1.string = `${this.amoutFruits}`;
            this.bang2.string = ' ';
            this.bang3.string = ' ';
            this.scheduleOnce(function () {
                this.bear1.setMix('idle_happy', 'idle', 0.2);
                this.bear1.setAnimation(0, 'idle', true);
            }, 1.5);
        }
        if (this.stateSpineBear2 == STATESPINE.IDLE_HAPPY) {
            this.bear2.setMix('idle', 'idle_happy', 0.2);
            this.bear2.setAnimation(0, 'idle_happy', true);
            this.bang1.string = ' ';
            this.bang2.string = `${this.amoutFruits}`;
            this.bang3.string = ' ';
            this.scheduleOnce(function () {
                this.bear2.setMix('idle_happy', 'idle', 0.2);
                this.bear2.setAnimation(0, 'idle', true);
            }, 1.5);
        }
        if (this.stateSpineBear3 == STATESPINE.IDLE_HAPPY) {
            this.bear3.setMix('idle', 'idle_happy', 0.2);
            this.bear3.setAnimation(0, 'idle_happy', true);
            this.bang1.string = ' ';
            this.bang2.string = ' ';
            this.bang3.string = `${this.amoutFruits}`;
            this.scheduleOnce(function () {
                this.bear3.setMix('idle_happy', 'idle', 0.2);
                this.bear3.setAnimation(0, 'idle', true);
            }, 1.5);
        }
        //spine sad
        if (this.stateSpineBear1 == STATESPINE.IDLE_SAD) {
            this.bear1.setMix('idle', 'idle_sad', 0.2);
            this.bear1.setAnimation(0, 'idle_sad', true);
            this.bang1.string = ' ';
            this.bang2.string = ' ';
            this.bang3.string = ' ';
            this.scheduleOnce(function () {
                this.bear1.setMix('idle_happy', 'idle', 0.2);
                this.bear1.setAnimation(0, 'idle', true);
            }, 1.5);
        }
        if (this.stateSpineBear2 == STATESPINE.IDLE_SAD) {
            this.bear2.setMix('idle', 'idle_sad', 0.2);
            this.bear2.setAnimation(0, 'idle_sad', true);
            this.bang1.string = ' ';
            this.bang2.string = ' ';
            this.bang3.string = ' ';
            this.scheduleOnce(function () {
                this.bear2.setMix('idle_happy', 'idle', 0.2);
                this.bear2.setAnimation(0, 'idle', true);
            }, 1.5);
        }
        if (this.stateSpineBear3 == STATESPINE.IDLE_SAD) {
            this.bear3.setMix('idle', 'idle_sad', 0.2);
            this.bear3.setAnimation(0, 'idle_sad', true);
            this.bang1.string = ' ';
            this.bang2.string = ' ';
            this.bang3.string = ' ';
            this.scheduleOnce(function () {
                this.bear3.setMix('idle_happy', 'idle', 0.2);
                this.bear3.setAnimation(0, 'idle', true);
            }, 1.5);
        }
        if (this.stateSpineBear1 == STATESPINE.WIN) {
            this.bear1.setMix('idle_sad', 'idle_happy', 0.2);
            this.bear1.setMix('idle_happy', 'idle_happy', 0.2);
            this.scheduleOnce(function () {
                this.bear1.setAnimation(0, 'idle_happy', true);
                this.node.emit('clear number');
            }, this.random_timeSwapSpine_bear1)

        }
        if (this.stateSpineBear2 == STATESPINE.WIN) {
            this.scheduleOnce(function () {
                this.bear2.setMix('idle_sad', 'idle_happy', 0.2);
                this.bear2.setMix('idle_happy', 'idle_happy', 0.2);
                this.bear2.setAnimation(0, 'idle_happy', true);
                this.node.emit('clear number');
                this.bang1.string = ' ';
                this.bang2.string = ' ';
                this.bang3.string = ' ';
            }, this.random_timeSwapSpine_bear2);
        }
        if (this.stateSpineBear3 == STATESPINE.WIN) {
            this.scheduleOnce(function () {
                this.bear3.setMix('idle_sad', 'idle_happy', 0.2);
                this.bear3.setMix('idle_happy', 'idle_happy', 0.2);
                this.bear3.setAnimation(0, 'idle_happy', true);
                this.node.emit('clear number');
                this.bang1.string = ' ';
                this.bang2.string = ' ';
                this.bang3.string = ' ';
            }, this.random_timeSwapSpine_bear3);
        }
    }

    Bear_dung_lai(state: boolean) {
        this.spine?.setAnimation(0, 'dung_lai', state);
    }
    Bear_idle(state: boolean) {
        this.spine?.setAnimation(0, 'idle', state);
    }
    Bear_idle2(state: boolean) {
        this.spine?.setAnimation(0, 'idle2', state);
    }
    Bear_idle_happy(state: boolean) {
        this.spine?.setAnimation(0, 'idle_happy', state);
    }
    Bear_idle_sad(state: boolean) {
        this.spine?.setAnimation(0, 'idle_sad', state);
    }
    Bear_run(state: boolean) {
        this.spine?.setAnimation(0, 'run', state);
    }
    Bear_walk(state: boolean) {
        this.spine?.setAnimation(0, 'walk', state);
    }
    Bear_win(state: boolean) {
        this.spine?.setAnimation(0, 'win', state);
    }
    checkPosition(positionNode: Node) {
        let position = positionNode.getWorldPosition();
        let btbang1 = this.button_bang1.getWorldPosition();
        let btbang2 = this.button_bang2.getWorldPosition();
        let btbang3 = this.button_bang3.getWorldPosition();
        if (position.x == btbang1.x && position.y == btbang1.y && this.stateLockClick == STATELOOK_CLICK.OPEN) {
            this.stateBang = STATEBANG.BANG1;
            this.emittoDF4();
            this.stateLockClick = STATELOOK_CLICK.LOCK;
        }
        if (position.x == btbang2.x && position.y == btbang2.y && this.stateLockClick == STATELOOK_CLICK.OPEN) {
            this.stateBang = STATEBANG.BANG2;
            this.emittoDF4();
            this.stateLockClick = STATELOOK_CLICK.LOCK;
        }
        if (position.x == btbang3.x && position.y == btbang3.y && this.stateLockClick == STATELOOK_CLICK.OPEN) {
            this.stateBang = STATEBANG.BANG3;
            this.emittoDF4();
            this.stateLockClick = STATELOOK_CLICK.LOCK;
        }
    }
    emittoDF4() {
        if (this.stateBang == STATEBANG.BANG1) {
            this.node.emit('number Press', this.numberBang1, this.stateBang);
        }
        if (this.stateBang == STATEBANG.BANG2) {
            this.node.emit('number Press', this.numberBang2, this.stateBang);
        }
        if (this.stateBang == STATEBANG.BANG3) {
            this.node.emit('number Press', this.numberBang3, this.stateBang);
        }

    }
    _setMix_bear1(spineA: string, spineB: string) {
        this.bear1.setMix(spineA, spineB, 0.2);
        this.bear1.setMix(spineB, spineA, 0.2);
    }
    _setMix_bear2(spineA: string, spineB: string) {
        this.bear2.setMix(spineA, spineB, 0.2);
        this.bear2.setMix(spineB, spineA, 0.2);
    }
    _setMix_bear3(spineA: string, spineB: string) {
        this.bear3.setMix(spineA, spineB, 0.2);
        this.bear3.setMix(spineB, spineA, 0.2);
    }
    update(deltaTime: number) {

    }
}


