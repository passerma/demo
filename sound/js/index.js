$(function () {
    var documents = $(document);
    var time = null;
    var type = 1;
    function Type1() {
        var type1Control = $('.type1-control');
        var type1Dot1 = $('.type1-control-dot1');
        var type1Dot2 = $('.type1-control-dot2');
        var type1Dot1X = type1Dot1.offset().left + 19;
        var type1Dot1Y = type1Dot1.offset().top + 19;
        var type1Sound = 50;
        var pointA = {
            X: type1Dot1X,
            Y: type1Dot1Y
        };
        var pointB = {};
        var pointC = {};
        var typeMouse = false;
        var allA = 0;
        type1Dot2.on('mousedown', function(e) {
            pointB.X = e.pageX;
            pointB.Y = e.pageY;
            typeMouse = true;
        });
        documents.on('mousemove', function(e) {
            if(typeMouse) {
                pointC.X = e.pageX;
                pointC.Y = e.pageY;
                var AB = {};
                var AC= {};
                AB.X = (pointB.X - pointA.X);
                AB.Y = (pointB.Y - pointA.Y);
                AC.X = (pointC.X - pointA.X);
                AC.Y = (pointC.Y - pointA.Y);
                var direct = (AB.X * AC.Y) - (AB.Y * AC.X);
                var lengthAB = Math.sqrt( Math.pow(pointA.X - pointB.X, 2) +
                    Math.pow(pointA.Y - pointB.Y, 2)),
                    lengthAC = Math.sqrt( Math.pow(pointA.X - pointC.X, 2) +
                        Math.pow(pointA.Y - pointC.Y, 2)),
                    lengthBC = Math.sqrt( Math.pow(pointB.X - pointC.X, 2) +
                        Math.pow(pointB.Y - pointC.Y, 2));
                var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
                    (2 * lengthAB * lengthAC);
                var angleA = Math.round( Math.acos(cosA) * 180 / Math.PI );
                if (direct < 0){
                    allA -= angleA;
                } else {
                    allA += angleA;
                }
                type1Control.css('transform', `rotateZ(${allA}deg)`);
                var soundQ =  parseInt(allA/360);
                if (allA < 0){
                    soundQ -= 1;             //解决-0和0导致bug问题
                }
                var soundNew = type1Sound + soundQ;
                upSound($('.type1-sound-text'),soundNew, $('.type1-sound-now'));
                pointB.X = pointC.X;
                pointB.Y = pointC.Y;
            }
        });
        documents.on('mouseup', function(e) {
            typeMouse = false;
        });
    }
    function Type2() {
        var type2Control = $('.type2-control');
        var type2Dot1 = $('.type2-control-dot1');
        var type2Dot2 = $('.type2-control-dot2');
        var type2Dot1Y = type2Dot1.offset().top;
        var mouseY = 0;
        var type2Sound = 50;
        var bott = false;
        var typeMouse = false;
        type2Dot1.on('mousedown', function(e) {
            type2Control.stop().animate();
            mouseY = e.pageY;
            typeMouse = true;
        });
        documents.on('mousemove', function(e) {
            if(typeMouse) {
                var mouseNewY = e.pageY;
                var dotD = mouseNewY - mouseY;
                type2Dot1Y += dotD;
                if (type2Dot1Y >= 160){
                    type2Dot1Y = 160;
                }
                if(type2Dot1Y >= 150){
                    if(!bott){
                        type2Sound += 1;
                        if(type2Sound >= 100){
                            type2Sound = 100;
                        }
                        upSound($('.type2-sound-text'),type2Sound, $('.type2-sound-now'))
                    }
                    bott = true;
                }
                if (type2Dot1Y <= 100){
                    type2Dot1Y = 100;
                }
                if(bott && type2Dot1Y <= 130){
                    bott = false;
                }
                type2Control.css('top', `${type2Dot1Y}px`);
                mouseY = mouseNewY;
            }
        });
        documents.on('mouseup', function(e) {
            typeMouse = false;
            type2Control.animate({top:"100px"},function () {
                type2Dot1Y = type2Dot1.offset().top;
            });
        });
        time = setInterval(function () {
            type2Sound -= 1;
            if(type2Sound <= 0){
                type2Sound = 0;
            }
            upSound($('.type2-sound-text'),type2Sound, $('.type2-sound-now'))
        },600);
    }
    function upSound($sound, sound, $soundNow){
        if(sound >= 100){
            sound = 100;
        }
        if(sound <= 0){
            sound = 0;
        }
        $sound.text(sound);
        $soundNow.css('height', sound + '%');
    }
    $('.type1').one('mousedown', function () {
        Type1();
        console.log('1')
    });
    $('.type2').one('mousedown', function () {
        Type2();
        console.log('2')
    });
});