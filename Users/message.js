$(function() {
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');
    var $feedback = $('#feedback');

    //KeyPressing Event
    $message.keypress(function(e){
        socket.emit('typing',{});
    })


    //Listening Typing.
    socket.on('typing',function(data){
        $feedback.html('<p><em>' + data + ' is typing a message...</em></p>');
        setTimeout(function() {
            $feedback.html('');
        },5000)
    })

    //Submitting The Message.
    $messageForm.submit(function(e){
        e.preventDefault();
        if(privateMessageEnabled) {
            socket.emit('private message',{
                userSeq : userSequence,
                msg : $message.val()
            })
        }
        else {
            socket.emit('send message', $message.val());
        }
        $message.val('');
    })

    //New Message.
    socket.on('new message',function(data){
        $feedback.html('');
        $chat.append('<div class="well alert alert-dark"><strong>'+data.user+': </strong>'+data.msg+ '</div>');
    })

    //Disable Private Messaging.
    $privateMessage.click(function() {
         removePrivateMessaging()
    })
})

function removePrivateMessaging() {
    privateMessageEnabled = false;
    userSequence = null;
    $privateMessage.css("display","none");
}