function animate(obj, target, callback) {
    //每次调用清除定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        // 步长值
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px'

    }, 15)
}