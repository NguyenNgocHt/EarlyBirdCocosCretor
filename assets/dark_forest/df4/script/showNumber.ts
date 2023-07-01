import { _decorator, Component, Node, Label } from 'cc';
import { df4Manager } from './df4Manager';
const { ccclass, property } = _decorator;

@ccclass('showNumber')
export class showNumber extends Component {
    @property({type: Node})
    private emitfromdf4: Node = null
    private shownumber: number = 0;
    @property({type: Label})
    private showNUMBER: Label = null;
    start() {
        this.emitfromdf4.on('reading number', this.setShowNumber, this);
    }
    setShowNumber(showNumber: number)
    {
        if(showNumber != 0)
        {
            this.shownumber = showNumber;
            this.showNUMBER.string = `${this.shownumber}`;
        }
        if(showNumber == 0)
        {
            this.showNUMBER.string = ' ';
        }
    }

    update(deltaTime: number) {
        
    }
}


