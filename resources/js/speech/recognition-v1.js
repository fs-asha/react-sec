/*var userSpeechBox=$('.userSpeechBox');
var botSpeechBox=$('.botSpeechBox');
var userSpeech=$('#userSpeech');
var botSpeech=$('#botSpeech');*/
var recognition='';
var recSupport=false;
var mic=$('.mic-btn');
mic.attr('title','Press & Speak');
var spinner=$('.spinner');
spinner.hide();
var message=$('.message');
var mediaSupport=false;
var constraints={audio:{
    echoCancellation: true,autoGainControl: false, noiseSuppression: true
}};
var count=0;
var recorder;
var audioChunks=[];
var resultarea=$('#usertext');
var instant=0.0;
var _mic;
var startIco='<i class="fa fa-microphone"></i>';
//var stopIco='<i class="fa fa-microphone-slash"></i>';
var stopIco='<i class="fa fa-microphone" style="color:#a92424"></i>';
var _scriptNode;
var meter=$('#micMeter');/*var userSpeechBox=$('.userSpeechBox');
var botSpeechBox=$('.botSpeechBox');
var userSpeech=$('#userSpeech');
var botSpeech=$('#botSpeech');*/
var recognition='';
var recSupport=false;
var mic=$('.mic-btn');

var spinner=$('.spinner');
spinner.hide();
var message=$('.message');
var mediaSupport=false;
var constraints={audio:{
    echoCancellation: true,autoGainControl: false, noiseSuppression: true
}};
var count=0;
var recorder;
var audioChunks=[];
var resultarea=$('#usertext');
var instant=0.0;
var _mic;
var startIco='<i class="fa fa-microphone"></i>';
//var stopIco='<i class="fa fa-microphone-slash"></i>';
var stopIco='<i class="fa fa-microphone" style="color:#a92424"></i>';
var _scriptNode;
var meter=$('#micMeter');
var BUFFER_SIZE=4096; //supported size : 1024, 2048, 4096, 8192, 16384.
var INPUT_CHANNEL=1;
var OUTPUT_CHANNEL=1;
var BUFFER_PER_SEC=0;
var SILENCE_SEC=5;
var MAX_INT=Math.pow(2, 16 - 1) - 1;
//var url = "wss://localhost:8443/KTApplication/converse"; 
var url ="wss://dashboard.findabilityplatform.com:5773/KTApplication-test/converse";
//var url ="wss://muw.findabilityplatform.com/KTChatBot/converse";
var mimeType='';
var socket='';
/*var speakInit=$('#modalInit');*/
	
$(document).ready(function(){
		
	/*userSpeechBox.hide();
	botSpeechBox.hide();*/
	
	try {
	    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
	    recognition = new SpeechRecognition();
	    recSupport=true;
	    
	}
	catch(e) {
		console.log('Browser doesn\'t support SpeechRecognition');
	}
	  
	if(recSupport){
		chromeStreamRecognition();
	}
	else{
		try{
			socket = new WebSocket(url);
		}
		catch(e){
			console.log('Error new Websocket: '+e);
		}
		try{
			socket.onopen=event=>{
				console.log("Connection is Open..!!!");
			}
		}
		catch(e){
			console.log('Error in opening Websocket: '+e);
		}
	    
		
		watsonChunkRecognition();
	}
	
	//mic Event
	mic.on('click',()=>{
        if(mic.hasClass('animate-pulse')){
            if(recSupport){
            	recognition.stop();
            	$('#sugUL').html('');
            	
            }
            else{
            	mic.removeClass('animate-pulse');
	            mic.html(startIco)
	            stopStreaming();
	            $('#sugUL').html('');
	           
            }
        }
        else{
            if(recSupport){
            	recognition.start();
            	$('#sugUL').html('');
            	usrText.addClass('micOpen');
            	usrText.attr("disabled","disabled");
            	window.speechSynthesis.cancel();
            	if(typeof audio!='undefined'){
            		audio.stop();
            	}
            	
            }
            else{
            	$('#sugUL').html('');
            	startStreaming();
            	synth.cancel();
            	if(typeof audio!='undefined'){
            		audio.stop();
            	}
            }    
                
        }
    });
	
	function watsonChunkRecognition(){
		

	    switch(BUFFER_SIZE){
	        case 1024:BUFFER_PER_SEC=44;break;
	        case 2048:BUFFER_PER_SEC=22;break;
	        case 4096:BUFFER_PER_SEC=11;break;
	        case 8192:BUFFER_PER_SEC=6;break;
	        case 16384:BUFFER_PER_SEC=3;break;
	    }

	    function hasUserMedia(){
	        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	    }
	    
	    mediaSupport=hasUserMedia(()=>{
	        console.log('Browser supports to access media devices.');
	    },()=>{
	        console.log('Browser don\'t supports to access media devices.');
	    });
	        
	}
    function startStreaming(){
    	mic.attr('title','Listening');
    	$('#ref').addClass("disableMouseEvent");
		resultarea.addClass("disableMouseEvent");
        $('#send').addClass("disableMouseEvent");
        $('.message-container').addClass('disableMouseEvent');
        
        mic.html('<i class="fa fa-microphone" style="color:#a92424"></i>');
	    mic.addClass('animate-pulse');
        
        if(mediaSupport){
            navigator.mediaDevices.getUserMedia(constraints)
            .then(
                stream=>{
                    console.log('streaming...');
                    audioChunks = [];
                    recorder=new MediaRecorder(stream);
                    recorder.start();
                    mimeType=recorder.mimeType;

                    var _context=new AudioContext();
                    _mic=_context.createMediaStreamSource(stream);
                    _scriptNode=_context.createScriptProcessor(BUFFER_SIZE,INPUT_CHANNEL,OUTPUT_CHANNEL);

                    recorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    _mic.connect(_scriptNode);
                    _scriptNode.connect(_context.destination);
                    
                    _scriptNode.onaudioprocess=stream=>{
                        var input=stream.inputBuffer.getChannelData(0);

                        var input_buffer=Int16Array.from(input.map(n=>{
                            return n * MAX_INT;
                        }))


                        var sum=0.0;
                        for(i=0;i<input.length;i++){
                            sum+=input[i]*input[i];
                        }
                       
                        instant=Math.sqrt(sum/input.length);
                        var vol=(instant.toFixed(2)*10).toFixed(2);
                        console.log(vol);
                        meter.val(vol);

                        if(vol>0.70)
                            count=0;
                        else
                            count++;
                        
                        if(count>(BUFFER_PER_SEC*SILENCE_SEC)){
                            console.log('silence occured from last 5 sec');
                            stopStreaming();
                        }
                    }   
                    
                    recorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks,{type:'audio/webm'});
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        //audio.play();
                        getArrayBuffer(audioBlob);
                        //TODO add spinner for audio is processing
                        
                    });
            })
            .catch(
                err=>{
                    console.log('Error while connecting media');
                }
            );
        }else{
            console.log('media support not available');
        }
    }
    
    //Recorder Stop Event
    
    //Function to stop Streaming
    function stopStreaming(){
        if(recorder.state=='recording'){
        	recorder.stop();
        	mic.hide();
            spinner.show();
        }
        else
            console.log('recorder is not running to close');
       
        _scriptNode.disconnect();
        _mic.disconnect();
        
        meter.val(0);
        mic.removeClass('animate-pulse');
        mic.html('<i class="fa fa-microphone"></i>');
        mic.attr('title','Press & Speak');
        
        resultarea.html('');
        count=0;
    }

    function getArrayBuffer(blob){
        var fr=new FileReader();
        var aBuffer;
        
        fr.addEventListener('loadend',function(){
            aBuffer=fr.result;
            socket.binaryType='arraybuffer';

            var reqBody='{message:"",ab:"'+new Int8Array(aBuffer)+'",'+
                        'mimeType:"'+mimeType+'"}';
            if(socket.OPEN){
                socket.send(reqBody);
            }
        });

        fr.readAsArrayBuffer(blob);
    }

    if(recSupport==false){
    	socket.addEventListener('message',function(event){
            resultarea.val(event.data);
            if(event.data==''){
            	$('.message-container').removeClass('disableMouseEvent');
                $('#ref').removeClass("disableMouseEvent");
    			resultarea.removeClass("disableMouseEvent");
                $('#send').removeClass("disableMouseEvent");
                mic.show();
                spinner.hide();
                var pre='<div class="chat-message chat-message-recipient animated fadeIn abc">'+
    			'<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">'+
                '<div class="chat-message-wrapper">'+
                '<div class="chat-message-content">'
                var botContainerPost='</div>';
                var error=pre+"I'm unable to recognize your voice, please try again."+botContainerPost;
    			$('.message-container').append(error);
    			$('.abc').delay(3000).fadeOut('blind');
    			$("#style-3").animate({ scrollTop: $('#style-3').prop("scrollHeight")}, 1000);
                
            }
            setTimeout(function(){
                if(resultarea.val()!=''){
                	mic.show();
                	spinner.hide();
                	$('.message-container').removeClass('disableMouseEvent');
                	speechResponse();
                }
                
            },3000);
        });

    }
    	
	
	
	function chromeStreamRecognition(){
		  
		recognition.continuous=false;
		recognition.interimResults=true;
		recognition.lang='en-US';
		  
		recognition.onerror=function(event){
			console.log('Recognition error: '+event)
		}
		    
		recognition.onstart=function(){
			$('.message-container').addClass('disableMouseEvent');
			mic.attr('title','Listening');
			console.log('Recognition started');
		    mic.html('<i class="fa fa-microphone" style="color:#a92424"></i>');
		    mic.addClass('animate-pulse');
		    $('#send').addClass("disableMouseEvent");
		    $('#ref').addClass("disableMouseEvent");
        	
		    
		    /*message.text('Listening...');*/
		}
		    
		recognition.onend=function(){
			mic.attr('title','Press & Speak');
			console.log('Recognition disconnected');
		    mic.html('<i class="fa fa-microphone"></i>');
		    mic.removeClass('animate-pulse');
		    usrText.removeAttr("disabled");
		    $('#send').removeClass("disableMouseEvent");
		    $('.message-container').removeClass('disableMouseEvent');
		    $('#ref').removeClass("disableMouseEvent");
		}
		recognition.onspeechend=function(){
			console.log('Recognition disconnected');
		    mic.html('<i class="fa fa-microphone"></i>');
		    mic.removeClass('animate-pulse');
		    usrText.removeAttr("disabled");
		    $('#send').removeClass("disableMouseEvent");
		    $('.message-container').removeClass('disableMouseEvent');
		    $('#ref').removeClass("disableMouseEvent");
		    mic.attr('title','Press & Speak');
		}

		    
		recognition.onresult=function(event){
			$('.message-container').removeClass('disableMouseEvent');   
			$('.message').html('');
			for(var i=event.resultIndex;i<event.results.length;++i){
				var str='';
				if(event.results[i].isFinal){
					/*$('.message').html(event.results[i][0].transcript);
					speechResponse(event.results[i][0].transcript);*/
					usrText.val(event.results[i][0].transcript);
					speechResponse(event.results[i][0].transcript);
		        }else{
		        	str+=event.results[i][0].transcript;
		        	usrText.val(str);
		        	/*$('.message').append(event.results[i][0].transcript);*/
		        	
		        }
		    }
		        
		}
		
		
		/*speakInit.on('click',()=>{
			recognition.start();
		});*/
		
		
/*		$(".mic-btn").click(function() {
			$('.chatcontentbox .chat-message:last-of-type').css('padding-bottom','100px');
			$("#style-3").animate({ scrollTop: $('#style-3').prop("scrollHeight")}, 1000);
		});
		$("#closeMic").click(function() {
			$('.chat-message:last-of-type').css('padding-bottom','1%');
		});  
*/	
	}
});
