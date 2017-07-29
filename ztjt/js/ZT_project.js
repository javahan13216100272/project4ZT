var list = '';
$(function() {
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
		console.log("跳转到移动端页面");
		this.location.href="https://rawgit.com/javahan13216100272/project4ZT/master/ztjt/html/ZT_project4mobile.html";
	}else{
		console.log("PC端");
	}
	console.log("init start");
	getJson("https://rawgit.com/javahan13216100272/project4ZT/master/ztjt/json/itemList.json");
	document.getElementsByClassName("queryBtn")[0].onclick = function() {
		compare(document.getElementsByClassName("queryInput")[0].value);
	};
	document.onkeyup = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
                case 13:
                    document.getElementsByClassName("queryBtn")[0].click();
                    break;
                default:
                    break;
            }
        }
	$(".help").eq(0).hover(function(){
	    $(".help").eq(0).css("display","");
	},function(){
	    $(".help").eq(0).css("display","none");
	});
	console.log("init finish");
});
function getJson(url) {
	console.log('getJson');
	$.ajax({
		url: url,
		data: {},
		type: 'GET',
		dataType: 'json',
		async: false,
		success: function(data) {
			list = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("数据请求错误,请刷新重试!");
		}
	})
}
function replaceStr(str) {
	var newStr = str.toUpperCase();
	newStr = newStr.replace("(", "\\(");
	newStr = newStr.replace(")", "\\)");
	newStr = newStr.replace("+", "\\+");
	newStr = newStr.replace("*", "\\*");
	newStr = newStr.replace("-", "\\-");
	newStr = newStr.replace("?", "\\?");
	newStr = newStr.replace(/\s+/g, "");
	newStr = newStr.replace(" ", "");
	return newStr;
}
function replaceValue(str) {
	var newStr = str.toUpperCase();
	newStr = newStr.replace(/\s+/g, "");
	newStr = newStr.replace(" ", "");
	return newStr;
}
function compare(keyWord) {
	document.getElementsByClassName("queryInfo")[0].innerHTML = "";
	document.getElementsByClassName("queryInfo")[0].innerHTML = "正在为您查询,请稍后...";
	console.log("显示正在为你查询");
	var arr = [];
	var reg = new RegExp(replaceStr(keyWord));
	if (keyWord == "") {
		document.getElementsByClassName("queryInfo")[0].innerHTML = "";
// 		console.log("显示空");
		alert("查询的产品名称不能不填!");
		return;
	}
	for (var i = 0; i < list.length; i++) {
// 		console.log("循环到",i);
		var person = new Object();
		for (var item in list[i]) {
			if (replaceValue(list[i][item]).match(reg)) {
				person.name = list[i]["物料编码"];
				person.des = list[i]["物料描述"];
				person.oprize = list[i]["原开单价"];
				person.nprize = list[i]["新开单价"];
			}
		}
		if (person.name != undefined) {
			arr.push(person);
		}
	}
	var oFrag = document.createDocumentFragment();
// 	console.log("定义创建片段");
	for (var item in arr) {
		var tr = document.createElement("tr");
		tr.className = "tbodytr";
		var tdname = document.createElement("td");
		tdname.className = "tdname";
		var tdnameN = document.createTextNode(arr[item].name);
		tdname.appendChild(tdnameN);
		var tddes = document.createElement("td");
		tddes.className = "tddes";
		var tddesN = document.createTextNode(arr[item].des);
		tddes.appendChild(tddesN);
		var tdopriz = document.createElement("td");
		tdopriz.className = "tdopriz";
		var tdoprizN = document.createTextNode(arr[item].oprize);
		tdopriz.appendChild(tdoprizN);
		var tdnpriz = document.createElement("td");
		tdnpriz.className = "tdnpriz";
		var tdnprizN = document.createTextNode(arr[item].nprize);
		tdnpriz.appendChild(tdnprizN);
		tr.appendChild(tdname);
		tr.appendChild(tddes);
		tr.appendChild(tdopriz);
		tr.appendChild(tdnpriz);
		oFrag.appendChild(tr);
// 		console.log("添加tr");
	}
	document.getElementsByClassName("queryContent")[0].appendChild(oFrag);
// 	console.log("片段显示");
	if (arr.length == 0) {
		document.getElementsByClassName("queryInfo")[0].innerHTML = "没有符合条件的记录!";
	} else {
		document.getElementsByClassName("queryInfo")[0].innerHTML = "查询完毕, 符合条件的产品一共有<b style=\"color:red;padding-left:5px;padding-right:5px\">" + arr.length + "</b>件";
	}
	console.log("显示查询结果");
	return arr;
}
