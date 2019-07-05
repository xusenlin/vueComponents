
const startAngle = 0.65;
const endAngle = 0.35;
const angle = (2 - startAngle + endAngle)/100;


export default function(canvasDom, percent,foreColor,bottomText) {

    let context = canvasDom.getContext("2d");
    let center_x = canvasDom.width / 2;
    let center_y = canvasDom.height / 2;
    let speed = 0;

    // 绘制背景圆圈
    function backgroundCircle(){
        context.save();
        context.beginPath();
        context.lineWidth = 14; //设置线宽
        let radius = center_x - context.lineWidth;
        context.lineCap = "round";
        context.strokeStyle = "rgba(255, 255, 255, 0.3)";
        context.arc(center_x, center_y, radius, Math.PI*startAngle, Math.PI*endAngle, false);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //绘制运动圆环
    function foregroundCircle(n){
        context.save();
        context.strokeStyle = foreColor;
        context.lineWidth = 14;
        context.lineCap = "round";
        let radius = center_x - context.lineWidth;
        context.beginPath();
        context.arc(center_x, center_y, radius , Math.PI * startAngle, Math.PI * endAngleFunc(n), false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
    }
//绘制文字
    function text(n){
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = foreColor;
        let font_size = 72;
        context.font =  font_size + "px Helvetica";
        let text_width = context.measureText(n.toFixed(0)).width;
        context.fillText(n.toFixed(0), center_x-text_width/2 , center_y + font_size/2 - 10);
        context.font = 30 + "px Helvetica";
        context.fillText('%', center_x + text_width/2 , center_y + 30);
        context.font = 26 + "px Helvetica";
        let val_text_width = context.measureText(bottomText).width;
        context.fillText(bottomText, center_x - (val_text_width/2), canvasDom.height - 6);
        context.restore();
    }

    //执行动画
    (function drawFrame(){
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvasDom.width, canvasDom.height);
        backgroundCircle();
        foregroundCircle(speed);
        text(speed);
        if(speed >= percent) return;
        speed += 1;
    }());
}

function endAngleFunc(n) {
    let val = n * angle + startAngle;

    if(val >= 2){
        return val - 2
    }else {
        return  val
    }

}