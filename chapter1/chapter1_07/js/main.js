(function($){

    'use strict';
    
    // canvasの設定
    var cv = document.getElementById('textCv'),
    ctx = cv.getContext('2d'),
    paddingWindow = 20 * 2,
    inputAreaHeight = 100,
    W = cv.width = window.innerWidth - paddingWindow,
    H = cv.height = window.innerHeight - paddingWindow - inputAreaHeight,
    imgCv = document.createElement('canvas'),
    imgCtx = imgCv.getContext('2d'),
    imgText = new Image(),
    fontSize = 60,
    randomPos,
    start = true;

    $(document).ready(function() {
        init();
    });

    // 初期設定
    function init() {
        // 入力されるテキストを監視する
        watchForm();
        // 色をプルダウンで選択時
        $('#selectColor').on('change', drawText);
        // アニメーション用のcanvasを生成
        setImageCanvas();

        imgText.onload = function() {
            if (start) {
                animation();
                start = false;
            }
        };
    }

    function watchForm() {
        var timerID;
    
        // drawText関数を実行
        $('#inputText').on("focus", function() {
            timerID = setInterval(drawText, 60);
        });
    
        // drawText関数の実行を止める
        $('#inputText').on("blur", function() {
            clearInterval(timerID);
        });
    }

    // 入力されたテキストをcanvasに描画
    function drawText() {
        var inputText = $('#inputText').val();
        var colorText = $('#selectColor').val();
    
        ctx.clearRect(0, 0, W, H);
    
        // テキストの基準を決める
        ctx.textBaseline = 'middle';
        // テキストの開始位置を中央に
        ctx.textAlign = 'center';
        // シャドウの色を定義
        ctx.shadowColor = colorText;
        // シャドウの範囲を定義
        ctx.shadowBlur = 10;
        // フォントスタイルを定義
        ctx.font = 'bold 80px "Audiowide"';
        // 色を決める
        ctx.fillStyle = '#ffffff';
        // テキストを描画
        ctx.fillText(inputText, W / 2, H /2, W);

        changeImg();
    }

    // canvasに描いたテキストをimgに変換
    function changeImg() {
        var imgPngUrl = cv.toDataURL();

        imgText.src = imgPngUrl;
    }

    // 結果用のcanvasをセット
    function setImageCanvas() {
        imgCv.setAttribute('width', W);
        imgCv.setAttribute('height', H);

        // $('#viewArea').append(imgCv);
        $('#textCv').after(imgCv);
    }

    // animationの初期設定
    function initAnimation() {
        // canvasをclearする
        imgCtx.clearRect(0, 0, W, H);
        effectiveViberation();
    }

    // imageデータを1pxずつランダムでずらして描画
    function effectiveViberation() {
        var range = $('#rangeViberation').val();

        // 1pxずつずらして描画
        for (var i = 0; i < H; i += 2) {
            randomPos = Math.floor(Math.random() * range);
            imgCtx.drawImage(imgText, 0, i, W, 1, randomPos, i, W, 1);
        }
    }
    
    // アニメーションさせるためのループ
    function animation() {
        function animationLoop() {
            initAnimation();
            requestAnimationFrame(animationLoop);
        }
        animationLoop();
    }

    // requestAnimationFrameの設定
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    
})(jQuery);
