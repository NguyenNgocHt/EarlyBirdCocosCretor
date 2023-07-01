import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('df3_DrawingBoardExt')
export default class df3_DrawingBoardExt {
    /**
     *chiều rộng bản vẽ
     */
    private _witdh: number;
    public get width(): number { return this._witdh; }
    /**
     *chieu cao ban ve
     */
    private _height: number;
    public get height(): number { return this._height; }
    // UV data
    private uvDatas: Vec2[][] = [];
    // UV tập dữ liệu tạm thời
    private uvs: Vec2[] = [];
    // ghi lại tọa độ cuối cùng
    private _lastPos: Vec2 = new Vec2();

    public constructor (width: number, height: number) {
        this.init(width, height);
    }

    public init (width: number, height: number) {
        this._witdh = Math.round(width);
        this._height = Math.round(height);
    }

    /**
     * Đặt dữ liệu UV theo vị trí
     * @param x toa do x
     * @param y toa do y
     */
    public setUVDataByPos (x: number, y: number) {
        let diffX = Math.abs(this._lastPos.x - x);
        let diffY = Math.abs(this._lastPos.y - y);

        if ((diffX <= 1) && (diffY <= 1)) {
            console.log("Sai số giữa các điểm quá nhỏ, không ghi");
            return ;
        }
        
        this._lastPos.set(x, y);

        let x1 = (x - this._witdh / 2);
        let y1 = (this._height / 2 - y);
        let xoffset = x1 / this._witdh;
        let yoffset = y1 / this._height;
        this.uvs.push(new Vec2(xoffset, yoffset));
    }

    public recordUVData () {
        this.uvDatas = this.uvDatas.concat(this.uvs);
        this.uvs = [];
    }
}


