(function($) {
    var video = $("#my-video");
    var loop = false;
    var qieh = 1;
    var videoIndex = 0;
    var videoProp = 0;
    var ddd = document.getElementById('video-div');
    var full = false;
    var timer;
    var hidding = false;
    var isOn = true;
    var videoListLen = $('.player-list-video').length;
    var videoSpeed = 1;
    var videoListAll = new Array('https://blz-videos.nosdn.127.net/1/HearthStone/f6cd63b590d416821d3e27e0.mp4',
        'http://hd.yinyuetai.com/uploads/videos/common/EB170169C381ACA65BDFA873976313F3.mp4',
        'http://hc.yinyuetai.com/uploads/videos/common/FA6B0169A324DD75A87E1C84F4B31399.mp4',
        'http://hc.yinyuetai.com/uploads/videos/common/7AD001644D9382E54FD583466B66EAC8.mp4',
        'http://hd.yinyuetai.com/uploads/videos/common/BB87016532900E3929D35E14BF2C6C40.mp4',
        'http://hc.yinyuetai.com/uploads/videos/common/12D80162AA2DB6AAF891A9F4591D3829.mp4',
        'http://hc.yinyuetai.com/uploads/videos/common/F7580167115F337E6ECB7448886C5700.mp4',
        'http://hd.yinyuetai.com/uploads/videos/common/FDB801694C7FC529294DB399983B4356.mp4',
        'http://hc.yinyuetai.com/uploads/videos/common/4454016540FBBFE757F1EBA66259FAEF.mp4');
    var danId = 0;
    var clickFlag = null;
    var vedioError = null;
    function qiehuan(){
        video[0].src = videoListAll[videoIndex];
        $('.psVideo-timeBar').css('width', 0);
        video[0].play();
        $('.psVideo-play-btn').removeClass('psVideo-stop').addClass('psVideo-play');
        $('.psVideo-play-one').hide();
    }
    // 读取初始时间
    function timeFormat(seconds) {
        var minite = Math.floor(seconds / 60);
        if(minite < 10) {
            minite = "0" + minite;
        }
        var second = Math.floor(seconds % 60);
        if(second < 10) {
            second = "0" + second;
        }
        return minite + ":" + second;
    }
    //更新时间进度条
    function updateProgress(x){
        if (!full || !hidding){
            var progress = $('.psVideo-progress');
            var position = x - progress.offset().left;
            var percentage = 100 * position / progress.width();
            if(percentage > 100) {
                percentage = 100;
            }
            if(percentage < 0) {
                percentage = 0;
            }
            $('.psVideo-timeBar').css('width', percentage+'%');
            video[0].currentTime = video[0].duration * percentage / 100;
        }
    }
    // 拖拽时间进度条
    function enableProgressDrag() {
        if (!full || !hidding){
            var progressDrag = false;
            $('.psVideo-progress').on('mousedown', function(e) {
                progressDrag = true;
                updateProgress(e.pageX);
            });
            $(document).on('mouseup', function(e) {
                if(progressDrag) {
                    progressDrag = false;
                    updateProgress(e.pageX);
                }
            });
            $(document).on('mousemove', function(e) {
                if(progressDrag) {
                    updateProgress(e.pageX);
                }
            });
        }
    };
    // 控制栏展示消失
    function showControl(shouldShow) {
        if(shouldShow) {
            $('.psVideo-shade').removeClass('psVideo-shade-off').addClass('psVideo-shade-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
        } else {
            $('.psVideo-shade').removeClass('psVideo-shade-on').addClass('psVideo-shade-off');
            $('.player-list').removeClass('player-list-on').addClass('player-list-off');
        }
    }
    function fillShow() {
        if (full){
            if(hidding){
                hidding = false;
            }
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            $('.psVideo-shade').removeClass('psVideo-shade-off').addClass('psVideo-shade-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
            video.attr('style', 'cursor:pointer');
            if (isOn){
                timer = setTimeout(function () {
                    hidding = true;
                    $('.psVideo-shade').removeClass('psVideo-shade-on').addClass('psVideo-shade-off');
                    $('.player-list').removeClass('player-list-on').addClass('player-list-off');
                    video.attr('style', 'cursor:none');
                }, 2000)
            }
        }
    }
    //声音按钮
    function soundAndMute() {
        if (!full || !hidding){
            if(video[0].muted) {
                video[0].muted = false;
                $('#soundBtn').removeClass("jinyin").addClass("sound");
                $('.volumeBar').css('height', (1 - video[0].volume) * 100 + '%');
                $('.sound-number').text(parseInt(video[0].volume * 100));
            } else {
                video[0].muted = true;
                $('#soundBtn').removeClass("sound").addClass("jinyin");
                $('.sound-number').text(0);
                $('.volumeBar').css({
                    "height": "50px",
                })
            }
        }
    };
    //声音拖拽
    function enableSoundDrag() {
        if (!full || !hidding){
            var volumeDrag = false;
            $('.volume').on('mousedown', function(e) {
                volumeDrag = true;
                updateVolume(e.pageY);
                video[0].muted = false;
                $('#soundBtn').removeClass("jinyin").addClass("sound");
            });
            $(document).on('mouseup', function(e) {
                if(volumeDrag) {
                    volumeDrag = false;
                    updateVolume(e.pageY);
                }
            });
            $(document).on('mousemove', function(e) {
                if(volumeDrag) {
                    updateVolume(e.pageY);
                }
            });
        }
    };
    // 更新声音
    function updateVolume(y, vol) {
        if (!full || !hidding){
            var volume = $('.volume');
            var soundTop = y - volume.offset().top;
            var percentage;
            if(vol) {
                percentage =100- (vol * 100);
            } else {
                var position = soundTop;
                percentage = 100 * position / 50;
            }
            if(percentage > 100) {
                $('#soundBtn').removeClass("sound").addClass("jinyin");
                percentage = 100;
            } else {
                $('#soundBtn').removeClass("jinyin").addClass("sound");
            }
            if(percentage < 0) {
                percentage = 0;
            }
            percentage = parseInt(percentage);
            $('.sound-number').text(100 -percentage);
            $('.volumeBar').css('height', percentage + '%');
            video[0].volume = (100 - percentage) / 100;
        }
    };
    //开始暂停
    function playAndPause() {
            if(video[0].paused || video[0].ended) {
                video[0].play();
                $('.psVideo-play-btn').removeClass('psVideo-stop').addClass('psVideo-play');
                $('.psVideo-play-one').hide();
                playSpeed(videoSpeed);
                $('.psVideo-dan-all').css('animation-play-state','running');
            }
            else {
                video[0].pause();
                $('.psVideo-play-btn').removeClass('psVideo-play').addClass('psVideo-stop');
                $('.psVideo-play-one').show();
                $('.psVideo-dan-all').css('animation-play-state','paused');
            }
    }
    //播放速度
    function playSpeed(speed) {
        if (!full || !hidding){
            if(speed == 1) {
                $('#speed05Btn').removeClass("moren");
                $('#speed2Btn').removeClass("moren");
                $('#speed1Btn').addClass("moren");
                videoSpeed = 1;
            } else if(speed == 2) {
                $('#speed05Btn').removeClass("moren");
                $('#speed1Btn').removeClass("moren");
                $('#speed2Btn').addClass("moren");
                videoSpeed = 2;
            } else if(speed == 0.5) {
                $('#speed1Btn').removeClass("moren");
                $('#speed2Btn').removeClass("moren");
                $('#speed05Btn').addClass("moren");
                videoSpeed = 0.5;
            }
            video[0].playbackRate = speed;
        }
    }
    //循环播放
    function isloop() {
        if (!full || !hidding){
            if(!loop){
                $('#loop').removeClass('loop').addClass('loop-ture');
                video[0].loop = true;
                loop = !loop;
            } else{
                $('#loop').removeClass('loop-ture').addClass('loop');
                video[0].loop = false;
                loop = !loop;
            }
        }
    }

    function danOn() {
        var danText = $('.psVideo-dan-input').val();
        var zz = "^[ ]+$";               //正则判断是否全是空格
        var isK = new RegExp(zz);
        if (danText && !(isK.test(danText))){
            var danIdNow = 'dan' + danId;
            if (full){
                var danDom = "<span class='psVideo-dan-all psVideo-dan-value-full' id='" + danIdNow + "'</span>";
            } else {
                var danDom = "<span class='psVideo-dan-all psVideo-dan-value' id='" + danIdNow + "'</span>";
            }
            $('.psVideo').prepend(danDom);
            if(danId %3 == 1){
                $('#' + danIdNow).css('margin-top','30px');
            } else if(danId % 3 == 2){
                $('#' + danIdNow).css('margin-top','60px');
            }
            if(video[0].paused || video[0].ended){
                $('.psVideo-dan-all').css('animation-play-state','paused');
            } else {
                $('.psVideo-dan-all').css('animation-play-state','running');
            }
            $('.psVideo-dan-all').on('animationend', function () {
                $('#'+ this.id).remove();
            });
            danId += 1;
            $('#' + danIdNow).text(danText);
            $('.psVideo-dan-input').val("");
        }

    }
    function toFull() {
        $('.psVideo').addClass('full');
        video.addClass('full');
        $('.psVideo-dan').addClass('psVideo-dan-full');
        $('.psVideo-dan-input').addClass('psVideo-dan-input-full');
        $('.psVideo-shade').addClass('psVideo-shade-full');
        timer = setTimeout(function () {
            hidding = true;
            $('.psVideo-shade').removeClass('psVideo-shade-on').addClass('psVideo-shade-off');
            $('.player-list').removeClass('player-list-on').addClass('player-list-off');
            video.attr('style', 'cursor:none');
        }, 2000)
    }
    function outFull() {
        clearTimeout(timer);
        video.removeClass('full');
        $('.psVideo').removeClass('full');
        $('.psVideo-shade').removeClass('psVideo-shade-full');
        $('.psVideo-shade').removeClass('psVideo-shade-off').addClass('psVideo-shade-on');
        $('.player-list').removeClass('player-list-off').addClass('player-list-on');
        video.attr('style', 'cursor:pointer');
        $('.psVideo-dan').removeClass('psVideo-dan-full');
        $('.psVideo-dan-input').removeClass('psVideo-dan-input-full');
    }
    //全屏
    function doOnClick() {
        if(clickFlag) {
            clickFlag = clearTimeout(clickFlag);
        }
        clickFlag = setTimeout(function() {
            playAndPause();
        }, 300);
    }
    function doOnDblClick() {
        if(clickFlag) {
            clickFlag = clearTimeout(clickFlag);
        }
        launchFullScreen();
    }
    function keyTime(key){
        if (key == 39){
            var keyCurrentTime = video[0].currentTime + 10;
            var keyDuration = video[0].duration;
            var keyPercent = 100 * keyCurrentTime / keyDuration;
            $('.psVideo-timeBar').css('width', keyPercent + '%');
            $('#currentTime').text(timeFormat(keyCurrentTime));
            video[0].currentTime = keyCurrentTime;
        }
        if (key == 37){
            console.log(video[0].currentTime);
            var keyCurrentTime = video[0].currentTime - 10;
            console.log(keyCurrentTime);
            var keyDuration = video[0].duration;
            var keyPercent = 100 * keyCurrentTime / keyDuration;
            $('.psVideo-timeBar').css('width', keyPercent + '%');
            $('#currentTime').text(timeFormat(keyCurrentTime));
            video[0].currentTime = keyCurrentTime;
        }
    }
    //全屏
    function launchFullScreen() {
        if (!full || !hidding){
            var element = document.documentElement;
            if (! full){
                if(element.requestFullScreen) {
                    element.requestFullScreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
    }
    //监听退出全屏事件
    document.addEventListener("fullscreenchange", function(e) {
        if (!full){
            toFull();
        } else {
            outFull();
        }
        full = !full;
    });
    document.addEventListener("mozfullscreenchange", function(e) {
        if (!full){
            toFull();
        } else {
            outFull();
        }
        full = !full;
    });
    document.addEventListener("webkitfullscreenchange", function(e) {
        if (!full){
            toFull();
        } else {
            outFull();
        }
        full = !full;
    });
    document.addEventListener("MSFullscreenChange", function(e) {
        if (!full){
            toFull();
        } else {
            outFull();
        }
        full = !full;
    });

    updateVolume(0, 0.9);  // 初始化声音
    video.on("loadedmetadata", function(){
        $('#currentTime').text(timeFormat(0));
        $('#duration').text(timeFormat(video[0].duration));
        enableProgressDrag();
        enableSoundDrag();
        playSpeed(videoSpeed);
    });
    video.on('timeupdate', function() {
        var currentTime = video[0].currentTime;
        var duration = video[0].duration;
        var percent = 100 * currentTime / duration;
        $('.psVideo-timeBar').css('width', percent + '%');
        $('#currentTime').text(timeFormat(currentTime));
    });
    video.on('canplay', function() {
        $('.psVideo-loading').fadeOut(100);
    });
    video.on('waiting', function() {
        $('.psVideo-loading').fadeIn(100);
    });
    video.on('ended', function() {
        if (!loop){
            videoIndex += 1;
        }
        if(videoIndex == videoListLen){
            videoIndex = 0;
        }
        for(var i =0; i < videoListLen; i++){
            $('.player-list-video').eq(i).removeClass('video-now');
        }
        $('.player-list-video').eq(videoIndex).addClass('video-now');
        qiehuan();

    });

    $('.psVideo').hover(function() {
        showControl(true);
    }, function() {
        showControl(false);
    });
    // 判断鼠标是否在控制区，进入和出去改变isOn值，来触发是否开启延时函数
    $('.psVideo-shade').hover(function() {
        isOn = false;
    }, function() {
        isOn = true;
    });
    $('.player-list').hover(function() {
        isOn = false;
    }, function() {
        isOn = true;
    });
    $('body').on('mousemove', function () {
        fillShow();
    });
    $('.psVideo-play-one').on('click', function () {
        playAndPause();
    });
    $('.psVideo-play-btn').on('click', function () {
        if (!full || !hidding){
            playAndPause();
        }
    });
    $('.all').on('click', launchFullScreen);
    $('#currentTime').text(timeFormat(0));
    $('#duration').text(timeFormat(video[0].duration));
    enableProgressDrag();
    enableSoundDrag();
    playSpeed(videoSpeed);
    $('#speed1Btn').on('click', function() {
        playSpeed(1);
    });
    $('#speed2Btn').on('click', function() {
        playSpeed(2);
    });
    $('#speed05Btn').on('click', function() {
        playSpeed(0.5);
    });
    //  阻止事件冒泡
    $('.sound-list').bind("click",function(event){
        event.stopPropagation();
    });
    $('.konge').bind("click",function(event){
        event.stopPropagation();
    });
    $('#soundBtn').on('click',soundAndMute);
    $('#loop').on('click', isloop);
    video.on('click', function () {
        doOnClick();
    });
    video.on('dblclick', function () {
        doOnDblClick();
    });
    $('.psVideo-dan-btn').on('click', function () {
        danOn();
    });
    $(window).keypress(function(e) {
        var isFocus = $(".psVideo-dan-input").is(":focus");
        var isControl = $('.psVideo-shade').hasClass('psVideo-shade-off');
        if (e.keyCode == 0 || e.keyCode == 32){
            if(!isFocus || isControl){
                playAndPause();
            }
        }
        if (e.keyCode == 13){
            if(isFocus){
                danOn();
            }
        }
    });
    $(window).keydown(function(e) {
        keyTime(e.keyCode);
    });
    $('.player-list-video').on('click', function () {
        if (!full || !hidding){
            videoIndex = $(this).index();
            for(var i =0; i < videoListLen; i++){
                $('.player-list-video').eq(i).removeClass('video-now');
            }
            $(this).addClass('video-now');
            qiehuan();
        }
    });
})(jQuery);
