
window.onload=function(){
	console.log("window.onload");
    getJson("https://rawgit.com/javahan13216100272/project4ZT/master/ztjt/json/itemList.json");
    //loadJson("https://rawgit.com/javahan13216100272/project4ZT/master/ztjt/itemList.json");
}
function getJson(url){
    console.log('getJson')
    $.ajax({
      url:url,
      data:{},
      type:'POST',
      dataType:'json',
      async:false,
      success:function(data){
      	console.log('success,data=',data)
      },
		error:function(XMLHttpRequest, textStatus, errorThrown){
			console.log("error");
			console.log("status:",XMLHttpRequest.status);
 			console.log("readyState",XMLHttpRequest.readyState);
 			console.log("textStatus",textStatus);
		}
    })
}
function loadJson(url)
{
	console.log("loadJson:",url)
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			console.log("xmlhttp.responseText=",xmlhttp.responseText);
			document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
