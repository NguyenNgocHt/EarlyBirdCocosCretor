import { Prefab, Node, instantiate, log, tween, v3, Scene } from "cc";

export class ScreenManager {
    private static ins: ScreenManager = null;
    static instance(): ScreenManager {
        if (!ScreenManager.ins) {
            ScreenManager.ins = new ScreenManager();
        }
        return ScreenManager.ins;
    }

    private constructor() {

    }

    private currentScreen: Node = null;
    private currentScreen_scene_change: Node = null;
    private currentScreen_effect_fireworks: Node = null;
    private currentPopup: Node = null;

    private root: Node = null;
    private ui: Node = null;
    private popup: Node = null;

    init(root: Node, ui: Node, popup: Node) {
        if (this.root == null) {
            this.root = root;
            this.ui = ui;
            this.popup = popup;
            console.log('ScreenManager init');
        }
    }

    showScreen(screen: Node, callback?: Function) {
        this.ui.addChild(screen);
        if (screen.name == 'fireworks') {
            this.on_show_screen_fireworks(screen);
        }
        else if (screen.name == 'sceneChange') {
            screen.setSiblingIndex(2);
            this.onShowScreen_scene_change(screen);
        }
        else if (screen.name == 'Index') {
            console.log('df3 change');
            screen.setSiblingIndex(1);
            this.onShowScreen(screen);
        }
        if (callback) callback(0, screen);
    }
    private on_show_screen_fireworks(screen: Node) {
        if (this.currentScreen_effect_fireworks) {
            this.currentScreen_effect_fireworks.removeFromParent();
        }
        this.currentScreen_effect_fireworks = screen;
        this.currentScreen_effect_fireworks.active = true;
        screen.setSiblingIndex(2);
    }
    private onShowScreen_scene_change(screen: Node) {
        if (this.currentScreen_scene_change) {
            this.currentScreen_scene_change.removeFromParent();
        }
        this.currentScreen_scene_change = screen;
        this.currentScreen_scene_change.active = true;
    }
    private onShowScreen(screen: Node) {
        if (this.currentScreen) {
            console.log('############# xoa ', this.currentScreen);
            this.currentScreen.removeFromParent();
        }
        if (this.currentScreen_effect_fireworks) {
            this.currentScreen_effect_fireworks.removeFromParent();
        }
        this.currentScreen = screen;
        this.currentScreen.active = true;
        console.log('############# bat ', this.currentScreen);
        log('show new screen');
    }
    popupList: Node[] = new Array();

    private requestShowPopup() {
        if (this.popupList.length == 0) {
            log('showPopup NONE', this.popupList.length);
            this.popup.active = false;
        } else {
            if (this.currentPopup == null) {
                log('showPopup SHOW', this.popupList.length)
                let popup = this.popupList.pop();
                this.currentPopup = popup;
                this.currentPopup.active = true;
                this.popup.active = true;
                this.zoomOutAndShow(popup);
            }
        }
    }

    closePopup() {
        log('closePopup');
        if (this.currentPopup) {
            this.zoomInAndHide(this.currentPopup, this.onClosePopup.bind(this));
        }
    }

    onClosePopup() {
        this.currentPopup = null;
        this.requestShowPopup();
    }

    showPopup(popup: Node, callback?: Function) {
        this.popup.addChild(popup);
        popup.active = false;
        this.popupList.push(popup);
        this.requestShowPopup()
        if (callback) callback(0, popup);
    }

    private zoomInAndHide(node: Node, callback?: Function) {
        let duration: number = 0.1;
        tween(node)
            .to(duration, { scale: v3(0.8, 0.8, 0.8) })
            .removeSelf().call(() => {
                if (callback) callback();
            }).start();
    }

    private zoomOutAndShow(node: Node, callback?: Function) {
        let duration: number = 0.1;
        tween(node)
            .set({ scale: v3(0.8, 0.8, 0.8) })
            .to(duration, { scale: v3(1, 1, 1) })
            .call(() => {
                if (callback) callback();
            })
            .start();
    }
}

