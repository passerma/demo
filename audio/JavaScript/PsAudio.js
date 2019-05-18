(function () {
    window.psAudio = function(obj){
        $('#audio').addClass("audio audio-off audio-html");
        $('body').append($('<a class="audio-head-tittle-text-out"></a><a class="audio-head-tittle-text-out-a"></a>'));
        $('#audio').append($('<audio id="audio-my" src="" preload="metadata"></audio><div class="audio-head"></div><div class="add"></div><div class="min-time"></div><div class="audio-img"></div><div class="audio-text"></div><div class="audio-by"></div><div class="audio-btn"></div><div class="audio-sound"></div>'));
        $('.audio-head').append($('<div class="audio-head-tittle"><div class="audio-head-tittle-text audio-head-tittle-text-off"></div></div><div class="audio-head-tittle-by"></div><div class="audio-play-list audio-play-list-off"><div class="audio-play-list-all"></div></div>'));
        $('.audio-img').append($('<canvas id="audio-img-canvas" width="200px" height="200px"></canvas><div class="audio-img-cover audio-img-cover-off"></div><canvas id="audio-img-canvas-play" class="audio-img-canvas-play-off" width="45px" height="200px"></canvas>'));
        $('.audio-by').append($('<div class="audio-by-all"><span class="audio-by-now"></span></div><div class="audio-by-text"><span class="audio-by-text-now">00:00</span><span class="audio-by-text-all">00:00</span></div>'));
        $('.audio-btn').append($('<div class="audio-btn-list audio-btn-list-off"></div><div class="audio-btn-before"></div><div class="audio-btn-play audio-btn-play-off audio-btn-play-off-a"></div><div class="audio-btn-sound"></div><div class="audio-btn-next"></div>'));
        $('.audio-sound').append($('<div class="audio-sound-all"><span class="audio-sound-now"></span><span class="audio-sound-art"></span></div>'))
        $('#audio').css('background', obj.audioBg);
        $('.audio-play-list-all').css('background', obj.audioListBg);
        var audioName = obj.audioSrc;
        for (var i = 0;i < audioName.length; i++){
            var innerText = (audioName[i].split('-'))[1];
            var span = document.createElement('span');
            span.className = 'play-list-all';
            span.appendChild(document.createTextNode(innerText));
            $('.audio-play-list-all').append(span);
        }
        var addSonBtn = document.createElement('span');
        addSonBtn.className = 'addSonBtn';
        $('.audio-play-list-all').append(addSonBtn);
        $('.play-list-all').eq(0).addClass('play-list-all-now');
        var audio = document.getElementById('audio-my');
        var audioPlay = false;
        var audioMax = false;
        var audioLicSongLic = new Array();
        for(var i = 0; i < audioName.length; i++){
            if(obj.audioLic[i]){
                audioLicSongLic.push(obj.audioLic[i]);
            } else {
                audioLicSongLic.push('[00:00.0]未找到歌词');
            }
        }
        var audioLic1 = audioLicSongLic[0].split('[');
        var audioLic2 = new Array();
        var audioLicTime = new Array();
        var audioIndex = 0;
        var audioText = new Array();
        var audioLoop = false;
        var random = false;
        var listClick = false;
        var outTextValue = 0;
        var audioSpeed = 1.8;
        var audioSrcName = obj.audioSrcFile + '/';
        for(var i = 1; i < audioLic1.length; i++){
            var b = audioLic1[i].split(']');
            audioLic2.push(b);
        }
        for(var i = 0; i < audioLic2.length; i++){
            var d = audioLic2[i][0].split('.');
            audioLicTime.push(d[0]);
        }
        audioText = audioName[0].split('-');
        $('.audio-head-tittle-text').text(audioText[1]);
        $('.audio-head-tittle-text-out').text(audioText[1]);
        $('.audio-head-tittle-text-out-a').text(audioText[1]);
        $('.audio-head-tittle-by').text(audioText[0]);
        $('.audio-text').text(audioLic2[0][1]);
        if (obj.audioHttp){
            audio.src = obj.audioHttp[0];
        } else {
            audio.src = audioSrcName + audioName[0] + '.mp3';
        }
        $('.audio-img-cover').css({
            'background': 'url(' + audioSrcName + audioName[0] + '.jpg)' + ' no-repeat center',
            'background-size': '40px 40px',
        });
        function drawAudioArc() {
            var audioCanvas = document.getElementById('audio-img-canvas');
            var audioCtx = audioCanvas.getContext('2d');
            audioCtx.translate(100, 100);
            audioCtx.strokeStyle = 'rgba(255,255,255,1)';
            audioCtx.lineWidth= '6';
            audioCtx.arc(0, 0, 80, 0, Math.PI*2, true);
            audioCtx.stroke();
            audioCtx.beginPath();
            audioCtx.lineWidth= '3';
            audioCtx.arc(0,0,72,Math.PI/6, Math.PI/6*4, false);
            audioCtx.stroke();
            audioCtx.beginPath();
            audioCtx.arc(0,0,72,Math.PI/6*9, Math.PI/6*6, true);
            audioCtx.stroke();
            audioCtx.beginPath();
            audioCtx.lineWidth= '2';
            audioCtx.arc(0,0,50,Math.PI/6*9, Math.PI/6*11, true);
            audioCtx.stroke();
        }
        function drawAudioPlay() {
            var audioCanvasPlay = document.getElementById('audio-img-canvas-play');
            var audioCtxPlay = audioCanvasPlay.getContext('2d');
            audioCtxPlay.translate(25, 10);
            audioCtxPlay.lineWidth= '4';
            audioCtxPlay.strokeStyle = 'rgba(255,255,255,1)';
            audioCtxPlay.rect(-10,0,20,20);
            audioCtxPlay.stroke();
            audioCtxPlay.beginPath();
            audioCtxPlay.rect(-10,20,20,10);
            audioCtxPlay.stroke();
            audioCtxPlay.beginPath();
            audioCtxPlay.moveTo(0,30);
            audioCtxPlay.lineTo(0,140);
            audioCtxPlay.stroke();
            audioCtxPlay.beginPath();
            audioCtxPlay.translate(0, 140);
            audioCtxPlay.rotate(120);
            audioCtxPlay.rect(0,0,18,32);
            audioCtxPlay.stroke();
            audioCtxPlay.beginPath();
            audioCtxPlay.lineWidth= '2';
            audioCtxPlay.moveTo(10,25);
            audioCtxPlay.lineTo(30,25);
            audioCtxPlay.stroke();
            audioCtxPlay.beginPath();
        }
        function playAudio(){
            if(audio.paused || audio.ended) {
                audioPlay = true;
                audio.play();
                $('.audio-btn-play').removeClass('audio-btn-play-off').addClass('audio-btn-play-on');
            }
            else {
                audioPlay = false;
                $('.audio-btn-play').removeClass('audio-btn-play-on').addClass('audio-btn-play-off');
                audio.pause();
            }
            $('#audio-img-canvas-play').toggleClass('audio-img-canvas-play-on');
            $('#audio-img-canvas').toggleClass('audio-img-canvas-on');
        }
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
        function updateProgress(x){
            var progress = $('.audio-by-all');
            var position = x - progress.offset().left;
            var percentage = 100 * position / progress.width();
            if(percentage > 100) {
                percentage = 100;
            }
            if(percentage < 0) {
                percentage = 0;
            }
            $('.audio-by-now').css('width', percentage+'%');
            audio.currentTime = audio.duration * percentage / 100;
        }
        function enableProgressDrag() {
            var progressDrag = false;
            $('.audio-by-all').on('mousedown', function(e) {
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
        function qiehuan(){
            if (audioIndex == audioName.length ){
                audioIndex = 0;
            }
            if (audioIndex == -1 ){
                audioIndex = audioName.length - 1;
            }
            if (random && !listClick){
                audioIndex = Math.floor(Math.random()*(audioName.length));
            }
            listClick = !listClick;
            audioText = new Array();
            audioText = audioName[audioIndex].split('-');
            $('.audio-head-tittle-text').text(audioText[1]);
            $('.audio-head-tittle-by').text(audioText[0]);
            $('.audio-head-tittle-text-out').text(audioText[1]);
            $('.audio-head-tittle-text-out-a').text(audioText[1]);
            $('.audio-head-tittle-text').css('text-indent', 0);
            for (var i = 0; i < audioName.length; i++) {
                $('.play-list-all').eq(i).removeClass('play-list-all-now');
            }
            $('.play-list-all').eq(audioIndex).addClass('play-list-all-now');
            if (obj.audioHttp){
                audio.src = obj.audioHttp[audioIndex];
            } else {
                audio.src = audioSrcName + audioName[audioIndex] + '.mp3';
            }
            if(audioMax){
                $('.audio-img-cover').css({
                    'background': 'url(' + audioSrcName + audioName[audioIndex] + '.jpg)' + ' no-repeat center',
                    'background-size': '90px 90px',
                });
            } else {
                $('.audio-img-cover').css({
                    'background': 'url(' + audioSrcName + audioName[audioIndex] + '.jpg)' + ' no-repeat center',
                    'background-size': '40px 40px',
                });
            }
            $('.audio-by-now').css('width', 0);
            if(audioPlay){
                audio.play();
            }
            audioLic1 = new Array();
            audioLic2 = new Array();
            audioLicTime = new Array();
            audioLic1 = audioLicSongLic[audioIndex].split('[');
            for(var i = 1; i < audioLic1.length; i++){
                var b = audioLic1[i].split(']');
                audioLic2.push(b);
            }
            for(var i = 0; i < audioLic2.length; i++){
                var d = audioLic2[i][0].split('.');
                audioLicTime.push(d[0]);
            }
            $('.audio-text').text(audioLic2[0][1]);
        }
        function enableSoundDrag() {
            var volumeDrag = false;
            $('.audio-sound').on('mousedown', function(e) {
                volumeDrag = true;
                updateVolume(e.pageX);
            });
            $(document).on('mouseup', function(e) {
                if(volumeDrag) {
                    volumeDrag = false;
                    updateVolume(e.pageX);
                }
            });
            $(document).on('mousemove', function(e) {
                if(volumeDrag) {
                    updateVolume(e.pageX);
                }
            });
        }
        function updateVolume(x, vol) {
            var volume = $('.audio-sound');
            var soundLeft = x - volume.offset().left;
            var percentage;
            if(vol) {
                percentage =vol * 100;
            } else {
                var position = soundLeft;
                percentage = 100 * position / volume.width();
            }
            if(percentage > 100) {
                percentage = 100;
            }
            if(percentage < 0) {
                percentage = 0;
            }
            percentage = parseInt(percentage);
            $('.audio-sound-now').css('width', percentage + '%');
            $('.audio-sound-art').css('left', percentage + '%');
            audio.volume = percentage / 100;
        }
        function audioTextOut() {
            if(audioMax){
                var audioTextWidth = $('.audio-head-tittle-text-out-a').width();
                var audioTittleWidth = $('.audio-head-tittle-text').width();
            } else {
                var audioTextWidth = $('.audio-head-tittle-text-out').width();
                var audioTittleWidth = $('.audio-head-tittle-text').width();
            }
            if((audioTextWidth > audioTittleWidth) && !audioMax){
                if(outTextValue <= -(audioTextWidth - audioTittleWidth + 8)){
                    audioSpeed = -audioSpeed;
                }
                if(outTextValue >= 8){
                    audioSpeed = -audioSpeed;
                }
                outTextValue -= audioSpeed;
                var outText = outTextValue + 'px';
                $('.audio-head-tittle-text').css('text-indent', outText);
            }
            if((audioTextWidth > audioTittleWidth) && audioMax){
                if(outTextValue <= -(audioTextWidth - audioTittleWidth + 20)){
                    audioSpeed = -audioSpeed;
                }
                if(outTextValue >= 20){
                    audioSpeed = -audioSpeed;
                }
                outTextValue -= audioSpeed;
                var outText = outTextValue + 'px';
                $('.audio-head-tittle-text').css('text-indent', outText);
            }
        }
        function audioOffAndOn() {
            $('.audio').toggleClass('audio-off');
            $('.audio-play-list').toggleClass('audio-play-list-off');
            $('.audio-img-cover').toggleClass('audio-img-cover-off');
            $('.audio-btn-play').toggleClass('audio-btn-play-off-a');
            $('.audio-head-tittle-by').toggleClass('audio-head-tittle-by-off');
            $('.audio-head-tittle').toggleClass('audio-head-tittle-off');
            $('.min-time').toggleClass('min-time-off');
            $('.audio-head-tittle-text').toggleClass('audio-head-tittle-text-off');
            $('.audio-btn-play').css('animation', '');
            audioMax = !audioMax;
            $('.audio-head-tittle-text').css('text-indent', 0);
            outTextValue = 0;
            audioSpeed = Math.abs(audioSpeed);
            $('.audio-img-cover').css({
                'background-size': '90px 90px',
            });
        }
        function audioMouseLeave() {
            if(audioPlay){
                $('.audio-btn-play').css('animation', 'img-cover linear 2.5s infinite');
            }
            $('.audio-sound').removeClass('audio-sound-on');
            $('.audio-img-cover').css({
                'background-size': '40px 40px',
            });
        }
        function audioPlayUpdate() {
            var currentTime = audio.currentTime;
            var duration = audio.duration;
            var percent = 100 * currentTime / duration;
            $('.audio-by-now').css('width', percent + '%');
            $('.min-time').css('width', percent+'%');
            $('.audio-by-text-now').text(timeFormat(currentTime));
            for(var i = 0; i < audioLicTime.length; i++) {
                if (timeFormat(currentTime) == audioLicTime[i]) {
                    if (audioLic2[i][1] != []){
                        $('.audio-text').text(audioLic2[i][1]);
                    }
                }
            }
            audioTextOut();
        }
        function audioState() {
            if (!audioLoop && !random){  //  随机播放
                $('.audio-btn-list').removeClass('audio-btn-list-off').addClass('audio-btn-list-fun');
                random = !random;
            } else if (!audioLoop  && random) {         //  循环播放
                $('.audio-btn-list').removeClass('audio-btn-list-fun').addClass('audio-btn-list-on');
                audioLoop = !audioLoop;
                random = !random;
            } else if (audioLoop && !random) {    //  顺序播放
                $('.audio-btn-list').removeClass('audio-btn-list-on').addClass('audio-btn-list-off');
                audioLoop = !audioLoop;
            }
        }
        function addSong() {
            var hasSong = false;
            $.ajax({
                url: "Javascript/addsong.json",
                type: "GET",
                dataType: "json",
                success: function(data) {
                    $.each(data, function(e, item) {
                        if(audioName.includes(item.title)){
                            return true;
                        } else {
                            if(obj.audioHttp){
                                obj.audioHttp.push(item.audioHttp);
                            }
                            audioName.push(item.title);
                            if(item.src){
                                audioLicSongLic.push(item.src);
                            } else {
                                audioLicSongLic.push('[00:00.0]未找到歌词');
                            }
                            var addSongText = new Array();
                            addSongText = item.title.split('-');
                            var addSongSpan = document.createElement('span');
                            addSongSpan.className = 'play-list-all';
                            addSongSpan.innerText = addSongText[1];
                            $('.addSonBtn').before(addSongSpan);
                            $(addSongSpan).on('click', function () {
                                audioIndex = $(this).index();
                                listClick = !listClick;
                                qiehuan();
                            });
                            hasSong = true;
                        }
                    });
                    if (obj.addAuto && hasSong){
                        audioIndex = audioName.length -1;
                        qiehuan();
                        if(!audioPlay){
                            audio.play();
                            $('.audio-btn-play').removeClass('audio-btn-play-off').addClass('audio-btn-play-on');
                            $('#audio-img-canvas-play').toggleClass('audio-img-canvas-play-on');
                            $('#audio-img-canvas').toggleClass('audio-img-canvas-on');
                            audioPlay = true;
                        }
                    }
                }
            });
        }
        drawAudioArc();
        drawAudioPlay();
        updateVolume(0, 0.5);
        $('#audio-my').on("loadedmetadata", function(){
            $('.audio-by-text-now').text(timeFormat(0));
            $('.audio-by-text-all').text(timeFormat(audio.duration));
            enableProgressDrag();
            enableSoundDrag();
        });
        $('.audio-by-text-now').text(timeFormat(0));
        $('.audio-by-text-all').text(timeFormat(audio.duration));
        $('#audio-my').on("timeupdate", function(){
            audioPlayUpdate();
        });
        $('#audio-my').on('ended', function() {
            if(!audioLoop){
                audioIndex += 1;
            }
            qiehuan();
        });
        $('.play-list-all').on('click', function () {
            audioIndex = $(this).index();
            listClick = !listClick;
            qiehuan();
        });
        $('#audio-img-canvas-play').on('click', function () {
            playAudio();
        });
        $('.audio-btn-play').on('click', function () {
            playAudio();
        });
        $('.audio-btn-next').on('click', function () {
            if(!audioLoop){
                audioIndex += 1;
            }
            qiehuan();
        });
        $('.audio-btn-before').on('click', function () {
            if(!audioLoop){
                audioIndex -= 1;
            }
            qiehuan();
        });
        $('.audio-btn-sound').on('click', function () {
            $('.audio-sound').toggleClass('audio-sound-on');
        });
        $('.audio-btn-list').on('click', function () {
            audioState();
        });
        $("#audio").hover(function() {
            audioOffAndOn();
        });
        $("#audio").mouseleave(function() {
            audioMouseLeave();
        });
        $('.addSonBtn').on('click', function () {
            addSong();
        });
    };
})();