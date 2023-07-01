import { Prefab, AssetManager, log } from "cc";
import { BundleManager } from "../../boot/BundleManager";
export class PrefabManager {
    private static ins: PrefabManager = null;
    static instance(): PrefabManager {
        if (!PrefabManager.ins) {
            PrefabManager.ins = new PrefabManager();
        }
        return PrefabManager.ins;
    }


    private constructor() {
        this.prefabMap = new Map<string, Prefab>();
        log('PrefabManager init');
    }

    private prefabMap: Map<string, Prefab> = null;

    loadPrefab(bundleName: string, prefabPath: string, cached?: boolean, calback?: Function) {
        const prefabKey = bundleName + '/' + prefabPath;
        let prefab = this.prefabMap.get(prefabKey);
        if (prefab) {
            if (calback) calback(0, prefab);
            return;
        }
        BundleManager.instance().loadBundle(bundleName, (err: number, bundle: AssetManager.Bundle) => {
            if (err != 0) {
                if (calback) calback(1, null);
                return;
            }
            bundle.load(prefabPath, Prefab, (err, prefab) => {
                if (err) {
                    log('loadPrefab error', prefabPath, err);
                    if (calback) calback(2, null);
                    return;
                }
                if (cached) {
                    PrefabManager.ins.prefabMap.set(prefabKey, prefab);
                }
                log('loadPrefab ok', prefabKey);
                if (calback) calback(0, prefab);
            });
        });
    }
}