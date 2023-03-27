//objetos
var gameOver
var GMimage
var gmtext
var gmtextimg
var trex;
var trex_running;
var trex_collided ;
var ground;
var invisibleGround;
var groundImage;
var cloud, cloudImage;
var obstaclesGroup;
var cloudsGroup;
//estados de juego
var gamestate = 1
var PLAY = 1
var END = 0
function preload(){
//animacion de t rex  
trex_running = loadAnimation("dinosaurio.png","dinosaurios2.png")
//imagenes de los objetos
cloudImage = loadImage("lanube.png");
groundImage = loadImage("ground2.png");
obstacle1 = loadImage("loscactus.png");
obstacle2 = loadImage("elcactus.png");
obstacle3 = loadImage("loscactus.png");
obstacle4 = loadImage("elcactus.png");
obstacle5 = loadImage("loscactus.png");
obstacle6 = loadImage("elcactus.png");
GMimage = loadImage("restart.png");
gmtextimg = loadImage("gameover.png");
trex_collided = loadAnimation("dinosaurioperdi.png")
}
function setup() {
  //la pantalla
  createCanvas(600,200);
  //suelo falso
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.7;
  //suelo real
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //puntaje
var score =0;
text("puntuacion:"+ score);
cloudsGroup = createGroup();
obstaclesGroup = createGroup();
gameOver = createSprite(300,100,25,25)
gameOver.addImage("restart",GMimage)
  gmtext = createSprite(300,70,25,25)
    gmtext.addImage("gameov",gmtextimg)
gmtext.scale = 1.5
GMimage.scale= 0.5
}


function draw() {

  background(250);
  if(gamestate === PLAY) {
    ground.velocityX = -4;
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0){
      ground.x = ground.width/2;
    };
    spawnClouds();
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)){
     
      gamestate = END
    }

  }
  else if(gamestate === END){
  ground.velocityX=0;
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
trex.velocityY = trex.velocityY + 0.8;
gameOver.visible = true
gmtext.visible = true
if(mousePressedOver(GMimage)){
reset();
}



trex.changeAnimation("collided",trex_collided)
  }
 
  
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  drawSprites();

}
function reset(){
gamestate = PLAY
gmtext.visible = false
GMimage.visible = false
}



function spawnClouds(){
  if(frameCount%60===0){
    cloud =createSprite(500,100,40,10);
    cloud.addImage(cloudImage);
  cloud.velocityX = -3;
  cloud.y = Math.round(random(10,60));
  cloud.scale= 1;
  cloud.depth = trex.depth ;
  trex.depth = trex.depth +1;
cloud.lifeTime = 200;
cloudsGroup.add(cloud);
  }
}
function spawnObstacles(){
if(frameCount%60 === 0){
var obstacle = createSprite(600,165,10,40)
obstacle.velocityX = -6

var rand= Math.round(random(1,6))
switch(rand){
case 1: obstacle.addImage(obstacle1)
break
case 2: obstacle.addImage(obstacle2)
break
case 3: obstacle.addImage(obstacle3)
break
case 4: obstacle.addImage(obstacle4)
break
case 5: obstacle.addImage(obstacle5)
break
case 6: obstacle.addImage(obstacle6)
break
default:break
}
obstacle.scale = 1
obstacle.lifeTime=200
obstaclesGroup.add(obstacle)
}
}