
window.onload=function(){
    //getJson();
    loadJson("https://rawgit.com/javahan13216100272/project4ZT/master/ztjt/itemList.json");
}
function getJson(){
    console.log('getJson')
    $.ajax({
      url:'https://rawgit.com/javahan13216100272/project4ZT/master/ztjt/itemList.json',
      data:'',
      type:'POST',
      dataType:'json',
      async:false,
      success:()
    })
}
function loadJson(url)
{
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
			document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
