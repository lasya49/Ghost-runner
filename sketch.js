var tower, towerImage;
var ghost, ghostImage;
var door, doorImage,doorGroup;
var rail, railImage, railGroup;
var spookySound;
var invisBlock,invisBlockGroup;
var gameState="play";
function preload(){
  ghostImage=loadImage("ghost-standing.png");
  doorImage=loadImage("door.png");
  railImage=loadImage("climber.png");
  towerImage=loadImage("tower.png");
  spookySound=loadSound("spooky.wav");
  
  
  
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=4;
  doorGroup=new Group();
  railGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;
  invisBlockGroup=new Group();
  spookySound.loop();
  
  
}
function draw(){
  background("white");
  if(gameState==="play"){
    
  
  if (tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if (keyDown("space")){
    ghost.velocityY=-3;
      }
  ghost.velocityY=ghost.velocityY+0.8;
  if (railGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if (invisBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }

  spawnDoors();
  drawSprites();
  }
  if (gameState==="end"){
    stroke("red");
    fill("black");
    textSize(50);
    text("Game Over!",200,200);
  }
}


function spawnDoors(){
  if (frameCount%220===0){
  door=createSprite(230,-50);
    door.addImage(doorImage);
    door.x=Math.round(random(120,400));
    door.velocityY=4;
    door.lifetime=650;
    doorGroup.add(door);
    rail=createSprite(230,-10);
     rail.addImage(railImage);
    rail.x=door.x;
    rail.velocityY=4;
    rail.lifetime=650;
    railGroup.add(rail);
    ghost.depth=door.depth;
    ghost.depth=rail.depth;
    ghost.depth=ghost.depth+1;
    invisBlock=createSprite(230,10);
    invisBlock.width=rail.width; 
    invisBlock.height=2;
    invisBlock.x=door.x;
    invisBlock.velocityY=4;
    invisBlock.lifetime=650;
    invisBlockGroup.add(invisBlock);
    invisBlock.debug=true;
}
}