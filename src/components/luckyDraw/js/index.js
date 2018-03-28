var interval = 1000;

//大转盘规则
$("#look-gz").on('click', function() {
  $(".zz").show();
  $(".zpgz").show();
});
$(".cjgz-c").on('click', function() {
  $(".zz").hide();
  $(".zpgz").hide();
});
//中奖纪录
// $("#zjjl").on('click', function() {
//   $(".zz").show();
//   $(".zj").show();
// });
// $(".cjgz-c").on('click', function() {
//   $(".zz").hide();
//   $(".zj").hide();
// });

//获取参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}
var login = getQueryString("login");
var loginName = getQueryString("loginName");
var isapp = getQueryString("isapp");
var memberId = getQueryString("memberId");

//是否在APP&是否登录
if (isapp == 1) {
  if (login == 1) {
    $("#tzbtn").attr("href", "cjq:terminal");
  } else {
    $("#tzbtn").attr('href', 'cjq:login');
  }
} else {
  $("#share").hide();
  //$("#tzbtn").attr("href", "https://*****.html");
}

//抽奖代码
$(function() {
  var $btn = $('.g-lottery-img'); // 旋转的div
  var cishu = ""; //初始次数，由后台传入
	//抽奖-分享次数查询接口
	$.post("https://www.feizhugu.com/index.php/prize/info",{
		'uid':location.search.split("=")[1]
	}, function(result) {
		cishu=result.data.remain_num;
    // alert("您当前所拥有的抽奖次数："+result.data.remain_num)
		$('#cishu').html(cishu); //显示还剩下多少次抽奖机会
	});

  var isture = 0; //是否正在抽奖
  var clickfunc = function() {
    var data = "";
		$.post("https://www.feizhugu.com/index.php/prize/do",{
			'uid':location.search.split("=")[1]
		}, function(res) {
			data=res.data
			//抽奖-奖品列表接口
			$.post("https://www.feizhugu.com/index.php/prize/list", function(result) {
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].id == res.data) {
						rotateFunc(result.data[i].id, 25 + ((result.data[i].id - 1) * 45), result.data[i].name);
					}
				}
			});

    });

  }
  $(".zhizhen").click(function() {
    //判断是否投资然后是fou抽奖========================================================
    var touzi = "没投资11";
    if (touzi == "没投资") {
      $(".zz").show();
      $(".today").show();
      $(".cjgz-c").on('click', function() {
        $(".zz").hide();
        $(".today").hide();
      });
      $(".ok-img").on('click', function() {
        $(".zz").hide();
        $(".today").hide();
      });
    } else {
      $(".zz").hide()
      $(".today").hide();
      if (isture)
        return; // 如果在执行就退出
      isture = true; // 标志为 在执行
      if (cishu <= 0) { //当抽奖次数为0的时候执行
        $(".zz").show();
        $(".wcs").show();
        $(".ok-img").on('click', function() {
          $(".wcs").hide();
          $(".zz").hide();
        });
        // alert("没有次数了");
        $('#cishu').html(0); //次数显示为0
        isture = false;
      } else { //还有次数就执行
        cishu = cishu - 1; //执行转盘了则次数减1
        if (cishu <= 0) {
          cishu = 0;
        }
        $('#cishu').html(cishu);
        clickfunc();
      }
    }
  });
  var rotateFunc = function(awards, angle, text) {
    isture = true;
    $btn.stopRotate();
    $btn.rotate({
      angle: 0, //旋转的角度数
      duration: 4000, //旋转时间
      animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
      callback: function() {
        isture = false; // 标志为 执行完毕
        if(text=='谢谢参与'){
          $(".texts").html("非常遗憾，本次未中奖<br>谢谢参与，祝下次幸运");
        }else{
          $(".texts").html("恭喜您，已获得<br>" + text);
        }
        $(".zz").show();
        $(".jl-tk").show();
        $(".cjgz-c").on('click', function() {
          $(".zz").hide();
          $(".jl-tk").hide()
        });
        $(".ok-img").on('click', function() {
          $(".zz").hide();
          $(".jl-tk").hide()
        });
      }
    });
  };
});
