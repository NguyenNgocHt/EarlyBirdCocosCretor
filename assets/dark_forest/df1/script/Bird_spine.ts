import { _decorator, Component, Node, sp } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird_spine')
export class Bird_spine extends Component {
    public spine: sp.Skeleton = null;
    onLoad() {
        this.spine = this.getComponent('sp.Skeleton') as sp.Skeleton;
    }
    start() {
    }
    Bird_Sai_buon(state: boolean) {
        this.spine?.setAnimation(0, 'Sai/buon', state);
    }
    Bird_cau(state: boolean) {
        this.spine?.setAnimation(0, 'cau', state);
    }
    Bird_sai_channan(state: boolean) {
        this.spine?.setAnimation(0, 'Sai/chan_nan', state);
    }
    Bird_di_bo(state: boolean) {
        this.spine?.setAnimation(0, 'di_bo', state);
    }
    Bird_di_bo2(state: boolean) {
        this.spine?.setAnimation(0, 'di_bo/ronren', state);
    }
    Bird_Dung_gat_dau(state: boolean) {
        this.spine?.setAnimation(0, 'Dung/gat_dau', state);
    }
    Bird_idle(state: boolean) {
        this.spine?.setAnimation(0, 'idle', state);
    }
    Bird_idle2(state: boolean) {
        this.spine?.setAnimation(0, 'idle2', state);
    }
    Bird_idle_gaimong(state: boolean) {
        this.spine?.setAnimation(0, 'idle_gaimong', state);
    }
    Bird_sai_khoc(state: boolean) {
        this.spine?.setAnimation(0, 'Sai/khoc', state);
    }
    Bird_Dung_like(state: boolean) {
        this.spine?.setAnimation(0, 'Dung/like', state);
    }
    Bird_Dung_like2(state: boolean) {
        this.spine?.setAnimation(0, 'Dung/like2', state);
    }
    Bird_nhun_nhay(state: boolean) {
        this.spine?.setAnimation(0, 'nhun_nhay', state);
    }
    Bird_nhun_nhay2(state: boolean) {
        this.spine?.setAnimation(0, 'nhun_nhay2', state);
    }
    Bird_Sai_so_hai(state: boolean) {
        this.spine?.setAnimation(0, 'Sai/so_hai', state);
    }
    Bird_suy_nghi(state: boolean) {
        this.spine?.setAnimation(0, 'suy_nghi', state);
    }
    Bird_traloi(state: boolean) {
        this.spine?.setAnimation(0, 'traloi', state);
    }
    Bird_Sai_tuc_gian(state: boolean) {
        this.spine?.setAnimation(0, 'Sai/tucgian', state);
    }
    Bird_Dung_votay(state: boolean) {
        this.spine?.setAnimation(0, 'Dung/votay', state);
    }
    Bird_Dung_votay2(state: boolean) {
        this.spine?.setAnimation(0, 'Dung/votay2', state);
    }
    Bird_Dung_votay3(state: boolean) {
        this.spine?.setAnimation(0, 'Dung/votay3', state);
    }
    Bird_walk(state: boolean) {
        this.spine?.setAnimation(0, 'walk', state);
    }
    _setMix(anim1: string, anim2: string) {
        this.spine?.setMix(anim1, anim2, 0.2);
        this.spine?.setMix(anim2, anim1, 0.2);
    }
    update(deltaTime: number) {

    }
}


