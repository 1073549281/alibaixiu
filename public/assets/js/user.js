//当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload()
        },
        error: function() {
            alert('用户添加失败')
        }
    })
    return false;
})

// 当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function() {
    // this.files[0] 用户选择的文件
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
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
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})

//向服务器发送请求.获取列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response);
        //使用模板引擎将数据和HTML字符串数据拼接
        var html = template('userTpl', { data: response });
        // 将拼接好的HTML字符串显示在页面中
        $('#userBox').html(html)
    }
})

//通过事件委托的方式为编辑按钮添加事件
$('#userBox').on('click', '.edit', function() {
    //获取点击用户的id
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyTpl', response)
            $('#modifyBox').html(html)

        }
    })
})

//为修改表单添加事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            // 修改用户信息成功 重新加载页面
            location.reload()
        }
    })
    return false
})


//添加删除事件
$('#userBox').on('click', '.delete', function() {
    if (confirm('您确定要删除吗')) {
        //获取用户的id
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})

//获取全选按钮
var selectAll = $('#selectAll');
//获取批量删除按钮
var deleteMany = $('#deleteMany');
//选中全选按钮状态发生改变
selectAll.on('change', function() {
    //获取全选按钮当前状态
    var status = $(this).prop('checked');
    if (status) {
        // 显示批量按钮
        deleteMany.show();
    } else {
        // 隐藏批量按钮
        deleteMany.hide();
    }
    //获取到所有的用户并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked', status)
})

//当复选按钮发生改变时
$('#userBox').on('change', '.userStatus', function() {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }
    //如果选中复选数量大于0,说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量按钮
        deleteMany.show();
    } else {
        // 隐藏批量按钮
        deleteMany.hide();
    }
})

//为批量删除添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    //获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    //循环复选框
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    })
    if (confirm('您确定要进行批量删除操作吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }
})