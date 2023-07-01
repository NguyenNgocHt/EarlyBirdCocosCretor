import { assert, AssetManager, AudioClip, AudioSource, log } from "cc";
import { BundleManager } from "../../boot/BundleManager";

export class AudioManager {
    
    private static ins: AudioManager = null;
    static instance():AudioManager{
        if(!AudioManager.ins){
            AudioManager.ins = new AudioManager();
        }
        return AudioManager.ins;
    }    

    
    private constructor(){
        this.audioMap = new Map<string, AudioClip>();
        log('AudioManager init');
    }
    public audioSource?: AudioSource;
    private audioMap: Map<string, AudioClip> = null;

    // init AudioManager in GameRoot component.
    public init (audioSource: AudioSource) {
        this.audioSource = audioSource;
    }

    public playLong (bundleName:string, audioPath: string, cached?:boolean, callback?:Function) {
        let audioKey = bundleName + '/' + audioPath;
        let audioClip = this.audioMap.get(audioKey);
        if (audioClip) {
            this.audioSource.playOneShot(audioClip, 1);
            if(callback) callback(0, audioKey, audioClip);
            return;
        }
        BundleManager.instance().loadBundle(bundleName, (err:number, bundle:AssetManager.Bundle) => {
            if(err != 0){
                return;
            }
            bundle.load(audioPath, AudioClip, (err:Error, audioClip:AudioClip) => {
                if (err) {
                    log('load audio error', audioKey, err);
                    return;
                }
                if(cached){
                    AudioManager.ins.audioMap.set(audioKey, audioClip);
                }
                AudioManager.ins.audioSource.clip = audioClip;
                AudioManager.ins.audioSource.play();
                if(callback) callback(0, audioKey, audioClip);
                log('load audio ok', audioKey);
            });
        });
    }

    public playShort(bundleName:string, audioPath: string, cached?:boolean, callback?:Function) {
        let audioKey = bundleName + '/' + audioPath;
        let audioClip = this.audioMap.get(audioKey);
        if (audioClip) {
            this.audioSource.playOneShot(audioClip, 1);
            if(callback) callback(0, audioKey, audioClip);
            return;
        }
        BundleManager.instance().loadBundle(bundleName, (err:number, bundle:AssetManager.Bundle) => {
            if(err != 0){
                return;
            }
            bundle.load(audioPath, AudioClip, (err:Error, audioClip:AudioClip) => {
                if (err) {
                    log('load audio error', audioKey, err);
                    return;
                }
                if(cached){
                    AudioManager.ins.audioMap.set(audioKey, audioClip);
                }
                AudioManager.ins.audioSource.playOneShot(audioClip, 1);
                if(callback) callback(0, audioKey, audioClip);
                log('load audio ok', audioKey);
            });
        });
    }
}