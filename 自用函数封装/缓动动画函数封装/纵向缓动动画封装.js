// 纵向缓动动画
function animate(obj, target, callback) {
    //每次调用清除定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        // step步长值
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (window.pageYOffset == target) {
            clearInterval(obj.timer)
            if (callback) {
                callback();
            }
        }
        window.scroll(0, window.pageYOffset + step)
    }, 10)
}