window.onload = function () {
    function myAjax(obj) {
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
            init[key] = obj[key];
        }
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new.XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        };
        var params = "";
        for (var attr in init.data) {
            params += attr + "=" + init.data[attr] + "&";
        }
        if (params) {
            params = params.substring(0, params.length - 1)
        }
        if (init.type == "get") {
            init.url += "?" + params;
        }
        xhr.open(init.type, init.url, init.async)
        if (init.type == "get") {
            xhr.send(null)
        } else if (init.type == "post") {
            xhr.setRequestHearder("Content-type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
        if (init.async) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var result = null;
                        if (init.dataType == "json") {
                            result = xhr.responseText
                            result = JSON.parse(result)
                        } else if (init.dataType == "xml") {
                            result = xhr.responseXML
                        } else {
                            result = xhr.responseText;
                        }
                        init.success(result)
                    }
                }
            }

        } else {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var result = null;
                    if (init.dataType == "json") {
                        result = xhr.responseText
                        result = JSON.parse(result)
                    } else if (init.dataType == "xml") {
                        result = xhr.responseXML
                    } else {
                        result = xhr.responseText;
                    }
                    init.success(result)
                }
            }
        }
    }
}