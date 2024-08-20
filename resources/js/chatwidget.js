var isIE = /*@cc_on!@*/ false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

if (isIE == false) {
	window.onbeforeunload = function () {
		window.speechSynthesis.cancel();
	}

	if (typeof synth != 'undefined') {
		synth.cancel();
	}
} else {
	//document.write ("<script src=\"js/ieskins.js\"></scr"+"ipt>");
}

// 1-Added new script to check device
var pageWidth = window.innerWidth;
var pageIs = '';
if ((/Android|iPhone|Windows Phone/i.test(navigator.userAgent)) || pageWidth<450) {
	// Take the user to a different screen here.
	pageIs = 'is-mobile';
	console.log('mobile');
} else {
	pageIs ='';
}

var openCount = 0;
var div = document.createElement('div');
var baseUrl = "http://localhost:8088/SECApplication/";
var cssLink = baseUrl + "resources/css/chatwidget.css";
var chatUrl = baseUrl + "chat.html?var1=var1&var2=var2&var3=var3";
// var launcherImageUrl = baseUrl + "resources/images/sec/btn_avatar_icon.svg"; /*bot_icon.svg";*/
var launcherImageUrl = baseUrl + "resources/images/sec/btn_avatar_icon.svg"; /*bot_icon.svg";*/

// Will show on bot icon hover
var launcherImageToolTip = "Chat with Alkahraba bot";

// //Append Css to head
document.querySelector('head').innerHTML += '<link href="' + cssLink + '" type="text/css" rel="stylesheet"/>';

div.setAttribute('id', 'chatH');
document.getElementsByTagName('body')[0].appendChild(div);
//Append buttons and iframe
var banime = document.getElementById("fsChatWidget").getAttribute("data-anime");
var url = chatUrl;
// 2-Added new class with outerframe
var chatHtml = '<img src="' + launcherImageUrl + '" title="' + launcherImageToolTip + '" class="showchatbar ' + banime + '" id="showchatbar" onClick="showchat();"/><div class="outterFrame '+ pageIs +'" id="outterFrame"><span class="closeBtn" id="closeBtn" onClick="hidechat();"></span></div>';
// var chatHtml = '<img src="' + launcherImageUrl + '" title="' + launcherImageToolTip + '" class="showchatbar ' + banime + '" id="showchatbar" onClick="showchat();"/><div class="outterFrame" id="outterFrame"></div>';
document.getElementById('chatH').innerHTML = chatHtml;

var node = document.createElement('iframe');
node.setAttribute('sandbox', 'allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads');
node.setAttribute('src', url);
node.setAttribute('class', 'i_frame');
node.setAttribute('id', 'iframe');
node.setAttribute('allowfullscreen', '');
node.setAttribute('oncontextmenu', 'return false');
node.setAttribute('webkitallowfullscreen', 'true');
node.setAttribute('mozallowfullscreen', 'true');
//node.setAttribute('allow', 'microphone');
node.setAttribute('allow', "midi 'src'; geolocation 'src'; microphone 'src';");


var closeBtn = document.getElementById('closeBtn');

//Check if frame-chatbox set to be open or closed
var vstatus = document.getElementById("fsChatWidget").getAttribute("data-view");

if (vstatus == 'true') {
	if (screen.width > 480) {
		document.getElementById('outterFrame').style.display = 'block';
		document.getElementById('closeBtn').style.display = 'block';
	}
} else {
	document.getElementById('outterFrame').style.display = 'none';
	document.getElementById('closeBtn').style.display = 'none';
}
//show/hide chat box
function showchat(var1) {
	openCount++;
	var chatUrl1 = baseUrl + 'chat.html?var1='+var1;
	if (openCount == 1) {
		document.getElementById('outterFrame').appendChild(node);
	}
	document.getElementById('outterFrame').style.display = 'block';
	document.getElementById('closeBtn').style.display = 'block';
	document.getElementById('iframe').contentWindow.tobeSpeak = true;
	document.getElementById("showchatbar").classList.remove("bounce");
}

function hidechat() {
	document.getElementById('outterFrame').style.display = 'none';
	document.getElementById('closeBtn').style.display = 'none';
	document.getElementById('iframe').contentWindow.tobeSpeak = false;

	if (isIE == false) {
		document.getElementById('iframe').contentWindow.synth.cancel();
	}
	if (typeof document.getElementById('iframe').contentWindow.audio != 'undefined') {
		document.getElementById('iframe').contentWindow.audio.stop();
	}
	document.getElementById('iframe').contentWindow.recognition.stop();
}
closeBtn.setAttribute("title", "Minimize");

window.onmessage = function (event) {
	if (event.data === "refresh") {
		location.reload();
	}
};
window.getuserparam=function(name, url){
	if (!url) url = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
};
window.addEventListener('message', e => {
	if (e.origin !== window.location.origin) {
		return;
	}
	if (e.data == "CallMinimize") {	
		hidechat();
	}
	/*if (e.origin == "*"
        && e.data == "CallMinimize") {
        hidechat();
    }*/
}, false);