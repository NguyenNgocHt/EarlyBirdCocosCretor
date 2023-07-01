import { _decorator, Component, Node, sp, log, color, tween } from 'cc';
import { spinebird_df1 } from '../../df1/script/spinebird_df1';
import { spineBird } from '../../df4/script/spineBird';
import { df3_manager } from './df3_manager';
import { Bird_spine } from '../../df1/script/Bird_spine';
const { ccclass, property } = _decorator;
enum SPINESTATE {
   NOSTATE,
   SETUP,
   BUON,
   DI_BO,
   GAT_DAU,
   IDLE,
   IDLE_GAIMONG,
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
   IDLE2,
};
enum sceneState {
   noState,
   findLocation,
   drawingColor,
   collectPictures,
}
@ccclass('df3_spineBird')
export class df3_spineBird extends Component {
   BIRD_SPINE_LIST = ["Sai/buon", "cau", "Sai/chan_nan", "di_bo", "di_bo_ronren", "Dung/gat_dau", "idle", "idle2", "idle_gaimong",
      "Sai/khoc", "Dung/like", "Dung/like2", "nhay", "nhay2", "nhun_nhay", "nhun_nhay2", "nhun_nhay3", "Sai/so_hai", "suy_nghi",
      "traloi", "Sai/tucgian", "Dung/votay", "Dung/votay2", "Dung/votay3", "walk"];
   @property({ type: Node })
   private emitfromDF3: Node = null;
   @property(Bird_spine)
   private spine: Bird_spine = null;
   private BirdSpine: SPINESTATE = SPINESTATE.NOSTATE;
   private stateOK: SPINESTATE = SPINESTATE.NOSTATE;
   private scenestate = sceneState.noState;
   private countSpineStateidle: number = 0;
   private countSpineSuy_nghi: number = 0;
   private countDi_Bo: number = 0;
   private countBuon: number = 0;
   private countLike: number = 0;
   private timeDelay: number = 0;
   start() {
      for (let i = 0; i < this.BIRD_SPINE_LIST.length; i++) {
         for (let j = i + 1; j < this.BIRD_SPINE_LIST.length; j++) {
            this.spine._setMix(this.BIRD_SPINE_LIST[i], this.BIRD_SPINE_LIST[j]);
         }
      }
      this.BirdSpine = SPINESTATE.DI_BO;
      this.scenestate = sceneState.findLocation;
      this.spineStart();
      this.emitfromDF3.on('bird chuyen spine', this.spineSeting, this);
   }
   spineSeting(spineState: number, scene_state: number) {
      //set spine bird in scene find Location
      if (scene_state == sceneState.findLocation) {
         this.scenestate = sceneState.findLocation;
         if (spineState == SPINESTATE.DI_BO) {
            this.BirdSpine = SPINESTATE.DI_BO;
            this.spineStart();
         }
         if (spineState == SPINESTATE.IDLE) {
            this.BirdSpine = SPINESTATE.IDLE;
            this.spineStart();
         }
         if (spineState == SPINESTATE.SUY_NGHI) {
            this.BirdSpine = SPINESTATE.SUY_NGHI;
            this.spineStart();
         }
         if (spineState == SPINESTATE.TRALOI) {
            this.BirdSpine = SPINESTATE.TRALOI;
            this.spineStart();
         }
         if (spineState == SPINESTATE.IDLE_GAIMONG) {
            this.BirdSpine = SPINESTATE.IDLE_GAIMONG;
            this.spineStart();
         }
         if (spineState == SPINESTATE.LIKE) {
            this.scheduleOnce(function () {
               this.BirdSpine = SPINESTATE.LIKE;
               this.spineStart();
            }, 0.5);
         }
         if (spineState == SPINESTATE.BUON) {
            this.scheduleOnce(function () {
               this.BirdSpine = SPINESTATE.BUON;
               this.spineStart();
            }, 0.5);
         }
         if (spineState == SPINESTATE.NHUN_NHAY) {
            this.BirdSpine = SPINESTATE.NHUN_NHAY;
            this.spineStart();
         }
      }
      //set spine bird in scene drawing color
      if (scene_state == sceneState.drawingColor) {
         this.scenestate = sceneState.drawingColor;
         if (spineState == SPINESTATE.DI_BO) {
            this.BirdSpine = SPINESTATE.DI_BO;
            this.spineStart();
         }
         if (spineState == SPINESTATE.IDLE) {
            this.BirdSpine = SPINESTATE.IDLE;
            this.spineStart();
         }
         if (spineState == SPINESTATE.SUY_NGHI) {
            this.BirdSpine = SPINESTATE.SUY_NGHI;
            this.spineStart();
         }
         if (spineState == SPINESTATE.IDLE2) {
            this.BirdSpine = SPINESTATE.IDLE2;
            this.spineStart();
         }
         if (spineState == SPINESTATE.LIKE) {
            this.scheduleOnce(function () {
               this.BirdSpine = SPINESTATE.LIKE;
               this.spineStart();
            }, 0.5);
         }
         if (spineState == SPINESTATE.BUON) {
            this.scheduleOnce(function () {
               this.BirdSpine = SPINESTATE.BUON;
               this.spineStart();
            }, 0.5);
         }
         if (spineState == SPINESTATE.NHUN_NHAY) {
            this.BirdSpine = SPINESTATE.NHUN_NHAY;
            this.spineStart();
         }
      }
      if (scene_state == sceneState.collectPictures) {
         this.scenestate = sceneState.collectPictures;
         if (spineState == SPINESTATE.IDLE) {
            this.BirdSpine = SPINESTATE.IDLE;
            this.spineStart();
         }
      }
   }
   spineStart() {
      if (this.scenestate == sceneState.findLocation) {
         if (this.BirdSpine == SPINESTATE.DI_BO) {
            this.node.setScale(-1, 1, 0);
            this.spine.Bird_di_bo(true);
         }
         if (this.BirdSpine == SPINESTATE.IDLE) {
            this.spine.Bird_idle(true);
            this.scheduleOnce(function () {
               this.node.emit('spine_ok', this.BirdSpine, this.countSpineStateidle);
            }, 1);
         }
         if (this.BirdSpine == SPINESTATE.SUY_NGHI) {
            this.spine.Bird_suy_nghi(true);
         }
         if (this.BirdSpine == SPINESTATE.TRALOI) {
            this.spine.Bird_traloi(false);
            this.scheduleOnce(function () {
               this.stateOK = SPINESTATE.TRALOI;
               this.node.emit('spine_ok', this.stateOK);
            }, 2);
         }
         if (this.BirdSpine == SPINESTATE.IDLE_GAIMONG) {
            this.spine.Bird_idle_gaimong(true);
         }
         if (this.BirdSpine == SPINESTATE.LIKE) {
            this.spine.Bird_Dung_like(true);
            tween(this.node)
               .delay(4)
               .call(() => {
                  this.spine.Bird_idle_gaimong(true);
               })
               .start();
         }
         if (this.BirdSpine == SPINESTATE.BUON) {
            this.spine.Bird_Sai_buon(true);
            tween(this.node)
               .delay(3.5)
               .call(() => {
                  this.spine.Bird_idle_gaimong(true);
               })
               .start();
         }
         if (this.BirdSpine == SPINESTATE.NHUN_NHAY) {
            this.spine.Bird_nhun_nhay2(true);
            this.scheduleOnce(function () {
               this.node.emit('spine chuyen canh');
            }, 2);
            this.scheduleOnce(function () {
               this.stateOK = SPINESTATE.NHUN_NHAY;
               this.node.emit('spine_ok', this.stateOK);
            }, 3.5);
         }
      }
      if (this.scenestate == sceneState.drawingColor) {
         if (this.BirdSpine == SPINESTATE.DI_BO) {
            if (this.countDi_Bo == 0) {
               this.countDi_Bo = this.countDi_Bo + 1;
               this.spine.Bird_di_bo(true);
            }
            if (this.countDi_Bo == 1) {
               this.node.setScale(-1, 1, 0);
               this.spine.Bird_di_bo(true);
               this.countDi_Bo = 0;
            }
         }
         if (this.BirdSpine == SPINESTATE.IDLE) {
            this.countSpineStateidle = this.countSpineStateidle + 1;
            if (this.countSpineStateidle == 1) {
               this.spine.Bird_idle(true);
               this.scheduleOnce(function () {
                  this.node.emit('spine_ok', this.BirdSpine, this.countSpineStateidle);
               }, 1);
            }
            if (this.countSpineStateidle != 1) {
               this.spine.Bird_idle(true);
            }
         }
         if (this.BirdSpine == SPINESTATE.SUY_NGHI) {
            this.spine.Bird_suy_nghi(true);
         }
         if (this.BirdSpine == SPINESTATE.IDLE2) {
            this.node.setScale(1, 1, 0);
            this.spine.Bird_idle2(true);
         }
         if (this.BirdSpine == SPINESTATE.LIKE) {
            this.spine.Bird_Dung_like(true);
            this.scheduleOnce(function () {
               this.node.emit('spine_ok', this.BirdSpine);
            }, 2);

         }
         if (this.BirdSpine == SPINESTATE.BUON) {
            this.spine.Bird_Sai_buon(true);
            this.scheduleOnce(function () {
               this.node.emit('spine_ok', this.BirdSpine);
            }, 2);
         }
         if (this.BirdSpine == SPINESTATE.NHUN_NHAY) {
            this.spine.Bird_nhun_nhay2(true);
            this.scheduleOnce(function () {
               this.node.emit('spine chuyen canh');
            }, 2);
            this.scheduleOnce(function () {
               this.stateOK = SPINESTATE.NHUN_NHAY;
               this.node.emit('spine_ok', this.stateOK);
            }, 3.5);
         }
      }
      if (this.scenestate == sceneState.collectPictures) {
      }
   }
   onLoad() {
   }
   update(deltaTime: number) {

   }
}


