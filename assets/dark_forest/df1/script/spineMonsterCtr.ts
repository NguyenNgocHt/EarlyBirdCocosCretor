import { _decorator, Component, Node, sp, v3, tween, Vec2, Vec3, ITweenOption, bezier } from 'cc';
import { indexDf1 } from './indexDf1';
const { ccclass, property } = _decorator;

const TARGET_MONSTER = v3(509, -425, 0);

@ccclass('spineMonsterCtr')
export class spineMonsterCtr extends Component {
    @property(Node)
    private emitfrom_EatFruitsMain: Node = null;
    private spine?: sp.Skeleton;
    private count_number_bird_like: number = 0;
    onLoad() {
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
    }
    start() {
        this.emitfrom_EatFruitsMain.on('monster nhay ra', this.setMonsterMoving, this);
        this.emitfrom_EatFruitsMain.on('monster gao thet', this.monsterGao_thet, this);
        this.emitfrom_EatFruitsMain.on('monster eat start', this.monster_eatFruits, this);
        this.emitfrom_EatFruitsMain.on('monster eat_false', this.set_monster_eat_false, this);
    }
    setMonsterMoving(position_BirdMoving: Vec3, position_monster1: Vec3, position_monster2: Vec3,
        position_monster3: Vec3, position_monster4: Vec3) {
        let p = this.node.getWorldPosition();
        let p1 = new Vec2(position_monster1.x, position_monster1.y);
        let p2 = new Vec2(position_monster2.x, position_monster2.y);
        let p3 = new Vec2(position_BirdMoving.x + 250, position_BirdMoving.y);
        let p4 = new Vec2(position_monster3.x, position_monster3.y);
        let p5 = new Vec2(position_monster4.x, position_monster4.y);
        let p6 = new Vec2(position_monster4.x + 200, position_BirdMoving.y);
        this.nhayra(false);
        this.tweenBezier2DTo(this.node, 1, p1, p2, p3, () => {
            // this.node.setSiblingIndex(14);
            this.node.emit('bird nhay quay lai_hoang hot');
            this.nhayra(false);
            this.tweenBezier2DTo(this.node, 1, p4, p5, p6, () => {
                this.node.emit('am thanh huong dan');
                this.spine?.setMix('nhayra', 'idle', 0.1);
                this.idle(true);
            });
        });
        tween(this.node)
            .to(0.3, { scale: new Vec3(1, 1, 1) })
            .start();
    }
    monster_eatFruits() {
        this.scheduleOnce(function () {
            this.spine?.setMix('idle', 'an', 0.2);
            this.node.emit('block fruits moving state');
            this.an(false);
            this.scheduleOnce(function () {
                this.count_number_bird_like = this.count_number_bird_like + 1;
                this.node.emit('bird chuyen spine like');
                if (this.count_number_bird_like == 1) {
                    this.spine?.setMix('an', 'idle2', 0.2);
                    this.idle2(true);
                    tween(this.node)
                        .delay(3)
                        .call(() => {
                            this.node.emit('i want to eat more');
                        })
                        .delay(1)
                        .call(() => {
                            this.spine?.setMix('idle2', 'idle', 0.2);
                            this.idle(true);
                        })
                        .start();
                }
                if (this.count_number_bird_like == 2) {
                    tween(this.node)
                        .delay(4.3)
                        .call(() => {
                            this.ngu(true);
                        })
                        .start();
                    this.count_number_bird_like = 0;
                }

            }, 3);
        }, 0.5);

    }
    set_monster_eat_false() {
        this.scheduleOnce(function () {
            this.spine?.setMix('idle', 'an', 0.2);
            this.node.emit('block fruits moving state');
            this.an(false);
            this.scheduleOnce(function () {
                this.spine?.setMix('an', 'tucgian', 0.2);
                this.node.emit('chuyen bird spine Sai/khoc');
                this.tucgian(false);
                this.scheduleOnce(function () {
                    this.spine?.setMix('tucgian', 'idle', 0.2);
                    this.idle(true);
                }, 2.5);
            }, 2);
        }, 0.5);
    }
    monsterGao_thet() {
        this.spine?.setMix('idle', 'nhayra', 0.1);
        this.nhayra(false);
        this.scheduleOnce(function () {
            this.spine?.setMix('nhayra', 'idle', 0.1);
            this.idle(true);
        }, 3)
    }
    an(isLoop: boolean) {
        this.spine?.setAnimation(0, 'an', isLoop);
    }
    idle(isLoop: boolean) {
        this.spine?.setAnimation(0, 'idle', isLoop);
    }
    idle2(isLoop: boolean) {
        this.spine?.setAnimation(0, 'idle2', isLoop);
    }
    idle3(isLoop: boolean) {
        this.spine?.setAnimation(0, 'idle3', isLoop);
    }
    ngu(isLoop: boolean) {
        this.spine?.setAnimation(0, 'ngu', isLoop);
    }
    nhayra(isLoop: boolean) {
        this.spine?.setAnimation(0, 'nhayra', isLoop);
    }
    tucgian(isLoop: boolean) {
        this.spine?.setAnimation(0, 'tucgian', isLoop);
    }

    tweenBezier2DTo(target: Node, duration: number, c1: Vec2, c2
        : Vec2, to: Vec2, finishcallback?: any, opts?: ITweenOption) {
        if (target['bezierX']) target['bezierX'].stop();
        if (target['bezierY']) target['bezierY'].stop();

        let c0x = c1.x, c0y = c1.y,
            c1x = c2.x, c1y = c2.y;
        const _targetX = { value: target.getWorldPosition().x };
        const _targetY = { value: target.getWorldPosition().y };
        const aOpts: ITweenOption = opts || Object.create(null);
        aOpts.progress = function (startX: number, endX: number, currentX: number, t: number) {
            currentX = bezier(startX, c0x, c1x, endX, t);
            return currentX;
        }
        aOpts.onUpdate = function () {
            target.setWorldPosition(new Vec3(_targetX.value, target.worldPosition.y, target.worldPosition.z));
        }
        const bOpts: ITweenOption = opts || Object.create(null);
        bOpts.progress = function (startY: number, endY: number, currentY: number, t: number) {
            currentY = bezier(startY, c0y, c1y, endY, t);
            return currentY;
        }
        bOpts.onUpdate = function () {
            target.setWorldPosition(new Vec3(target.worldPosition.x, _targetY.value, target.worldPosition.z));
            target.emit('position update', target.getWorldPosition());
        }
        target['bezierX'] = tween(_targetX)
            .to(duration, { value: to.x }, aOpts)
            .delay(2)
            .call(() => {
                target['bezierX'] = null;
                finishcallback && finishcallback();
            })
            .start();

        target['bezierY'] = tween(_targetY)
            .to(duration, { value: to.y }, bOpts)
            .delay(2)
            .call(() => {
                target['bezierY'] = null;
            })
            .start();
    }
}


