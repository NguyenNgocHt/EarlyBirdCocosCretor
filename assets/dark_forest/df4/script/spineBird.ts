import { _decorator, Component, Node, sp, animation, log, Event, tween } from 'cc';
import { df4Manager } from './df4Manager';
import { Bird_spine } from '../../df1/script/Bird_spine';
const { ccclass, property } = _decorator;
enum STATESPINE {
   NOSTATE,
   SETUP,
   BUON,
   DI_BO,
   GAT_DAU,
   IDIE,
   IDIE_GAIMONG,
   LIKE,
   LIKE2,
   LO_KANG,
   SO_HAI,
   SUY_NGHI,
   VOTAY,
   VOTAY2,
   VOTAY3,
   TRALOI,
   NHUN_NHAY,
};
enum STATEMOVE {
   NOMOVE,
   TIEN,
   LUI,
};
@ccclass('spineBird')
export class spineBird extends Component {
   BIRD_SPINE_LIST = ["Sai/buon", "cau", "Sai/chan_nan", "di_bo", "di_bo_ronren", "Dung/gat_dau", "idle", "idle2", "idle_gaimong",
      "Sai/khoc", "Dung/like", "Dung/like2", "nhay", "nhay2", "nhun_nhay", "nhun_nhay2", "nhun_nhay3", "Sai/so_hai", "suy_nghi",
      "traloi", "Sai/tucgian", "Dung/votay", "Dung/votay2", "Dung/votay3", "walk"];
   @property(Bird_spine)
   private spine: Bird_spine = null;
   @property({ type: df4Manager })
   private emitfromDf4: df4Manager = null;
   private stateSpine: STATESPINE = STATESPINE.NOSTATE;
   private stateSpineOk: STATESPINE = STATESPINE.NOSTATE;
   private stateBirdMove: STATEMOVE = STATEMOVE.NOMOVE;
   private count: number = 0;
   private timedelay: number = 0;
   start() {
      for (let i = 0; i < this.BIRD_SPINE_LIST.length; i++) {
         for (let j = i + 1; j < this.BIRD_SPINE_LIST.length; j++) {
            this.spine._setMix(this.BIRD_SPINE_LIST[i], this.BIRD_SPINE_LIST[j]);
         }
      }
      this.emitfromDf4.node.on('bird_chuyen_spine', this.setSpine, this);
      this.emitfromDf4.node.on('bird_tien', this.setstateBirdStart, this);
   }
   setstateBirdStart(state: number) {
      if (state == STATEMOVE.TIEN) {
         this.stateSpine = STATESPINE.DI_BO;
         this.startSpine();
      }
   }
   setSpine(state: number) {
      if (state == STATESPINE.IDIE) {
         this.stateSpine = STATESPINE.IDIE;
         this.startSpine();
      }
      if (state == STATESPINE.SUY_NGHI) {
         this.stateSpine = STATESPINE.SUY_NGHI;
         this.startSpine();
      }
      if (state == STATESPINE.TRALOI) {
         this.stateSpine = STATESPINE.TRALOI;
         this.startSpine();
      }
      if (state == STATESPINE.NHUN_NHAY) {
         this.stateSpine = STATESPINE.NHUN_NHAY;
         this.startSpine();
      }
      if (state == STATESPINE.LIKE) {
         this.stateSpine = STATESPINE.LIKE;
         this.startSpine();
      }
      if (state == STATESPINE.BUON) {
         this.stateSpine = STATESPINE.BUON;
         this.startSpine();
      }
      if (state == STATESPINE.NHUN_NHAY) {
         this.stateSpine = STATESPINE.NHUN_NHAY;
         this.startSpine();
      }
   }
   startSpine() {
      if (this.stateSpine == STATESPINE.DI_BO) {
         this.spine.Bird_di_bo(true);
      }
      if (this.stateSpine == STATESPINE.IDIE) {
         this.spine.Bird_idle(true);
      }
      if (this.stateSpine == STATESPINE.SUY_NGHI) {
         this.spine.Bird_suy_nghi(true)
         tween(this.node)
            .delay(15)
            .call(() => {
               this.timedelay = 15;
               this.node.emit('emit reminder', this.stateSpine, this.timedelay);
               this.timedelay = 0;
            })
            .delay(5)
            .call(() => {
               this.timedelay = 20;
               this.node.emit('emit reminder', this.stateSpine, this.timedelay);
               this.timedelay = 0;
            })
            .start();
      }
      if (this.stateSpine == STATESPINE.NHUN_NHAY) {
         this.spine.Bird_nhun_nhay(true);
      }
      if (this.stateSpine == STATESPINE.TRALOI) {
         this.spine.Bird_traloi(false);
         this.spine.spine?.setCompleteListener(() => {
            this.stateSpineOk = STATESPINE.TRALOI;
            this.node.emit('state ok', this.stateSpine);
         });
      }
      if (this.stateSpine == STATESPINE.LIKE) {
         this.spine.Bird_Dung_like(true);
         this.scheduleOnce(function () {
            this.spine.Bird_idle(true);
         }, 3.5);
      }
      if (this.stateSpine == STATESPINE.BUON) {
         this.spine.Bird_Sai_buon(true);
         this.scheduleOnce(function () {
            this.spine.Bird_idle(true);
         }, 3.5);
      }
      if (this.stateSpine == STATESPINE.NHUN_NHAY) {
         this.spine.Bird_Dung_votay2(true);
         tween(this.node)
            .delay(3)
            .call(() => {
               this.node.emit('call scene change');
            })
            .start();
      }

   }
   onLoad() {
   }
   update(deltaTime: number) {

   }
}


