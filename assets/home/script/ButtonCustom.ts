import { _decorator, Button, CCFloat, Color, Label, Sprite, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('ButtonCustom')
export class ButtonCustom extends Button {
    private _state: string = "none";

    protected _applyTransition(state: string) {
        super._applyTransition(state);
        if (this._state !== state) {
            // HTLog.log("==>ButtonCustom:  _updateSpriteTransition = ", state);
            if (state === "normal" || state === "hover" || state === "disabled") {
            }

            if (state === "pressed") {
            }
            this._state = state;
        }
    }


}

