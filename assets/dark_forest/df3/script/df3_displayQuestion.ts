import { _decorator, Component, Node, Label, log } from 'cc';
import { df3_manager } from './df3_manager';
const { ccclass, property } = _decorator;
enum DISPLAYSTATE {
    NOSTATE,
    CHOOSETHERIGHTANSWER,
    OPPS_WHEREISOURFRIEND,
    PLEASEDRAWTHECORRECTCOLOR,
    STAR,
    CIRCLE,
    SQUARE,
    TRIANGLE,
};
@ccclass('df3_displayQuestion')
export class df3_displayQuestion extends Component {
    @property({ type: Node })
    private emitfromDF3: Node = null;
    @property({ type: Label })
    private label_boxchat: Label = null;
    private displaystate: DISPLAYSTATE = DISPLAYSTATE.NOSTATE;
    start() {
        this.emitfromDF3.on('display to boxchat', this.displaytoboxchatSeting, this);
    }
    displaytoboxchatSeting(state: number) {
        if (state == DISPLAYSTATE.CHOOSETHERIGHTANSWER) {
            this.displaystate = DISPLAYSTATE.CHOOSETHERIGHTANSWER;
            this.displaystart();
        }
        if (state == DISPLAYSTATE.OPPS_WHEREISOURFRIEND) {
            this.displaystate = DISPLAYSTATE.OPPS_WHEREISOURFRIEND;
            this.displaystart();
        }
        if (state == DISPLAYSTATE.PLEASEDRAWTHECORRECTCOLOR) {
            this.displaystate = DISPLAYSTATE.PLEASEDRAWTHECORRECTCOLOR;
            this.displaystart();
        }
        if (state == DISPLAYSTATE.STAR) {
            this.displaystate = DISPLAYSTATE.STAR;
            this.displaystart();
        }
        if (state == DISPLAYSTATE.CIRCLE) {
            this.displaystate = DISPLAYSTATE.CIRCLE;
            this.displaystart();
        }
        if (state == DISPLAYSTATE.SQUARE) {
            this.displaystate = DISPLAYSTATE.SQUARE;
            this.displaystart();
        }
        if (state == DISPLAYSTATE.TRIANGLE) {
            this.displaystate = DISPLAYSTATE.TRIANGLE;
            this.displaystart();
        }
    }
    displaystart() {
        var displayArray = [];
        displayArray = [" ", "Choose the right answer!", "Opps! Where is our friend?", "Please draw the correct color",
            "let's collect some star shapes", "Let's collect some circles", "Let's collect some squares",
            "let's collect some triangles"];

        if (this.displaystate == DISPLAYSTATE.CHOOSETHERIGHTANSWER) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
        if (this.displaystate == DISPLAYSTATE.OPPS_WHEREISOURFRIEND) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
        if (this.displaystate == DISPLAYSTATE.PLEASEDRAWTHECORRECTCOLOR) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
        if (this.displaystate == DISPLAYSTATE.CIRCLE) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
        if (this.displaystate == DISPLAYSTATE.STAR) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
        if (this.displaystate == DISPLAYSTATE.SQUARE) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
        if (this.displaystate == DISPLAYSTATE.TRIANGLE) {
            this.label_boxchat.string = displayArray[this.displaystate];
        }
    }
    update(deltaTime: number) {

    }
}


