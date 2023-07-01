import { _decorator, Component, Node, ProgressBar, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df4_updata_progressbar')
export class df4_updata_progressbar extends Component {
    POINT_GAME_PLAY: number[];
    NAME_SKILL_GAME_PLAY: string[];
    POINT_GAME_PLAY_EX = [5, 3, 3, 4]
    @property(Node)
    private emit_from_end_darkforest: Node = null;
    @property(ProgressBar)
    private thanhvang: ProgressBar = null;
    private point_game: number = 0;
    private name_skill_character: string = " ";
    private limit_number: number = 0;
    private point_game_ex: number = 0;
    start() {
        this.emit_from_end_darkforest.on('point and name skill', this.get_point_and_name_skill, this)
    }
    get_point_and_name_skill(point_game: number[], name_skill: string[]) {
        if (this.limit_number == 0) {
            if (!this.POINT_GAME_PLAY) {
                this.POINT_GAME_PLAY = [];
            }
            if (!this.NAME_SKILL_GAME_PLAY) {
                this.NAME_SKILL_GAME_PLAY = [];
            }
            this.POINT_GAME_PLAY = point_game;
            this.NAME_SKILL_GAME_PLAY = name_skill;
            if (this.node.name == 'vocab') {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'VOCAB') {
                        this.point_game = this.POINT_GAME_PLAY[i];
                        this.point_game_ex = this.POINT_GAME_PLAY_EX[i];
                    }
                }
                console.log('point_game', +this.point_game);
                console.log('point_game_ex', +this.point_game_ex)
                this.set_progressBar_skill();
            }
            if (this.node.name == 'listen') {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'LISTEN') {
                        this.point_game = this.POINT_GAME_PLAY[i];
                        this.point_game_ex = this.POINT_GAME_PLAY_EX[i];
                    }
                }
                console.log('point_game', +this.point_game);
                console.log('point_game_ex', +this.point_game_ex)
                this.set_progressBar_skill();
            }
            if (this.node.name == 'write') {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'WRITE') {
                        this.point_game = this.POINT_GAME_PLAY[i];
                        this.point_game_ex = this.POINT_GAME_PLAY_EX[i];
                    }
                }
                console.log('point_game', +this.point_game);
                console.log('point_game_ex', +this.point_game_ex)
                this.set_progressBar_skill();
            }
            if (this.node.name == 'read') {
                for (let i = 0; i < this.NAME_SKILL_GAME_PLAY.length; i++) {
                    if (this.NAME_SKILL_GAME_PLAY[i] == 'READ') {
                        this.point_game = this.POINT_GAME_PLAY[i];
                        this.point_game_ex = this.POINT_GAME_PLAY_EX[i];
                    }
                }
                console.log('point_game', +this.point_game);
                console.log('point_game_ex', +this.point_game_ex)
                this.set_progressBar_skill();
            }
            this.limit_number = 1;
        }

    }
    set_progressBar_skill() {
        tween(this.thanhvang)
            .to(2, { progress: this.point_game / this.point_game_ex })
            .start();
    }
    update(deltaTime: number) {

    }
}


