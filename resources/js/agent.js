var aftn='null';
var session='';
var sk='';
var tobePoll='false';
var channel='';
var _name='';
var message='';
var interval;
    
window.sendMessage=async function(_message){
        var payload={};
        payload['aftn']=aftn;
        payload['sk']=sk;
        payload['message']=_message;
        payload['session_id']=session;
        payload['channel']=channel;
        payload['conv_id']=convid;

        await $.ajax({
            url:'chatwithagent',
            type:'POST',
            contentType:'application/json',
            data:JSON.stringify(payload),
            success:function(data){
                data=JSON.parse(data);
                               
                if(data.initialized){
                    tobePoll='true';
                    if(data.aftn)
                        aftn=data.aftn;
                    if(data.sk)
                        sk=data.sk;

                    if(data.name)
                        _name=data.name;
                    if(data.message){
                        message=data.message;
                        $('.agentname').text('Connected to '+_name+'...');
                        var pre='<div class="message message-operator message-agent-1 agent-name" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;">'+
                        '<span class="agent-name-init">'+_name.charAt(0)+'</span>'+
                        '<span class="message-content">';
                        var post='</span></div>';
                        $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">You are now connected to a student counsellor.</span></div>')
                        $('.message-container').append(pre+data.message+post);
                        $("#conversation-group").animate({
                            scrollTop: $(
                            '#conversation-group')
                            .prop("scrollHeight")
                        }, 1000);
                    }
                    else{
                        $('.agentname').text('Waiting for Counsellor...');
                        $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">You are now connected to a student counsellor.</span></div>')
                        message='';      
                        //TODO: agent typing to be added
                        var agentTyping='<div class="message message-operator typing-indicator loading" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s">'+
                            '<span class="agent-name-init">N</span>'+
                            '<span class="message-content"></span>'+
                            '<span class="message-content"></span>'+
                            '<span class="message-content"></span>'+
                        '</div>';
                        $('.message-container').append(agentTyping);
                        $("#conversation-group").animate({
                            scrollTop: $(
                            '#conversation-group')
                            .prop("scrollHeight")
                        }, 1000);              
                    }
                        
                }
                else{
                    if(data.reason){
                        tobePoll='false';
                    //if(!interval){
                        $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">Connection is not possible due to '+data.reason+'!</span></div>');
                        $("#conversation-group").animate({
                            scrollTop: $(
                            '#conversation-group')
                            .prop("scrollHeight")
                        }, 1000);
                        $('span.online').hide();
                        messageForAgent=false;
                        aftn='null';
                        sk='';
                    }
                    
                   // }
                }
            },fail:function(err){
                console.log(err);
                $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">Connection with Counsellor is Failed!</span></div>')
                $("#conversation-group").animate({
                    scrollTop: $(
                    '#conversation-group')
                    .prop("scrollHeight")
                }, 1000);
                $('span.online').hide();
                messageForAgent=false;
                aftn='null';
                sk='';
                
            }
        });
    }

window.pollMessage=async function(){
        
        if(tobePoll==='true'){
            var resp='';
            var payload={};
            payload['aftn']=aftn;
            payload['sk']=sk;
            payload['session_id']=session;
            payload['channel']=channel;
            payload['conv_id']=convid;
            //interval=await setInterval(async function(){
              await $.ajax({
                    url:'pollMessage',
                    type:'POST',
                    contentType:'application/json',
                    
                    data:JSON.stringify(payload),
                    success:function(data){
                        var _continue=false;
                        if(data==='{}')
                            _continue=true;
                        
                        data=JSON.parse(data);
                        console.log(data.initialized);
                        if(data.typing){
                            //TODO: agent typing to be added
                            if(data.name)
                                _name=data.name;
                            var agentTyping='<div class="message message-operator typing-indicator loading" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s">'+
                                '<span class="agent-name-init">'+_name.charAt(0)+'</span>'+
                                '<span class="message-content"></span>'+
                                '<span class="message-content"></span>'+
                                '<span class="message-content"></span>'+
                            '</div>';
                            $('.loading:last').hide();
                            $('.message-container').append(agentTyping);
                        }
                        else{
                           //TODO: agent typing to be hidden
                           $('.loading:last').hide();
                        }

                        if(data.initialized){
                           if(data.aftn)
                                aftn=data.aftn;
                           if(data.sk)
                                sk=data.sk;
                           
                           tobePoll='true';
                           if(data.name)
                                _name=data.name;
                           if(data.message){
                                message=data.message;
                                $('.agentname').text('Connected to '+_name+'...');
                                var pre='<div class="message message-operator message-agent-1 agent-name" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;">'+
                                '<span class="agent-name-init">'+_name.charAt(0)+'</span>'+
                                '<span class="message-content">';

                                var post='</span></div>';
                                $('.message-container').append(pre+data.message+post);
                                $("#conversation-group").animate({
                                    scrollTop: $(
                                    '#conversation-group')
                                    .prop("scrollHeight")
                                }, 1000);

                                pollMessage();
                            }
                            else{
                                message='';
                                pollMessage();
                            }
                        }
                        else{
                            if(!_continue){
                                tobePoll='false';
                                $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">Oops! Session got terminated, please try again !</span></div>')
                                $("#conversation-group").animate({
                                    scrollTop: $(
                                    '#conversation-group')
                                    .prop("scrollHeight")
                                }, 1000);
                                $('span.online').hide();
                                messageForAgent=false;
                                aftn='null';
                                sk='';
                            }
                        }
                            
                    },fail:function(){
                        console.log(err);
                        $('span.online').hide();
                        $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">Connection with Counsellor is Failed!</span></div>')
                        $("#conversation-group").animate({
                            scrollTop: $(
                            '#conversation-group')
                            .prop("scrollHeight")
                        }, 1000);
                        messageForAgent=false;
                        aftn='null';
                        sk='';
                    }
                });     
           // },8000);
        }else{
            //if(interval){
                $('span.online').hide();
                $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">Connection with Counsellor is Disconnected!</span></div>')
                $("#conversation-group").animate({
                    scrollTop: $(
                    '#conversation-group')
                    .prop("scrollHeight")
                }, 1000);
                //clearInterval(interval);
                messageForAgent=false;
                aftn='null';
                sk='';
            //}
        }
    }
window.terminate=function(){
        $('span.online').hide();
        $('.message-container').append('<div class="message message-operator message-new-agent-1" style="transition: transform 0.2s ease 0s, margin 0.2s ease 0s;"><span class="message-content">Connection with Counsellor is Disconnected!</span></div>')
        $("#conversation-group").animate({
            scrollTop: $(
            '#conversation-group')
            .prop("scrollHeight")
        }, 1000);
        //clearInterval(interval);
        messageForAgent=false;
        aftn='null';
        sk='';
        $('.loading:last').hide();
}