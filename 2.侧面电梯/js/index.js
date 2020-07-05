window.addEventListener("load", function () {
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
  //侧面电梯点击跳转

  var shortcut = document.querySelector('.shortcut')
  var heard = document.querySelector('.heard')
  var nav = document.querySelector('.nav')
  var main = document.querySelector('.main')
  var recommend = document.querySelector('.recommend')
  var floor = document.querySelector('.floor')
  var foot = document.querySelector('.foot')

  var elchange1 = document.querySelector('.elchange1')
  var elchange2 = document.querySelector('.elchange2')
  var elchange3 = document.querySelector('.elchange3')
  var elchange4 = document.querySelector('.elchange4')
  var elchange5 = document.querySelector('.elchange5')
  var elchange6 = document.querySelector('.elchange6')
  var elchange7 = document.querySelector('.elchange7')
  elchange1.addEventListener('click', function () {
    animate(window, shortcut.offsetTop)
  });
  elchange2.addEventListener('click', function () {
    animate(window, heard.offsetTop)
  });
  elchange3.addEventListener('click', function () {
    animate(window, nav.offsetTop)
  });
  elchange4.addEventListener('click', function () {
    animate(window, main.offsetTop)
  });
  elchange5.addEventListener('click', function () {
    animate(window, recommend.offsetTop)
  });
  elchange6.addEventListener('click', function () {
    animate(window, floor.offsetTop)
  });
  elchange7.addEventListener('click', function () {
    animate(window, elevator.offsetTop)
  });

  //侧面电梯，定位效果切换。
  var elevator = document.querySelector(".elevator")
  var elchange = document.querySelector('.elchange')
  document.addEventListener('scroll', function () {
    if (window.pageYOffset > 1000) {
      elchange.style.display = 'block'
    } else if (window.pageYOffset >= 360) {
      elevator.style.position = 'fixed';
      elevator.style.top = '160px';
    } else if (window.pageYOffset < 360) {
      elevator.style.position = "absolute";
      elevator.style.top = '';
      elchange.style.display = 'none'
    }
  })
  // 返回顶部
  elchange.addEventListener('click', function () {
    animate(window, 0)
  })
});