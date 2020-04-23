$(function(){
    var $userForm = $('#userForm');
    var $userFormArea = $('#userFormArea');
    var $users = $('#users');
    var $username = $('#username');
    var $errorMessage = $('#errorMessage');
    var $messageArea = $('#messageArea');
    var username = null;

    $username.keypress(function(e){
        $errorMessage.css("display","none");
    })

    $userForm.submit(function(e){
        e.preventDefault();
        username = $username.val();

        socket.emit('new User',username,function(data) {
            if(data) {
                $userFormArea.css("display","none");
                $messageArea.show();
            }
        })
        $username.val('');
    })

    socket.on('username Taken',function(data){
        $errorMessage.show();
    })

    socket.on('get users',function(data){
        var html = '';
        for(let i=0;i<data.length;i++) {
            if(data[i] !== username) {
                html += '<li class ="alert alert-success" id=' + data[i] + '>' + data[i] + '</li>';
            }
            else {
                html += '<li class ="alert alert-danger"  id="userTag" >'+ data[i] + '</li>';
            }
        }

        $users.html(html);

        for(let i=0;i<data.length;i++) {
            if(data[i] != username) {
                $(`#${data[i]}`).click(function () {
                    $privateMessage.show();
                    privateMessageEnabled = true;
                    userSequence = i;
                });
            }
        }
    })

})