import { _decorator, Component, Node, sp, tween, Vec3, Vec2, ITweenOption, bezier, math } from 'cc';
import { Bird_spine } from '../../df1/script/Bird_spine';
const { ccclass, property } = _decorator;
enum birdSpine {
    nostate,
    sai_buon,
    cau,
    sai_cahn_nan,
    di_bo,
    di_bo_ronren,
    Dung_gat_dau,
    idle,
    idle2,
    idle_gaimong,
    sai_khoc,
    dung_like,
    dung_like2,
    nhay,
    nhay2,
    nhun_nhay,
    nhun_nhay2,
    nhun_nhay3,
    Sai_so_hai,
    suy_nghi,
    traloi,
    Sai_tucgian,
    Dung_votay,
    Dung_votay2,
    Dung_votay3,
    walk,
}
@ccclass('df2_direction_birdSpine')
export class df2_direction_birdSpine extends Component {
    BIRD_SPINE_LIST = ["Sai/buon", "cau", "Sai/chan_nan", "di_bo", "di_bo_ronren", "Dung/gat_dau", "idle", "idle2", "idle_gaimong",
        "Sai/khoc", "Dung/like", "Dung/like2", "nhay", "nhay2", "nhun_nhay", "nhun_nhay2", "nhun_nhay3", "Sai/so_hai", "suy_nghi",
        "traloi", "Sai/tucgian", "Dung/votay", "Dung/votay2", "Dung/votay3", "walk"];
    @property(Node)
    private emitfrom_directionMain: Node = null;
    @property(Node)
    private positionTo: Node = null;
    @property(Node)
    private positionTo_2: Node = null;
    @property(Node)
    private positionTo_3: Node = null;
    @property(Node)
    private positionTo_4: Node = null;
    @property(Node)
    private positionTo_5: Node = null;
    @property(Bird_spine)
    private spine: Bird_spine = null;
    private positionStart: Vec3 = new Vec3(0, 0, 0);
    private positionStart_2: Vec3 = new Vec3(0, 0, 0);
    private positionStart_3: Vec3 = new Vec3(0, 0, 0);
    private positionStart_4: Vec3 = new Vec3(0, 0, 0);
    private positionStart_5: Vec3 = new Vec3(0, 0, 0);
    private MovingSpeed: number = 400;

    private bird_state: birdSpine = birdSpine.nostate;
    onLoad() {
        this.positionStart = this.positionTo.getWorldPosition();
        this.positionStart_2 = this.positionTo_2.getWorldPosition();
        this.positionStart_3 = this.positionTo_3.getWorldPosition();
        this.positionStart_4 = this.positionTo_4.getWorldPosition();
        this.positionStart_5 = this.positionTo_5.getWorldPosition();
    }
    start() {
        this.birdMovingTo_PositionStart();
        for (let i = 0; i < this.BIRD_SPINE_LIST.length; i++) {
            for (let j = i + 1; j < this.BIRD_SPINE_LIST.length; j++) {
                this.spine._setMix(this.BIRD_SPINE_LIST[i], this.BIRD_SPINE_LIST[j]);
            }
        }
        this.emitfrom_directionMain.on('bird chuyen spine', this.setBirdState, this);
        this.emitfrom_directionMain.on('bird moving position origin', this.birdMoving, this);
        this.emitfrom_directionMain.on('bird moving inside', this.bird_moving_inside, this);
    }
    bird_moving_inside() {
        let distance = this.distance_between_2_points(this.positionStart, this.positionStart_3);
        let distance_3part = distance / 3;
        let p = this.node.getWorldPosition();
        let p2 = new Vec2(p.x - 850, p.y + distance_3part / 2);
        let p3 = new Vec2(p.x - 850, p.y + distance_3part);
        let p4 = new Vec2(this.positionStart_3.x, this.positionStart_3.y);
        this.tweenBezier2DTo(this.node, distance / this.MovingSpeed, p2, p3, p4, () => {
            this.spine.Bird_idle(true);
            tween(this.node)
                .delay(0.5)
                .call(() => {
                    this.spine.Bird_idle2(true);
                })
                .delay(1)
                .call(() => {
                    this.node.setScale(0.4, 0.4, 0.4);
                    this.spine.Bird_idle2(true);
                })
                .delay(1)
                .call(() => {
                    this.spine.Bird_Sai_buon(true);
                })
                .delay(3.5)
                .call(() => {
                    this.spine.Bird_idle(true);
                })
                .delay(0.5)
                .call(() => {
                    this.spine.Bird_di_bo(true);
                    tween(this.node)
                        .to(this.distance_between_2_points(this.positionStart_3, this.positionStart_4) / this.MovingSpeed,
                            { worldPosition: this.positionStart_4 })
                        .call(() => {
                            this.spine.Bird_idle(true)
                            tween(this.node)
                                .delay(0.5)
                                .call(() => {
                                    this.spine.Bird_Sai_buon(true)
                                })
                                .delay(3.5)
                                .call(() => {
                                    this.spine.Bird_idle(true)
                                })
                                .delay(0.5)
                                .call(() => {
                                    this.spine.Bird_di_bo(true);
                                    this.moving_to_position_end();
                                })
                                .start();
                        })
                        .start();
                    tween(this.node)
                        .to(this.distance_between_2_points(this.positionStart, this.positionStart_3) / this.MovingSpeed,
                            { scale: new Vec3(0.6, 0.6, 0.6) })
                        .start();
                })
                .start();
        });
        tween(this.node)
            .to(this.distance_between_2_points(this.positionStart, this.positionStart_3) / this.MovingSpeed,
                { scale: new Vec3(-0.4, 0.4, 0.4) })
            .start();
    }
    moving_to_position_end() {
        this.node.setScale(-0.6, 0.6, 0.6);
        let p = this.node.getWorldPosition();
        let distance = this.distance_between_2_points(p, this.positionStart_5);
        let distance_3part = distance / 3;
        let p1 = new Vec2(p.x + 600, p.y - distance_3part / 3);
        let p2 = new Vec2(p.x + 500, p.y - distance_3part);
        let p3 = new Vec2(this.positionStart_5.x, this.positionStart_5.y);
        this.tweenBezier2DTo(this.node, distance / this.MovingSpeed + 1, p1, p2, p3, () => {
            this.spine.Bird_idle(true);
        })
        tween(this.node)
            .to(this.distance_between_2_points(this.positionStart_4, this.positionStart_5) / this.MovingSpeed,
                { scale: new Vec3(-1, 1, 1) })
            .start();
    }
    birdMoving(position: Vec3) {
        this.node.setScale(-1, 1, 1);
        tween(this.node)
            .to(8, { worldPosition: new Vec3(position.x + 1000, position.y, 0) })
            .call(() => {
                console.log('moving to origin_set sawp df3');
                this.node.emit('chuyen df3');
            })
            .start();
    }
    distance_between_2_points(position_1: Vec3, position_2: Vec3): number {
        let X = Math.abs(position_1.x - position_2.x);
        let Y = Math.abs(position_1.y - position_2.y);
        let distance = Math.sqrt(X * X + Y * Y);
        return distance;
    }
    setBirdState(state: number) {
        if (state == birdSpine.idle2) {
            this.node.setScale(1, 1, 1);
            this.spine.Bird_idle2(true);
        }
        if (state == birdSpine.traloi) {
            this.spine.Bird_traloi(false);
        }
        if (state == birdSpine.idle) {
            this.spine.Bird_idle(true);
        }
        if (state == birdSpine.suy_nghi) {
            this.spine.Bird_suy_nghi(true);
        }
        if (state == birdSpine.dung_like) {
            this.spine.Bird_Dung_like(false);
            this.scheduleOnce(function () {
                this.spine.Bird_idle(true);
                this.scheduleOnce(function () {
                    this.spine.Bird_Dung_votay(true);
                    this.scheduleOnce(function () {
                        this.spine.Bird_idle(true);
                        this.scheduleOnce(function () {
                            this.spine.Bird_di_bo(true);
                            this.node.emit('bird moving to positon origin');
                        }, 0.5)
                    }, 4);
                }, 0.5)
            }, 2)
        }
        if (state == birdSpine.sai_buon) {
            this.spine.Bird_Sai_buon(true);
            this.scheduleOnce(function () {
                this.spine.Bird_idle(true);
                this.scheduleOnce(function () {
                    this.spine.Bird_idle2(true);
                    this.node.emit('turn right please');
                }, 0.5);
            }, 3);
        }
    }
    birdMovingTo_PositionStart() {
        let MovingSpeed = 550;
        let p = this.node.getWorldPosition();
        this.spine.Bird_di_bo(true);
        tween(this.node)
            .to(this.distance_between_2_points(p, this.positionStart) / MovingSpeed, { worldPosition: new Vec3(this.positionStart.x, this.positionStart.y, 0) })
            .call(() => {
                this.spine.Bird_idle(true);
                this.scheduleOnce(function () {
                    this.node.setScale(1, 1, 1);
                    this.spine.Bird_idle2(true);
                    this.scheduleOnce(function () {
                        this.node.setScale(-1, 1, 1);
                        this.spine.Bird_idle2(true);
                        this.scheduleOnce(function () {
                            this.spine.Bird_Sai_buon(true);
                            this.scheduleOnce(function () {
                                this.spine.Bird_walk(true);
                                this.node.emit('bird move inside');
                            }, 3.5);
                        }, 1);
                    }, 1)
                }, 0.5);
            })
            .start();
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
            .call(() => {
                target['bezierX'] = null;
                finishcallback && finishcallback();
            })
            .start();

        target['bezierY'] = tween(_targetY)
            .to(duration, { value: to.y }, bOpts)
            .call(() => {
                target['bezierY'] = null;
            })
            .start();
    }
    update(deltaTime: number) {

    }
}


