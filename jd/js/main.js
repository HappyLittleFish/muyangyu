// 开始执行
$(document).ready(function(){

	// 顶部导航开始
	// 顶部地址开始
	showHideDropDown('.current-address-item','.user-address-list');
	showHideDropDown('.top-list-myjd','.top-list-myhome');
	showHideDropDown('.top-list-service','.top-list-service-content');
	showHideDropDown('.top-list-nav','.top-list-nav-content');

	// 显示隐藏dropdown
	function showHideDropDown(className1,className2){
		function show(){
			$(className1).addClass('link-active');
			$(className2).css('display','block');
		}
		function hide(){
			$(className2).css('display','none');
			$(className1).removeClass('link-active');
		}
		$(className1).on({
			mouseover: show,
			mouseout: hide
			});
		$(className2).on({
			mouseover: show,
			mouseout: hide
		});
	}

	// 点击任意地址，隐藏盒子
	$('.user-address-list a').click(function(event){
		var address = $(this).html();
		$('.current-address-link').removeClass('current-address-link');
		$(this).addClass('current-address-link');
		$('.current-address-content').html(address);
		setTimeout(function(){
			$('.user-address-list').css('display','none');
			$('.current-address-item').removeClass('link-active');
		},300);
	});



	// catagory-item 图片移动动画
	// 方法一  通过transform 给元素添加删除类名
	// 
	// moveLeftImg(".mid-item1");
	// moveLeftImg(".mid-item6");
	// moveLeftImg(".mid-item7");
	// moveLeftImg(".mid-item8");
	// 
	function moveLeftImg(str){
		var eleName = str + " a img";
		var whatEle = str + " .move-right";
		$(eleName).hover(function(){
			$(this).addClass('move-left');
		},function(){
			$(this).removeClass('move-left');
			$(this).addClass('move-right');
			setTimeout(function(){
				$('.move-right').removeClass('move-right');
			},600);
		});
	}

	// 方法二  通过animate控制backgroundPosition
	// 
	// 
	animateImg('.mid-item1');
	animateImg('.mid-item6');
	animateImg('.mid-item7');
	animateImg('.mid-item8');

	function animateImg(str){
		var eleName = str + " a";
		$(eleName).hover(function(){
			console.log("nihao");
			$(this).stop(true,false).animate({
				backgroundPositionX:"-=10px",
			},300);
		},function(){
			console.log("bye");
			$(this).stop(true,false).animate({
				backgroundPositionX:"0px", 
			},300);
		});
	}

	$('.item-mid a img').hover(function(){
		// console.log('nihao');
		$(this).stop(true,false).animate({marginRight:'5px'},300);
	},function(){
		$(this).stop(true,false).animate({marginRight:'0px'},300);
	});

	// 底部广告标志滚动动画
	$('.item-bot').hover(function(){
		$(this).find('.item-bot-arrow').css('display','block');
		// console.log("nihao");
	},function(){
		$(this).find('.item-bot-arrow').css('display','none');
	});

	function brandAnimation(removeWidth){
		var newLeft = $this.parent().prev().css('left');
		var moveTo = parseInt(newLeft) + removeWidth;
		var time = 400;
		var interval = 10;
		var speed = removeWidth/(time/interval);

		function go(){
			if((removeWidth < 0 && parseInt($this.parent().prev().css('left')) > moveTo) ||
				(removeWidth > 0 && parseInt($this.parent().prev().css('left')) < moveTo)){
				$this.parent().prev().css('left',parseInt($this.parent().prev().css('left')) + speed + "px");
				console.log(parseInt($this.parent().prev().css('left')));
				setTimeout(go,interval);
			}else{
				// $this.parent().prev().css('left',moveTo + "px");
				if(parseInt($this.parent().prev().css('left')) <= -2280){
					$this.parent().prev().css('left',-570);
				}
				if(parseInt($this.parent().prev().css('left')) >= 0){
					$this.parent().prev().css('left',-1710);
				}
			}
		}
		go();
	}


	$('.bot-arrow-prev').on('click',function(){
		// 方法一
		// $this = $(this);
		// brandAnimation(-570);
		
		//方法二
		if(parseInt($(this).parent().prev().css('left')) === -2280){
			$(this).parent().prev().animate({"left":"+=1710px"},0);
		}
		$(this).parent().prev().animate({"left":"-=570px"},600);
	});

	$('.bot-arrow-next').on('click',function(){
		// 方法一
		// $this = $(this);
		// brandAnimation(570);
		
		//方法二
		if(parseInt($(this).parent().prev().css('left')) === 0){
			$(this).parent().prev().animate({"left":"-=1710px"},0);
		}
		$(this).parent().prev().animate({"left":"+=570px"},600);
	});

	// $('.bot-arrow-prev').on('click',function(){
		// console.log($('.item-bot-list').css('marginLeft'));
		// console.log($('.catagory-item-left .item-bot-list').offset().left);
		// listLeft = $('.item-bot-list').css('left');
		// moveWidth = parseInt(listLeft) - 570;
		// var time = 300;
		// var interval = 10;
		// var speed = -570/(time/interval);
		// go();
		// var timer = setInterval(go(),10);

		// function go(){
		// 	if(parseInt($('.item-bot-list').css('left')) > moveWidth){
		// 		$('.item-bot-list').css('left',parseInt($('.item-bot-list').css('left')) + speed);
		// 		setTimeout(go(),interval);
		// 	}else{
		// 		$('.item-bot-list').css('left',moveWidth + "px");
		// 		if(moveWidth < -1140){
		// 			$('.item-bot-list').css('left',0);
		// 		}
		// 		if(moveWidth > 0){
		// 			$('.item-bot-list').css('left',-1140);
		// 		}
		// 	}
		// }


		// var  listLeft = $('.catagory-item-left .item-bot-list').css('left');
		// var  leftWidth = parseInt(listLeft) - 570 +"px";
		// console.log(leftWidth);

		// if(parseInt(leftWidth) < -1140){
		// $('.catagory-item-left .item-bot-list').css('left',0);
		// return;
		// }
		// var  leftWidth = parseInt(listLeft) - 570 +"px";
		// $('.catagory-item-left .item-bot-list').css('left',leftWidth);
	// });


	// $('.bot-arrow-next').on('click',function(){
	// 	// $('.catagory-item-left .item-bot-list').offset().left += 570;
	// 	// var  listLeft = $('.catagory-item-left .item-bot-list').offset().left;
	// 	var  listLeft = $('.catagory-item-left .item-bot-list').css('left');
	// 	var  leftWidth = parseInt(listLeft) + 570  +"px";
	// 	if(parseInt(leftWidth) > 0){
	// 		$('.catagory-item-left .item-bot-list').css('left',-1140);
	// 		return;
	// 	}
	// 	$('.catagory-item-left .item-bot-list').css('left',leftWidth);
	// });




	// 左侧导航开始
	$(window).scroll(function(){
		var top = $(document).scrollTop();
		var menu = $('#leftbar');
		var items = $('.container-catagory-item');
		var currentId = "";

		if (top > 100){
            menu.show();
        }else{
            menu.hide();
        }

		items.each(function(){
			$this = $(this);
			var itemTop = $this.offset().top;
			if(top > itemTop - 300){
				currentId = "#" + $this.attr('id');
			}else{
				return false;
			}
		});

		var currentItem = menu.find(".current-leftbar-item");
		if(currentId && currentId != currentItem.attr("href")){
			currentItem.removeClass('current-leftbar-item');
			menu.find("[" + "href=" + currentId + "]").addClass('current-leftbar-item');
		}
	});
	// 左侧导航结束

	//右侧导航开始
	//右侧上面6个导航
	$('.sidebar li').bind({
		mouseover: function(){
			$(this).addClass('cur');
			$(this).children('span').stop(true,false).delay(200).animate({width:'62px'},200);
		},
		mouseout: function(){
			$(this).removeClass('cur');
			$(this).children('span').stop(true,false).animate({width:'0px'},200);
		}
	});

	// 右侧下面两个导航
	$('.totop li').hover(function(){
		$(this).addClass('cur');
		$(this).children('span').stop(true,false).delay(200).animate({width:'50px'},200);
	},function(){
		$(this).removeClass('cur');
		$(this).children('span').stop(true,false).animate({width:'0px'},200);
	});

	$('.rightbar .totop .totop-tt').click(function(){
		$('html,body').animate({scrollTop: '0px'}, 1000);
	});
	//右侧导航结束

	// 右侧弹出导航开始
	var preventClose =false;
	// 我的会员
	$('.sidebar-vip').on('click',function(){
		var coverBox = $("<div id='coverBox'></div>");
		var coverHeight = $(document).height() + "px";
		coverBox.height(coverHeight);
		coverBox.insertAfter($('.rightbar'))

		var vipBox = $("<div id='vipBox'><h3 class='vip-h3'>您尚未登陆"
			+"<input type='button' id='vip_close'></h3><div class='vip-content'></div></div>");
		var viewHeight = $(window).height();
		var top = (viewHeight-500)/2;
		var left =($(document).width() - 410)/2;
		vipBox.offset({ top: top, left: left });
		coverBox.append(vipBox);
		endCover();
	});

	// 我的关注
	$('.sidebar-follow').on('click',function(){
		var coverBox = $("<div id='coverBox'></div>");
		var coverHeight = $(document).height() + "px";
		coverBox.height(coverHeight);
		coverBox.insertAfter($('.rightbar'))

		var vipBox = $("<div id='vipBox'><h3 class='vip-h3'>您尚未登陆"
			+"<input type='button' id='vip_close'></h3><div class='vip-content'></div></div>");
		var viewHeight = $(window).height();
		var top = (viewHeight-500)/2;
		var left =($(document).width() - 410)/2;
		vipBox.offset({ top: top, left: left });
		coverBox.append(vipBox);
		endCover();
	});

	// 购物车弹出
	var isShow_shopcart = true;
	var isShow_track = true;
	$(".sidebar-shopcart").click(function() {
		if(isShow_shopcart&&isShow_track){
			$(this).off('mouseover mouseout');
			$('.sidebar li').children('span').stop(true,false).animate({width:'0px'},200);
			$(this).addClass('cur');
			$('.rightbar').stop(true,true).animate({right:'-35px'},300);
			$('#righthide-item1').show();
			isShow_shopcart =false;
		}else{
			if(!isShow_track){
				$(this).off('mouseover mouseout');
				recoverTrack();
				$('.sidebar li').children('span').stop(true,false).animate({width:'0px'},200);
				$('.cur').removeClass('cur');
				$(this).addClass('cur');
				$('#righthide-item2').hide();
				$('#righthide-item1').show();
				isShow_track = true;
				isShow_shopcart = false;
				return;
			}

			$(this).removeClass('cur');
			$('.rightbar').stop(true,true).animate({right:'-305px'},300,function(){
				$('#righthide-item1').hide();
				isShow_shopcart = true;
				recoverShopCart();
			});
		}
	});

	//我的足迹弹出
	$(".sidebar-track").click(function() {
		if(isShow_track&&isShow_shopcart){
			$(this).off('mouseover mouseout');
			$('.sidebar li').children('span').stop(true,false).animate({width:'0px'},200);
			$(this).addClass('cur');
			$('.rightbar').stop(true,true).animate({right:'-35px'},300);
			$('#righthide-item2').show();
			isShow_track =false;
		}else{
			if(!isShow_shopcart){
				$(this).off('mouseover mouseout');
				recoverShopCart();
				$('.sidebar li').children('span').stop(true,false).animate({width:'0px'},200);
				$('.cur').removeClass('cur');
				$(this).addClass('cur');
				$('#righthide-item1').hide();
				$('#righthide-item2').show();
				isShow_shopcart = true;
				isShow_track = false;
				return;
			}
			$(this).removeClass('cur');
			$('.rightbar').stop(true,true).animate({right:'-305px'},300,function(){
				$('#righthide-item2').hide();
				isShow_track = true;
				recoverTrack();
			});
		}
	});

	// 封装点击关闭按钮，去除遮罩函数
	function endCover(){
		$('#vip_close').on('click',function(event){
			event.stopPropagation();
			$('#coverBox').remove();
		});
		$('#vipBox').on('click',function(event){
			event.stopPropagation();
		});
	}
	// 封装恢复mouseover、mouseout事件函数
	function recoverEvent(){
		recoverShopCart();
		recoverTrack();
	}
	function recoverShopCart(){
		$('.sidebar-shopcart').bind({
			mouseover: function(){
				$(this).addClass('cur');
				$(this).children('span').stop(true,false).delay(200).animate({width:'62px'},200);
			},
			mouseout: function(){
				$(this).removeClass('cur');
				$(this).children('span').stop(true,false).animate({width:'0px'},200);
			}
		});
	}
	function recoverTrack(){
		$('.sidebar-track').bind({
			mouseover: function(){
				$(this).addClass('cur');
				$(this).children('span').stop(true,false).delay(200).animate({width:'62px'},200);
			},
			mouseout: function(){
				$(this).removeClass('cur');
				$(this).children('span').stop(true,false).animate({width:'0px'},200);
			}
		});
	}
	// 封装恢复mouseover、mouseout事件函数结束

	//点击空白收缩
	$(window).click(function(e){
		if(e.pageX<970){
			$('.sidebar li').removeClass('cur');
			recoverEvent();
			$('.rightbar').stop(true,true).animate({right:'-305px'},300,function(){
				$('#righthide-item1').hide();
				$('#righthide-item2').hide();
				isShow_shopcart = true;
				isShow_track = true;
			});
		}
	});

	// 右侧弹出导航结束

});// 所有结束
