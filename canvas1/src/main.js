(function(global) {
    var cjs = createjs || {};
    var utils = cjs.utils;
    var exportRoot;
    var stage;
    var cover;
    var canClick = false;
    var btnStart;
    var MAX_PAGE_NUM = 10;
    var MAX_REC_NUM = 8;
    var MAX_DRAG_NUM = 10;
    var count = 0;
    var moveMcGroup = [], recGroup = [];
    global.onload = function() {
        utils.onStart = onGameStart;
        utils.init(config);
    };

    function onGameStart(res, st) {
        exportRoot = res;
        stage = st;
        init();
    }

    function init(){
        cover = exportRoot.cover;
        btnStart = exportRoot.btnStart;
        for(var i = 0; i < MAX_PAGE_NUM; i++){
            var moveMc = exportRoot["moveMc" + (i + 1)];
            if(moveMc)moveMcGroup.push(moveMc);
        }

        for(i = 0; i < MAX_REC_NUM; i++){
            var rec = exportRoot["rec" + (i + 1)];
            if(rec){
                recGroup.push(rec);
                rec.idx = i;
            }
        }

        if(exportRoot.gotoAndStop)exportRoot.gotoAndStop(0);
        handleControl();
    }

    function reset(){
        moveMcGroup.forEach(function(moveMc){
            moveMc.dragGroup.forEach(function(drag){
                drag.x = drag.initX;
                drag.y = drag.initY;
                drag.visible = true;
            });
        });
    }

    function mouseDown(e){
        var drag = e.currentTarget;
        var p = drag.parent.globalToLocal(e.stageX, e.stageY);
        drag.downX = p.x;
        drag.downY = p.y;
        drag.lastX = drag.x;
        drag.lastY = drag.y;
        drag.parent.addChild(drag);
    }
    function pressMove(e){
        var drag = e.currentTarget;
        if(!canClick) return;
        var p = drag.parent.globalToLocal(e.stageX, e.stageY);
        var newX = drag.lastX + (p.x - drag.downX);
        var newY = drag.lastY + (p.y - drag.downY);
        if(newX <= drag.nominalBounds.width * .5){
            newX = drag.nominalBounds.width * .5;
        }else if(newX >= global.config.width - drag.nominalBounds.width * .5){
            newX = global.config.width -  drag.nominalBounds.width * .5;
        }
        if(newY <=  drag.nominalBounds.height * .5){
            newY =  drag.nominalBounds.height * .5;
        }else if(newY >= global.config.height  - drag.nominalBounds.height * .5){
            newY =  global.config.height  - drag.nominalBounds.height * .5
        }

        drag.x = newX;
        drag.y = newY;
    }
    function pressUp(e){
        var drag = e.currentTarget;
        if(!canClick) return;
        var isContained;
        var count = getCount();
        var currentFrame = exportRoot.currentFrame || 0;
        for(var i=0; i< recGroup.length; i++){
            var rec = recGroup[i], width = rec.nominalBounds.width,height = rec.nominalBounds.height;
            if(Math.abs(drag.x - rec.x)< width/2 && Math.abs(drag.y - rec.y)< height/2){
                isContained = true;
                if(drag.idx == global.audioGroup[currentFrame][count] && checkIsRight(rec.idx)){
                    drag.visible = false;
                    canClick = false;

                    audioPlayer.playAudioCallback("sounds/wego_right.mp3", function(){
                        if(checkIsOver() && currentFrame < global.ansGroup.length - 1){
                            exportRoot.gotoAndStop(currentFrame + 1);
                            reset();
                            playNextAudio();
                        }else if(!checkIsOver()){
                            playNextAudio();
                        }

                    },this);
                }else{
                    audioPlayer.playAudio("sounds/wego_error.mp3");
                }
            }
        }
        drag.x = drag.initX;
        drag.y = drag.initY;

    }

    function checkIsRight(idx){
        var count = getCount();
        var currentFrame = exportRoot.currentFrame || 0;
        var currentAns = global.ansGroup[currentFrame][count];

        if(currentAns == idx) return true;

        return false;
    }

    function getCount(){
        var count = 0;
        var currentFrame = exportRoot.currentFrame || 0;
        var currentDragGroup = moveMcGroup[currentFrame].dragGroup;
        for(var i = 0; i < currentDragGroup.length; i++){
            if(!currentDragGroup[i].visible) count++;
        }
        return count;
    }


    function checkIsOver() {
        var hideNum = 0;
        var currentFrame = exportRoot.currentFrame || 0;
        var currentDragGroup = moveMcGroup[currentFrame].dragGroup;
        var totalNum = global.ansGroup[currentFrame].length;
        currentDragGroup.forEach(function (drag) {
            if(!drag.visible) hideNum++;
        });
        if(hideNum == totalNum) return true;
        return false;
    }

    function playNextAudio(){
        var currentFrame = exportRoot.currentFrame || 0;
        var count = getCount();
        var lastFrameCount = 0;
        if(currentFrame > 0){
            for(var i = 0; i < currentFrame; i++){
                lastFrameCount += global.audioGroup[i].length ;
            }
        }
        var num = lastFrameCount + count + 1;
        num = num < 10 ? '0' + num : num;
        audioPlayer.playAudioCallback("sounds/" + num +  ".mp3", function(){
            canClick = true;
        },this);
    }

    function handleControl() {
        utils.on(cover.btnStart, 'click', function(){
            cover.visible = false;
            audioPlayer.playAudioCallback('sounds/bg.mp3',function(){
                playNextAudio();
            },this);
        });

        moveMcGroup.forEach(function(moveMc){
            var dragGroup = moveMc.dragGroup = [];
            for(var i = 0; i < MAX_DRAG_NUM; i++){
                var drag = moveMc["drag" + ( i + 1 )];
                if(drag){
                    drag.initX = drag.x;
                    drag.initY = drag.y;
                    drag.idx = i;
                    dragGroup.push(drag);
                    utils.on(drag, "mousedown", mouseDown);
                    utils.on(drag, "pressmove", pressMove);
                    utils.on(drag, "pressup", pressUp);
                }
            }
        });
    };

})(window);