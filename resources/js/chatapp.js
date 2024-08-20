var usrText = $('#usertext');
var auto = false ;
var ccount= 0 ;
var convid = '';
var tout;
var pattern = '';
var isVal = false;
var emailValMsg = "Please enter valid email address.";
var mobileValMsg = "Please enter valid 10 digit mobile number";
var nameValMsg = "Please enter valid name";
var percMsg = 'Please enter valid percentage';
var expMsg = 'Please enter experience in years';
var enterBody = 'Please enter message body';
var enterSubject = 'Please enter subject';
var feedTextError = 'Please enter valid feedback';

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia; 

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
var messageForAgent=false;
var freeText=false;
var convFeedback='';
/* var micOpen=false; */

$(document).ready(function()
{

		pageWidth = $(window).width();
		if ((/Android|iPhone|Windows Phone/i.test(navigator.userAgent)) || pageWidth<450) 
		{
		    // Take the user to a different screen here.
		    $('body').addClass('mobile');
		} 
		else 
		{
		  	$('body').removeClass('mobile');
		}

		$('#speaker_on').trigger('click');
		$('#mic-switch').hide();
		$('#mySpeakerBtn').hide();
	
	
		var timestamp =''; /*moment(new Date()).format("YYYY-MM-DD HH:mm:ss");*/
		var timezone = ''; /*moment(new Date()).format("Z").replace('+', ' +');*/
		var conv_id = '';
		var listDisplay = false;
		var keywords = "";
		var getConvCount = 0;
		var query_count = 0;
		var query_hindi = "";
	
		if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod' || navigator.platform == 'Linux armv6l') 
		{
			$('.chattextbar').css('position','absoute');
			window.ontouchstart = function () 
			{
				$('.chattextbar').css('position','absoute');
			}
	
			window.onscroll = function() 
			{ 
				var iPadPosition = window.innerHeight + window.pageYOffset-45; // 45 is the height of the Footer
				 $(".chattextbar").css("position", "absolute");
				 $(".chattextbar").css("top", iPadPosition);
				 $(".chattextbar").css("display", "block");
			}
		}
	
	
		/*$("#usertext").on("keypress", function(e) 
		{
	    	if (e.which === 32 && !this.value.length)
	    	{
	    		e.preventDefault();
	    		usrText.removeClass('micOpen');
	    		if(isIE == false && isFirefox == false) 
	    		{
		    		//synth.cancel();
		    		synth.cancel()
		    		if(typeof audio!='undefined')
		    		{
	        			audio.stop();
	        		}
        		}
	    	}
		});*/
	
		var botContainerPre = '<div class="message message-operator "><span class="message-content">';
		var botContainerPost = '<span></div>';
		var userContainerPre = '<div class="message message-visitor"><span class="message-content">';
		var userContainerPost = '</span></div>';
		var res = "";
		var loader='<div class="message message-operator typing-indicator loading" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s">'+
			'<span class="message-content"></span>'+
			'<span class="message-content"></span>'+
			'<span class="message-content"></span>'+
		    '</div>';
		    
		 // startNewConversation();
	
		$('#ref123').click(function () 
		{
				$('.btnfeed').removeClass('active');
				$('.btnfeed').removeClass('disableMouseEvent');
				$("#feedText").html('Do you like our service?');
				$(".feedback_block .content").css('visibility','hidden');
  				$(".feedback_block").css('bottom','17px');
				$('.feedback_block').delay(500).fadeIn();
				
				query_count = 0;
				
				$('#ref').addClass("disableMouseEvent");
				$('.dropdown').addClass("disableMouseEvent");
				$('.message-container').html('');
				$('#usertext').val('');
				$('#form-message').addClass("disableMouseEvent");
				$('#overlayforchat').addClass('overlaychat');
				
				geturl();
				
				$('#usertext').removeClass('disableMouseEvent');
				$('#button-body').removeClass('disableMouseEvent');
				$('#button-body').attr("disabled", false);
				$('#button-body').prop("disabled", false);
				// $('#sugUL').empty();
				// $('#sugUL').html('');
				/*usrText.removeClass('micOpen');
				
				if (isIE == false && isFirefox == false) 
				{
					synth.cancel();
					recognition.stop();
					if (typeof audio != 'undefined') 
					{
						audio.stop();
					}
				}*/

			});
			
			
			$('.clicked').on('click',function(){
				if(!$('#button-body').is(":disabled")){
					//submitQuery();	
				}
			});

			$('#usertext').on('keyup',function(e){
				if(e.keyCode===13 && !$('#button-body').is(":disabled")){
					//submitQuery();	
				}
			});
	
			function submitQuery (e) 
			{
				
				/* if($("#usertext").hasClass('validateName') && !isVal)
				{
					isVal = validates.fullName($('#usertext').val());
				} 
				else if($("#usertext").hasClass('validateMobile'))
				{
					isVal = validates.mobileNo($('#usertext').val());
				}
				else if($("#usertext").hasClass('validateEmail'))
				{
					isVal = validates.emailId($('#usertext').val());
				} //else {isVal=false;}

				if(isVal)
				{
					$("#usertext").removeClass('validateName');
					$("#usertext").removeClass('validateMobile');
					$("#usertext").removeClass('validateEmail');
				} */
				
					query_count = query_count + 1;
					
					var reg = new RegExp(
						"[~!#$%^(){}\"<>|]"); // <(.|\n)*?>
//						$("#usertext").val().replace('\'', '');
//						$("#usertext").removeClass("auto-5");
//						
					/*usrText.removeClass('micOpen');
					if (isIE == false && isFirefox == false) 
					{
						synth.cancel();
						if (typeof audio != 'undefined') 
						{
							audio.stop();
						}
					}*/

					if (reg.test($("#usertext").val()) === true) 
					{
						var pre = '<div class="message message-operator abc"><span class="message-content">';
						var error = pre
							+ "Please enter valid query."
							+ botContainerPost;
						$('.message-container').append(
							error);
						$('.abc').delay(3000).fadeOut(
							'blind');
						$("#conversation-group").animate({scrollTop: $('#conversation-group').prop("scrollHeight")}, 1000);
						$('#usertext').val('');
						if (screen.width > 480) 
						{
							$("#usertext").focus();
						}
						//e.preventDefault();
					} 
					else if ($("#usertext").val() === '') 
					{
						var pre = '<div class="message message-operator abc"><span class="message-content">';
						var error = pre
							+ "Please enter your question"
							+ botContainerPost;
						$('.message-container').append(
							error);
						$('.abc').delay(3000).fadeOut(
							'blind');
						$("#conversation-group")
							.animate(
								{
									scrollTop: $(
										'#conversation-group')
										.prop(
											"scrollHeight")
								}, 1000);
						$('#usertext').val('');
						if (screen.width > 480) 
						{
							$("#usertext").focus();
						}
						//e.preventDefault();
					} 
					else if ($("#usertext").val().length > 512) 
					{
						var pre = '<div class="message message-operator abc"><span class="message-content">';
						var error = pre
							+ "Character limit exceeds"
							+ botContainerPost;
						$('.message-container').append(
							error);
						$('.abc').delay(3000).fadeOut(
							'blind');
						$("#conversation-group").animate({scrollTop: $('#conversation-group').prop("scrollHeight")}, 1000);
						$('#usertext').val('');
						if (screen.width > 480) 
						{
							$("#usertext").focus();
						}
						//e.preventDefault();
					} 
					else 
					{
						freeText=true;
						$('.irs').addClass("disableMouseEvent");
						$('#datetimepicker11').addClass("disableMouseEvent");
						$('.dateid:last').addClass("disableMouseEvent");
						$('.nmims-dp:last').addClass("disableMouseEvent");
						$('#form-message').addClass("disableMouseEvent");
						$('#overlayforchat').addClass('overlaychat');
						// $('#sugUL').empty();
						
						if(messageForAgent)
						{
							var userio = $('#usertext').val();
							$('.message-container').append(userContainerPre+userio+userContainerPost);
							$("#conversation-group").animate({
								scrollTop: $('#conversation-group').prop("scrollHeight")
							}, 1000);
							$('#usertext').val('');
							
							sendMessage(userio);

						}
						else
						{
							letsChat();
						}
						
						//e.preventDefault();
						$('#usertext').removeClass(
							"disableMouseEvent");
					 }
				
			}//SubmitQuery	
			
			$('#error_refresh').on('click', function () 
			{
				$('.spinner').css('display', 'block');
				
				var parent = window.parent;
				if (parent && parent.postMessage) 
				{
					parent.postMessage("refresh");
				}
				$('.spinner').hide();
			});

			$('#error_close').on('click', function () 
			{
				$('#errormodel').css({'display':'none','transition':'.2s ease'});
			});
	
		function letsChat()
		{
		
			var userio = $('#usertext').val();
			var user = userContainerPre + userio + userContainerPost
			$("#conversation-group").animate(
			{
				scrollTop: $('#conversation-group').prop("scrollHeight")
			}, 1000);
			$('#usertext').val('');
				
			getConv(userio);
				
			$(".btnClass").addClass("disableMouseEvent");
			$(".DropdownClass").addClass("disableMouseEvent");
			$('.yesnobtn').addClass("disableMouseEvent");
			$(".maleBtn1").addClass("disableMouseEvent");
			$(".femaleBtn1").addClass("disableMouseEvent");
			$('.irs').addClass("disableMouseEvent");
			$('#datetimepicker11').addClass("disableMouseEvent");
			$('.dateid:last').addClass("disableMouseEvent");
			$('.nmims-dp:last').addClass("disableMouseEvent");
			$('#usertext').removeClass("disableMouseEvent");
		
		}
		// #2F
 		function geturl() 
 		{
			$.ajax
			({
					url: 'login',
					method: 'post',
					data: '{"token":"' + token + '"}',
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					success: async function (data) 
					{
						login_details = data;
						saveclientData(data.sessionid);
						await getConversation('hi');
						$('#usertext').removeClass("disableMouseEvent");
					},
	
			});

		 }
		
		 // #3F	
		 function saveclientData(session)
		 {
				$.ajax
				({
					url:'saveClientInfo',
					type: 'POST',
					data: JSON.stringify
					({
					token: token,
					session: session,
					os: _client.getOs(),
					os_ver: _client.getOsVersion(),
					browser: _client.getBrowser(),
					browser_ver: _client.getBrowserVersion(),
					browser_maj_ver: _client.getBrowserMajorVersion(),
					device_type: _client.getDevicetype(),
					screen: _client.getScreenSize(),
					cookie_status: _client.getCookieStatus()
				}),
				contentType: 'application/json',
				dataType: 'json',
				async: true,
				success:function(data)
				{
					if(data==='true')
						console.log('Client info saved successfuly..!!!');
					else
						console.log('failed to save data');
				},
				fail:function(xhr)
				{
					console.log('Bad Request'+xhr);
				}
			});
		 }
	
  		function getConversation(userio) 
  		{
				$('.tout').remove();
				var userName = $("#username").val();
				// $('#sugUL').empty();
				// $('#sugUL').html('');
				//$('#loading').show();
				
				ccount++;
				
				$('.message-container').append(loader);
				//var link =parent.document.URL;
				$('.checkOpt').prop('disabled', true);
				$('#checkBtn label.container').attr('disabled', true);
				//com*$("#usertext").attr("disabled", "disabled");
				$("#usertext").addClass("disableMouseEvent");
				$('#usertext').attr('disable',true);
				$(".btnClass").addClass("disableMouseEvent");
				$(".DropdownClass").addClass("disableMouseEvent");
				$('.allbtn-1').addClass("disableMouseEvent");
				$('.slot-button-outlined-wrapper button').addClass("disableMouseEvent");
				$('#txt_subject').last().attr("disabled", true);
				$('#txt_message').last().attr("disabled", true);
				$('#sendMail').last().attr("disabled", true);
				$('#sendMail').last().prop("disabled", true);
				$('.sendCancel').last().attr("disabled", true);
				$('.sendCancel').last().prop("disabled", true);
				$('#txt_feedback').last().attr("disabled", true);
				$('.like_feed').last().attr("disabled", true);
				$('.dislike_feed').last().attr("disabled", true);
				$('.feed_submit').last().prop("disabled", true);
				$('.feed_submit').last().attr("disabled", true);
				$('.feed_cancel').last().prop("disabled", true);
				$('.feed_cancel').last().attr("disabled", true);
				$('.slotcancel').last().attr("disabled", true);
				$('.slotcancel').last().prop("disabled", true);
				$('.error_span2').empty();
				
				// $('#startDate').datetimepicker('show');
				// var userName = getCookie("username");
				/*if (isIE == false && isFirefox == false) 
				{
					synth.cancel();
					if (typeof audio != 'undefined') 
					{
						audio.stop();
					}
				}*/
				var userName = $("#username").val();
				if(!userName)
				{
					userName='User';
				}
				var cc = $("#cc-dropdown").val();
				var url_link = document.referrer;
				
				var payload = {};
				payload['message'] = userio;
				payload['token'] = token;
				payload['session_id'] = login_details.sessionid;
				payload['conv_timestamp'] = timestamp;
				payload['conv_timezone'] = timezone;
				payload['conv_id'] = conv_id;
				payload['url_data'] = document.referrer;
				payload['username'] = userName;
				payload['query_hindi'] = query_hindi;
				payload['link'] = document.referrer;
				payload['freeText']=freeText;
			
				$.ajax
				({
					url: 'conversation',
					method: 'POST',
					data: JSON.stringify(payload),
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					
					success: async function (data) 
					{
					
						var botAudio = new Audio('resources/images/fs/juntos-607.mp3');
						// await botAudio.play();
						conv_id = data.conv_id;
						convid=conv_id;
						var msg = data.message;
						botio = msg;

						
						botio = botio.replace(/~/g,
								"\"").replace('%2F', '/').replace('%3A', ':').replace('%24', '').replace('{name}', userName).replace('%2B', '+').replace('&plus;', '+').replace('&percnt;', '%');


						$('.loading:last').hide();
						$('.message-container').append(botio);
						//speakLoud(convertHtmlToText(botio));

						//com*$("#usertext").prop("disabled", false);
						$("#usertext").removeClass("disableMouseEvent");
						$('#usertext').attr('disable',false);
						$("#usertext").removeAttr("disabled");
						
						if (screen.width > 480) 
						{
							$("#usertext").focus();
						}
						
						$("#button").removeAttr("disabled");
						$('#usertext').removeAttr('readonly');
						
						$("#button").removeClass("disableMouseEvent");
						$(".dropdown").removeClass("disableMouseEvent");
						$('#ref').removeClass("disableMouseEvent");
						$('#button').removeClass('flash-button');
						$('#overlayforchat').removeClass('overlaychat');
						$('#form-message').removeClass("disableMouseEvent");
						$(".message-container div.message-operator").removeClass('isLast');
						$(".message-container div.message-operator:not('.no-icon'):last").addClass('isLast');
						$("#conversation-group").animate({
							scrollTop: $('#conversation-group').prop("scrollHeight")
						}, 1000);

						clearInterval(tout);
						timeOut();
						freeText=false;
						
					},
					error: function (xhr, ajaxOptions, thrownError) 
					{
					}
				});
				query_hindi = "";
		  } //End getConversation
		  
		  
		  	$('#feedback_yes').click(function()
		  	{
				//alert('Yes'+convid);
				sendFeedback('Yes',convid);
				$('.fimage').addClass('disableMouseEvent');
			});
			
			$('#feedback_no').click(function()
			{
				//alert('No'+convid);
				sendFeedback('No',convid);
				$('.fimage').addClass('disableMouseEvent');
			});
			
		var validates= {
			emailId:function(e)
			{
				//var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				var emailRegex = /^([a-zA-Z0-9_\.\-])+\@+(([a-zA-Z0-9]{2,4})+\.)+[a-zA-Z0-9]{2,4}$/;
    			var match = emailRegex.test($('#usertext').val());
				if(match)
				{
					var email=$('#usertext').val();
					var domain=email.substring(email.indexOf('@')+1,email.indexOf('.'));
					if(isNaN(domain))
					{
						$("#button-body").removeAttr("disabled");
						$(".errorS_block").fadeOut();
						return true;
					}
					else
					{
						$(".errorS_block").fadeIn(); return false;
					}
				}
				else
				{
					$(".errorS_block").fadeIn();
					$(".errorS_block").delay(5000).fadeOut();
					return false;
				}			
		
				return match;
			},
			mobileNo:function(e)
			{
				//var phoneRegex = /^[0-9]{10}$/;
				var phoneRegex = /^[6789][0-9]{9}$/;
		
    			var match = phoneRegex.test($('#usertext').val());
				if(match)
				{
					$("#button-body").removeAttr("disabled");
					$(".errorS_block").fadeOut();
					return true;
				} 
				else 
				{
					var fl = $('#usertext').val().charAt(0);
					$(".errorS_block").fadeIn();
					$(".errorS_block").delay(5000).fadeOut();
					return false;
				}
				
				return match;
			},
			fullName:function(f)
			{
				///*both compulsory*/ var fullNameRegex = /^([a-zA-Z]{3,20} )([a-zA-Z]{1,15} )?([a-zA-Z]{1,15})/gm;
				//var fullNameRegex = /^[a-zA-Z]{2,20}(?: [a-zA-Z]+){0,2}$/gm;
				var fullNameRegex = /^[a-zA-Z]{1,20}(?: [a-zA-Z]+){1,20}$/gm;
				var match = fullNameRegex.test($('#usertext').val());

				var wordInput = document.getElementById("usertext").value;
				wordInput = wordInput.toLowerCase();
				// split the words by spaces (" ")
				var arr = wordInput.split(" ");
				// unwanted words to look for, keep this array in lowercase
				var badWords = ["me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
				"yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself",
				"was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing",
				"an", "the", "and", "but", "if", "or", "because", "from", "up", "down", "in", "out", "on",
				"off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where",
				"why", "how", "all", "any", "it", "its", "itself", "they", "them", "their", "theirs", "themselve",
				"what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "should", "now",
				"as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into",
				"through", "during", "before", "after", "above", "below", "to", "just", "don", "both", "each",
				"few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so",
				"than", "too", "very", "can", "will","hi","good","morning","afternoon","night"];
				// .toLowerCase will do the case insensitive match!
				var foundBadWords = arr.filter(el => badWords.includes(el));
				var foundBadWordsL = foundBadWords.length;

				// if(match && foundBadWordsL==0){
				var spaceCount = (wordInput.split(" ").length - 1);
				if(match && foundBadWordsL==0 && spaceCount < 3)
				{	
					$("#button-body").removeAttr("disabled");
					$(".errorS_block").fadeOut();
					return true;
				}
				else 
				{
					$(".errorS_block").fadeIn();
					$(".errorS_block").delay(5000).fadeOut();
					return false;
				}
			}
		};
		
		
		function sendFeedback(feedback, cid) 
		{
				$('.btnfeed').removeClass('active');
				$('.btnfeed').addClass('disableMouseEvent');
				if (feedback === 'Yes') 
				{
					$('.feedYes').addClass('active');
					$("#feedText").html('Thank you for your feedback!');
					$('.feedback_block').delay(2500).fadeOut('blind');

				} 
				else 
				{
					$('.feedNo').addClass('active');
					$("#feedText").html('Thank you for your feedback!');
					$('.feedback_block').delay(2500).fadeOut('blind');
				}

				saveFeedback(feedback,cid,'bot','');

				setTimeout(function () 
				{
					$(".ftext").html('Was this chatbot helpful?');
				}, 3000);
		
		   }
		   
		   window.getConv = function (userio) 
		   {

				query_count = query_count + 1;
				getConvCount++;
				
				$('.imgbtn_container').addClass("disableMouseEvent");
				$('#ref').addClass("disableMouseEvent");
				$('.checkOpt').prop('disabled', true);
				$('#checkBtn label.container').attr('disabled', true);
			    // $('#usertext').addClass("form-control");
				$('#usertext').removeClass("auto-5");
				// $('#sugUL').empty();
				$('.dropdown').addClass("disableMouseEvent");
				$('.countryPick').addClass("disableMouseEvent");
				$(".animated").removeClass('animated');
				$(".maleBtn1").addClass("disableMouseEvent");
				$(".femaleBtn1").addClass("disableMouseEvent");
				$('.irs').addClass("disableMouseEvent");
				$('#datetimepicker11').addClass("disableMouseEvent");
				$('.dateid:last').addClass("disableMouseEvent");
				$('.nmims-dp:last').addClass("disableMouseEvent");
				$('#overlayforchat').addClass('overlaychat');
				// $('#sugUL').empty();
				
				if (userio != '{failure}' && userio != '{success}') 
				{
					var user = userContainerPre + userio
						+ userContainerPost
					$('.message-container').append(user);
				}
				$("#conversation-group").animate(
				{
					scrollTop: $('#conversation-group').prop("scrollHeight")
				}, 1000);
				
				//com*$("#usertext").attr("disabled", "disabled");
				$("#usertext").addClass("disableMouseEvent");
				$('#usertext').val('');
				$("#button").attr("disabled", "disabled");
				$('.yesnobtn').addClass("disableMouseEvent");
				$(".btnClass").addClass("disableMouseEvent");
				$(".DropdownClass").addClass("disableMouseEvent");
				$('.feed_submit').last().addClass("disableMouseEvent");
				$('.feed_cancel').last().addClass("disableMouseEvent");
				$('.noUi-target').last().addClass("disableMouseEvent");
				
				getConversation(userio);
				
				$('#usertext').removeClass("disableMouseEvent");
				// $('#startDate').data("DateTimePicker").disable();
				auto = false;
			}

			window.getConvLang = function (userio, value) 
			{
				query_hindi = userio;
				query_count = query_count + 1;
				getConvCount++;
				
				$('.imgbtn_container').addClass("disableMouseEvent");
				$('#ref').addClass("disableMouseEvent");
				$('.checkOpt').prop('disabled', true);
				$('#checkBtn label.container').attr('disabled', true);
				//$('#usertext').addClass("form-control");
				$('#usertext').removeClass("auto-5");
				// $('#sugUL').empty();
				$('.dropdown').addClass("disableMouseEvent");
				$('.countryPick').addClass("disableMouseEvent");
				$(".animated").removeClass('animated');
				$(".maleBtn1").addClass("disableMouseEvent");
				$(".femaleBtn1").addClass("disableMouseEvent");
				$('.irs').addClass("disableMouseEvent");
				$('#datetimepicker11').addClass("disableMouseEvent");
				$('.dateid:last').addClass("disableMouseEvent");
				$('.nmims-dp:last').addClass("disableMouseEvent");
				$('#overlayforchat').addClass('overlaychat');
				// $('#sugUL').empty();
				
				if (userio != 'image_uploaded_successfully' && userio != 'reg_e_id') 
				{
					
					var user = userContainerPre + userio
						+ userContainerPost
					$('.message-container').append(user);
				}
				$("#conversation-group").animate(
				{
					scrollTop: $('#conversation-group').prop("scrollHeight")
				}, 1000);
				
				//com*$("#usertext").attr("disabled", "disabled");
				$("#usertext").addClass("disableMouseEvent");
				$('#usertext').val('');
				$("#button").attr("disabled", "disabled");
				$(".btnClass").addClass("disableMouseEvent");
				$(".DropdownClass").addClass("disableMouseEvent");
				$('.yesnobtn').addClass("disableMouseEvent");
				
				getConversation(value);
				
				$('#usertext').removeClass("disableMouseEvent");
				// $('#startDate').data("DateTimePicker").disable();
				auto = false;
			}
			
			window.sendOption = function (userio, id) 
			{
				query_count = query_count + 1;
				getConvCount++;
				
				$('#ref').addClass("disableMouseEvent");
				$('.countryPick').addClass("disableMouseEvent");
				$(".animated").removeClass('animated');
				$(".maleBtn1").addClass("disableMouseEvent");
				$(".femaleBtn1").addClass("disableMouseEvent");
				$('.irs').addClass("disableMouseEvent");
				$('#datetimepicker11').addClass("disableMouseEvent");
				$('.dateid:last').addClass("disableMouseEvent");
				$('.nmims-dp:last').addClass("disableMouseEvent");
				document.getElementById(id).disabled = true;
				$('#overlayforchat').addClass('overlaychat');
				// $('#sugUL').empty();

				var opt = $("#" + id + " option:selected").text();
				console.log(opt);
				query_hindi = opt;
				var user = userContainerPre + opt + userContainerPost
				$('.message-container').append(user);
				$("#conversation-group").animate(
				{
					scrollTop: $('#conversation-group').prop("scrollHeight")
				}, 1000);
				
				//com*$("#usertext").attr("disabled", "disabled");
				$("#usertext").addClass("disableMouseEvent");
				$('#usertext').val('');
				$("#button").attr("disabled", "disabled");
				$('.yesnobtn').addClass("disableMouseEvent");
				$(".btnClass").addClass("disableMouseEvent");
				$(".DropdownClass").addClass("disableMouseEvent");
				
				getConversation(userio);
				
				$('#usertext').removeClass("disableMouseEvent");
				// $('#startDate').data("DateTimePicker").disable();
			}
			
			window.getDialog = function (userio) 
			{
				getConvCount++;

				$('#ref').addClass("disableMouseEvent");
				$('.dropdown').addClass("disableMouseEvent");
				$('#overlayforchat').addClass('overlaychat');
				// $('#sugUL').empty();
				$(".maleBtn1").addClass("disableMouseEvent");
				$(".femaleBtn1").addClass("disableMouseEvent");
				$("#conversation-group").animate(
				{
					scrollTop: $('#conversation-group').prop("scrollHeight")
				}, 1000);
				
				//com*$("#usertext").attr("disabled", "disabled");
				$("#usertext").addClass("disableMouseEvent");
				$('#usertext').val('');
				$("#button").attr("disabled", "disabled");
				$(".btnClass").addClass("disableMouseEvent");
				$(".DropdownClass").addClass("disableMouseEvent");
				$('.yesnobtn').addClass("disableMouseEvent");
				$('.irs').addClass("disableMouseEvent");
				$('#datetimepicker11').addClass("disableMouseEvent");
				$('.dateid:last').addClass("disableMouseEvent");
				$('.nmims-dp:last').addClass("disableMouseEvent");
				
				getConversation(userio);
				
				$('#usertext').removeClass("disableMouseEvent");
				// $('#startDate').data("DateTimePicker").disable();

			}
			
			window.showchatWindow = function () 
			{
				showchat();
			}
			
			window.questionLimit = function (question) 
			{
				var text = question.value.toLowerCase();
				isKeyw = false;
				var keywords = ["abc", "kentucky", "art", "history",
					"horses", "trail", "boating", "shopping",
					"weather", "climate", "attractions", "bourbon",
					"places", "people", "projects", "count",
					"distilleries"];

				/*
				 * if(text == ""){ $('#sugUL').hide(); }
				 */

				var name_le = question.value.length;
				if (name_le >= 512) 
				{
					var result = question.value.substring(0, 512);
					question.value = result;
				}

				listDisplay = false;

				// suggestions(text);

				// solrSuggestion(text);

				/*
				 * if(isKeyw == true){
				 * 
				 * var isSuggestion = true; keywordSuggestions(text); }
				 * else{
				 * 
				 * $('#sugUL').hide(); listDisplay = false;
				 * suggestions(text); }
				 */

			}
			
			// #1F
			async function startNewConversation() 
			{
				console.log('1');
				geturl();
				//getConversation('hi');
				//showfinalchatbox();
			}

			function showchat() 
			{
				count++;
			}

			$('.endAgent').on('click',function()
			{
				terminate();
			});
			
			// init script
			showchat();
			
			window.suggestionSelect = function (txt) {
				$('#usertext')
					.val(
						txt.replace(/<em>/g, '').replace(
							/<\/em>/g, ''));
				// $('#sugUL').html('');
				// synth.cancel();
				letsChat();
				// $('#usertext').val(txt.replace(/<em>/g,'').replace(/<\/em>/g,''));
				// $('#sugUL').empty();

			}
			/*
			 * window.checkValue =function(value){ alert($(this).val());
			 * $('#usertext').val($(this).val())}
			 */

			window.speechResponse = function (txt) {
				query_count = query_count + 1;
				$('#usertext').val(txt);
				letsChat();
			}
			window.speechResponse = function () {
				query_count = query_count + 1;
				letsChat();
			}
			/* End of Script for Speech to text */
});	

function hasWhiteSpace(s) 
{
	var userName = $("#username").val();

	if (userName.length === 1) 
	{
		userName = userName.replace(/\s/g, '');
	}
	
	/*
	 * var reg=new RegExp("[~!#$%^&*'(){}\"<>]");
	 * if(reg.test($("#username").val())===true){ $("#username").val(''); }
	 */
	 
	var ex = /^[a-zA-Z]+$/;
	if (!$("#username").val().match(ex)) 
	{
		$("#username").val('');
		$("#btnslideup").addClass("disableMouseEvent");
	}

	// userName = userName.replace(/\s/g,''); // Check for white space
	userName = userName.replace(/[`~!@#$%^&*()_|+\-=?;:,.<>\{\}\[\]\\\/]/g, '');
	userName = userName.replace(/[0-9]/g, '');// remove numbers

	if (userName.length > 100) 
	{
		userName = userName.substring(0, 100);
		// $("#username").val(userName);
	}

	if (userName.length >= 1) 
	{

		$("#btnslideup").css("background",
			"linear-gradient(to bottom, #ffffff 0%, #ffffff 99%) ");
		$("#btnslideup").css("color", "#493BCF");
		$("#btnslideup").removeClass("disableMouseEvent");
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') 
		{
			$("#btnslideup").click();
		}
	} 
	else 
	{
		$("#btnslideup").css("background", "#C3C3C3");
		$("#btnslideup").css("color", "#fff");
		$("#btnslideup").css("border", "1px solid #C3C3C3");
		$("#btnslideup").addClass("disableMouseEvent");
	}

	$("#username").val(userName);

}	

function timeOut()
{
	
	/*var pre='<div class="message message-operator" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;">'+
				'<div class="chat-message-wrapper">'+
                '<div class="chat-message-content">';*/
                
	var pre='<div class="message message-operator tout" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;">'+
				'<span class="message-content">';	 			
	var botContainerPost='</span></div>';
	
	var period = 900; //in seconds
	tout=setInterval(function()
	{
		period=period-1;
		_rem=period;
		if(_rem<=60)
		{
			if(_rem===60)
			{
				var mesg="Your session will expire in <span class='time'>1 minute.</span> Please give us your valuable feedback.";
				var me=pre+mesg+botContainerPost;
				$('.message-container').append(me);
				$("#conversation-group").animate(
				{
					scrollTop: $('#conversation-group').prop("scrollHeight")
				}, 1000);
				$('.handle').click();
				//speakLoud("Your session will expire in 1 minute. Please give us your valuable feedback.");
			}
			else if(_rem===0)
			{
				/*$('#errormodel').modal({
					show: 'true',
					backdrop: 'static',
					keyboard: false
				 });*/
				 $('#errormodel').fadeIn('slow');
				 clearInterval(tout);
			}
			else
			{
				$('.time').html(_rem+' seconds');
			}
		}
	},1000);

}

// Feedback toggle
$(".handle").click(function() 
{
	if ($(".feedback_block .content").css("visibility") === "hidden") 
	{
	    $(".feedback_block .content").css('visibility','visible');
  		$(".feedback_block").css('bottom','70px');
	} 
	else
	 {
		$(".feedback_block .content").css('visibility','hidden');
  		$(".feedback_block").css('bottom','17px');
	}
  
});

window.vp=function(e)
{
  var x=e;
  if (isNaN(x) || x < 0 || x > 100)
  { 
  return false;
  }
  else
  {
	 var decimalSeparator=".";
	 var val=""+x; 
	 if(val.indexOf(decimalSeparator)<val.length-3)
	 {
	    return false;
	 } 
  } 
  return true;
}

window.ve=function(e)
{
  var xE = e;
  if (isNaN(xE) || xE < 0 || xE > 50){ return false;}
  else
  {
	 var decimalSeparatorE=".";
	 var valE=""+xE; 
	 if(valE.indexOf(decimalSeparatorE)<valE.length-3)
	 {
	    return false;
	 } 
  } 
  return true;
}

window.fnLikeDislike=function(c)
{
	$('.feedld').removeClass('active');
	if(c=='l')
	{
		$('.like_feed').last().addClass('active');
		$('.feed_submit').last().removeClass('disableMouseEvent');
		convFeedback='Like';
	}
	else if(c=='d')
	{
		$('.dislike_feed').last().addClass('active');
		$('.feed_submit').last().removeClass('disableMouseEvent');
		convFeedback='Dislike';
	}
}

window.submitConvFeedback=function()
{
	var expr = /^[a-zA-Z0-9.,_ ]*$/;
	var message='';
	$('#txt_feedback').each(function()
	{
		message=$(this).val();
	});
	
    if (!expr.test(message)) 
    {
    	$('.error_feedtext').last().html(feedTextError);
    } 
    else 
    {
    	$('.error_feedtext').last().html('');
    	getConv("Submit");
    	saveFeedback(convFeedback,convid,'node',message);
    }
	
}

function saveFeedback(value,convid,type,message)
{
	var payload={};
	payload['convid']=convid;
	payload['type']=type;
	payload['value']=value;
	payload['message']=message;
	payload['session_id'] = login_details.sessionid;

	$.ajax({
		url:'savefeedback',
		method:'POST',
		contentType: 'application/json;charset=utf-8',
		dataType:'json',
		data:JSON.stringify(payload),
		success:function(data){

		},
		fail:function(err){

		}
		
	});
}

function getSelSlot(v)
{
	$('.slotInput').last().val(v);
	$('#slot_submit').last().prop("disabled", false);
	$('#slot_submit').last().attr("disabled", false);
	$('#slot_submit').last().removeClass('disableMouseEvent');
}

/* window.sendMail = function()
 	{
	
		var userName = $("#username").val();
		//payload['message'] = userio;
		var subject = $.trim($(".subject").last().val());
		var body = $.trim($(".body").last().val());
		if(subject=='')
		{
			$('.subErr').last().empty().html(enterSubject);
			//$('.subErr').last().delay(5000).html('');
		} 
		else if(body=='')
		{
			$('.bodyErr').last().empty().html(enterBody);
			$('.subErr').last().empty();
		} 
		else
		{
			$('.subErr').last().empty();
			$('.bodyErr').last().empty();
			var conv_id = '';
			var timestamp = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
			var timezone = moment(new Date()).format("Z").replace('+', ' +');
		
			var payload = {};
			
			payload['subject'] = subject;
			payload['body'] = body;
			payload['token'] = token;
			payload['session_id'] = login_details.sessionid;
			payload['conv_timestamp'] = timestamp;
			payload['conv_timezone'] = timezone;
			payload['conv_id'] = conv_id;
			payload['url_data'] = document.referrer;
			payload['username'] = userName;
		
			$.ajax(
			{
					url: 'sendMail',
					method: 'POST',
					data: JSON.stringify(payload),
					contentType: 'application/json;charset=utf-8',
					success: function (data) {
					
					var msg = data;
					
					if(msg == "{success}")
					{
						getConv("{success}");
					}
					else
					{
						getConv("{failure}");
					}

					$('#txt_subject').last().attr("disabled", true);
					$('#txt_message').last().attr("disabled", true);
					$('#sendMail').last().attr("disabled", true);
					$('#sendMail').last().prop("disabled", true);
					$('.sendCancel').last().attr("disabled", true);
					$('.sendCancel').last().prop("disabled", true);
					//txt_subject
					//txt_message
					//sendMail
					//.sendCancel
				
					},
					fail: function (xhr, ajaxOptions, thrownError) 
					{
					
					}
			 });
		}
	} 
*/


/* function getiframeurl()
{
	var url_link =	 $('#iframe').html(window.location.href);
   	var str =url_link[0].baseURI;
   	$.ajax({url : "api/v1/iframe.do",
   		method : "GET",
   		async : true,
   		data :({url_data :str}),
   		success: function(data) {
   			var url_link =	 $('#iframe').html(window.location.href);
   		}
   	}).done(function(data) { 
   		var status = data;
   	}).fail(function(){
   		bootbox.alert("Error to get url");
   	});
 } */

/* window.getPdfFile = function (fileName) {


	$.ajax({
		url: 'getDoc',
		type: 'POST',
		data: {
			file: fileName
		},
		async: false,
		success: function (data) {
			window.open("data:application/pdf;base64," + data);
		},
		fail: function (xhr) {
			console.log('Bad Request' + xhr);
		}
	});


	//window.location="getDoc?file="+fileName;
} */