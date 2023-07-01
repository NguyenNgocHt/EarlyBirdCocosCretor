import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df4_setSkill_end_darkforest')
export class df4_setSkill_end_darkforest extends Component {
    POINT_GAME_PLAY: number[];
    NAME_SKILL_GAME_PLAY: string[];
    @property(Node)
    private emit_from_df4: Node = null;
    @property(Node)
    private vocab: Node = null;
    @property(Node)
    private listen: Node = null;
    @property(Node)
    private write: Node = null;
    @property(Node)
    private read: Node = null;
    @property(Node)
    private Prom: Node = null;
    private limit_number: number = 0;
    start() {
        this.emit_from_df4.on('point game and name skill', this.get_point_game_and_name_skill, this);
    }
    get_point_game_and_name_skill(point_game: number[], name_skill: string[]) {
        if (this.limit_number == 0) {
            if (!this.POINT_GAME_PLAY) {
                this.POINT_GAME_PLAY = [];
            }
            if (!this.NAME_SKILL_GAME_PLAY) {
                this.NAME_SKILL_GAME_PLAY = [];
            }
            this.POINT_GAME_PLAY = point_game;
            this.NAME_SKILL_GAME_PLAY = name_skill;
            this.node.emit('point and name skill', this.POINT_GAME_PLAY, this.NAME_SKILL_GAME_PLAY);
            this.limit_number = 1;
        }

    }
    update(deltaTime: number) {

    }
}


