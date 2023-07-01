import { _decorator, Component, Node, sp, tween, v3, Vec3, bezier, Tween, ITweenOption, Vec2 } from 'cc';
import { indexDf1 } from './indexDf1';
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
enum questionState {
    nostate,
    bird,
    tiger,
    cat,
}
@ccclass('spinebird_df1')
export class spinebird_df1 extends Component {
    BIRD_SPINE_LIST = ["Sai/buon", "cau", "Sai/chan_nan", "di_bo", "di_bo_ronren", "Dung/gat_dau", "idle", "idle2", "idle_gaimong",
        "Sai/khoc", "Dung/like", "Dung/like2", "nhay", "nhay2", "nhun_nhay", "nhun_nhay2", "nhun_nhay3", "Sai/so_hai", "suy_nghi",
        "traloi", "Sai/tucgian", "Dung/votay", "Dung/votay2", "Dung/votay3", "walk"];
    @property(indexDf1)
    indexDf1: indexDf1 = null!;
    @property(Node)
    private emitfrom_eatFruitsMain: Node = null;
    private bird_spine: birdSpine = birdSpine.nostate;
    private question_state: questionState = questionState.nostate;
    private spine?: sp.Skeleton;
    private _hasStop = true;
    private count_bird_like_state: number = 0;
    START_POSITION;
    TARGET_POSITION;
    mixTime: number = 0.2;
    onLoad() {
        this.question_state = questionState.bird;
        this.START_POSITION = this.node.getWorldPosition();
        this.TARGET_POSITION = v3(-734.677, -431.373, 0);
        var spine = this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
        this._hasStop = false;
        for (let i = 0; i < this.BIRD_SPINE_LIST.length; i++) {
            for (let j = i + 1; j < this.BIRD_SPINE_LIST.length; j++) {
                this._setMix(this.BIRD_SPINE_LIST[i], this.BIRD_SPINE_LIST[j]);
            }
        }
        this.bird_start_df1_1();
    }
    start() {
        this.indexDf1.node.on('bird-start-df1_2', this.bird_start_df1_2, this);
        this.indexDf1.node.on('bird-cry', this.Sai_buon, this);
        this.indexDf1.node.on('bird spine swap like', this.bird_like, this);
        this.indexDf1.node.on('bird spine swap lac dau', this.setBird_chan_nan, this);
        this.indexDf1.node.on('bird_chuyen_spine', this.set_bird_spine, this);
        this.indexDf1.node.on('show char', this.get_question_state, this);
        //bird moving eat fruits
        this.emitfrom_eatFruitsMain.on('bird moving_eat fruits', this.bird_start_eat_fruits, this);
        this.emitfrom_eatFruitsMain.on('bird chuyen spine', this.set_bird_state, this);
        this.emitfrom_eatFruitsMain.on('bird moving_eat fruits end', this.setBird_Moving, this);
    }
    //bird in scene eat fruits
    bird_start_eat_fruits(position_BirdMoving: Vec3, position_BirdJump1: Vec3, position_BirdJump2: Vec3,
        position_BirdIdle: Vec3, spineState: number) {
        let p1 = new Vec2(position_BirdJump1.x, position_BirdJump1.y);
        let p2 = new Vec2(position_BirdJump2.x, position_BirdJump2.y);
        let p3 = new Vec2(position_BirdIdle.x, position_BirdIdle.y);
        this.di_bo(true);
        tween(this.node)
            .to(4, { worldPosition: new Vec3(position_BirdMoving.x, position_BirdMoving.y, 0) })
            .call(() => {
                this.spine?.setMix('di_bo', 'Sai/so_hai', 0.2);
                this.bird_so_hai(false);
                this.tweenBezier2DTo(this.node, 0.5, p1, p2, p3, () => {
                    this.spine?.setMix('Sai/so_hai', 'Sai/khoc', 0.2);
                    this.Sai_khoc(true);
                });
            })
            .start();
    }
    setBird_Moving(p1: Vec3, p2: Vec3, p3: Vec3, p4: Vec3, p5: Vec3) {
        this.node.setScale(-1, 1, 1);
        let p = this.node.getWorldPosition();
        tween(this.node)
            .to(this.timeMoving(p, p1), { worldPosition: new Vec3(p1.x, p1.y, 0) })
            .to(this.timeMoving(p1, p2), { worldPosition: new Vec3(p2.x, p2.y, 0) })
            .to(this.timeMoving(p2, p3), { worldPosition: new Vec3(p3.x, p3.y, 0) })
            .to(this.timeMoving(p3, p4), { worldPosition: new Vec3(p4.x, p4.y, 0) })
            .to(this.timeMoving(p4, p5), { worldPosition: new Vec3(p5.x + 500, p5.y, 0) })
            .call(() => {
                this.node.emit('moving end chuyen scene df2');
            })
            .start();
    }
    timeMoving(A: Vec3, B: Vec3): number {
        let MovingSpeed = 400;
        let X = Math.abs(B.x - A.x);
        let Y = Math.abs(B.y - A.y);
        let distance = Math.sqrt(X * X + Y * Y);
        let time_moving = distance / MovingSpeed;
        return time_moving;
    }
    set_bird_state(state: number) {
        if (state == birdSpine.idle) {
            this.bird_spine = birdSpine.idle;
            this.spineStart();
        }
        if (state == birdSpine.suy_nghi) {
            this.bird_spine = birdSpine.suy_nghi;
            this.spineStart();
        }
        if (state == birdSpine.idle2) {
            this.bird_spine = birdSpine.idle2;
            this.spineStart();
        }
        if (state == birdSpine.sai_khoc) {
            this.bird_spine = birdSpine.sai_khoc;
            this.spineStart();
        }
        if (state == birdSpine.dung_like) {
            this.bird_spine = birdSpine.dung_like;
            this.spineStart();
        }
    }
    spineStart() {
        if (this.bird_spine == birdSpine.idle) {
            this.spine?.setMix('Sai/khoc', 'idle', 0.2);
            this.idle(true);
        }
        if (this.bird_spine == birdSpine.suy_nghi) {
            this.spine?.setMix('idle', 'suy_nghi', 0.2);
            this.suy_nghi(true);
        }
        if (this.bird_spine == birdSpine.idle2) {
            this.spine?.setMix('suy_nghi', 'idle2', 0.2);
            this.node.setScale(1, 1, 1);
            this.idle2(true);
        }
        if (this.bird_spine == birdSpine.sai_khoc) {
            this.spine?.setMix('idle2', 'Sai/khoc', 0.2);
            this.Sai_khoc(true);
            this.scheduleOnce(function () {
                this.spine?.setMix('Sai/khoc', 'idle', 0.2);
                this.idle(true);
            }, 3)
        }
        if (this.bird_spine == birdSpine.dung_like) {
            this.spine?.setMix('idle2', 'Dung/like', 0.2);
            this.like(false);
            this.scheduleOnce(function () {
                this.spine?.setMix('Dung/like', 'Dung/votay', 0.2);
                this.Dung_votay(true);
                this.scheduleOnce(function () {
                    this.count_bird_like_state = this.count_bird_like_state + 1;
                    if (this.count_bird_like_state == 1) {
                        this.spine?.setMix('Dung/votay', 'idle', 0.2);
                        this.idle(true);
                    }
                    if (this.count_bird_like_state == 2) {
                        this.scheduleOnce(function () {
                            this.spine?.setMix('idle', 'di_bo', 0.2);
                            this.node.setScale(-1, 1, 1);
                            this.di_bo(true);
                            this.node.emit('bird moving_game end');
                            this.count_bird_like_state = 0;
                        }, 1);
                    }
                }, 3);
            }, 2);
        }
    }
    //bird in scene mushroom moving
    get_question_state(state: number) {
        if (state == questionState.tiger) {
            this.question_state = questionState.tiger;
        }
        if (state == questionState.cat) {
            this.question_state = questionState.cat;
        }
    }
    set_bird_spine(state: number, position_origin: Vec3) {
        if (state == birdSpine.Dung_votay) {
            this.Dung_votay(true);
            tween(this.node)
                .delay(3)
                .call(() => {
                    this.idle(true)
                })
                .delay(6)
                .call(() => {
                    if (this.question_state == questionState.bird ||
                        this.question_state == questionState.tiger) {
                        this.node.emit('show question 2');
                        this.traloi(true);
                        tween(this.node)
                            .delay(2)
                            .call(() => {
                                this.idle(true);
                                this.node.emit('false box chat_show tiger_thinking');
                            })
                            .start();
                    }
                    if (this.question_state == questionState.cat) {

                    }

                })
                .start();
        }
        if (state == birdSpine.idle) {
            this.idle(true);
        }
        if (state == birdSpine.traloi) {
            this.traloi(true);
            tween(this.node)
                .delay(1)
                .call(() => {
                    this.idle(true);
                })
                .start();
        }
        if (state == birdSpine.di_bo) {
            this.di_bo(true);
            tween(this.node)
                .to(6, { worldPosition: new Vec3(position_origin.x, position_origin.y, 0) })
                .call(() => {
                    this.node.emit('chuyen_canh', this.node.name);
                })
                .start();

        }
    }
    setBird_chan_nan() {
        this.spine?.setMix('Sai/buon', 'Sai/buon', 0.2);
        this.spine?.setMix('idle', 'Sai/buon', 0.2);
        this.Sai_buon(false);
        this.scheduleOnce(function () {
            this.spine?.setMix('Sai/buon', 'idle', 0.2);
            this.idle(true);
        }, 3.5);
    }
    bird_start_df1_1() {
        this.di_bo(true);
        tween(this.node)
            .to(3, { position: this.TARGET_POSITION })
            .call(() => {
                this.spine?.setMix('di_bo', 'idle', 0.2);
                this.idle(true);
            })
            .delay(1)
            .call(() => {
                this.node.emit('show-lost-label');
                this.traloi(true);
            })
            .start();

    }
    bird_start_df1_2(fatherNode: Node) {
        this.di_bo(true);
        tween(this.node)
            .to(1, { position: this.TARGET_POSITION })
            .call(() => {
                this.spine?.setMix('di_bo', 'idle', 0.2);
                this.idle(true);
            })
            .start();

    }
    bird_like() {
        this.spine?.setMix('idle', 'Dung/like', 0.2);
        this.like(false);
        this.scheduleOnce(function () {
            this.spine?.setMix('Dung/like', 'idle', 0.2);
            this.idle(true);
        }, 2)
    }
    // bird eat fruits
    bird_so_hai(isLoop: boolean) {
        this.spine?.setMix('di_bo', 'Sai/so_hai', 0.2);
        this.so_hai(isLoop);
    }
    stop() {
        this.spine?.clearTrack(0);
        this._hasStop = true;
    }
    Sai_buon(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Sai/buon', isLoop);
    }
    Sai_chan_nan(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Sai/chan_nan', isLoop);
    }
    Sai_khoc(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Sai/khoc', isLoop);
    }
    Sai_so_hai(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Sai/so_hai', isLoop);
    }
    cau(isLoop: boolean) {
        this.spine?.setAnimation(0, 'cau', isLoop);
    }
    di_bo(isLoop: boolean) {
        this.spine?.setAnimation(0, 'di_bo', isLoop);
    }
    di_bo_ronren(isLoop: boolean) {
        this.spine?.setAnimation(0, 'di_bo_ronren', isLoop);
    }
    Dung_gat_dau(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Dung/gat_dau', isLoop);
    }
    idle(isLoop: boolean) {
        this.spine?.setAnimation(0, 'idle', isLoop);
    }
    idle2(isLoop: boolean) {
        this.spine?.setAnimation(0, 'idle2', isLoop);
    }
    idle_gaimong(isLoop: boolean) {
        this.spine?.setAnimation(0, 'idle_gaimong', isLoop);
    }
    like(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Dung/like', isLoop);
    }
    like2(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Dung/like2', isLoop);
    }
    nhay(isLoop: boolean) {
        this.spine?.setAnimation(0, 'nhay', isLoop);
    }
    nhay2(isLoop: boolean) {
        this.spine?.setAnimation(0, 'nhay2', isLoop);
    }
    nhun_nhay(isLoop: boolean) {
        this.spine?.setAnimation(0, 'nhun_nhay', isLoop);
    }
    nhun_nhay2(isLoop: boolean) {
        this.spine?.setAnimation(0, 'nhun_nhay2', isLoop);
    }
    nhun_nhay3(isLoop: boolean) {
        this.spine?.setAnimation(0, 'nhun_nhay3', isLoop);
    }
    lo_kang(isLoop: boolean) {
        this.spine?.setAnimation(0, 'lo_kang', isLoop);
    }
    so_hai(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Sai/so_hai', isLoop);
    }
    suy_nghi(isLoop: boolean) {
        this.spine?.setAnimation(0, 'suy_nghi', isLoop);
    }
    traloi(isLoop: boolean) {
        this.spine?.setAnimation(0, 'traloi', isLoop);
    }
    Sai_tucgian(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Sai/tucgian', isLoop);
    }
    Dung_votay(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Dung/votay', isLoop);
    }
    Dung_votay2(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Dung/votay2', isLoop);
    }
    Dung_votay3(isLoop: boolean) {
        this.spine?.setAnimation(0, 'Dung/votay3', isLoop);
    }
    walk(isLoop: boolean) {
        this.spine?.setAnimation(0, 'walk', isLoop);
    }
    drawOrder(isLoop: boolean) {
        if (this._hasStop) {
            this.spine?.setToSetupPose();
        }
        this.spine?.setAnimation(0, 'drawOrder', isLoop);
        this._hasStop = false;
    }
    _setMix(anim1: string, anim2: string) {
        this.spine?.setMix(anim1, anim2, this.mixTime);
        this.spine?.setMix(anim2, anim1, this.mixTime);
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
            .delay(1)
            .call(() => {
                target['bezierX'] = null;
                finishcallback && finishcallback();
            })
            .start();

        target['bezierY'] = tween(_targetY)
            .to(duration, { value: to.y }, bOpts)
            .delay(1)
            .call(() => {
                target['bezierY'] = null;
            })
            .start();
    }


}


