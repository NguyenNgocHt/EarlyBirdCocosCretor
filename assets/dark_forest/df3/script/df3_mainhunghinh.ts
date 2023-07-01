import { _decorator, Component, Node, SceneGlobals, Vec3, Prefab, instantiate } from 'cc';
import { numberContro } from '../../df4/script/numberContro';
import { spineBear } from '../../df4/script/spineBear';
import { PrefabManager } from '../../../loading/script/PrefabManager';
import { ScreenManager } from '../../../loading/script/ScreenManager';
const { ccclass, property } = _decorator;
enum sceneState {
    noState,
    findLocation,
    drawingColor,
    collectPictures,
};
enum bearMovingState {
    nostate,
    tien,
    lui,
    moving,
};
enum bearSpine {
    nostate,
    idle,
    idle2,
    idle3,
    run,
    toleft,
    toright,
    idle_happy,
    idle_sad,
    walk,
    win,
    dung_lai2,
}
enum startingHungHinh {
    nostate,
    start,
    pause,
    stop,
    endGame,
}
enum mouseStateforBear {
    nostate,
    start,
    stop,
}
enum pointState {
    nostate,
    plusPoint,
    minusPoint,
}
@ccclass('df3_mainhunghinh')
export class df3_mainhunghinh extends Component {
    @property({ type: Node })
    private emitfromDf3: Node = null;
    @property({ type: Node })
    private emitfromBear: Node = null;
    @property({ type: Node })
    private emitfromStart: Node = null;
    @property({ type: Node })
    private star: Node = null;
    @property({ type: Node })
    private square: Node = null;
    @property({ type: Node })
    private circle: Node = null;
    @property({ type: Node })
    private triangle: Node = null;
    @property({ type: Node })
    private positionOrigin_bear: Node = null;
    private scenestate: sceneState = sceneState.noState;
    private bearspine: bearSpine = bearSpine.nostate;
    private bearmoving: bearMovingState = bearMovingState.nostate;
    private startState: startingHungHinh = startingHungHinh.nostate;
    private mousestate_bear: mouseStateforBear = mouseStateforBear.nostate;
    private pointstate: pointState = pointState.nostate;
    private position_after: Vec3 = new Vec3(0, 0, 0);
    private position_before: Vec3 = new Vec3(0, 0, 0);
    private GIO: Node = null;
    private nameForAudioplay: string = " ";
    private sumPoint: number = 0;
    private point_star: number = 0;
    private point_square: number = 0;
    private point_circle: number = 0;
    private point_triangle: number = 0;
    private random_number_before: number = 0;
    private random_number_after: number = 0;
    private name_audio_play: string = " ";
    private count_number_for_next_picture: number = 0;
    private point_gamePlay_Listen: number = 0;
    private limit_number: number = 0;
    private i: number = 0;
    start() {
        this.emitfromDf3.on('collectPictures start', this.hunghinhstarting, this);
        this.emitfromDf3.on('spine bear seting', this.setBearSpine, this);
        this.emitfromBear.on('bear moving ok', this.setBearState, this);
        this.emitfromBear.on('bear spine ok', this.setBearStatefromBearSpine, this);
        this.emitfromBear.on('i am moving', this.setmovingBear, this);
        this.emitfromBear.on('GIO node', this.getGIO, this);
        this.emitfromDf3.on('starting hung hinh', this.starting_hunghinh, this);
        this.emitfromStart.on('start state end', this.setstartingGame, this);
        this.emitfromDf3.on('number for audioPlay', this.setnameForAudioPlay, this);
        this.star.on('sum point game star', this.showPointGame_star, this);
        this.circle.on('sum point game circle', this.showPointGame_circle, this);
        this.square.on('sum point game square', this.showPointGame_square, this);
        this.triangle.on('sum point game triangle', this.showPointGame_triangle, this);
    }
    setBearSpine() {
        this.bearmoving = bearMovingState.moving;
        this.bearspine = bearSpine.walk;
        this.emit_to_bear_moving();
        this.emit_to_bear_spine();
    }
    showPointGame_star(point: number, state: number) {
        if (state == pointState.plusPoint) {
            this.pointstate = pointState.plusPoint;
            this.emitDF3();
        }
        if (state == pointState.minusPoint) {
            this.pointstate = pointState.minusPoint;
            this.emitDF3();
        }
        this.point_star = point;
        this.emitto_showPoint();
    }
    showPointGame_circle(point: number, state: number) {
        if (state == pointState.plusPoint) {
            this.pointstate = pointState.plusPoint;
            this.emitDF3();
        }
        if (state == pointState.minusPoint) {
            this.pointstate = pointState.minusPoint;
            this.emitDF3();
        }
        this.point_circle = point;
        this.emitto_showPoint();
    }
    showPointGame_square(point: number, state: number) {
        if (state == pointState.plusPoint) {
            this.pointstate = pointState.plusPoint;
            this.emitDF3();
        }
        if (state == pointState.minusPoint) {
            this.pointstate = pointState.minusPoint;
            this.emitDF3();
        }
        this.point_square = point;
        this.emitto_showPoint();
    }
    showPointGame_triangle(point: number, state: number) {
        if (state == pointState.plusPoint) {
            this.pointstate = pointState.plusPoint;
            this.emitDF3();
        }
        if (state == pointState.minusPoint) {
            this.pointstate = pointState.minusPoint;
            this.emitDF3();
        }
        this.point_triangle = point;
        this.emitto_showPoint();
    }
    emitto_showPoint() {
        this.sumPoint = this.point_star + this.point_circle + this.point_square + this.point_triangle;
        if (this.sumPoint == 50 + this.i && this.limit_number == this.i) {
            this.random_next_picture();
            this.load_effect_fireworks();
            this.point_gamePlay_Listen = this.point_gamePlay_Listen + 1;
            this.i = this.i + 50;
        }
        if (this.sumPoint == 100) {
            this.startState = startingHungHinh.endGame;
            this.load_effect_fireworks();
            this.point_gamePlay_Listen = this.point_gamePlay_Listen + 1;
            this.node.emit('win_end game', this.startState, this.point_gamePlay_Listen);
        }
        this.node.emit('show point', this.sumPoint);
    }
    load_effect_fireworks() {
        PrefabManager.instance().loadPrefab('dark_forest', 'effect_fireworks/prefab/fireworks', true, this.show_screen.bind(this));
    }
    show_screen(error: number, prefab: Prefab) {
        if (error == 0) {
            let node = instantiate(prefab);
            console.log('showScreen', node);
            ScreenManager.instance().showScreen(node);
            console.log('showScreen');
        } else {
            console.log('showScreen  error', error);
        }
    }
    random_next_picture() {
        var audioContro_array_hunghinh = [];
        audioContro_array_hunghinh = [" ", "star", "circle", "square", "triangle"];
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        while (randomNumber == this.random_number_before) {
            randomNumber = Math.floor(Math.random() * 4) + 1;
        }
        this.random_number_after = randomNumber;
        this.name_audio_play = audioContro_array_hunghinh[this.random_number_after];
        this.node.emit('name_audio_play', this.name_audio_play);
        this.node.emit('name for audio play question_2', this.name_audio_play);
    }
    getGIO(node: Node) {
        this.GIO = node;
        this.node.emit('gio', this.GIO);
    }
    setnameForAudioPlay(numberAudio: number) {
        this.random_number_before = numberAudio;
        var audioContro_array_hunghinh = [];
        audioContro_array_hunghinh = [" ", "star", "circle", "square", "triangle"];
        this.nameForAudioplay = audioContro_array_hunghinh[numberAudio];
        this.node.emit('name for audio play question', this.nameForAudioplay);
    }
    starting_hunghinh(state: number) {
        if (state == startingHungHinh.start) {
            this.startState = startingHungHinh.start;
            this.starting();
        }
    }
    starting() {
        if (this.startState == startingHungHinh.start) {
            this.emitfromStart.active = true;
            this.node.emit('starting', this.startState);
        }
    }
    setBearState(state: number) {
        if (state == bearMovingState.tien) {
            this.bearspine = bearSpine.dung_lai2;
            this.emit_to_bear_spine();
        }
        if (state == bearMovingState.moving) {
            this.bearspine = bearSpine.idle_happy;
            this.emit_to_bear_spine();
        }
    }
    setBearStatefromBearSpine(state: number) {
        if (state == bearSpine.dung_lai2) {
            this.bearspine = bearSpine.idle3;
            this.emit_to_bear_spine();
            this.emit_to_main_DF3();
        }
        if (state == bearSpine.idle_happy) {
            this.node.emit('goi chuyen man');
            this.scheduleOnce(function () {
                this.node.emit('bear moving to start position');
            }, 1);
        }
    }
    hunghinhstarting(state: number) {
        if (state == sceneState.collectPictures) {
            this.emitfromStart.active = false;
            this.star.active = false;
            this.square.active = false;
            this.triangle.active = false;
            this.circle.active = false;
            this.emitfromBear.active = true;
            this.bearmoving = bearMovingState.tien;
            this.bearspine = bearSpine.walk;
            this.emit_to_bear_moving();
            this.emit_to_bear_spine();
        }
    }
    setstartingGame() {
        this.star.active = true;
        this.square.active = true;
        this.triangle.active = true;
        this.circle.active = true;
        this.mousestate_bear = mouseStateforBear.start;
        this.node.emit('nha trang thai cua bear', this.mousestate_bear);
        this.bearspine = bearSpine.toleft;
        this.emit_to_bear_spine();
    }
    emit_to_bear_moving() {
        if (this.bearmoving == bearMovingState.tien) {
            this.node.emit('bear moving', this.bearmoving);
        }
        if (this.bearmoving == bearMovingState.moving) {
            let p_bear = this.emitfromBear.getPosition();
            let p_origin = this.positionOrigin_bear.getPosition();
            this.node.emit('bear moving', this.bearmoving, p_bear, p_origin);
        }
    }
    emit_to_bear_spine() {
        if (this.bearspine == bearSpine.walk) {
            let p_bear = this.emitfromBear.getPosition();
            let p_origin = this.positionOrigin_bear.getPosition();
            if (p_bear.x > p_origin.x) {
                this.emitfromBear.setScale(0.7, 0.7, 0.7);
            }
            if (p_bear.x < p_origin.x) {
                this.emitfromBear.setScale(-0.7, 0.7, 0.7);
            }
            this.node.emit('bear spine swap', this.bearspine);
        }
        if (this.bearspine == bearSpine.dung_lai2) {
            this.node.emit('bear spine swap', this.bearspine);
        }
        if (this.bearspine == bearSpine.idle3) {
            this.node.emit('bear spine swap', this.bearspine);
        }
        if (this.bearspine == bearSpine.toleft) {
            this.node.emit('bear spine swap', this.bearspine);
        }
        if (this.bearspine == bearSpine.toright) {
            this.node.emit('bear spine swap', this.bearspine);
        }
        if (this.bearspine == bearSpine.idle_happy) {
            this.node.emit('bear spine swap', this.bearspine);
        }
    }
    emit_to_main_DF3() {
        if (this.bearspine == bearSpine.idle3) {
            this.node.emit('bear spine ok', this.bearspine);
            this.bearspine = bearSpine.nostate;
        }
    }
    emitDF3() {
        if (this.pointstate == pointState.plusPoint) {
            this.node.emit('correc');
        }
        if (this.pointstate == pointState.minusPoint) {
            this.node.emit('wrong');
        }
    }
    setmovingBear(nodeforBear: Node) {
        this.node.emit('position for bear', nodeforBear);
    }
    update(deltaTime: number) {

    }
}


