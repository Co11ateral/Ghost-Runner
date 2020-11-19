var climber, climI, tower, towerI;
var door, doorI, ghost, gI, gJI, doorGroup, climGroup, invisible, gameState, invisiGroup, music;

function preload() {
  climI = loadImage("climber.png");
  doorI = loadImage("door.png");
  gI = loadImage("ghost-standing.png");
  gJI = loadImage("ghost-jumping.png");
  towerI = loadImage("tower.png");
  music = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerI);
  tower.scale = 1;
  tower.velocityY = 2;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage(gI);
  ghost.scale = 0.35;
  
  doorGroup = new Group();
  climGroup = new Group();
  invisiGroup = new Group();
  
  gameState = "PLAY";
  
  music.loop(); 
}

function draw() {
  background("black");
  
  
  doors();
  
  if(gameState==="PLAY") {
    if((keyDown("left") || keyDown("a")))  {
      ghost.x -= 5;
    }
    if((keyDown("right") || keyDown("d"))) {
      ghost.x += 5;
    }
    if(keyDown("space")) {
      ghost.velocityY = -6;
      ghost.addImage(gJI);
    }
    //gravity
    ghost.velocityY = ghost.velocityY + 0.5;

    if(tower.y > 480) {
       tower.y = 240;
    }

    if(ghost.isTouching(climGroup)) {
        ghost.velocityY = 0;
      }
   
    drawSprites();
  }
  
  if(ghost.collide(invisiGroup) || ghost.y > 600) {
      gameState = "END";
    }
  
  if(gameState==="END") {
    climGroup.destroyEach();
    doorGroup.destroyEach();
    invisiGroup.destroyEach();
    
    if(keyDown("space")) {
      gameState = "PLAY";
      ghost.y = 300;
    }
    
    textSize(30);
    fill("yellow");
    text("GAME OVER!",200,300);
  }
}
function doors() {
  if(frameCount%200===0 && gameState==="PLAY") {
    var rand = Math.round(random(150,450));
    door = createSprite(50,-75);
    door.x = rand;
    door.addImage(doorI);
    door.velocityY = 2;
    door.lifetime = 360;
    climber = createSprite(50,-10);
    climber.x = door.x;
    climber.addImage(climI);
    climber.velocityY = 2;
    climber.lifetime = 320;
    invisible = createSprite(50,0,25,5);
    invisible.x = door.x;
    invisible.width = climber.width;
    invisible.velocityY = 2;
    invisible.visible = false;
    invisiGroup.add(invisible);
    ghost.depth = door.depth;
    ghost.depth += 1;
    doorGroup.add(door);
    climGroup.add(climber);
  }
}