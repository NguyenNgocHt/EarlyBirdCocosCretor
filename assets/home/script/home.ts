import { _decorator, Component, Node, EventTouch, EventMouse, log, Vec3, instantiate, Prefab, tween } from 'cc';
import { ScreenManager } from '../../loading/script/ScreenManager';
import { PrefabManager } from '../../loading/script/PrefabManager';
const { ccclass, property } = _decorator;
enum MOVEUFO {
    NOMOVE,
    PLANNETPRESEND,
    PLANETMATHS,
    PLANETENGLISH,
    PLANETSCIENCE,
};
enum MENU_MOVE {
    NOMOVE,
    HOME,
    ECA,
    INBOX,
    ACCOUNT,
};
enum blockState {
    nostate,
    block,
    open,
}
@ccclass('home')
export class home extends Component {

    @property({ type: Node })
    private butttonPresend: Node = null;
    @property({ type: Node })
    private buttonMaths: Node = null;
    @property({ type: Node })
    private buttonEnglish: Node = null;
    @property({ type: Node })
    private buttonScience: Node = null;

    @property({ type: Node })
    private buttonPlanetPresend: Node = null;
    @property({ type: Node })
    private buttonPlanetMaths: Node = null;
    @property({ type: Node })
    private buttonPlanetEnglish: Node = null;
    @property({ type: Node })
    private buttonPlanetScience: Node = null;
    @property({ type: Node })
    private UFO: Node = null;
    @property({ type: Node })
    private buttonUFO: Node = null;
    //set state start
    private move_ufo: MOVEUFO = MOVEUFO.NOMOVE;
    private move_scene: MOVEUFO = MOVEUFO.NOMOVE;
    private statemenu: MENU_MOVE = MENU_MOVE.NOMOVE;
    private endMenu: MENU_MOVE = MENU_MOVE.NOMOVE;
    private startMemuMove: MENU_MOVE = MENU_MOVE.NOMOVE;
    private blockstate: blockState = blockState.open;
    start() {
        //press button
        this.butttonPresend.on(Node.EventType.MOUSE_DOWN, this.setStatemoveUFO_presend, this);
        this.buttonMaths.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_maths, this);
        this.buttonEnglish.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_english, this);
        this.buttonScience.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_science, this);
        //press planet
        this.buttonPlanetPresend.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_presend, this);
        this.buttonPlanetMaths.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_maths, this);
        this.buttonPlanetEnglish.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_english, this);
        this.buttonPlanetScience.on(Node.EventType.TOUCH_START, this.setStatemoveUFO_science, this);
        this.UFO.on('move ok', this.setStatemoveUFO_OK, this);

    }
    setStatemoveUFO_OK(state: number) {
        if (state == MOVEUFO.PLANNETPRESEND) {
            this.move_scene = MOVEUFO.PLANNETPRESEND;
            // this.blockstate = blockState.open;
        }
        if (state == MOVEUFO.PLANETENGLISH) {
            this.move_scene = MOVEUFO.PLANETENGLISH;
            this.blockstate = blockState.open;
            this.loadGate();
        }
        if (state == MOVEUFO.PLANETMATHS) {
            this.move_scene = MOVEUFO.PLANETMATHS;
            // this.blockstate = blockState.open;
        }
        if (state == MOVEUFO.PLANETSCIENCE) {
            this.move_scene = MOVEUFO.PLANETSCIENCE;
            // this.blockstate = blockState.open;
        }
    }

    loadGate() {
        PrefabManager.instance().loadPrefab('dark_forest', 'scene_change/prefab/sceneChange', true, this.show_scene_change.bind(this));
        tween(this.node)
            .delay(0.2)
            .call(() => {
                PrefabManager.instance().loadPrefab('dark_forest', 'gate/prefab/Index', true, this.showGate.bind(this));
            })
            .start();

    }
    show_scene_change(error: number, prefab: Prefab) {
        console.log('show_scene_change');
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen scene_change');
        } else {
            console.log('showScreen scene_change error', error);
        }
    }
    showGate(error: number, prefab: Prefab) {
        log('show_gate');
        if (error == 0) {
            let node = instantiate(prefab);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen Gate');
        } else {
            console.log('showScreen Gate error', error);
        }
    }

    setStatemoveUFO_presend() {
        if (this.blockstate == blockState.open) {
            this.move_ufo = MOVEUFO.PLANNETPRESEND;
            this.node.emit('move planet presend', this.move_ufo);
            this.node.emit('audio play');
            this.blockstate = blockState.block;
        }
    }
    setStatemoveUFO_maths() {
        if (this.blockstate == blockState.open) {
            this.move_ufo = MOVEUFO.PLANETMATHS;
            this.node.emit('move planet presend', this.move_ufo);
            this.node.emit('audio play');
            this.blockstate = blockState.block;
        }
    }
    setStatemoveUFO_english() {
        if (this.blockstate == blockState.open) {
            this.move_ufo = MOVEUFO.PLANETENGLISH;
            this.node.emit('move planet presend', this.move_ufo);
            this.node.emit('audio play');
            this.blockstate = blockState.block;
        }
    }
    setStatemoveUFO_science() {
        if (this.blockstate == blockState.open) {
            this.move_ufo = MOVEUFO.PLANETSCIENCE;
            this.node.emit('move planet presend', this.move_ufo);
            this.node.emit('audio play');
            this.blockstate = blockState.block;
        }

    }
    update(deltaTime: number) {
    }
}


