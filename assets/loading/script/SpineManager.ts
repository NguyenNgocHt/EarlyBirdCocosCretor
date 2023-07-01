import { AssetManager, log, sp } from "cc";
import { BundleManager } from "../../boot/BundleManager";
export class SpineManager {
    
    private static ins: SpineManager = null;
    static instance():SpineManager{
        if(!SpineManager.ins){
            SpineManager.ins = new SpineManager();
        }
        return SpineManager.ins;
    }    

    
    private constructor(){
        this.spineMap = new Map<string, sp.SkeletonData>();
    }
    private spineMap: Map<string, sp.SkeletonData> = null;

    public loadSpine(bundleName:string, spinePath: string, cached?:boolean, callback?:Function) {
        let spineKey = bundleName + '/' + spinePath;
        log('loadSpine ...', spineKey);
        let spine = this.spineMap.get(spineKey);
        if (spine) {
            log('loadSpine exist', spineKey);
            if(callback) callback(0, spineKey, spine);
            return;
        }
        BundleManager.instance().loadBundle(bundleName, (err:number, bundle:AssetManager.Bundle) => {
            if(err != 0){
                log('loadSpine error 1', spineKey, 1);
                if(callback) callback(1, spineKey);
                return;
            }
            bundle.load(spinePath, sp.SkeletonData, (err:Error, spine:sp.SkeletonData) => {
                if (err) {
                    log('loadSpine error 2', spineKey, err);
                    if(callback) callback(2, spineKey);
                    return;
                }
                log('load spine ok', spineKey);
                if(cached){
                    SpineManager.ins.spineMap.set(spineKey, spine);
                }
                if(callback) callback(0, spineKey, spine);
            });
        });
    }
}