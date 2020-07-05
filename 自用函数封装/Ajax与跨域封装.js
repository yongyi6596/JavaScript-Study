function myAjax(obj) {
  if (obj.dataType == "jsonp") {
    //如果用户传的是dataType=jsonp,就用跨域，
    myAjaxAcross(obj);
  } else {
    myAjaxNormal(obj); //如果用户使用的是json or xml 或其他，使用Ajax
  }
}
//  该方法为跨域
function myAjaxAcross(obj) {
  var init = {
    url: "#",
    data: {},
    success: function (data) {
      console.log(data);
    },
    jsonp: "callback", //回调函数  callback or   cb
    jsonpCallback: "yy", //回调函数名
  };
  for (var key in obj) {
    init[key] = obj[key]; //遍历obj并赋值给init,  没有被赋值的init，使用初始值
  }
  var params = "";
  for (var attr in init.data) {
    //遍历init对象并按要求进行拼接
    params += attr + "=" + init.data[attr] + "&";
  }
  if (params) {
    params = params.substring(0, params.length - 1); //将最后一个 &  进行裁剪
    init.url += "?" + params; //与url 进行拼接
  }
  init.url += "&" + init.jsonp + "=" + init.jsonpCallback; //与callback or cb  和  函数名拼接   得到最终URl
  var script = document.createElement("script");
  script.src = init.url; //新建script标签，并是script src=init url
  window[init.jsonpCallback] = function (data) {
    init.success(data); //定义回调函数
  };
  var head = document.querySelector("head"); //将script标签，加入head标签
  head.appendChild(script);
}
//该方法为Ajax
function myAjaxNormal(obj) {
  var init = {
    type: "get",
    url: "#",
    dataType: "json",
    data: {},
    async: true,
    success: function (result) {
      console.log(result);
    },
  };
  for (var key in obj) {
    init[key] = obj[key]; //遍历obj，并赋值给init，
  }
  var xhr = null;
  if (window.XMLHttpRequest) {
    //第一步，new一个XMLHttpRequert，
    var xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP"); //对IE6进行一个兼容
  }
  var params = "";
  for (var attr in init.data) {
    params += attr + "=" + init.data[attr] + "&"; //拼接
  }
  if (params) {
    params = params.substring(0, params.length - 1); //切掉最后一个不用的&
  }
  if (init.type == "get") {
    init.url += "?" + params; //考虑get还是post
  }
  xhr.open(init.type, init.url, init.async);
  if (init.type == "get") {
    xhr.send(null);
  } else if (init.type == "post") {
    xhr.setRequestHearder("Content-type", "application/x-www-form-urlencoded"); //如果是post，必行先设置请求头
    xhr.send(params);
  }
  if (init.async) {
    xhr.onreadystatechange = function () {
      //如果async=true,表明是异步，使用这个
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var result = null;
          if (init.dataType == "json") {
            result = xhr.responseText;
            result = JSON.parse(result);
          } else if (init.dataType == "xml") {
            result = xhr.responseXML;
          } else {
            result = xhr.responseText;
          }
          init.success(result);
        }
      }
    };
  } else {
    if (xhr.readyState == 4) {
      //如果async=false,表明是同步，使用这个
      if (xhr.status == 200) {
        var result = null;
        if (init.dataType == "json") {
          result = xhr.responseText;
          result = JSON.parse(result);
        } else if (init.dataType == "xml") {
          result = xhr.responseXML;
        } else {
          result = xhr.responseText;
        }
        init.success(result);
      }
    }
  }
}
