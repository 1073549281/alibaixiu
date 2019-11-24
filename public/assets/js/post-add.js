// 向服务器端发送请求 获取文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {
        console.log(response);
        var html = template('categoryTpl', { data: response })
        $('#category').html(html);
    }
})

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function() {
    // this.files[0] 用户选择的文件
    var formData = new FormData();
    formData.append('cover', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            console.log(response);
            //实现头像预览功能
            $('#thumbnail').val(response[0].cover)
        }
    })
})

// 当添加文章表单提交的时候
$('#addForm').on('submit', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 实现添加文章功能
    $.ajax({
            type: 'post',
            url: '/posts',
            data: formData,
            success: function() {
                location.href = '/admin/posts.html'
            }
        })
        // 阻止表单默认提交的行为
    return false;
})