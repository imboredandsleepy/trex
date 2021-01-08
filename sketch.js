var trex, trexrunning, trexcollided;
var ground, invisibleground, groundimg;
var cloud, cloudimg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var play = 1;
var end = 0;
var gamestate = play;
var obstaclegroup, cloudsgroup;
var gameoverimg, gameover;
var restartimg, restart; 
var jumpsound, diesound, checkpointsound;



function preload() {
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadAnimation("trex_collided.png");
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");

  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checkpointsound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trexrunning);
  trex.addAnimation("collided", trexcollided);
  trex.scale = 0.5;


  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundimg);
  ground.x = ground.width / 2;

  invisibleground = createSprite(200, 190, 400, 10);
  invisibleground.visible = false;

  obstaclegroup = createGroup();
  cloudsgroup = createGroup();

  gameover = createSprite(300, 100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;

  restart = createSprite(300, 140);
  restart.addImage(restartimg);
  restart.scale = 0.5;

  trex.setCollider("circle", 0, 0, 40);


}

function draw() {
  background(180)

  fill("black");
  text("score: " + score, 500, 50);
  if (gamestate === play) {
    
    trex.changeAnimation("running",trexrunning);
    
  if(score>0 && score%100===0){
    //checkpointsound.play();
    
  }

    gameover.visible = false;

    restart.visible = false;


    score = score + Math.round(frameCount / 60);
    ground.velocityX = -4;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
      
    //jumpsound.play();
      
    }
    trex.velocityY = trex.velocityY + 0.8;

    spawnClouds();

    spawnObstacle();
    
    if(obstaclegroup.isTouching(trex)){
      gamestate=end;
  
    }
 
  } else if (gamestate === end) {

    gameover.visible = true;

    restart.visible = true;
    
    trex.velocityY=0;

    trex.changeAnimation("collided", trexcollided);

    obstaclegroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);

    ground.velocityX = 0;

    obstaclegroup.setVelocityXEach(0);
    cloudsgroup.setVelocityEach(0);
    
    if(mousePressedOver(restart)){
      reset();
    }

  }
  trex.collide(invisibleground);

  drawSprites();

}

function spawnClouds() {
  if (frameCount % 80 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudimg);
    cloud.y = Math.round(random(10, 60));
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 300;

    cloudsgroup.add(cloud);

  }
}

function spawnObstacle() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -3;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1)
        break;
      case 2:
        obstacle.addImage(obstacle2)
        break;
      case 3:
        obstacle.addImage(obstacle3)
        break;
      case 4:
        obstacle.addImage(obstacle4)
        break;
      case 5:
        obstacle.addImage(obstacle5)
        break;
      case 6:
        obstacle.addImage(obstacle6)
        break;
      default:
        break;

    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclegroup.add(obstacle);
  }

}
function reset(){
  gamestate=play;
  
  gameover.visible=false;
  restart.visible=false;
  obstaclegroup.destroyEach();
  cloudsgroup.destroyEach();
  
  score=0;
  
  
}




