function gotop(){
	$("html,body").animate({scrollTop: '0px'}, 600);
}
$(".search").blur(function(data,status){
	var keywords = $(".search").val();
	
	if( keywords == ''){
		$(".cat-title").removeClass("mdui-hidden");
	}
	
});
var h = holmes({
    input: '.search',
    find: '.link-space',
    placeholder: '<h3>未搜索到匹配结果！</h3>',
    mark: false,
	hiddenAttr: true,
	// 找到了就添加visible类，没找到添加mdui-hidden
    class: {
      visible: 'visible',
      hidden: 'mdui-hidden'
    },
    onHidden(el) {
	//   console.log('hidden', el);
	  
    },
    onFound(el) {
	//   console.log('found', el);
	  $(".cat-title").addClass("mdui-hidden");
    },
    onInput(el) {
		$(".cat-title").addClass("mdui-hidden");
    },
    onVisible(el) {
		$(".cat-title").removeClass("mdui-hidden");
    },
    onEmpty(el) {
		$(".cat-title").removeClass("mdui-hidden");
    }
  });
//鼠标移动到链接修改为原始URL

//js获取协议和域名部分
function get_domain(){
  //获取协议
  var protocol = window.location.protocol;
  protocol = protocol + '//';
  //获取端口号
  var port = window.location.port;
  if( (port == 80) || (port == 443) ){
    port = '';
  }
  var hostname = window.location.hostname;
  domain = protocol + port + hostname;
  return domain;
}
//弹窗
function msg(text){
  // alert('dfd');
  $html = '<div class = "msg">' + text + '</div>';
  $("body").append($html);
  $(".msg").fadeIn();
  $(".msg").fadeOut(3000);
  // $(".msg").remove();
}

function admin_menu() {
  // 加载管理员右键菜单
    //初始化菜单
    $.contextMenu({
      selector: '.link-space',
      callback: function(key, options) {
       link_id = $(this).attr('id');
      link_id = link_id.replace('id_','');
          
   },
      items: {
        "open":{name: "打开",icon:"fa-external-link",callback:function(key,opt){
            var link_id = $(this).attr('id');
            link_id = link_id.replace('id_','');
            var tempwindow=window.open('_blank');
            tempwindow.location='./index.php?c=click&id='+link_id+'&u='+u;
          }},
          "edit": {name: "编辑", icon: "edit",callback:function(key,opt){
            var link_id = $(this).attr('id');
            link_id = link_id.replace('id_','');
            var tempwindow=window.open('_blank');
            tempwindow.location='./index.php?c=admin&page=edit_link&id='+link_id+'&u='+u;
          }},
          "delete": {name: "删除", icon: "delete",callback:function(){
              var link_id = $(this).attr('id');
              link_id = link_id.replace('id_','');
              mdui.confirm('确认删除？',
              function(){
                  $.post("./index.php?c=api&method=del_link"+'&u='+u,{id:link_id},function(data,status){
                    //如果删除成功，则移除元素
                    if(data.code == 0) {
                      $("#id_" + link_id).remove();
                    }
                    else{
                      //删除失败
                      mdui.alert(data.msg);
                    }
                  });
              },
              function(){
                //点击取消按钮，不做操作
                return true;
              }
            );
          }},
          "sep1": "---------",
          "qrcode": {name: "二维码", icon:"fa-qrcode",callback:function(data,status){
              var link_title = $(this).attr('link-title');
              var url = $(this).attr('link-url');
              mdui.dialog({
                'title':link_title,
                'cssClass':'show_qrcode',
                'content':'<img src = "https://qr.png.pub/v1/?text=' + url + '" />'
              });
          }},
          "copy":{name:"复制链接",icon:"copy",callback:function(){
            link_url = $(this).attr('link-url');
            // 复制按钮
            var copy = new clipBoard($(".context-menu-icon-copy"), {
              beforeCopy: function() {
                
              },
              copy: function() {
                return link_url;
                
              },
              afterCopy: function() {
                layer.msg('链接已复制！');
              }
          });
            // 复制按钮END
    
          }}

      }
  });
      // 加载右键菜单END
}


function user_menu() {
  // 加载游客右键菜单
//初始化菜单
$.contextMenu({
  selector: '.link-space',
  callback: function(key, options) {
   link_id = $(this).attr('id');
  link_id = link_id.replace('id_','');
      
},
  items: {
    "open":{name: "打开",icon:"fa-external-link",callback:function(key,opt){
        var link_id = $(this).attr('id');
        link_id = link_id.replace('id_','');
        var tempwindow=window.open('_blank');
        tempwindow.location='./index.php?c=click&id='+link_id+'&u='+u;
      }},
      "sep1": "---------",
      "qrcode": {name: "二维码", icon:"fa-qrcode",callback:function(data,status){
          var link_title = $(this).attr('link-title');
          var url = $(this).attr('link-url');
          mdui.dialog({
            'title':link_title,
            'cssClass':'show_qrcode',
            'content':'<img src = "https://qr.png.pub/v1/?text=' + url + '" />'
          });
      }},
      "copy":{name:"复制链接",icon:"copy",callback:function(){
        link_url = $(this).attr('link-url');
        // 复制按钮
        var copy = new clipBoard($(".context-menu-icon-copy"), {
          beforeCopy: function() {
            
          },
          copy: function() {
            return link_url;
            
          },
          afterCopy: function() {
            layer.msg('链接已复制！');
          }
      });
        // 复制按钮END

      }}

  }
});
    // 加载游客右键菜单END
};

// 添加链接按钮
$("#add").click(function(){
  open_add_link();
});

function open_add_link(){
  layer.open({
    type: 2,
    title: '添加链接',
    maxmin: true,
    shadeClose: true, //点击遮罩关闭层
    area : ['800px' , '520px'],
    content: './index.php?c=admin&page=add_link_tpl&u='+u
  });
}
//搜索框失去焦点
function clean_search(){
  $(".search").val('');
  $(".search").blur();
}
//搜索框得到焦点
function on_search(){
  $(".search").focus();
  $(".search").val('');
}
$("a").click(function() {
	$("html, body").animate({
		scrollTop: $($(this).attr("href")).offset().top - 60 + "px"
	}, 500);
	return false;
});
