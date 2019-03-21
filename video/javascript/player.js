(function($) {
    var video = $("#my-video"); // 获取video的jq对象
    var loop = 0;
    var qieh = 1;
    var loopture = 0;
    var videoIndex = 0;
    var ddd = document.getElementById('video-div');
    var full = false;
    var timer;
    var hidding = false;
    var isOn = true;
    var videoList = $('.player-list-video').length;
    var videoProp = 0;
    var videoSpeed = 1;
    var videoListAll = new Array('https://blz-videos.nosdn.127.net/1/StarCraft/SC2_Warchest_Season4_zhCN.mp4', 'http://flv.bn.netease.com/videolib3/1506/26/cJtFW2189/HD/cJtFW2189-mobile.mp4',
        'https://blz-videos.nosdn.127.net/1/HearthStone/Developer+Insights+-+Season+of+Rastakhan_CN_v2.mp4', 'https://blz-videos.nosdn.127.net/1/Heroes/HOS_ResistanceSkinsTrailer_zhCN.mp4',
        'http://flv.bn.netease.com/videolib3/1407/13/kzJvC0877/SD/kzJvC0877-mobile.mp4', 'https://blz-videos.nosdn.127.net/1/WoWx8_8.1Season2SurvivalGuide_vFINAL_zhCN.mp4',
        'https://crazynote.v.netease.com/2019/0121/1923fcb84b9d6df4dafaebde746ba607qt.mp4', 'https://n.v.netease.com/2017/1212_erce/nsh_hnc_final_info_hd.mp4',
        'https://yys.v.netease.com/2018/0917/63ec503dfa48f5196d35ebd6eb2c7761qt.mp4');
    function qiehuan(){
        video.prop("src",videoIndex);
        $('.timeBar').css('width', 0);
        video[0].play();
        $('.play-btn').removeClass('stop').addClass('play');
        $('.play-one').hide();
    }
    $('.player-list-video').on('click', function () {
        if (!full || !hidding){
            videoProp = $(this).index();
            videoIndex = videoListAll[$(this).index()];
            for(var i =0; i < videoList; i++){
                $('.player-list-video').eq(i).removeClass('video-now');
            }
            $(this).addClass('video-now');
            qiehuan();
            qieh = 0;
        }
    });
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
            var progress = $('.progress');
            var position = x - progress.offset().left;
            var percentage = 100 * position / progress.width();
            if(percentage > 100) {
                percentage = 100;
            }
            if(percentage < 0) {
                percentage = 0;
            }
            $('.timeBar').css('width', percentage+'%');
            video[0].currentTime = video[0].duration * percentage / 100;
        }
    }
    // 拖拽时间进度条
    function enableProgressDrag() {
        if (!full || !hidding){
            var progressDrag = false;
            $('.progress').on('mousedown', function(e) {
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
            $('.yinyin').removeClass('yinyin-off').addClass('yinyin-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
        } else {
            $('.yinyin').removeClass('yinyin-on').addClass('yinyin-off');
            $('.player-list').removeClass('player-list-on').addClass('player-list-off');
        }
    }
    function fillShow() {
        if (full){
            if(hidding){
                hidding = false;
                return;
            }
            if (timer) {
                clearTimeout(timer);
                timer = 0;
            }
            $('.yinyin').removeClass('yinyin-off').addClass('yinyin-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
            $('#my-video').attr('style', 'cursor:pointer');
            if (isOn){
                timer = setTimeout(function () {
                    hidding = true;
                    $('.yinyin').removeClass('yinyin-on').addClass('yinyin-off');
                    $('.player-list').removeClass('player-list-on').addClass('player-list-off');
                    $('#my-video').attr('style', 'cursor:none');
                }, 2000)
            }
        }
    }
    //声音按钮
    var soundAndMute = function() {
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
                $('.play-btn').removeClass('stop').addClass('play');
                $('.play-one').hide();
                playSpeed(videoSpeed);
            }
            else {
                video[0].pause();
                $('.play-btn').removeClass('play').addClass('stop');
                $('.play-one').show();
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
            if(loop == 0){
                $('#loop').removeClass('loop').addClass('loop-ture');
                video[0].loop = true;
                loop = 1;
            } else if(loop == 1){
                $('#loop').removeClass('loop-ture').addClass('loop');
                video[0].loop = false;
                loop = 0;
            }
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
                $('header').addClass('full');
                $('video').addClass('full');
                $('.yinyin').addClass('yinyin-a');
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
        full = !full;
        if (!full){
            clearTimeout(timer);
            $('video').removeClass('full');
            $('header').removeClass('full');
            $('.yinyin').removeClass('yinyin-a');
            $('.yinyin').removeClass('yinyin-off').addClass('yinyin-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
            $('#my-video').attr('style', 'cursor:pointer');
        }
    });
    document.addEventListener("mozfullscreenchange", function(e) {
        full = !full;
        if (!full){
            clearTimeout(timer);
            $('video').removeClass('full');
            $('header').removeClass('full');
            $('.yinyin').removeClass('yinyin-a');
            $('.yinyin').removeClass('yinyin-off').addClass('yinyin-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
            $('#my-video').attr('style', 'cursor:pointer');
        }
    });
    document.addEventListener("webkitfullscreenchange", function(e) {
        full = !full;
        if (!full){
            clearTimeout(timer);
            $('video').removeClass('full');
            $('header').removeClass('full');
            $('.yinyin').removeClass('yinyin-a');
            $('#my-video').attr('style', 'cursor:pointer');
            $('.yinyin').removeClass('yinyin-off').addClass('yinyin-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
        }
    });
    document.addEventListener("MSFullscreenChange", function(e) {
        full = !full;
        if (!full){
            clearTimeout(timer);
            $('video').removeClass('full');
            $('header').removeClass('full');
            $('.yinyin').removeClass('yinyin-a');
            $('#my-video').attr('style', 'cursor:pointer');
            $('.yinyin').removeClass('yinyin-off').addClass('yinyin-on');
            $('.player-list').removeClass('player-list-off').addClass('player-list-on');
        }
    });
    updateVolume(0, 0.9);  // 初始化声音
    video.on("loadedmetadata", function(){
        if (qieh == 0){
            qiehuan();
            qieh = 1;
        }
        $('header').hover(function() {
            showControl(true);
        }, function() {
            showControl(false);
        });
        // 判断鼠标是否在控制区，进入和出去改变isOn值，来触发是否开启延时函数
        $('.yinyin').hover(function() {
            isOn = false;
        }, function() {
            isOn = true;
        });
        $('.player-list').hover(function() {
            isOn = false;
        }, function() {
            isOn = true;
        });
        $('body').on('mousedown', function (e) {
            e.preventDefault();
        }).on('mousemove', function () {
            fillShow();
        })
        $('.play-one').on('click', function () {
            playAndPause();
        });
        $('.play-btn').on('click', function () {
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
        $(window).keypress(function(e) {
            if (e.keyCode == 0 || e.keyCode == 32) {
                playAndPause();
            }
        });
        $('#loop').on('click', isloop);
        video.on('click', function () {
            playAndPause();
        });
    });
    video.on('timeupdate', function() {
        var currentTime = video[0].currentTime;
        var duration = video[0].duration;
        var percent = 100 * currentTime / duration;
        $('.timeBar').css('width', percent + '%');
        $('#currentTime').text(timeFormat(currentTime));
    });
    video.on('canplay', function() {
        $('.loading').fadeOut(100);
    });
    video.on('ended', function() {
        $('.play-btn').removeClass("play").addClass("stop"); // 列表切换
        if(loopture == 0){
            videoProp += 1;
            videoIndex = videoListAll[videoProp];
            if(videoProp == videoList){
                videoProp = 0;
                videoIndex = videoListAll[videoProp];
            }
            for(var i =0; i < videoList; i++){
                $('.player-list-video').eq(i).removeClass('video-now');
            }
            $('.player-list-video').eq(videoProp).addClass('video-now');
            qiehuan();
            qieh = 0;
        }
    });
})(jQuery);
