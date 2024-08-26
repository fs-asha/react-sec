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
}//
 
var openCount = 0;
var div = document.createElement('div');
 
//var baseUrl = "https://sec-chatbot-uat.sec.se.com.sa/SECApplication-dev/";
 
//UAT
var baseUrl = "https://fs-asha.github.io/react-sec/";
 
//local
//var baseUrl ="http://localhost:8020/SECApplication-phase3/";
 
//prd
//var baseUrl = "https://sec-chatbot.se.com.sa/SECApplication/";
 
var cssLink = baseUrl + "resources/css/chatwidget.css";

// //Append Css to head
document.querySelector('head').innerHTML += '<link href="' + cssLink + '" type="text/css" rel="stylesheet"/>'; 
 
function hidechat() {
	const outterFrame = document.getElementById('outterFrame');
	outterFrame.style.display = 'none';
	outterFrame.classList.add('hide');
	outterFrame.classList.remove('show');
}
 
window.onmessage = function (event) {
	if (event.data === "refresh") {
		location.reload();
	}
};

window.addEventListener('message', e => {
	if (e.data == "CallMinimize") {	
		hidechat();
	}
}, false);