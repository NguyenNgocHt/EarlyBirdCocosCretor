import { _decorator, Component, Node, sp, log } from 'cc';
import { home } from './home';
const { ccclass, property } = _decorator;
enum MOVEUFO {
    NOMOVE,
    PLANNETPRESEND,
    PLANETMATHS,
    PLANETENGLISH,
    PLANETSCIENCE,
};
enum ON_OFF {
    NO,
    ON,
    OFF,
};
@ccclass('UFO')
export class UFO extends Component {
    private spine: sp.Skeleton;
    @property({ type: home })
    private emitfromhome: home = null;
    private statemoveUFO: MOVEUFO = MOVEUFO.NOMOVE;
    private statemoveUFO_OK: MOVEUFO = MOVEUFO.NOMOVE;
    private stateOn_Off: ON_OFF = ON_OFF.OFF;
    start() {
        this.emitfromhome.node.on('move planet presend', this.setmove_UFO, this);
    }
    setmove_UFO(state: number) {
        if (state == MOVEUFO.PLANNETPRESEND && this.stateOn_Off == ON_OFF.OFF) {
            this.statemoveUFO = MOVEUFO.PLANNETPRESEND;
            this.UFOStart();
            this.stateOn_Off = ON_OFF.ON;
        }
        else if (state == MOVEUFO.PLANETMATHS && this.stateOn_Off == ON_OFF.OFF) {
            this.statemoveUFO = MOVEUFO.PLANETMATHS;
            this.UFOStart();
            this.stateOn_Off = ON_OFF.ON;
        }
        else if (state == MOVEUFO.PLANETENGLISH && this.stateOn_Off == ON_OFF.OFF) {
            this.statemoveUFO = MOVEUFO.PLANETENGLISH;
            this.UFOStart();
            this.stateOn_Off = ON_OFF.ON;
        }
        else if (state == MOVEUFO.PLANETSCIENCE && this.stateOn_Off == ON_OFF.OFF) {
            this.statemoveUFO = MOVEUFO.PLANETSCIENCE;
            this.UFOStart();
            this.stateOn_Off = ON_OFF.ON;
        }
        else if (state == MOVEUFO.NOMOVE && this.stateOn_Off == ON_OFF.OFF) {
            this.statemoveUFO = MOVEUFO.NOMOVE;
            this.UFOStart();
            this.stateOn_Off = ON_OFF.ON;
        }
    }
    UFOStart() {
        if (this.statemoveUFO == MOVEUFO.PLANNETPRESEND) {
            this.UFO_movetoPlanetPresend();
            this.spine.setCompleteListener(() => {
                this.statemoveUFO_OK = MOVEUFO.PLANNETPRESEND;
                this.node.emit('move ok', this.statemoveUFO_OK);
                this.UFO_nomove();
                this.stateOn_Off = ON_OFF.OFF;
            });
        }
        else if (this.statemoveUFO == MOVEUFO.PLANETMATHS) {
            this.UFO_movetoPlanetMaths();
            this.spine.setCompleteListener(() => {
                this.statemoveUFO_OK = MOVEUFO.PLANETMATHS;
                this.node.emit('move ok', this.statemoveUFO_OK);
                this.UFO_nomove();
                this.stateOn_Off = ON_OFF.OFF;
            });
        }
        else if (this.statemoveUFO == MOVEUFO.PLANETENGLISH) {
            this.UFO_movetoPlanetEnglish();
            this.spine.setCompleteListener(() => {
                this.statemoveUFO_OK = MOVEUFO.PLANETENGLISH;
                this.node.emit('move ok', this.statemoveUFO_OK);
                this.stateOn_Off = ON_OFF.OFF;
            });
        }
        else if (this.statemoveUFO == MOVEUFO.PLANETSCIENCE) {
            this.UFO_movetoPlanetScience();
            this.spine.setCompleteListener(() => {
                this.statemoveUFO_OK = MOVEUFO.PLANETSCIENCE;
                this.node.emit('move ok', this.statemoveUFO_OK);
                this.UFO_nomove();
                this.stateOn_Off = ON_OFF.OFF;
            });
        }
        else if (this.statemoveUFO == MOVEUFO.NOMOVE) {
            this.UFO_nomove();
        }
    }
    onLoad() {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
    }

    UFO_movetoPlanetEnglish() {
        this.spine?.setAnimation(0, 'Bay_hanhtinh2', false);
    }
    UFO_movetoPlanetPresend() {
        this.spine?.setAnimation(0, 'Bay_hanhtinh3', false);
    }
    UFO_movetoPlanetMaths() {
        this.spine?.setAnimation(0, 'Bay_hanhtinh1', false);
    }
    UFO_movetoPlanetScience() {
        this.spine?.setAnimation(0, 'Bay_hanhtinh4', false);
    }
    UFO_nomove() {
        this.spine?.setAnimation(0, 'Track1_diabay', true);
    }
}


