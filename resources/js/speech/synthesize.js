        var playbtn=$('#playbutton');
        var VOICES;
        var audio;
        var tobeSpeak=true;
        var autoMic=false;
        var synth=window.speechSynthesis;
        var utterThis;
        var voiceModel='hi-IN'//'Google UK English Female';
        /*var modalSpeaker=$('#modalSpeaker');*/
        var headerSpeaker=$('#mySpeakerBtn');
        $('#mySpeakerBtn').attr('title','Mute');
        
        synth.onvoiceschanged=()=>{
	        VOICES=synth.getVoices();
	        //console.log(VOICES);
	        var i=0;
	        for(var i=0;i<VOICES.length;i++){
				if(VOICES[i].lang===voiceModel){
					voiceModel=VOICES[i].lang;
					
	   			}
			}
        }
        
        function speakLoud(txt){
        	txtToSpeak=txt
			   //playbtn.click();

			   var len = txtToSpeak.length;
        	var txt = txtToSpeak.split(".");
        	
        	for(var k=0;k< txt.length;k++){
    			
    			if(txt[k]!==''){
					var utterThis=new SpeechSynthesisUtterance(txt[k]);
					for(var i=0;i<VOICES.length;i++){
						if(VOICES[i].lang===voiceModel){
							utterThis.voice=VOICES[i];
							utterThis.lang=VOICES[i].lang;
							break;
						}
					}
				
					utterThis.rate=0.9;
					utterThis.pitch=1; 	
					//utterThis.volume=1;
				
					if($('#mySpeakerBtn').hasClass('speaking') && tobeSpeak){
						synth.speak(utterThis);
					}
				}
				
        	}
			   

        }
        
        playbtn.on('click',event=>{
        	var len = txtToSpeak.length;
        	var txt = txtToSpeak.split(".");
        	
        	for(var k=0;k< txt.length;k++){
    			
    		var utterThis=new SpeechSynthesisUtterance(txt[k]);
    		
	    		for(var i=0;i<VOICES.length;i++){
	    		   if(VOICES[i].name===voiceModel){
	    			   utterThis.voice=VOICES[i].voice;
	    			   utterThis.lang=VOICES[i].lang;
	    			   break;
	                }
    		}
    		
    	    utterThis.rate=1;
    	    utterThis.pitch=1; 	
    	    
    	    if($('#mySpeakerBtn').hasClass('speaking') && tobeSpeak){
    	    	synth.speak(utterThis);
    	    }
        }
    	   
    	}); 
        
        headerSpeaker.on('click',()=>{
        	if(headerSpeaker.hasClass('speaking')){
        		/*modalSpeaker.attr('src','resources/images/speaker_h80_off.png');*/
        		//headerSpeaker.attr('src','resources/images/speaker_h80_white_off.png');
                $('#speaker_off').show();
                $('#speaker_on').hide();
        		$('#mySpeakerBtn').removeClass('speaking');
        		$('#mySpeakerBtn').attr('title','Unmute');
        		window.speechSynthesis.cancel();
        		if(typeof audio!='undefined'){
            		audio.stop();
            	}
        		
        	}
        	else{
        		$('#mySpeakerBtn').addClass('speaking');
        		/*modalSpeaker.attr('src','resources/images/speaker_h80.png');*/
        		$('#mySpeakerBtn').attr('title','Mute');
                $('#speaker_off').hide();
                $('#speaker_on').show();
        		//headerSpeaker.attr('src','resources/images/speaker_h80_white.png');
        	}
        	
        });
        
/*        modalSpeaker.on('click',()=>{
        	if(headerSpeaker.hasClass('speaking')){
        		modalSpeaker.attr('src','resources/images/speaker_h80_off.png');
        		headerSpeaker.attr('src','resources/images/speaker_h80_white_off.png');
        		$('#mySpeakerBtn').removeClass('speaking');
        		window.speechSynthesis.cancel();
        		
        	}
        	else{
        		$('#mySpeakerBtn').addClass('speaking');
        		modalSpeaker.attr('src','resources/images/speaker_h80.png');
        		headerSpeaker.attr('src','resources/images/speaker_h80_white.png');
        	}
        });*/
        function speakLoud1(text){
        	
        	if(typeof audio!='undefined'){
        		audio.stop();
        	}
        	if($('#mySpeakerBtn').hasClass('speaking') && tobeSpeak){

	        	var oReq = new XMLHttpRequest();
	        	var url= "api/v1/converttext?text="+encodeURIComponent(text)+"&key="+key;				
	        					
	        	oReq.contenttype="text/html";
	        	oReq.open("GET",url, true);
	        	oReq.responseType = "arraybuffer";
	        	var context=new AudioContext();
	        	
	        	oReq.onload = function(oEvent) {
	        	  
	        	  var arrayBuffer = oReq.response;
	        	  
	        	  var byteArray = new Uint8Array(arrayBuffer);
	        	  
	        	  var blob=new Blob([byteArray]);
	        	  var audioUrl = URL.createObjectURL(blob);
	        	  
	        	  audio=new Howl({
	        		 src:[audioUrl],
	        		 format: ['wav'],
	                 autoplay: true
	        	  });
	        	  /*
	              audio = new Audio(audioUrl);
	              
		            if($('#mySpeakerBtn').hasClass('speaking') && tobeSpeak){
		            	audio.play();
		  	        }*/
	        	};
	        	oReq.send();
	        }
        	
        }

        if(typeof audio!='undefined'){
        	audio.ended=function(){
            	//console.log('Speaking ended');
            	if(usrText.hasClass("micOpen") && tobeSpeak){
            		recognition.start();
            	}
            }
        }
        
        