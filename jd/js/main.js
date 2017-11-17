//START
$(document).ready(function(){

	// click any address hide address-list
	changeAddress();

	//top-list show or hide dropdown
	showHideDropDown('.current-address-item','.user-address-list');
	showHideDropDown('.top-list-myjd','.top-list-myhome');
	showHideDropDown('.top-list-service','.top-list-service-content');
	showHideDropDown('.top-list-nav','.top-list-nav-content');

	//main-nav show second-level menu
	showSecondMenu();

	// Method2  by animate control backgroundPosition
	animateImg('.mid-item1');
	animateImg('.mid-item6');
	animateImg('.mid-item7');
	animateImg('.mid-item8');

	// img animation: move to left
	$('.item-mid a img').hover(function(){
		$this = $(this);
		marginRightAnimation('5px',300);
	},function(){
		$this = $(this);
		marginRightAnimation('0px',300);
	});

	// item-bot arrow show or hide
	$('.item-bot').hover(function(){
		$this =$(this).find('.item-bot-arrow');
		changeDisplay($this,'block');
	},function(){
		$this =$(this).find('.item-bot-arrow');
		changeDisplay($this,'none');
	});

	// item-bot brand animation
	brandAnimationMethod1();

	// leftbar navigation
	$(window).scroll(function(){
		changeLeftBar();
	});

	//rightbar navigation
	changeRightBar();

	//rightbar Popup
	popupCoverBox();


	//**
	//** all of global functions below this row
	function changeAddress(){
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
	}

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

	function showSecondMenu(){
		var sub = $("#sub");
		var activeRow;
		var activeMenu;
		var timer = null;
		var mouseInSub = false;
		sub.on('mouseenter',function(e){
			mouseInSub = true;
		}).on('mouseleave',function(e){
			mouseInSub = false;
		});
		var mouseTrack = [];

		var moveHandler = function(e){
			mouseTrack.push({
				x: e.pageX,
				y: e.pageY
			})
			if(mouseTrack.length>3){
				mouseTrack.shift();
			}
		}

		$('#test').on('mouseenter',function(e){
			$(document).bind('mousemove',moveHandler);
		})
		.on('mouseleave',function(e){
			sub.addClass('none');
			if(activeRow){
				activeRow.removeClass('active');
				activeRow = null;
			}

			if(activeMenu){
				activeMenu.addClass('none');
				activeMenu = null;
			}
			$(document).unbind('mousemove',moveHandler);
		})
		.on('mouseenter','li',function(e){
			sub.removeClass('none');
			if(!activeRow){
				activeRow = $(e.target).addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
				return;
			}

			if(timer){
				clearTimeout(timer);
			}

			var currentMousePos = mouseTrack[mouseTrack.length-1];
			var leftCorner = mouseTrack[mouseTrack.length-2];
			var delay = needDelay(sub,leftCorner,currentMousePos);
			if(delay){
				timer = setTimeout(function(){
					if(mouseInSub){
						return;
					}
					activeRow.removeClass('active');
					activeMenu.addClass('none');

					activeRow = $(e.target);
					activeRow.addClass('active');
					activeMenu = $('#' + activeRow.data('id'));
					activeMenu.removeClass('none');
				},1200);
			}else{
				var prevActiveRow = activeRow;
				var prevActiveMenu = activeMenu;

				activeRow = $(e.target);
				activeMenu = $('#' + activeRow.data('id'));

				prevActiveRow.removeClass('active');
				prevActiveMenu.addClass('none');
				activeRow.addClass('active');
				activeMenu.removeClass('none');
			}
		});
	}

	//animate by control backgroundPosition
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

	function marginRightAnimation(newMargin,duration){
		$this.stop(true,false).animate({marginRight:newMargin},duration);
	}
	function changeDisplay(ele,correctDisplay){
		ele.css('display',correctDisplay);
	}

	function brandAnimationMethod1(){
		$('.bot-arrow-prev').on('click',function(){
			if(parseInt($(this).parent().prev().css('left')) === -2280){
				$(this).parent().prev().animate({"left":"+=1710px"},0);
			}
			$(this).parent().prev().animate({"left":"-=570px"},600);
		});

		$('.bot-arrow-next').on('click',function(){
			if(parseInt($(this).parent().prev().css('left')) === 0){
				$(this).parent().prev().animate({"left":"-=1710px"},0);
			}
			$(this).parent().prev().animate({"left":"+=570px"},600);
		});
	}

	function changeLeftBar(){
		var top = $(document).scrollTop();
		var menu = $('#leftbar');
		var items = $('.catagory-container');
		var currentId = "";

		if (top > 1600){
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
	}

	function changeRightBar(){
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

		// Popup shopcart
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

		//Popup myTrack
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

		//click white space hide
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

		// recover mouseover、mouseout event
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
	}

	function popupCoverBox(){
		var preventClose =false;
		// my-vip
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

		// my follower
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

		//close coverBox
		function endCover(){
			$('#vip_close').on('click',function(event){
				event.stopPropagation();
				$('#coverBox').remove();
			});
			$('#vipBox').on('click',function(event){
				event.stopPropagation();
			});
		}
	}



	//**
	//**Below this row is Not Used!

	// Not Used！Don't Delete!
	// catagory-item img move animation Method1
	// by transform add or delete className
	// moveLeftImg(".mid-item1");
	// moveLeftImg(".mid-item6");
	// moveLeftImg(".mid-item7");
	// moveLeftImg(".mid-item8");

	//Not Used！Don't Delete!
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

	//Not Used！Don't Delete!
	function brandAnimationMethod2(){
		$('.bot-arrow-prev').on('click',function(){
			$this = $(this);
			brandAnimation(-570);
		});
		$('.bot-arrow-next').on('click',function(){
			$this = $(this);
			brandAnimation(570);
		});
	}
	//Not Used！Don't Delete!
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
				$this.parent().prev().css('left',moveTo + "px");
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



});// THE END
