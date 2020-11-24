window.onload = function(){
    let video = document.querySelector('video');
    // let player = document.querySelector('.player');
    let elapse = document.querySelector('.elapse');
    let bar = document.querySelector('.bar');
    let play = document.querySelector('.play');
    let tatalTime = document.querySelector('.totalTime');
    let currentTime = document.querySelector('.currentTime')
    let control = document.querySelector('.control')
    //鼠标经过播放显示和隐藏
    // player.onmouseover = function(){
    //     control.style.display = 'block';
    // }
    // player.onmouseout = function(){
    //     control.style.display = 'none';
    // }
    //播放转换
    function changPlay(){
        if(video.paused){
            video.play();
            play.className = 'pause-icon';
            // play.style.fontSize = '14px';
        }
        else if(video.play){
            video.pause();
            play.className = 'play-icon';
            
        }
    }
    //视频点击播放
    video.onclick = function(){
       changPlay();
    };   
    //播放按钮点击播放
    document.querySelector('.switch').onclick = function(){
       changPlay();
    };
    //全屏播放
    document.querySelector('.expend').onclick = function(){
        if(video.requestFullScreen){
            video.requestFullScreen();
        }else if (video.webkitRequestFullScreen){
            video.webkitRequestFullscreen();
        }else if(video.mozRequestFullScreen){
            video.mozRequestFullScreen();
        }else if(video.meRequestFullScreen){
            video.meRequestFullScreen();
        }
    };
    //将总秒数转换成时分秒
    function getTime(time){
        let hour = Math.floor(time/3600);
        hour = hour<10?'0'+hour:hour;

        let minute = Math.floor(time%3600/60);
        minute = minute<10?'0'+minute:minute;

        let second = Math.floor(time%60)
        second = second<10?'0'+second:second;
        return hour+':'+minute+':'+second;
    }
    //当前视频文件可以播放时触发事件
    video.oncanplay = function(){
        let total = video.duration;//获取视频总时间
        let resule = getTime(total);
        tatalTime.innerHTML= resule;
        // console.log(hour+':'+minute+':'+second);
    }
    //当视频播放时触发事件,如果currentTime值变化也会触发这个事件。
    video.ontimeupdate = function(){
        //获取当前播放时间
        let current = video.currentTime;
        console.log(current);
        let cur = getTime(current);
        currentTime.innerHTML = cur;
        //设置当前播放进度
        let present = (current/video.duration)*100 + '%';
        elapse.style.width = present;
        
    }
    //点击播放跳转
    bar.onclick = function(e){
        //鼠标点击相对于父元素的偏移量 e.offsetX;
        //鼠标点击相对于父元素的偏移量 占总长度的比值
        let present = e.offsetX/bar.offsetWidth;
        let current = present * video.duration;
        //点击后视频时间传递给当前时间后，会调用ontimeupdate方法
        video.currentTime = current;
    }
    //播放完毕重置播放状态
    video.onended = function () { 
        video.currentTime = 0;
        play.className = 'play-icon';
     }
}
