function myAjaxAcross(obj) {
    var init = {
        url: "#",
        data: {},
        success: function (data) {
            console.log(data)
        },
        jsonp: "callback",
        jsonpCallback: "yy",
    }
    for (var key in obj) {
        init[key] = obj[key]
    };
    var params = "";
    for (var attr in init.data) {
        params += attr + "=" + init.data[attr] + "&";
    };
    if (params) {
        params = params.substring(0, params.length - 1);
        init.url += "?" + params;
    };
    init.url += "&" + init.jsonp + "=" + init.jsonpCallback;
    var script = document.createElement("script");
    script.src = init.url;
    window[init.jsonpCallback] = function (data) {
        init.success(data);
    }
    var head = document.querySelector("head")
    head.appendChild(script);
}