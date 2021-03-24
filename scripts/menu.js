$(function(){
    var $goods = $('#goods');
    var $name = $('#name');
    var $price = $('#price');
    var $amount = $('#amount');
    //GET请求参数
    // var list = {};

    // 获取模板
    var goodsTemplate = $('#goods-template').html();


    // 网页中展示添加的商品
    function addCommodity(commodity){
        $goods.append(Mustache.render(goodsTemplate,commodity));
    }


    //获取所有商品并展示
    $.ajax({
        //请求方式
        type : "GET",
        //请求地址
        url : "http://localhost/phpN/goods.php",
        // dataType:'json',
        crossDomain: true,
        //数据，json字符串
        // data : JSON.stringify(list),
        // contentType: 'text/json; charset=utf-8',
        cache: false,
        processData: false,
        //请求成功
        success : function(commodity) {
            commodity = eval(commodity);
            $.each(commodity,function(i,commodity){
                addCommodity(commodity);
            });
        },
        //请求失败，包含具体的错误信息
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
            console.log(XMLHttpRequest.responseText); 
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus); // parser error;
        }
    });



    // 增加商品
    $('#add-commodity').on('click',function(){
        var commodity = {
            name: $name.val(),
            price: $price.val(),
            stock: $amount.val()
        };

        $.ajax({
            type:'POST',
            url:'http://localhost/phpN/goodsAddPost.php',
            // data:JSON.stringify(commodity),
            data:commodity,
            crossDomain: true,
            dataType:"text",
            success: function(newGoods){
                // console.log(newGoods);
                // $goods.location.reload();
                if($name.val()!=newGoods){
                    alert(newGoods);
                }else {addCommodity(commodity);alert("add success!");};
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                // console.log('fail');
                alert("add failed!");
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    });




    // 删除商品
    $goods.delegate('.remove','click',function(){

        var $li = $(this).closest('li');

        $.ajax({
            type:'DELETE',
            dataType:"text",
            crossDomain: true,
            url:'http://localhost/phpN/goodsDelete.php?'+$li.attr('data-id'),
            success: function(newGoods){
                // console.log('Success');
                // parent.location.reload();
                console.log(newGoods);
                $li.fadeOut(300,function(){
                    $(this).remove();
                });
            },
            error: function(XMLHttpRequest, textStatus) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                // console.log('fail');
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    });




    // 编辑商品
    $goods.delegate('.editGoods','click',function(){
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.price').val($li.find('span.price').html());
        $li.find('input.stock').val($li.find('span.stock').html());
        $li.find('button.remove').hide();
        $li.addClass('edit');
    });



    // 取消编辑
    $goods.delegate('.cancelEdit','click',function(){
        var $li = $(this).closest('li');
        $(this).closest('li').removeClass('edit');
        $li.find('button.remove').show();
    });



    // 保存编辑结果
    $goods.delegate('.saveEdit','click',function(){
        var $li = $(this).closest('li');
        var commodity = {
            name: $li.find('input.name').val(),
            price: $li.find('input.price').val(),
            stock: $li.find('input.stock').val()
        };

        $.ajax({
            type:'PUT',
            url:'http://localhost/phpN/goodsEdit.php?'+$li.attr('data-id'),
            // data:JSON.stringify(commodity),
            data:commodity,
            crossDomain: true,
            dataType:"text",
            success: function(goodsEdit){
                // console.log(goodsEdit);
                // $goods.location.reload();
                $li.find('span.name').html(commodity.name);
                $li.find('span.price').html(commodity.price);
                $li.find('span.stock').html(commodity.stock);
                $li.removeClass('edit');
                $li.find('button.remove').show();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //这个error函数调试时非常有用，如果解析不正确，将会弹出错误框
                console.log(XMLHttpRequest.responseText); 
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus); // parser error;
            }
        });
    })
});
