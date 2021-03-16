var map = {
    cols: 12,
    rows: 12,
    tsize: 32,
    trows: 6,
    tcols: 8,
    solids: [3, 5],
    musics: {
        0: null,
        1: '../assets/musics/jazz.mp3',
        2: '../assets/musics/ukelele.mp3',
    },
    musicLayer: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    layers: [[
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 3,
        3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3
    ], [
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4
    ],],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    getMusic: function (col, row) {
        return this.musicLayer[row * map.cols + col];
    },
    isSolidTileAtXY: function (x, y) {
        var col = Math.floor(x / this.tsize);
        var row = Math.floor(y / this.tsize);

        return this.layers.reduce(function (res, layer, index) {
            var tile = this.getTile(index, col, row);
            var isSolid = this.solids.includes(tile);
            return res || isSolid;
        }.bind(this), false);
    },
    getCol: function (x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tsize);
    },
    getX: function (col) {
        return col * this.tsize;
    },
    getY: function (row) {
        return row * this.tsize;
    },

};

function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};

Camera.prototype.update = function () {

    this.following.screenX = this.width / 2;
    this.following.screenY = this.height / 2;

    this.x = this.following.x - this.width / 2;
    this.y = this.following.y - this.height / 2;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));


    if (this.following.x < this.width / 2 ||
        this.following.x > this.maxX + this.width / 2) {
        this.following.screenX = this.following.x - this.x;
    }

    if (this.following.y < this.height / 2 ||
        this.following.y > this.maxY + this.height / 2) {
        this.following.screenY = this.following.y - this.y;
    }
};

function Music() {
    this.player = new Audio();
}

Music.prototype.play = function (src) {
    this.player.src = src;
    this.player.play();
}

Music.prototype.pause = function () {
    this.player.pause();
}

function Hero(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = map.tsize;
    this.height = map.tsize;
    this.direction = 0;
    this.renderPosition = 1;
    this.musicPlayer = new Music();
    this.musicTile = null;

    this.image = Loader.getImage('hero');
}


Hero.SPEED = 128;

Hero.prototype.move = function (delta, dirx, diry) {
    this.x += dirx * Hero.SPEED * delta;
    this.y += diry * Hero.SPEED * delta;

    this._collide(dirx, diry);

    var maxX = this.map.cols * this.map.tsize;
    var maxY = this.map.rows * this.map.tsize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));

    const musicTile = this.map.getMusic(Math.floor(this.x / this.width), Math.floor(this.y / this.width));
    this.musicTile = musicTile;

    if (musicTile) {
        if (this.musicPlayer.player.paused) {
            this.musicPlayer.play(this.map.musics[musicTile]);
        }
    } else {
        if (!this.musicPlayer.player.paused) {
            this.musicPlayer.pause();
        }
        this.musicTile = null;
    }
};

Hero.prototype._collide = function (dirx, diry) {
    var row, col;

    var left = this.x - this.width / 6;
    var right = this.x + this.width / 6 - 1;
    var top = this.y - this.height / 8;
    var bottom = this.y + this.height / 2 - 1;

    var collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
    if (!collision) { return; }

    if (diry > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.height / 2 + this.map.getY(row);
    }
    else if (diry < 0) {
        row = this.map.getRow(top);
        this.y = this.height / 8 + this.map.getY(row + 1);
    }
    else if (dirx > 0) {
        col = this.map.getCol(right);
        this.x = -this.width / 6 + this.map.getX(col);
    }
    else if (dirx < 0) {
        col = this.map.getCol(left);
        this.x = this.width / 6 + this.map.getX(col + 1);
    }
};

Game.load = function () {
    return [
        Loader.loadImage('tiles', '../assets/tiles.png'),
        Loader.loadImage('hero', '../assets/character.png')
    ];
};

Game.init = function () {
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
    this.tileAtlas = Loader.getImage('tiles');

    this.hero = new Hero(map, 160, 160);
    this.camera = new Camera(map, 32 * 12, 32 * 12);
    this.camera.follow(this.hero);

    setInterval(() => {
        this.hero.renderPosition++;

        if (this.hero.renderPosition === 3) {
            this.hero.renderPosition = 0;
        }
    }, 300)

    window.hero = this.hero;
};

Game.update = function (delta) {
    var dirx = 0;
    var diry = 0;
    if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; this.hero.direction = 3 }
    else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; this.hero.direction = 9 }
    else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; this.hero.direction = 6 }
    else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; this.hero.direction = 0 }

    this.hero.move(delta, dirx, diry);
    this.camera.update();
};

Game._drawLayer = function (layer) {
    var startCol = Math.floor(this.camera.x / map.tsize);
    var endCol = startCol + (this.camera.width / map.tsize);
    var startRow = Math.floor(this.camera.y / map.tsize);
    var endRow = startRow + (this.camera.height / map.tsize);
    var offsetX = -this.camera.x + startCol * map.tsize;
    var offsetY = -this.camera.y + startRow * map.tsize;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);

            var x = (c - startCol) * map.tsize + offsetX;
            var y = (r - startRow) * map.tsize + offsetY;

            const tileRow = tile % map.tcols === 0 ? Math.floor(tile / map.tcols) - 1 : Math.floor(tile / map.tcols);
            const tileCol = (tile - 1) % map.tcols;

            if (tile !== 0) {
                this.ctx.drawImage(
                    this.tileAtlas,
                    map.tsize * tileCol,
                    tile <= map.tcols ? 0 : tileRow * map.tsize,
                    map.tsize,
                    map.tsize,
                    Math.round(x),
                    Math.round(y),
                    map.tsize,
                    map.tsize
                );
            }
        }
    }
};

Game._drawGrid = function () {
    var width = map.cols * map.tsize;
    var height = map.rows * map.tsize;
    var x, y;
    for (var r = 0; r < map.rows; r++) {
        x = - this.camera.x;
        y = r * map.tsize - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
    }
    for (var c = 0; c < map.cols; c++) {
        x = c * map.tsize - this.camera.x;
        y = - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
    }
};

Game._drawHero = function () {

    if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
    else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
    else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
    else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
    else {
        this.hero.renderPosition = 0;
    }

    this.ctx.drawImage(
        this.hero.image,
        this.hero.width * this.hero.renderPosition + (this.hero.direction) * this.hero.width,
        0,
        32,
        32,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2,
        32,
        32
    );
};

Game._drawShadow = function () {
    if (this.hero.musicTile) {
        var startCol = Math.floor(this.camera.x / map.tsize);
        var endCol = startCol + (this.camera.width / map.tsize);
        var startRow = Math.floor(this.camera.y / map.tsize);
        var endRow = startRow + (this.camera.height / map.tsize);

        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0,0,0,0.3)';

        for (var c = startCol; c <= endCol; c++) {
            for (var r = startRow; r <= endRow; r++) {
                var tile = map.getMusic(c, r);

                var x = Math.round((c - startCol) * map.tsize);
                var y = Math.round((r - startRow) * map.tsize);

                if (tile !== this.hero.musicTile) {
                    this.ctx.fillRect(x, y, map.tsize, map.tsize);
                }
            }
        }
        this.ctx.stroke();
    }
}


Game.render = function () {
    this._drawLayer(0);
    this._drawLayer(1);
    this._drawHero();
    this._drawShadow();
    // this._drawGrid();
};
