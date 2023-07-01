import { _decorator, AssetManager, assetManager, log, resources} from 'cc';
const { ccclass, property } = _decorator;

export class BundleManager{
    private static ins: BundleManager = null;
    static instance():BundleManager{
        if(!BundleManager.ins){
            BundleManager.ins = new BundleManager();
        }
        return BundleManager.ins;
    }    

    private constructor(){
        this.bundleMap = new Map<string, AssetManager.Bundle>();
        this.bundleMap.set('resources', resources);
        log('BundleManager init');
    }

    private bundleMap: Map<string, AssetManager.Bundle> = null;

    loadBundle(bundleName: string, callback?: Function) {
        log('loadBundle', bundleName);
        let bundle = this.bundleMap.get(bundleName);
        if(bundle){
            log('loadBundle exist', bundleName);
            if(callback) callback(0, bundle);
            return;
        }
        assetManager.loadBundle(bundleName, (err, bundle) => {
            if (err) {
                log('loadBundle error', bundleName, err);
                if(callback) callback(1, bundle);
                return;
            }
            BundleManager.ins.bundleMap.set(bundleName, bundle);
            log('loadBundle ok', bundleName);
            if(callback) callback(0, bundle);            
        });
    }
}