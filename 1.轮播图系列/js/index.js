window.addEventListener("load", function () {
  // 横向缓动动画
  function animate(obj, target, callback) {
    //每次调用清除定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
      // step步长值
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
  var focus = document.querySelector(".focus");
  var focusul = focus.querySelector(".focusul");
  // var focuslist = focusul.querySelectorAll('li')
  var lbtn = focus.querySelector(".lbtn");
  var rbtn = focus.querySelector(".rbtn");
  var imglist = focusul.querySelectorAll("li");
  var list = focus.querySelector(".list");
  var num = 0
  // 初始化 自动生成小圆点
  for (var i = 0; i < imglist.length - 2; i++) {
    var xlis = document.createElement("li");
    xlis.setAttribute("index", i);
    list.appendChild(xlis);
    // 点击小圆点，背景颜色变换，并跳到相应图片
    list.children[0].className = "yy";
    list.children[i].onclick = function () {
      for (var j = 0; j < list.children.length; j++) {
        list.children[j].className = "";
        this.className = "yy";
      }
      num = Number(this.getAttribute("index"))
      animate(focusul, (-(num + 1) * 721))
    }
  }
  //   鼠标移入，显示两边按钮，暂停播放图片
  focus.addEventListener("mouseover", function () {
    lbtn.style.display = "block";
    rbtn.style.display = "block";
    clearInterval(timer1);
    timer1 = null;
  });
  //鼠标移出，隐藏两边按钮，并自动播放图片
  focus.addEventListener("mouseout", function () {
    lbtn.style.display = "none";
    rbtn.style.display = "none";
    timer1 = setInterval(function () {
      rbtn.click();
    }, 2000);
  });
  // 点击右侧按钮实现图片切换，
  var flag = true;
  rbtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      num++;
      if (num > 3) {
        num = 0
      }
      //小圆点，根据图片进行变换
      for (var i = 0; i < list.children.length; i++) {
        list.children[i].className = "";
        list.children[num].className = "yy";
      }
      if (focusul.offsetLeft < -2884) {
        focusul.style.left = -721 + 'px'
      }
      animate(focusul, focusul.offsetLeft - 721, function () {
        flag = true;
      })
    }
  });
  //   点击左侧按钮实现图片向左切换
  lbtn.addEventListener("click", function () {
    if (flag) {
      flag = false;
      num--;
      if (num < 0) {
        num = 3
      }
      //小圆点，根据图片进行变换
      for (var i = 0; i < list.children.length; i++) {
        list.children[i].className = "";
        list.children[num].className = "yy";
      }
      if (focusul.offsetLeft >= 0) {
        focusul.style.left = -2884 + 'px'
      }
      animate(focusul, focusul.offsetLeft + 721, function () {
        flag = true;
      })
    }
  });
  //   图片自动切换
  var timer1 = setInterval(function () {
    rbtn.click();
  }, 2000);

});