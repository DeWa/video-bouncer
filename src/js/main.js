window.onLoad = init();
function init(){
    c = document.getElementById("taulu");
    ctx = c.getContext("2d");
    window_Height = window.innerHeight;
    window_Width = window.innerWidth;
    ctx.canvas.width  = window_Width;
    ctx.canvas.height = window_Height;
    kuvat = [];
    dx = 2;
    dy = 2;

    // Kuva classi
    function Kuva (x, y, url) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.url = url;

        nega = Math.floor((Math.random() * 2) + 1);
        nega2 = Math.floor(Math.random() * 2);
        koko = Math.floor((Math.random() * 2) + 1);
        koko2 = Math.floor((Math.random() * 2) + 1);

        if(nega = 1) {
            this.dx = -koko;
        } else {
            this.dx = koko;
        }

        if(nega2 = 1) {
            this.dy = -koko2;
        } else {
            this.dy = koko2;
        }

        this.piirra = function() {
            var imageWidth = this.kuva.width;
            var imageHeight = this.kuva.height;
            var spaceX = window_Width - imageWidth;
            var spaceY = window_Height - imageHeight;
            var randNro = Math.floor((Math.random() * 5) + 1);
            this.x += this.dx;
            this.y += this.dy;

            if(this.x > spaceX) {
                this.x -= 2 * randNro;
                this.dx = -2;
            } else if(this.y > spaceY) {
                this.y -= 2 * randNro
                this.dy = -2;
            } else if(this.x < 0 ) {
                this.dx = 2;
            } else if(this.y < 0) {
                this.dy = 2;
            }

            ctx.drawImage(this.kuva, this.x, this.y);

        }
    }

    olut1 = new Kuva(1, 1, 'olut.png');
    olut2 = new Kuva(200, 200, 'olut.png');
    olut3 = new Kuva(700, 700, 'olut.png');
    olut4 = new Kuva(800, 70, 'olut.png');
    olut5 = new Kuva(90, 900, 'olut.png');
    viina1 = new Kuva(300, 300, 'saarenmaa.png');
    viina2 = new Kuva(30, 30, 'jager.png');
    viina3 = new Kuva(500, 500, 'jallu.png');
    viina4 = new Kuva(900, 600, 'minttu.png');
    kuvat = [olut1, olut2, olut3,olut4, olut5, viina1, viina2, viina3, viina4];

    lataaKuvat(function() {
        setInterval(piirraKuvat, 5);
    });

}

function lataaKuvat(callback) {
    var kuvaLkm = kuvat.length;
    var ladattuNro = 0;

    for(var o = 0; o < kuvaLkm; o++) {
        kuvat[o].kuva = new Image();
        kuvat[o].kuva.src = kuvat[o].url;
        kuvat[o].kuva.onload = function() {
            ladattuNro++;
         };
        if(++ladattuNro >= kuvaLkm) {
            callback();
        }
    }
}
function piirraKuvat() {
    var kesto = kuvat.length;
    clear();
    for(var i = 0; i < kesto; i++) {
        kuvat[i].piirra();
    }
}

function clear() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
}
$("#taulu").click(function() {
var video = $("#bgvid").get(0);
var myaudio = $("#myaudio").get(0);
video.play();
myaudio.play();
});
