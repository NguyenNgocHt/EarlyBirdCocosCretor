import { _decorator, Component, Node, log, Texture2D } from 'cc';
const { ccclass, property } = _decorator;
class Vec2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public set(p: number | Vec2, y?: number) {
        if (typeof p === "number") {
            this.x = p;
            this.y = y;
        } else {
            this.x = p.x;
            this.y = p.y;
        }
    }
}
@ccclass('df3_drawingboard')
export default class df3_drawingboard {
    private _witdh: number;
    // chieu rong ban ve
    public get width(): number { return this._witdh; }
    private _height: number;
    //chieu cao ban ve
    public get height(): number { return this._height; }
    //Một mảng ghi lại giá trị màu của từng pixel, giá trị màu được thể hiện ở định dạng thập lục phân, RGBA
    private pointColor: number[][];
    //Ghi lại xem mỗi pixel có thể được vẽ hay không, 0 có nghĩa là không thể vẽ được, 1 có nghĩa là có thể vẽ được
    private maskPoint: number[][];
    //khối bộ nhớ để lưu trữ dữ liệu pixel
    //arraybffer 
    //Đại diện cho một bộ đệm thô của dữ liệu nhị phân, được sử dụng để lưu trữ dữ liệu cho các mảng đã nhập khác nhau. 
    //ArrayBuffers không thể được đọc hoặc ghi trực tiếp, 
    //nhưng có thể được chuyển đến một mảng đã nhập hoặc Đối tượng DataView để diễn giải bộ đệm thô khi cần.
    private buffer: ArrayBuffer;
    //Ghi lại số pixel của mỗi màu
    private colorCount: { [key: number]: number };
    //Mảng một chiều của các thành phần màu, được sử dụng để hiển thị
    private pixelColor: Uint8Array;
    private bitmapdata: Uint8Array;
    //Ghi lại màu (giá trị màu thập lục phân) của pixel được vẽ cuối cùng.
    // Khi chức năng vẽ được gọi mà không chỉ định giá trị màu, giá trị này sẽ được sử dụng.
    private curColor: number;
    //mang ghi lai gia tri mau cua image
    private array_mapColor: number[];
    //giá trị màu được lưu trữ tạm thời
    private tempColor: number;
    private tempR: number;
    private tempG: number;
    private tempB: number;
    private tempA: number;
    private countMaskpoint: number = 0;
    private texture2d: Texture2D;
    /**
    * Một bảng vẽ có thể được vẽ cho từng pixel. 
      Gốc của hệ tọa độ mà bảng vẽ sử dụng là góc dưới bên trái, trục X dương ở bên phải và trục Y dương ở trên cùng.
    * @param width    chiều rộng bản vẽ
    * @param height    chieu cao ban ve
    * @param data     Chỉ định nội dung ban đầu của artboard, 
    *                 tham số là mảng một chiều ghi các thành phần màu, 
    *                 nếu không truyền tham số vào thì tất cả các pixel trong artboard sẽ trong suốt
    */
    public constructor(texture: Texture2D, array_mapColor: number[], data?: ArrayBuffer) {
        this.init(texture, array_mapColor, data);
    }
    //#region 初始化
    /**
     *Khởi tạo bản vẽ sẽ xóa tất cả nội dung đã vẽ
     * @param width    chiều rộng bản vẽ
     * @param height    chiều cao bản vẽ
     * @param data      Chỉ định nội dung ban đầu của bảng vẽ. Tham số là một mảng một chiều ghi lại các thành phần màu. 
     *                  Khi không có tham số nào được truyền vào, nội dung của bảng vẽ là một hình chữ nhật hoàn toàn trong suốt
     */
    public init(texture: Texture2D, array_mapColor: number[], data?: ArrayBuffer) {
        this.tempColor = this.tempR = this.tempG = this.tempB = this.tempA = 0;
        if (!this.array_mapColor) {
            this.array_mapColor = [];
        }
        this.array_mapColor = array_mapColor;
        this.texture2d = texture;
        this.curColor = 0;
        this._witdh = Math.round(texture.width);
        this._height = Math.round(texture.height);
        this.initPointColor();
        this.initMaskPointformTexture2D();
        this.initPixelColor();
        this.initLineData();
        if (!!data) {
            this.setData(data);
        }
    }
    //khoi tao diem mau
    private initPointColor() {
        if (!this.pointColor) {
            this.pointColor = [];
        }
        for (let x = 0; x < this.width; ++x) {
            if (!this.pointColor[x]) {
                this.pointColor[x] = [];
            }
            for (let y = 0; y < this.height; ++y) {
                this.pointColor[x][y] = 0;
            }
        }
        this.colorCount = {};
        this.colorCount[0] = this.width * this.height;
    }
    //khoi tao diem mat la
    private initMaskPointformTexture2D() {
        if (!this.maskPoint) {
            this.maskPoint = [];
        }
        for (let i = 0; i < this.texture2d.width; i++) {
            if (!this.maskPoint[i]) {
                this.maskPoint[i] = [];
            }
            for (let j = 0; j < this.texture2d.height; j++) {
                if (this.array_mapColor[j * this.texture2d.width + i] != 0) {
                    this.maskPoint[i][j] = 1;
                }
                else if (this.array_mapColor[j * this.texture2d.width + i] == 0) {
                    this.maskPoint[i][j] = 0;
                }
            }
        }
    }
    private initPixelColor() {
        this.buffer = new ArrayBuffer(this.width * this.height * 4);
        this.pixelColor = new Uint8Array(this.buffer);
        this.pixelColor.fill(0);
    }
    /*đặt lại nội dung
    /**Reset bảng vẽ, chiều rộng và chiều cao của bảng vẽ không thay đổi nhưng sẽ xóa hết nội dung đã vẽ và trở về trạng thái trong suốt */
    public reset() {
        this.resetPointColor();
        this.resetMaskPoint();
        this.resetPixelColor();
    }
    private resetPointColor() {
        for (let x = this.width - 1; x >= 0; --x) {
            for (let y = this.height - 1; y >= 0; --y) {
                this.pointColor[x][y] = 0;
            }
        }
        for (let key in this.colorCount) {
            this.colorCount[key] = 0;
        }
    }

    private resetMaskPoint() {
        for (let x = this.width - 1; x >= 0; --x) {
            for (let y = this.height - 1; y >= 0; --y) {
                this.maskPoint[x][y] = 1;
            }
        }
    }

    private resetPixelColor() {
        this.pixelColor.fill(0);
    }
    /**Truyền dữ liệu pixel của hình ảnh và trực tiếp đặt nội dung của bảng vẽ. 
     * Kích thước của hình ảnh phải phù hợp với bảng vẽ. 
     *  @param data Mảng một chiều ghi lại các thành phần màu của từng pixel
     * Nếu bạn cần đặt lại kích thước của bảng vẽ, vui lòng sử dụng hàm init() */
    public setData(data: ArrayBuffer) {
        let pixelData = new Uint8Array(data);
        if (pixelData.length != this.width * this.height * 4) {
            console.warn("Không thể đặt dữ liệu trên bảng vẽ, độ dài dữ liệu không phù hợp với kích thước của bảng vẽ。");
            return;
        }
        this.setPixelColorByRGBA(pixelData);
        this.setPointColorByRGBA(pixelData);
    }
    /**
    * Ghi lại các thành phần màu của từng pixel
    * @param data Mảng một chiều của các thành phần màu
    */
    private setPixelColorByRGBA(data: Uint8Array) {
        this.pixelColor.set(data);
    }
    /**
     * Ghi lại giá trị màu của pixel theo tọa độ của pixel
     * @param data Mảng một chiều của các thành phần màu
     */
    private setPointColorByRGBA(data: Uint8Array) {
        this.colorCount = {};
        for (let y = 0; y < this.height; ++y) {
            let i = y * this.height;
            for (let x = 0; x < this.width; ++x) {
                let color = this.convertToNumber(data[i++], data[i++], data[i++], data[i++]);
                this.pointColor[x][y] = color;
                if (!this.colorCount[color]) {
                    this.colorCount[color] = 1;
                } else {
                    this.colorCount[color] += 1;
                }
            }
        }
    }
    /**
    *Đặt vùng pixel không thể vẽ mẫu
    * @param data  Tọa độ pixel là chỉ số, 0 nghĩa là không vẽ được, 1 nghĩa là vẽ được
    */
    public setMask(data: number[][]) {
        for (let x = this.width - 1; x >= 0; --x) {
            if (!!data[x]) {
                for (let y = this.height - 1; y >= 0; --y) {
                    if (undefined != data[x][y]) {
                        this.maskPoint[x][y] = data[x][y];
                    }
                }
            }
        }
    }
    /**
   *Đặt bảng vẽ để tất cả các khu vực không thể được vẽ
   */
    public setDisable() {
        for (let x = this.width - 1; x >= 0; --x) {
            for (let y = this.height - 1; y >= 0; --y) {
                this.maskPoint[x][y] = 0;
            }
        }
    }
    /**
     * Thêm vùng pixel có thể vẽ dựa trên vùng có thể vẽ hiện có.
     * Phương pháp này không vô hiệu hóa vùng pixel có thể vẽ hiện tại của bảng vẽ, nó chỉ thêm các vùng có thể vẽ mới
     * @param data   Tọa độ pixel là chỉ số, 0 nghĩa là không vẽ được, 1 nghĩa là vẽ được
     */
    public addEnablePoints(data: number[][]) {
        for (let x = this.width - 1; x >= 0; --x) {
            if (!!data[x]) {
                for (let y = this.height - 1; y >= 0; --y) {
                    if (!!data[x][y]) {
                        this.maskPoint[x][y] = data[x][y];
                    }
                }
            }
        }
    }
    /**
   *Lấy dữ liệu trong artboard
   * @param data mảng để nhận dữ liệu từ
   * @returns {number[]}Trả về mảng một chiều lưu trữ các thành phần màu của mỗi pixel
   */
    public copyData(data?: number[]): number[] {
        if (undefined === data) {
            data = [];
        }
        for (let i = 0, count = this.pixelColor.length; i < count; ++i) {
            data[i] = this.pixelColor[i];
        }
        return data;
    }
    /**
    *Lấy dữ liệu ghi thành phần màu của từng pixel trong artboard
    * @returns Nó sẽ trực tiếp trả về mảng bên trong bảng vẽ; Lưu ý: Nếu người dùng cần sửa đổi dữ liệu, 
    * vui lòng sử dụng phương thức copyData để lấy nó, để không ảnh hưởng đến chức năng đếm số pixel của bảng vẽ
    */
    public getData(): Uint8Array {
        return this.pixelColor;
    }
    /**Lấy khối bộ nhớ được sử dụng bên trong bảng vẽ, 
     * nếu bạn chỉ cần lấy dữ liệu pixel mà không cần xử lý thêm, hãy sử dụng getData*/
    public getBuffer(): ArrayBuffer {
        return this.buffer;
    }
    public getPointData(): number[][] {
        return this.pointColor;
    }
    /**
    *Lấy số pixel của màu đã chỉ định
    * @param r thành phần r của màu
    * @param g thành phần g của màu
    * @param b thành phần b của màu
    * @param a Độ trong suốt của màu, mặc định là 255
    */
    public getColorCount(r: number, g: number, b: number, a: number = 255): number {
        let c = this.convertToNumber(r, g, b, a);
        return this.colorCount[c];
    }
    /**
     * Đặt màu được sử dụng bởi bảng vẽ để vẽ mẫu
     * @param r Một đối tượng màu chứa các thành phần RGBA hoặc thành phần r của một màu
     * @param g thành phần g của màu
     * @param b thành phần b của màu
     * @param a Độ trong suốt của màu, mặc định là 255
     */
    public setColor(r: number, g: number, b: number, a: number = 255) {
        this.curColor = this.convertToNumber(r, g, b, a);
        if (!this.colorCount[this.curColor]) {
            this.colorCount[this.curColor] = 0;
        }
        this.tempColor = this.curColor;
        this.tempR = r;
        this.tempG = g;
        this.tempB = b;
        this.tempA = a;
    }
    /**Xóa tất cả nội dung đã vẽ */
    public clear() {
        this.reset();
    }
    //#region Vẽ: đường thẳng
    //đường thẳng
    /**Điểm cuối của đường vẽ cuối cùng */
    private previousLineEndPos: Vec2;
    private previousLineEndPosT: Vec2;
    private previousLineEndPosB: Vec2;
    /**Kiểu điểm cuối của đường được vẽ cuối cùng */
    private previousLineCircleEnd: boolean;
    /**Chiều rộng của dòng cuối cùng được vẽ */
    private previousLineWidth: number;
    private initLineData() {
        this.previousLineEndPos = new Vec2();
        this.previousLineEndPosT = new Vec2();
        this.previousLineEndPosB = new Vec2();
        this.previousLineCircleEnd = true;
        this.previousLineWidth = 1;
    }

    /**
     * Di chuyển bút vẽ đến vị trí đã chỉ định, vị trí này sẽ được sử dụng làm điểm bắt đầu của dòng khi gọi hàm lineTo
     * @param x     tọa độ X
     * @param y     tọa độ Y
     */
    public moveTo(x: number, y: number) {
        x = Math.round(x);
        y = Math.round(y);
        this.previousLineEndPos.set(x, y);
        this.previousLineEndPosT.set(x, y);
        this.previousLineEndPosB.set(x, y);
    }
    /**
    * đặt chiều rộng đường
    */
    public setLineWidth(w: number) {
        this.previousLineWidth = w;
    }
    /**
     * Đặt kiểu điểm cuối dòng
     * @param b Điểm cuối của đoạn thẳng có phải là đường tròn hay không
     */
    public setLineCircleEnd(b: boolean) {
        this.previousLineCircleEnd = b;
    }

    /**
     *Vẽ một đường thẳng, sử dụng màu mặc định, độ đậm của đường và kiểu điểm cuối của đoạn đường
     * @param x1       Tọa độ điểm xuất phát X
     * @param y1        Tọa độ điểm xuất phát Y
     * @param x2        Tọa độ điểm cuối X
     * @param y2        Tọa độ điểm cuối Y
     */
    public line(x1: number, y1: number, x2: number, y2: number) {
        x1 = Math.round(x1);
        x2 = Math.round(x2);
        y1 = Math.round(y1);
        y2 = Math.round(y2);
        if (x1 == x2 && y1 == y2) return;
        let width = this.previousLineWidth;
        let circleEnd = this.previousLineCircleEnd;
        this.previousLineEndPos.set(x2, y2);
        let offsetX = 0;
        let offsetY = 0;
        let rateK = 1;
        if (x1 == x2) {
            offsetX = Math.round(width * 0.5);
        } else if (y1 == y2) {
            offsetY = Math.round(width * 0.5);
        } else {
            let k = (y2 - y1) / (x2 - x1);
            rateK = Math.sqrt(k * k + 1);
            offsetY = width * 0.5 / rateK;
            offsetX = Math.round(offsetY * k);
            offsetY = Math.round(offsetY);
        }
        this.previousLineEndPosT.set(x2 - offsetX, y2 + offsetY);
        this.previousLineEndPosB.set(x2 + offsetX, y2 - offsetY);

        let p1 = new Vec2(x1, y1);
        let p2 = new Vec2(x2, y2);
        if (x1 > x2) {
            p1.x = x2;
            p1.y = y2;
            p2.x = x1;
            p2.y = y1;
        }
        this._drawLine(p1, p2, width, offsetX, offsetY, rateK);
        if (circleEnd) {
            this._drawCircle(x1, y1, width * 0.5);
            this._drawCircle(x2, y2, width * 0.5);
        }
    }

    /**
     * Vẽ một đường đến tọa độ đã chỉ định, 
     * bắt đầu từ điểm cuối của đường được vẽ cuối cùng, 
     * sử dụng màu, chiều rộng và kiểu điểm cuối của đoạn đường mặc định
     * @param x     Tọa độ điểm cuối X
     * @param y    Tọa độ điểm cuối Y
     */
    public lineTo(x: number, y: number) {
        x = Math.round(x);
        y = Math.round(y);
        if (this.previousLineEndPos.x == x && this.previousLineEndPos.y == y) return;
        let width = this.previousLineWidth;
        let circleEnd = this.previousLineCircleEnd;
        let x1 = this.previousLineEndPos.x;
        let y1 = this.previousLineEndPos.y;
        let x2 = x;
        let y2 = y;
        if (x1 > x2) {
            x1 = x2;
            y1 = y2;
            x2 = this.previousLineEndPos.x;
            y2 = this.previousLineEndPos.y;
        }
        let offsetX = 0;
        let offsetY = 0;
        let rateK = 1;
        if (x1 == x2) {
            offsetX = Math.round(width * 0.5);
        } else if (y1 == y2) {
            offsetY = Math.round(width * 0.5);
        } else {
            let k = (y2 - y1) / (x2 - x1);
            rateK = Math.sqrt(k * k + 1);
            offsetY = width * 0.5 / rateK;
            offsetX = Math.round(offsetY * k);
            offsetY = Math.round(offsetY);
        }
        if (!circleEnd) {
            if (this.previousLineEndPos.x != this.previousLineEndPosT.x ||
                this.previousLineEndPos.y != this.previousLineEndPosT.y) {
                let p1 = new Vec2(this.previousLineEndPos.x - offsetX, this.previousLineEndPos.y + offsetY);
                let p2 = new Vec2(this.previousLineEndPos.x + offsetX, this.previousLineEndPos.y - offsetY);
                this._drawTriangle([p1, p2, this.previousLineEndPosT]);
                this._drawTriangle([p1, p2, this.previousLineEndPosB]);
            }
        } else {
            this._drawCircle(x1, y1, width * 0.5);
            this._drawCircle(x2, y2, width * 0.5);
        }
        this._drawLine(new Vec2(x1, y1), new Vec2(x2, y2), width, offsetX, offsetY, rateK);

        this.previousLineEndPos.set(x, y);
        this.previousLineEndPosT.set(x - offsetX, y + offsetY);
        this.previousLineEndPosB.set(x + offsetX, y - offsetY);
    }
    /**
    * Vẽ một đường thẳng, không bao gồm các kiểu điểm cuối của đoạn đường
    * @param p1        Tọa độ điểm đầu của đoạn thẳng
    * @param p2        Tọa độ điểm cuối của đoạn thẳng
    * @param width     chiều rộng dòng
    * @param color     màu đường kẻ
    */
    private _drawLine(p1: Vec2, p2: Vec2, width: number, offsetX: number, offsetY: number, slopeRate: number) {
        if (p1.y == p2.y) {
            // duong nam ngang
            let x = p1.x < p2.x ? p1.x : p2.x;
            this._drawRect(new Vec2(x, Math.round(p1.y - width * 0.5)), Math.abs(p1.x - p2.x), width);
        } else if (p1.x == p2.x) {
            // duong thang dung
            let y = p1.y < p2.y ? p1.y : p2.y;
            this._drawRect(new Vec2(Math.round(p1.x - width * 0.5), y), width, Math.abs(p1.y - p2.y));
        } else {
            // đường thẳng nghiêng
            let inverseK = (p1.x - p2.x) / (p1.y - p2.y);
            let p1t = new Vec2(p1.x - offsetX, p1.y + offsetY);
            let p1b = new Vec2(p1.x + offsetX, p1.y - offsetY);
            let p2t = new Vec2(p2.x - offsetX, p2.y + offsetY);
            let p2b = new Vec2(p2.x + offsetX, p2.y - offsetY);
            let p1c = new Vec2();
            let p2c = new Vec2();
            let height = Math.round(width * slopeRate);
            if (p2.y > p1.y) {
                if (p1b.x < p2t.x) {
                    p1c.x = p1b.x;
                    p1c.y = p1b.y + height;
                    p2c.x = p2t.x;
                    p2c.y = p2t.y - height;
                    this._drawVerticalTriangle(p1c, p1b, p1t);
                    this._drawParallelogram(p1b, p2c, height);
                    this._drawVerticalTriangle(p2t, p2c, p2b);
                } else {
                    p1c.x = p1b.x;
                    p1c.y = Math.round(p2t.y - (p1c.x - p2t.x) * inverseK);
                    p2c.x = p2t.x;
                    p2c.y = Math.round(p1b.y + (p1b.x - p2c.x) * inverseK);
                    this._drawVerticalTriangle(p2t, p2c, p1t);
                    this._drawParallelogram(p2c, p1b, p2t.y - p2c.y);
                    this._drawVerticalTriangle(p1c, p1b, p2b);
                }
            } else {
                if (p1t.x < p2b.x) {
                    p1c.x = p1t.x;
                    p1c.y = p1t.y - height;
                    p2c.x = p2b.x;
                    p2c.y = p2b.y + height;
                    this._drawVerticalTriangle(p1t, p1c, p1b);
                    this._drawParallelogram(p1c, p2b, height);
                    this._drawVerticalTriangle(p2c, p2b, p2t);
                } else {
                    p1c.x = p1t.x;
                    p1c.y = Math.round(p2b.y - (p1c.x - p2b.x) * inverseK);
                    p2c.x = p2b.x;
                    p2c.y = Math.round(p1t.y + (p1t.x - p2c.x) * inverseK);
                    this._drawVerticalTriangle(p2c, p2b, p1b);
                    this._drawParallelogram(p2b, p1c, p1t.y - p1c.y);
                    this._drawVerticalTriangle(p1t, p1c, p2t);
                }
            }

        }
    }

    //#endregion
    //#region vẽ: hình chữ nhật
    /**
     * vẽ hình chữ nhật
     * @param x    Tọa độ X của góc dưới bên trái của hình chữ nhật
     * @param y    Tọa độ Y của góc dưới bên trái của hình chữ nhật
     * @param w    chiều rộng hình chữ nhật
     * @param h    chiều cao hình chữ nhật
     */
    public rect(x: number, y: number, w: number, h: number) {
        x = Math.round(x);
        y = Math.round(y);
        this._drawRect(new Vec2(x, y), w, h);
    }

    /**
     *vẽ hình chữ nhật
     * @param p         Tọa độ của đỉnh dưới cùng bên trái của hình chữ nhật
     * @param w         chiều rộng hình chữ nhật
     * @param h         chiều cao hình chữ nhật
     * @param color     Tô màu cho hình chữ nhật
     */
    private _drawRect(p: Vec2, w: number, h: number) {
        let minX = this.clampX(p.x);
        let maxX = this.clampX(p.x + w);
        let minY = this.clampY(p.y);
        let maxY = this.clampY(p.y + h);
        for (let x = minX; x <= maxX; ++x) {
            for (let y = minY; y <= maxY; ++y) {
                this._drawPixel(x, y);
            }
        }
        for (let y = minY; y <= maxY; ++y) {
            this._drawRowPixel(minX, maxX, y);
        }
    }
    /**
    *Vẽ hình bình hành, cạnh trái và phải của hình bình hành song song với trục Y
    * @param p1        tọa độ đỉnh dưới cùng bên trái
    * @param p2        tọa độ đỉnh dưới cùng bên phải
    * @param height    chiều cao cạnh thẳng đứng
    * @param color     màu
    */
    private _drawParallelogram(p1: Vec2, p2: Vec2, height: number) {
        if (p1.x == p2.x) return;
        let k = (p2.y - p1.y) / (p2.x - p1.x);
        let minX = this._minX(p1.x);
        let maxX = this._maxX(p2.x);
        for (let x = minX; x <= maxX; ++x) {
            let minY = p1.y + Math.round((x - p1.x) * k);
            let maxY = minY + height;
            minY = this._minY(minY);
            maxY = this._maxY(maxY);
            this._drawColPixel(minY, maxY, x);
            for (let y = minY; y <= maxY; ++y) {
                this._drawPixel(x, y);
            }
        }
    }
    //#endregion
    //#region vẽ: hình tam giác
    /**
     * vẽ hình tam giác
     * @param x1    Đỉnh 1 tọa độ X
     * @param y1    Đỉnh 1 tọa độ Y
     * @param x2    Đỉnh 2 tọa độ X
     * @param y2    Đỉnh 2 tọa độ Y
     * @param x3    Đỉnh 3 tọa độ X
     * @param y3    Đỉnh 3 tọa độ Y
     */
    public triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
        x2 = Math.round(x2);
        y2 = Math.round(y2);
        x3 = Math.round(x3);
        y3 = Math.round(y3);
        let pList: Vec2[] = [];
        pList.push(new Vec2(x1, y1));
        pList.push(new Vec2(x2, y2));
        pList.push(new Vec2(x3, y3));
        this._drawTriangle(pList);
    }
    /**
     * vẽ hình tam giác
     * @param p1    tọa độ đỉnh
     * @param p2 
     * @param p3 
     * @param color tô màu
     */
    private _drawTriangle(pList: Vec2[]) {
        pList.sort((a, b) => {
            return a.x - b.x;
        });
        let p1 = pList[0];
        let p2 = pList[1];
        let p3 = pList[2];
        if (p1.x == p2.x) {
            if (p1.x == p3.x) return;
            if (p1.y < p2.y) {
                p1 = pList[1];
                p2 = pList[0];
            }
            this._drawVerticalTriangle(p1, p2, p3);
            return;
        }
        let k = (p3.y - p1.y) / (p3.x - p1.x);
        let p4 = new Vec2(p2.x, Math.round(p1.y + (p2.x - p1.x) * k));
        if (p4.y == p2.y) return;
        if (p4.y < p2.y) {
            this._drawVerticalTriangle(p2, p4, p1);
            this._drawVerticalTriangle(p2, p4, p3);
        } else {
            this._drawVerticalTriangle(p4, p2, p1);
            this._drawVerticalTriangle(p4, p2, p3);
        }
    }
    /**
     * Vẽ tam giác có các cạnh song song với trục Y
     * @param p1    Tọa độ đỉnh trên của cạnh đứng của tam giác
     * @param p2    Tọa độ đỉnh dưới của cạnh đứng của tam giác
     * @param p3    tọa độ đỉnh trái hoặc phải của tam giác
     * @param color màu để vẽ
     */
    private _drawVerticalTriangle(p1: Vec2, p2: Vec2, p3: Vec2) {
        if (p3.x == p1.x) return;
        let k1 = (p3.y - p1.y) / (p3.x - p1.x);
        let k2 = (p3.y - p2.y) / (p3.x - p2.x);
        let maxX = p3.x, minX = p1.x;
        if (maxX < minX) {
            maxX = p1.x;
            minX = p3.x;
        }
        minX = this._minX(minX);
        maxX = this._maxX(maxX);
        for (let x = minX; x <= maxX; ++x) {
            let maxY = this.clampY(Math.round(p1.y + (x - p1.x) * k1));
            let minY = this.clampY(Math.round(p2.y + (x - p2.x) * k2));
            this._drawColPixel(minY, maxY, x);
            for (let y = minY; y <= maxY; ++y) {
                this._drawPixel(x, y);
            }
        }
    }
    //#endregion
    //#region vẽ: hình tròn
    /**
    * vẽ một vòng tròn
    * @param x         Tọa độ tâm x
    * @param y         tọa độ tâm y
    * @param radius    bán kính vòng tròn
    */
    public circle(x: number, y: number, radius: number) {
        x = Math.round(x);
        y = Math.round(y);
        this._drawCircle(x, y, radius);
    }

    private _drawCircle(x: number, y: number, radius: number) {
        radius = Math.round(radius);
        if (radius == 0) return;
        // bình phương cạnh huyền của tam giác
        let dis = radius * radius;
        let minX = this._minX(x - radius);
        let maxX = this._maxX(x + radius);
        for (let i = minX; i <= maxX; ++i) {
            let r = x - i;
            r = Math.round(Math.sqrt(dis - r * r));
            let minY = this._minY(y - r);
            let maxY = this._maxY(y + r);
            for (let j = minY; j <= maxY; ++j) {
                this._drawPixel(i, j);
            }
        }
        let minY = this.clampY(y - radius);
        let maxY = this.clampY(y + radius);
        for (let j = minY; j <= maxY; ++j) {
            let r = j - y;
            r = Math.round(Math.sqrt(dis - r * r));
            let minX = this.clampX(x - r);
            let maxX = this.clampX(x + r);
            this._drawRowPixel(minX, maxX, j);
        }
    }
    private _minX(x: number): number {
        return x >= 0 ? x : 0;
    }

    private _maxX(x: number): number {
        return x < this.width ? x : this.width - 1;
    }

    private _minY(y: number): number {
        return y >= 0 ? y : 0;
    }

    private _maxY(y: number): number {
        return y < this.height ? y : this.height - 1;
    }

    private clampX(x: number): number {
        if (x < 0) return 0;
        if (x >= this.width) return this.width - 1;
        return x;
    }

    private clampY(y: number): number {
        if (y < 0) return 0;
        if (y >= this.height) return this.height - 1;
        return y;
    }
    /**vẽ màu của một pixel */
    private _drawPixel(x: number, y: number) {
        x = Math.round(x);
        y = Math.round(y);
        if (this.maskPoint[x][y] == 0) return;
        if (this.pointColor[x][y] == this.tempColor) return;
        else {
            let index = (y * this.width + x) * 4;
            this.pixelColor[index] = this.tempR;
            this.pixelColor[index + 1] = this.tempG;
            this.pixelColor[index + 2] = this.tempB;
            this.pixelColor[index + 3] = this.tempA;
            let c = this.pointColor[x][y];
            this.colorCount[c]--;
            this.colorCount[this.tempColor]++;
            this.pointColor[x][y] = this.tempColor;
            this.countMaskpoint = this.countMaskpoint + 1;
        }
    }
    public getCountMaskPoint(): number {
        return this.countMaskpoint;
    }
    public fullColorImage() {
        for (let x = 0; x < this.texture2d.width; x++) {
            for (let y = 0; y < this.texture2d.height; y++) {
                if (this.maskPoint[x][y] == 1) {
                    let index = (y * this.width + x) * 4;
                    this.pixelColor[index] = this.tempR;
                    this.pixelColor[index + 1] = this.tempG;
                    this.pixelColor[index + 2] = this.tempB;
                    this.pixelColor[index + 3] = this.tempA;
                    let c = this.pointColor[x][y];
                    this.colorCount[c]--;
                    this.colorCount[this.tempColor]++;
                    this.pointColor[x][y] = this.tempColor;
                }
            }
        }
    }
    /**
    *Liên tục vẽ các pixel liên tiếp
    * @param startX    Tọa độ X của điểm bắt đầu
    * @param endX      Tọa độ X của điểm cuối
    * @param y         tọa độ Y
    */
    private _drawRowPixel(startX: number, endX: number, y: number) {
        let index = (y * this.width + startX) * 4;
        for (let x = startX; x <= endX; ++x) {
            if (this.maskPoint[x][y] != 0 && this.pointColor[x][y] != this.tempColor) {
                this.pixelColor[index] = this.tempR;
                this.pixelColor[index + 1] = this.tempG;
                this.pixelColor[index + 2] = this.tempB;
                this.pixelColor[index + 3] = this.tempA;
                let c = this.pointColor[x][y];
                this.colorCount[c]--;
                this.colorCount[this.tempColor]++;
                this.pointColor[x][y] = this.tempColor;
            }
            index += 4;
        }
    }
    /**
     * Vẽ liên tục các pixel trong một cột
     * @param startY    Tọa độ Y của điểm bắt đầu
     * @param endY      Tọa độ Y của điểm cuối
     * @param x         toa do X;
     */
    private _drawColPixel(startY: number, endY: number, x: number) {
        let index = (startY * this.width + x) * 4;
        for (let y = startY; y <= endY; ++y) {
            if (this.maskPoint[x][y] != 0 && this.pointColor[x][y] != this.tempColor) {
                this.pixelColor[index] = this.tempR;
                this.pixelColor[index + 1] = this.tempG;
                this.pixelColor[index + 2] = this.tempB;
                this.pixelColor[index + 3] = this.tempA;
                let c = this.pointColor[x][y];
                this.colorCount[c]--;
                this.colorCount[this.tempColor]++;
                this.pointColor[x][y] = this.tempColor;
            }
            index += this.width * 4;
        }
    }
    /**
     * Chuyển đổi thành phần màu RGBA thành màu được biểu thị bằng giá trị số và thành phần màu là giá trị trong khoảng từ 0 đến 255
     * @param r 
     * @param g 
     * @param b 
     * @param a 
     */
    private convertToNumber(r: number, g: number, b: number, a: number = 255): number {
        // Giá trị màu sẽ được sử dụng cho chỉ mục mảng và không thể âm, 
        //vì vậy khi thành phần màu đỏ là số lẻ, nó sẽ bị giảm đi 1 để trở thành số chẵn
        return ((r & 0xfe) << 23) | (g << 16) | (b << 8) | a;
    }

    /**Chuyển đổi màu thập lục phân thành màu được biểu thị bởi thành phần RGBA */
    private convertToRGBA(color: number): { r: number, g: number, b: number, a: number } {
        // Giá trị màu sẽ được sử dụng cho chỉ mục mảng và không thể âm,
        // vì vậy khi thành phần màu đỏ là số lẻ, nó sẽ bị giảm đi 1 để trở thành số chẵn
        return {
            r: (color & 0xef000000) >> 23,
            g: (color & 0x00ff0000) >> 16,
            b: (color & 0x0000ff00) >> 8,
            a: (color & 0x000000ff),
        };
    }
    public checkMaskPoint() {
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                if (this.maskPoint[x][y] == 0) {

                }
            }
        }
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


