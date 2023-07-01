import * as cc from 'cc';
import { Button, Color, Label, log, math, Node, Sprite } from 'cc';

declare module 'cc' {
    interface Node {
        setPositionX(x: number): void;

        setPositionY(y: number): void;

        setPositionZ(z: number): void;

        changePositionX(x: number): void;

        changePositionY(y: number): void;

        changePositionZ(z: number): void;

        setScaleX(x: number): void;

        setScaleY(y: number): void;

        setScaleZ(z: number): void;

        logColor(title: string, data: any, color: Color): void;

        setNodeActive(isActive: boolean): void;

        setNodeOpacity(opacity: number): void;

        getNodeOpacity(): number;

        onFadeTo(time: number, from: number, to: number, callback?: Function): void;

        onFadeIn(time: number, opacity: number, callback?: Function): void;

        onFadeOut(time: number, callback?: Function): void;
    }

    interface Sprite {
        setOpacity(a: number): void;

        setColor(color: Color): void;
    }

    interface Button {
        setOpacity(a: number): void;

        setBtnActive(isActive: boolean): void;
    }

    interface Label {
        setOpacity(a: number): void;

        setColor(color: Color): void;

        setContentSize(size: Size): void;
    }
}

Button.prototype.setOpacity = function (a: number): void {
    this.node.setNodeOpacity(a);
}

Button.prototype.setBtnActive = function (isActive: boolean): void {
    this.node.active = isActive;
}

//NODE
Node.prototype.setNodeActive = function (isActive: boolean): void {
    this.active = isActive;
}

Node.prototype.logColor = function (title: string, data: any, color: Color): void {
    log(`%c ${title}`, `background: #222; color: #${color.toHEX()}`, data);
}

Node.prototype.setPositionX = function (x: number): void {
    this.position = new math.Vec3(x, this.position.y, this.position.z);
}

Node.prototype.setPositionY = function (y: number): void {
    this.position = new math.Vec3(this.position.x, y, this.position.z);
}

Node.prototype.setPositionZ = function (z: number): void {
    this.position = new math.Vec3(this.position.x, this.position.y, z);
}

Node.prototype.changePositionX = function (x: number): void {
    this.position = new math.Vec3(this.position.x + x, this.position.y, this.position.z);
}

Node.prototype.changePositionY = function (y: number): void {
    this.position = new math.Vec3(this.position.x, this.position.y + y, this.position.z);
}

Node.prototype.changePositionZ = function (z: number): void {
    this.position = new math.Vec3(this.position.x, this.position.y, this.position.z + z);
}

Node.prototype.setScaleX = function (x: number): void {
    this.scale = new math.Vec3(x, this.scale.y, this.scale.z);
}

Node.prototype.setScaleY = function (y: number): void {
    this.scale = new math.Vec3(this.scale.x, y, this.scale.z);
}

Node.prototype.setScaleZ = function (z: number): void {
    this.scale = new math.Vec3(this.scale.x, this.scale.y, z);
}

Node.prototype.setNodeOpacity = function (opacity: number): void {
    let uiOpacity = this.getComponent(cc.UIOpacity) as cc.UIOpacity;
    if (uiOpacity) {
        uiOpacity.opacity = opacity;
    }
    else {
        uiOpacity = this.addComponent(cc.UIOpacity);
        uiOpacity.opacity = opacity;
    }
}

Node.prototype.getNodeOpacity = function (): number {
    let uiOpacity = this.getComponent(cc.UIOpacity) as cc.UIOpacity;
    if (uiOpacity) {
        return uiOpacity.opacity;
    }
    else {
        this.setNodeOpacity(255);
        return 255;
    }
}

Node.prototype.onFadeTo = function (time: number, from: number, to: number, callback?: Function): void {
    this.setNodeOpacity(from);
    let uiOpacity = this.getComponent(cc.UIOpacity);
    cc.tween(uiOpacity).to(time, { opacity: to }).call(() => {
        callback?.();
    }).start();
}

Node.prototype.onFadeIn = function (time: number, opacity: number, callback?: Function): void {
    this.onFadeTo(time, 1, opacity, callback);
}

Node.prototype.onFadeOut = function (time: number, callback?: Function): void {
    let opacity = this.getNodeOpacity();
    this.onFadeTo(time, opacity, 1, callback);
}

//SPRITE
Sprite.prototype.setOpacity = function (a: number): void {
    this.node.setNodeOpacity(a);
}

Sprite.prototype.setColor = function (color: Color): void {
    this.color = color;
}

//LABEL
Label.prototype.setOpacity = function (a: number): void {
    this.node.setNodeOpacity(a);
}

Label.prototype.setColor = function (color: Color): void {
    this.color = color;
}

Label.prototype.setContentSize = function (size: cc.Size): void {
    this.node.getComponent(cc.UITransform)?.setContentSize(size);
}

//------------------------------------------------------------------------------------------------

declare global {
    interface Number {
        roundDigits(digits: number): number;
        trunc(): number;
        truncDigits(digits: number): number;
        toFixedDown(digits: number): number;
    }

    interface String {
        toInt(): number;

        toFloat(): number;

        toBoolean(): boolean;

        formatWithMaxLength(maxLength: number): string;

        isNullOrUndefined(): boolean;
    }

    interface Array<T> {
        shuffleArray(): Array<T>;

        toJson(): string;

        clearArray(): Array<T>;

        cloneArray(): Array<T>;
    }
}

Array.prototype.shuffleArray = function () {
    for (let i = this.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const itemIndex = this[randomIndex];
        this[randomIndex] = this[i];
        this[i] = itemIndex;
    }
    return this;
}

Array.prototype.clearArray = function () {
    this.splice(0, this.length);
    return this;
}

Array.prototype.cloneArray = function () {
    return [...this];
}

Array.prototype.toJson = function (): string {
    return JSON.stringify(this);
}

String.prototype.toInt = function (): number {
    if (String(this) === null || String(this) === undefined) return 0;
    let result = Number(String(this));
    if (Number.isNaN(result)) return 0;
    return Math.trunc(result);
}

String.prototype.toFloat = function (): number {
    if (String(this) === null || String(this) === undefined) return 0;
    let result = Number(String(this));
    if (Number.isNaN(result)) result = 0;
    return result;
}

String.prototype.toBoolean = function (): boolean {
    return String(this).toLowerCase() == 'true';
}

String.prototype.formatWithMaxLength = function (maxLength: number): string {
    if (this == null || this == undefined) return "";
    let str = String(this);
    if (str.length > maxLength) {
        if (str.charAt(maxLength - 1) === " ") {
            str = `${str.substring(0, maxLength - 1)}..`;
        }
        else {
            str = `${str.substring(0, maxLength)}..`;
        }
    }
    return str;
}

String.prototype.isNullOrUndefined = function (): boolean {
    return String(this) == null || String(this) == undefined;
}

Number.prototype.roundDigits = function (digits: number): number {
    return Math.round(Number(this) * Math.pow(10, digits)) / Math.pow(10, digits);
}

Number.prototype.truncDigits = function (digits: number): number {
    return digits > 0 ? Number(this).toFixedDown(digits) : (Math.trunc(Number(this) * Math.pow(10, digits)) / Math.pow(10, digits));
}

Number.prototype.trunc = function (): number {
    return Math.trunc(Number(this));
}

Number.prototype.toFixedDown = function (digits: number): number {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = Number(this).toString().match(re);
    return m ? parseFloat(m[1]) : Number(this).valueOf();
};
