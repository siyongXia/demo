<!-- 签到弹层 -->
<template>
	<div id="mobilemask" @click="closeCalender($event)">
        <div class="signPop" id="signPop">
            <i class="iconfont closePop" id="closePop">&#xe605;</i>
            <header class="sign-state textc">
                <h1 class="fs18 typo_normal">我的经验值{{exp}} (等级V{{level}})</h1>
                <a href="/points/index.html" class="tequan inblo">每日特权：抽奖{{luckyTimes}}次<img src="../static/arrow.png" alt="" class="arrow"><span></span></span>
                </a>
            </header>
            <div class="calendar-h">
                <span class="prev iconfont" id="prev">&#xe619;</span>
                <p id="now" class="now">111</p>
                <span class="next iconfont" id="next">&#xe619;</span>
            </div>
            <ul class="weeks">
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </ul>
            <div class="datebox">
                <div class="date" id="datebox">
                    <ul class="curMonth" id="curMonth"></ul>
                </div>
            </div>
            <div class="textc fs12 clbebe pb20">*我的签到日历*</div>
        </div>
    </div>
</template>
<script>
	import $ from 'jquery';
	export default {
		data(){
			return {
				year:'',
				month:'',
				day:'',
				week:'',
				now:'',
				recordStr:''
			}
		},
		methods:{
			closeCalender(e){
				if(e.target.id == 'mobilemask') {
					$('#mobilemask').hide();
				}
				return;				
			},
			initCalender(){
				var scale=$(window).width();
				this.timestamp = new Date().getTime();
				this.now=new Date(),
		        this.year=this.now.getFullYear(),
		        this.month=this.now.getMonth()+1;
		        this.day=this.now.getDate();
		        this.week=this.now.getDay();
		        
		       
		        $('#curMonth').empty();
	   			this.createCalendar(this.month,'curMonth');
			},
			createCalendar(mon,id){   // 生成日历
				var year = this.year,
					day = this.day,
					week = this.week,
					now = this.now,
					timestamp = this.timestamp;
				var days=this.getCountDays(year,mon),
		           prevDays=this.getCountDays(year,mon-1),
		           firstDate=new Date(),
		           firstDay,
		           html='',
		           str = this.recordStr || '',
		           strs= new Array(); //定义一数组 
		        strs=str.split(","); //字符分割
		        for (i=0;i<strs.length ;i++ ){
		            var strss =  new Array();
		            strss = strs[i].split("-")
		        } 
		        firstDate.setFullYear(year);
		        firstDate.setMonth(mon-1);
		        firstDate.setDate(1);
		        firstDay=firstDate.getDay();  

		        $('#now').text(year+'年'+mon+'月');
		        for(var i=prevDays-firstDay+1;i<=prevDays;i++){
		           html='<li class="past"><a>'+i+'</a></li>';
		           $('#'+id).append(html);
		        }
		        var nowYear=now.getFullYear(),
		            nowMonth = now.getMonth()+1;
		        for(var d=1;d<=days;d++){		            
		            if(d==day && mon == nowMonth && year == nowYear){
		                // html ='<li class="choosed" data-time="'+ timestamp +'"><a>'+d+'</a></li>';
		                html ='<li data-time="'+ timestamp +'"><a>'+d+'</a></li>';
		                $('#'+id).append(html);
		            }else{
		                html ='<li><a>'+d+'</a></li>';
		                $('#'+id).append(html);
		            }
		            for (i=0;i<strs.length ;i++ ){
		                //console.log(strs[i]); //分割后的字符输出
		                var strss =  new Array();
		                strss = strs[i].split("-")
		                //console.log(strss)
		                if(d==strss[2] && mon == strss[1] && year == strss[0]){
		                    html ='<li class="choosed"><a>'+d+'</a></li>';
		                    $('#'+id).append(html);
		                    $('#'+id).children().eq($('#'+id).children().last().index()-1).remove()
		                }
		            }
		        }

			},
			nextMonth(){	
		        this.month++;
		        if(this.month>12){
		             this.month=1;
		             this.year+=1;
		        }
		        $('#curMonth').empty();
		        this.createCalendar(this.month,'curMonth');
		        this.listyle();
		    },
			getCountDays(y,m){
		       var days=0;
		       if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12){
		          days=31;
		       }else if(m==4 || m==6 || m==9 || m==11){
		          days=30;
		       }else{
		          if(y%400==0 || (y%4==0 && y%100!=0)){
		             days=29;
		          }else{
		             days=28;
		          }
		       }
		       return days;
		    },
		    prevMonth(){
		        this.month--;
		        if(this.month<1){
		             this.month=12;
		             this.year-=1;
		        }
		        $('#curMonth').empty();
		        this.createCalendar(this.month,'curMonth');
		        this.listyle(); 
		    },
		    listyle(){
		        var dataAwitch = $('#curMonth li').width() +'px';
		        var hei = $('#curMonth li').width()*6.5 +'px';
		        $('#curMonth li').height(dataAwitch);
		        $('#closePop').on('click',function(){
		            $('#mobilemask').hide();
		        })
		    },
		    bindEvent(){
		    	$('#next').on('click',this.nextMonth);
		    	$('#prev').on('click',this.prevMonth);
		    	$('#closePop').on('click',function(){		    		
		            $('#mobilemask').hide();
		        })
		    }
		},
		mounted(){	
			this.recordStr = this.record;
			this.initCalender();
			this.listyle();
		    this.bindEvent();
		},
		watch:{
			record(){
				this.recordStr = this.record;
				this.initCalender();
			}
		},
		props:['record','exp','level','luckyTimes']
	}
</script>
<style scss>
	/*签到页*/
	.arrow { width: 16px;vertical-align: middle;}
	#mobilemask{display: none;position:fixed; width:100%;height:100%;top:0;bottom:0;right:0;left:0;background: rgba(51,51,51,0.8);z-index: 100;}
	.signPop{width:86%;border-radius:10px;background-color: #fff;position: absolute;z-index: 101;top: 50%;left: 50%;-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);z-index:9999;}
	.sign-state{padding: 6% 0;background: #00d2c3;color: #fff;text-align: center;border-top-left-radius:10px;border-top-right-radius:10px;}
	.sign-state h1{font-size: 18px;margin-bottom: 5px;}
	.sign-state p{font-size: 14px;}
	.weeks{height:40px;line-height:40px;color:#333;padding: 0 20px;margin-bottom: 20px;}
	.weeks li {float: left;width: 14.28%;text-align: center;font-size: 12px;color:#666;}
	.calendar-h{height:50px;line-height:50px;background:#fff;color:#333;font-size:20px;text-align:center;position: relative;}
	.calendar-h span{position:absolute;top:14px;width:20px;height: 20px;line-height: 20px;border: 1px solid #fff;border-radius: 50%;color: #E8E8E8; }
	.calendar-h span.prev{left:25%;transform: rotate(180deg);top:17px;left: 10%;}
	.calendar-h span.next{right:25%;right: 10%;}
	.datebox{width:100%;overflow:hidden;border-bottom-right-radius:20px;
	border-bottom-left-radius:20px;}
	.curMonth{padding: 0 20px 10px;-webkit-box-sizing:border-box;}
	.curMonth li{display: inline-block;width:12.28%;border-radius: 10px;
		background-position: 2px -1px;
	    background-repeat: no-repeat;height:30px;line-height: 35px; 
	   	text-align: center; margin: 1px 1%;-webkit-box-sizing:border-box;background-size: 100% 100%;font-size: 14px;
	}
	.curMonth li a{display:block;width:100%;color:#000;}
	.curMonth li.past{text-align: left;text-indent: 4px;}
	.curMonth li.current{background-image:url('../static/signed.png');text-align: left;text-indent: 4px;}
	.curMonth li.past a{color:#dbdbdb;}
	.curMonth li.current a{color:#fff;}
	.curMonth li.choosed{background-image: url('../static/signed.png');}
	.curMonth li.choosed a{color:#000;}
	.closePop{font-size: 16px;color: #fff;position: absolute;top:5px;right:10px;}
	.tequan {height: 26px;line-height: 26px;background-color: #FFD200;color: #fff;text-align: center;padding: 0 10px; margin:0 auto;border-radius: 13px;}
</style>