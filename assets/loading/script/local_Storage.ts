import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('local_Storage')

export class local_Storage extends Component {
    start() {

    }
    set_localStorage(key: string, value: string) {
        sys.localStorage.setItem(key, value);
    }
    get_localStorage(key: string) {
        sys.localStorage.getItem(key);
    }

    update(deltaTime: number) {

    }
}


