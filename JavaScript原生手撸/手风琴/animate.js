function animate(element, target) {
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        // 1 获取元素当前位置
        var current = element.offsetLeft;
        // 2 设置步长
        // 变速运动的步长公式：  (target - current) / 10
        var step = (target - current) / 10;
        // --- 后期添加：对step的值进行取整
        //    如果为正数进行向上取整，如果是负数向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 3 设置运动公式
        current = current + step;
        // 4 将current设置给left属性
        element.style.left = current + 'px';
        // 5 运动完毕后，清除定时器
        if (current === target) {
            clearInterval(element.timer);
        }
    }, 20);
}