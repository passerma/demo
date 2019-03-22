$(function () {
    var audio = document.getElementById('audio-my');
    var audioPlay = false;
    var audioMax = false;
    var audioName = ['王大毛-去年夏天', '周兴哲-永不失联的爱', '花粥&马雨阳-盗将行', '米津玄師-Lemon',
    '万能青年旅店-杀死那个石家庄人'];
    var audioLicSong0 = '[00:00.00]去年夏天 - 王大毛[00:02.31]词：家家[00:04.63]曲：家家[00:06.94]编曲：杨栋梁[00:09.26]后期：杨栋梁[00:11.58]伴唱：林施[00:13.89]制作公司：Hikoon Music[00:16.21]出品公司：Top Music[00:18.53]还有什么等待[00:20.23]还有什么悲哀[00:22.22]这故事中的人不太精彩[00:26.11]夏去了又回来[00:27.90]而人却已不在[00:29.83]它重复着我汹涌的忍耐[00:33.66]今年兰花又开[00:35.77]开了它也会败[00:37.62]我想要一个人活得精彩[00:41.57]有些人总会来[00:43.46]有些人在我心中在徘徊[00:49.37]我拿了总会还[00:51.28]你拿了就逃开[00:53.07]在失去中我慢慢的变呆[00:57.05]是不同步的未来[01:00.82]却把书包中的日记更改[01:04.63]把虚伪的尘埃[01:06.69]也全部都掩盖[01:08.55]把每次心痛都当成活该[01:12.55]把心慢慢的释怀[01:16.32]我相信总有一天你会明白[01:20.16]我给你的爱[01:22.20]我给你的爱[01:24.00]我给你的爱[01:25.96]我给你的爱[01:28.05][01:36.68]疼不疼痛不痛[01:38.77]这样一直被动[01:40.67]幻想中我的梦[01:42.53]总会过分要命的囧[01:44.84]在过去每个时候[01:46.47]我都会想象的念头[01:49.87][01:51.69]别怕你就算我是你的[01:53.76]小小狗也总会被打痛[01:56.33]意念中想不痛[01:58.09]却总是被一次掏空[02:00.29]在去年夏天跟你说了[02:02.43]一个小小要求[02:04.08]答应了不放手[02:05.86]而如今也再不回头[02:07.53]还有什么等待[02:08.38]还有什么悲哀[02:10.53]这故事中的人不太精彩[02:14.42]夏去了又回来[02:16.24]而人却已不在[02:18.16]它重复着我汹涌的忍耐[02:21.58][02:22.09]我拿了总会还[02:24.09]你拿了就逃开[02:25.94]在失去中我慢慢的变呆[02:29.98]是不同步的未来[02:33.75]却把书包中的日记更改[02:37.54]把虚伪的尘埃[02:39.56]也全部都掩盖[02:41.45]把每次心痛都当成活该[02:45.42]把心慢慢的释怀[02:49.24]我相信总有一天你会明白[02:53.15]我拿了总会还[02:55.06]你拿了就逃开[02:56.96]在失去中我慢慢的变呆[03:01.03]是不同步的未来[03:04.71]却把书包中的日记更改[03:08.54]把虚伪的尘埃[03:10.54]也全部都掩盖[03:12.37]把每次心痛都当成活该[03:16.40]把心慢慢的释怀[03:20.18]我相信总有一天你会明白[03:24.04]我给你的爱[03:25.21]啦啦啦啦啦';
    var audioLicSong1 ='[00:00.00]永不失联的爱 - 周兴哲 (Eric Chou)[00:04.61]词：饶雪漫[00:09.22]曲：周兴哲[00:13.83]编曲：吕圣斐[00:18.44]制作人：袁伟翔/吕圣斐[00:23.05]亲爱的你躲在哪里发呆[00:27.31][00:28.79]有什么心事还无法释怀[00:32.75][00:34.37]我们总把人生想得太坏[00:38.23][00:39.99]像旁人不允许我们的怪[00:44.09][00:45.69]每一片与众不同的云彩[00:49.79][00:51.38]都需要找到天空去存在[00:55.15][00:56.96]我们都习惯了原地徘徊[01:01.18][01:02.61]却无法习惯被依赖[01:07.05][01:08.97]你给我 这一辈子都不想失联的爱[01:15.07][01:15.60]相信爱的征途就是星辰大海[01:20.62]美好剧情 不会更改[01:25.82]是命运最好的安排[01:30.95][01:31.50]你是我[01:33.30]这一辈子都不想失联的爱[01:37.55][01:38.27]何苦残忍逼我把手轻轻放开[01:43.18]请快回来 想听你说[01:48.43]说你还在[01:51.75][02:16.17]走过陪你看流星的天台[02:20.17][02:21.71]熬过失去你漫长的等待[02:25.87][02:27.36]好担心没人懂你的无奈[02:31.57][02:32.97]离开我谁还把你当小孩[02:36.97][02:38.79]我猜你一定也会想念我[02:42.81][02:44.23]也怕我失落在茫茫人海[02:48.15][02:49.90]没关系只要你肯回头望[02:54.05][02:55.52]会发现我一直都在[03:00.34][03:01.93]你给我 这一辈子都不想失联的爱[03:07.86][03:08.77]你的每条讯息都是心跳节拍[03:13.55]每秒都想 拥你入怀[03:18.78]全世界你最可爱[03:23.87][03:24.59]你是我 这一辈子都不想失联的爱[03:30.46][03:31.08]就算你的呼吸远在千山之外[03:36.09]请你相信 我给的爱[03:41.35]值得你';
    var audioLicSong2 = '[00:05.00]歌名：盗将行[00:10.00]歌手：花粥、马雨阳[00:18.00]劫过九重城关 我座下马正酣[00:23.00]看那轻飘飘的衣摆 趁擦肩把裙掀[00:29.00]踏遍三江六岸 借刀光做船帆[00:35.00]任露水浸透了短衫 大盗睥睨四野[00:43.00]枕风宿雪多年 我与虎谋早餐[00:49.00]拎着钓叟的鱼弦 问卧龙几两钱[00:55.00]蜀中大雨连绵 关外横尸遍野[01:02.00]你的笑像一条恶犬 撞乱了我心弦[01:23.00]谈花饮月赋闲 这春宵艳阳天[01:28.00]待到梦醒时分睁眼 铁甲寒意凛冽[01:34.00]夙愿只隔一箭 故乡近似天边[01:40.00]不知何人浅唱弄弦 我彷徨不可前[01:51.00]枕风宿雪多年 我与虎谋早餐[01:57.00]拎着钓叟的鱼弦 问卧龙几两钱[02:03.00]蜀中大雨连绵 关外横尸遍野[02:09.00]你的笑像一条恶犬 撞乱我心弦[02:15.00]烽烟万里如衔 掷群雄下酒宴[02:22.00]谢绝策勋十二转 想为你窃玉簪[02:28.00]入巷间吃汤面 笑看窗边飞雪[02:34.00]取腰间明珠弹山雀 立枇杷于庭前[02:45.00]入巷间吃汤面 笑看窗边飞雪[02:53.00]取腰间明珠弹山雀 立枇杷于庭前';
    var audioLicSong3 = '[00:00.00]Lemon-米津玄師[00:01.53]词：米津玄師[00:01.55]曲：米津玄師[00:01.60]夢ならば[00:02.88]どれほどよかったでしょう[00:06.88]未だにあなたのことを夢にみる[00:12.41]忘れた物を取りに帰るように[00:17.91]古びた思い出の埃を払う[00:26.27]戻らない幸せがあることを[00:31.73]最後にあなたが教えてくれた[00:37.25]言えずに隠してた昏い過去も[00:42.80]あなたがいなきゃ[00:44.92]永遠に昏いまま[00:48.57]きっともうこれ以上[00:51.36]傷つくことなど[00:54.18]ありはしないとわかっている[00:58.98]あの日の悲しみさえ[01:01.74]あの日の苦しみさえ[01:04.52]そのすべてを愛してた[01:07.28]あなたとともに[01:09.98]胸に残り離れない[01:13.07]苦いレモンの匂い[01:15.84]雨が降り止むまでは帰れない[01:21.39]今でもあなたはわたしの光[01:37.98]暗闇であなたの背をなぞった[01:43.43]その輪郭を鮮明に覚えている[01:48.97]受け止めきれないものと[01:52.20]出会うたび[01:54.50]溢れてやまないのは涙だけ[02:00.32]何をしていたの[02:03.16]何を見ていたの[02:05.92]わたしの知らない横顔で[02:10.69]どこかであなたが今[02:13.43]わたしと同じ様な[02:16.31]涙にくれ[02:17.64]淋しさの中にいるなら[02:21.71]わたしのことなどどうか[02:24.85]忘れてください[02:27.60]そんなことを心から願うほどに[02:33.13]今でもあなたはわたしの光[02:41.64]自分が思うより[02:47.19]恋をしていたあなたに[02:52.72]あれから思うように[02:58.24]息ができない[03:03.33]あんなに側にいたのに[03:09.27]まるで嘘みたい[03:14.40]とても忘れられない[03:20.21]それだけが確か[03:30.81]あの日の悲しみさえ[03:33.41]あの日の苦しみさえ[03:36.22]そのすべてを愛してた[03:38.97]あなたとともに[03:41.67]胸に残り離れない[03:44.77]苦いレモンの匂い[03:47.61]雨が降り止むまでは帰れない[03:53.09]切り分けた果実の片方の様に[03:58.60]今でもあなたはわたしの光';
    var audioLicSong4 = '[00:00.00]杀死那个石家庄人 - 万能青年旅店[00:15.51]词: 姬赓[00:31.02]曲: 董亚千[00:46.53]傍晚六点下班[00:48.51][00:51.26]换掉药厂的衣裳[00:54.05][00:56.96]妻子在熬粥[00:59.00][01:01.90]我去喝几瓶啤酒[01:04.03][01:05.91]如此生活三十年[01:09.00][01:11.25]直到大厦崩塌[01:14.76][01:16.04]云层深处的黑暗啊[01:19.79][01:21.37]淹没心底的景观[01:25.23][01:48.96]在八角柜台[01:50.79][01:53.54]疯狂的人民商场[01:55.57][01:58.98]用一张假钞 [02:00.70][02:04.51]买一把假枪 [02:06.03][02:07.71]保卫她的生活[02:11.27][02:13.25]直到大厦崩塌[02:15.94][02:18.28]夜幕覆盖华北平原[02:21.23][02:22.86]忧伤浸透她的脸[02:25.90][02:50.67]河北师大附中[02:52.44][02:56.51]乒乓少年背向我[02:58.33][03:00.88]沉默的注视[03:02.35][03:05.70]无法离开的教室[03:07.83][03:09.82]生活在经验里[03:11.95][03:15.21]直到大厦崩塌[03:17.30][03:19.85]一万匹脱缰的马[03:22.13][03:25.69]在她脑海中奔跑[03:27.41][04:12.35]如此生活三十年[04:14.12][04:17.08]直到大厦崩塌[04:19.98][04:22.73]一万匹脱缰的马[04:24.86][04:26.65]在她脑海中奔跑[04:29.54][04:32.69]如此生活三十年[04:35.13][04:37.69]直到大厦崩塌[04:40.14][04:42.02]云层深处的黑暗啊[04:46.03]淹没心底的景观';
    var aaaa = [audioLicSong0, audioLicSong1, audioLicSong2, audioLicSong3, audioLicSong4];
    var audioLic1 = audioLicSong0.split('[');
    var audioLic2 = new Array();
    var audioLicTime = new Array();
    for(var i = 1; i < audioLic1.length; i++){
        var b = audioLic1[i].split(']');
        audioLic2.push(b);
    }
    for(var i = 0; i < audioLic2.length; i++){
        var d = audioLic2[i][0].split('.');
        audioLicTime.push(d[0]);
    }
    var audioIndex = 0;
    var audioText = new Array();
    var audioLoop = false;
    var outTextValue = 0;
    var audioSpeed = 1.8;
    audioText = audioName[0].split('-');
    $('.audio-head-tittle-text').text(audioText[1]);
    $('.audio-head-tittle-text-out').text(audioText[1]);
    $('.audio-head-tittle-text-out-a').text(audioText[1]);
    $('.audio-head-tittle-by').text(audioText[0]);
    $('.audio-text').text(audioLic2[0][1]);
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
    };
    function qiehuan(){
        if (audioIndex == audioName.length ){
            audioIndex = 0;
        }
        if (audioIndex == -1 ){
            audioIndex = audioName.length - 1;
        }
        audioText = new Array();
        audioText = audioName[audioIndex].split('-');
        $('.audio-head-tittle-text').text(audioText[1]);
        $('.audio-head-tittle-by').text(audioText[0]);
        $('.audio-head-tittle-text-out').text(audioText[1]);
        $('.audio-head-tittle-text-out-a').text(audioText[1]);
        $('.audio-head-tittle-text').css('text-indent', 0);
        audio.src = 'soures/' + audioName[audioIndex] + '.mp3';
        var audioImg = 'url(soures/' + audioText[1] + '.jpg)';
        if(audioMax){
            $('.audio-img-cover').css({
                'background': audioImg + 'no-repeat center',
                'background-size': '90px 90px',
            });
        } else {
            $('.audio-img-cover').css({
                'background': audioImg + 'no-repeat center',
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
        audioLic1 = aaaa[audioIndex].split('[');
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
    };
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
    };
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
    });
    $('#audio-my').on('ended', function() {
        if(!audioLoop){
            audioIndex += 1;
        }
        qiehuan();
    });
    $('#audio-img-canvas-play').on('click', function () {
        playAudio();
    });
    $('.audio-btn-play').on('click', function () {
        playAudio();
    });
    $('.audio-btn-next').on('click', function () {
        audioIndex += 1;
        qiehuan();
    })
    $('.audio-btn-before').on('click', function () {
        audioIndex -= 1;
        qiehuan();
    })
    $('.audio-btn-sound').on('click', function () {
        $('.audio-sound').toggleClass('audio-sound-on');
    });
    $('.audio-btn-list').on('click', function () {
        if (!audioLoop){
            $('.audio-btn-list').removeClass('audio-btn-list-off').addClass('audio-btn-list-on');
        } else {
            $('.audio-btn-list').removeClass('audio-btn-list-on').addClass('audio-btn-list-off');
        }
        audioLoop = ! audioLoop;
    });
    $("#audio").hover(function() {
        $('.audio').toggleClass('audio-off');
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
    });
    $("#audio").mouseleave(function() {
        if(audioPlay){
            $('.audio-btn-play').css('animation', 'img-cover linear 2.5s infinite');
        }
        $('.audio-sound').removeClass('audio-sound-on');
        $('.audio-img-cover').css({
            'background-size': '40px 40px',
        });
    })
});