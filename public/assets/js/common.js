$('#logout').on('click', function() {
    var isConfirm = confirm('您确定要退出吗');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})


// 向服务器端发送请求 索要登录用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        console.log(response);

        $('.profile .avatar').attr('src', response.avatar)
        $('.profile .name').html(response.nickName)
    }
})