// // 向服务器端发送请求 创建评论内容(在没有给测试数据的时候)
// $.ajax({
//     type: 'post',
//     url: '/comments',
//     data: {
//         author: '5dd7b7d9aad3c5e60c8958c7',
//         content: '999999999999',
//         post: '5dda74131f9afb1bd12c5a61'
//     },
//     success: function(response) {
//         console.log(response);

//     }
// })

// 向服务器端发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        var html = template('commentsTpl', response)
        $('#commentsBox').html(html)
        var page = template('pageTpl', response);
        $('#pageBox').html(page)
    }
})

// 分页
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('commentsTpl', response)
            $('#commentsBox').html(html)
            var page = template('pageTpl', response);
            $('#pageBox').html(page)
        }
    })
}

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function() {
    // 获取当前评论的状态
    var status = $(this).attr('data-status');
    // 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function() {
            location.reload()
        }
    })
})

// 当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('您确定要删除吗')) {
        // 获取管理员要删除的评论的id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求 删除评论
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})