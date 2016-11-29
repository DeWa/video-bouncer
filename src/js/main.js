$(window).on('load', ()=>{
  $("#loader").fadeOut("slow");
  $("#music").trigger("play");
  const video = document.getElementById("bgvid");
  $("#bgvid").on("click", ()=> {video.play()})
});

const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {transparent: true, autoResize: true, resolution: window.devicePixelRatio});
document.body.appendChild(renderer.view);
// Put the renderer on screen in the corner
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

// Create stage
var stage = new PIXI.Container();


// Create textures
const beerTexture = PIXI.Texture.fromImage('./assets/images/sprites/beer.png');
const tartTexture = PIXI.Texture.fromImage('./assets/images/sprites/tart.png');
const glogiTexture = PIXI.Texture.fromImage('./assets/images/sprites/glogi.png');
const ballTexture = PIXI.Texture.fromImage('./assets/images/sprites/ball.png');

const bouncers = [];

let initialScale = 0.5;
if ($(window).width() < 800){
  initialScale = 0.25;
};

// Create beers
for(let i = 0; i < 4; i++){
  const beer = new PIXI.Sprite(beerTexture);
  beer.x = Math.floor((Math.random() * window.innerWidth) + 1);
  beer.y = Math.floor((Math.random() * window.innerHeight) + 1);
  beer.anchor.x = 0.5;
  beer.anchor.y = 0.5;
  beer.scale = {x: initialScale, y:initialScale};
  beer.speed = Math.floor((Math.random() * 5) + 1);
  beer.rotationSpeed = (Math.random() * 0.05) + 0.01;
  beer.speedX = beer.speed;
  beer.speedY = beer.speed;
  stage.addChild(beer);
  bouncers.push(beer);
}

// Create tarts
for(let i = 0; i < 3; i++){
  const tart = new PIXI.Sprite(tartTexture);
  tart.x = Math.floor((Math.random() * window.innerWidth) + 1);
  tart.y = Math.floor((Math.random() * window.innerHeight) + 1);
  tart.anchor.x = 0.5;
  tart.anchor.y = 0.5;
  tart.scale = {x: initialScale, y:initialScale};
  tart.speed = Math.floor((Math.random() * 5) + 1);
  tart.rotationSpeed = (Math.random() * 0.05) + 0.01;
  tart.speedX = tart.speed;
  tart.speedY = tart.speed;
  stage.addChild(tart);
  bouncers.push(tart);
}

// Create glogi
for(let i = 0; i < 2; i++){
  const glogi = new PIXI.Sprite(glogiTexture);
  glogi.x = Math.floor((Math.random() * window.innerWidth) + 1);
  glogi.y = Math.floor((Math.random() * window.innerHeight) + 1);
  glogi.anchor.x = 0.5;
  glogi.anchor.y = 0.5;
  glogi.scale = {x: initialScale, y:initialScale};
  glogi.speed = Math.floor((Math.random() * 5) + 1);
  glogi.rotationSpeed = (Math.random() * 0.05) + 0.01;
  glogi.speedX = glogi.speed;
  glogi.speedY = glogi.speed;
  stage.addChild(glogi);
  bouncers.push(glogi);
}

// Create balls
for(let i = 0; i < 3; i++){
  const ball = new PIXI.Sprite(ballTexture);
  ball.x = Math.floor((Math.random() * window.innerWidth) + 1);
  ball.y = Math.floor((Math.random() * window.innerHeight) + 1);
  ball.anchor.x = 0.5;
  ball.anchor.y = 0.5;
  ball.scale = {x: initialScale / 2, y:initialScale / 2}; // Why /2? Because balls are too big
  ball.speed = Math.floor((Math.random() * 5) + 1);
  ball.rotationSpeed = (Math.random() * 0.05) + 0.01;
  ball.speedX = ball.speed;
  ball.speedY = ball.speed;
  stage.addChild(ball);
  bouncers.push(ball);
}


// start animating
animate();
function animate() {
    for (let i = 0; i < bouncers.length; i++){
      let bounce = bouncers[i];
      bounce.rotation += bounce.rotationSpeed;
      bounce.position.x += bounce.speedX;
      bounce.position.y += bounce.speedY;

      if (bounce.position.x > window.innerWidth){
        bounce.speedX = -bounce.speed;
      } else if(bounce.position.x < 0) {
        bounce.speedX = +bounce.speed;
      }

      if (bounce.position.y > window.innerHeight){
        bounce.speedY = -bounce.speed;
      } else if(bounce.position.y < 0) {
        bounce.speedY = +bounce.speed;
      }
    }
    requestAnimationFrame(animate);


    // render the container
    renderer.render(stage);
}

function randomDirection(){
  const n = Math.floor((Math.random() * 2) + 1);
  if( n === 1){
    return 1;
  } else {
     return -1;
  }
}
