// 1秒間に描画する回数
var FPS = 60;
// 画面の幅
var SCREEN_WIDTH = window.innerWidth;
// 画面の高さ
var SCREEN_HEIGHT = window.innerHeight;
// 重力係数
var GRAVITY = 0.4;

// 2Dコンテキスト
var ctx;
// 作成したパーティクルを入れる配列
var particleList = [];
// マウスのX座標
var mx = null;
// マウスのY座標
var my = null;

// コンストラクタ
var Particle = function (x, y) {
    this.x = x;
    this.y = y;
};

Particle.prototype = {
    x: null,
    y: null,
    vx: 0,
    vy: 0,
    radius: 0,
    color: null,
    isRemove: false,
    create: function() {
        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * (-6) - 2;
        this.radius = Math.random() * 20 + 5;
        var r = 150;
        var g = Math.floor(Math.random() * 100 + 155);
        var b = Math.floor(Math.random() * 155 + 100);
        this.color = "rgb(" + r + "," + g + ", " + b + ")";
    },
    update: function() {
        this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;
        this.radius *= .97;

        // パーティクルが画面の外に出たとき削除フラグを立てる
        if (this.x < 0 || this.x > SCREEN_WIDTH || this.y > SCREEN_HEIGHT) {
            this.isRemove = true;
        }
    },
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

window.onload = function() {
    init();
};

// 初期設定
var init = function() {
    var canvas = document.getElementById("mycanvas");
    // canvas要素の存在をチェック
    if (!canvas || !canvas.getContext) {
        return false;
    }
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    ctx = canvas.getContext("2d");
    // canvasにマウスイベントを登録
    canvas.addEventListener("mousemove", updateMousePos, false); // マウス移動時イベント
    canvas.addEventListener("mouseout", resetMousePos, false); // マウスが画面外に出た際のイベント
    // メインループを実行
    loop();
};

// マウスの位置を取得
var updateMousePos = function(e) {
    var rect = e.target.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
};

// マウスの位置をリセット
var resetMousePos = function(e) {
    mx = null;
    mx = null;
};

// メインループ
var loop = function() {
    add();
    update();
    draw();
    setTimeout(loop, 1000 / FPS);
};

// パーティクルの追加
var add = function() {
    if (my !== null && my !== null) {
        var p = new Particle(mx, my);
        p.create();

        particleList.push(p);
    }
};

// パーティクルの位置を更新
var update = function() {
    var list = [];
    for (var i = 0; i < particleList.length; i++) {
        particleList[i].update();

        if (!particleList[i].isRemove) {
            list.push(particleList[i]);
        }
    }
    particleList = list;
};

// パーティクルの描画
var draw = function() {
    // 背景を描画
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    // パーティクルを描画
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particleList.length; i++) {
        particleList[i].draw();
    }
    ctx.restore();
};
