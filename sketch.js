//Creating the characters starting with pc then npc
// Creating an infinite background
// Work on controlling or movement of the pc
// Npc will be created at certain intervals
// Working on the gameStates
// Working on score
 
var gameState=1;
var score=0;
var oopsImg,bangImg,youRockImg,powerUpImg;
var dolphin,dolphinImg;
var backgroundImg1, backgroundImg2;
var sea;
var fishtrapGroup,fishtrapImg;
var trashGroup,trash1Img,trash2Img,trash3Img;
var powerUpGroup;
var oops,bang,youRock;

function preload(){
  seaImg1 = loadImage("bg1.jpg");
  seaImg2 = loadImage("bg2.jpg");
  dolphinImg= loadImage("dolphin.png");
  fishtrapImg=loadImage("fishnet.png");
  trash1Img= loadImage("trash1.png");
  trash2Img= loadImage("trash2.png");
  trash3Img= loadImage("trash3.png");
  oopsImg= loadImage("oops.png");
  bangImg= loadImage("bang.png");
  youRockImg= loadImage("applause.png");
  powerUpImg= loadImage("cherry.png");
}

function setup() {
  createCanvas(800,480);
  sea= createSprite(500,100,1000,480);
  sea.addImage("sea",seaImg1);
  sea.scale=1.9;
  sea.x= sea.width/2;
  
  dolphin = createSprite(80,300,20,50);
  dolphin.addImage("dolphin",dolphinImg);
  dolphin.scale= 0.25;
  
  dolphin.setCollider("circle",70,0,125);

  oops= createSprite(dolphin.x+10,dolphin.y-40);
  oops.addImage('oops',oopsImg);
  oops.scale=0.08;
  oops.visible=false;

  bang= createSprite(dolphin.x+10,dolphin.y-40);
  bang.addImage('bang',bangImg);
  bang.scale=0.14;
  bang.visible=false;

  youRock= createSprite(dolphin.x+10,dolphin.y-40);
  youRock.addImage('youRock',youRockImg);
  youRock.scale=0.08;
  youRock.visible=false;

  
  
  fishtrapGroup= new Group();
  trashGroup= new Group();
  powerUpGroup= new Group();
}

function draw() {
    background("#71EEB8"); 
   
    if(gameState===1){
        sea.velocityX= -3;
        score = score + Math.round(getFrameRate()/60);
        if(keyDown(UP_ARROW)&& dolphin.y>240) {
          dolphin.y= dolphin.y-10;
        } 

        if (keyDown(DOWN_ARROW)&& dolphin.y<480) {
            dolphin.y= dolphin.y+10;
        } 
        if (sea.x < 0){
            sea.x = sea.width/2;
        }

        spawnFishtrap();
        spawnTrash();
        spawnPowerUps();

        if(fishtrapGroup.isTouching(dolphin)){
          gameState=0;
          
        }

        if(trashGroup.collide(dolphin)){
          score= score-50;
          oops.visible=true;
          setTimeout(function(){oops.visible=false},1000);
          
        }

        if(powerUpGroup.collide(dolphin)){
          score= score+50;
          powerUpGroup.destroyEach();
          youRock.visible=true;
          setTimeout(function(){youRock.visible=false},1000);
        }

        if(score<0){
          gameState=0;
        }

        
        
    }

    
   
    drawSprites();

    if(gameState===0){
      sea.velocityX=0;
      bang.visible=true;
      trashGroup.setVelocityXEach(0);
      trashGroup.setVelocityYEach(0);
      fishtrapGroup.setVelocityXEach(0);
      trashGroup.setLifetimeEach(-1);
      fishtrapGroup.setLifetimeEach(-1);
      powerUpGroup.setVelocityXEach(0);
      powerUpGroup.setLifetimeEach(-1);
      textSize(20);
      textFont("Georgia");
      strokeWeight(7);
      text("About 1 million marine animals are killed by plastic in the ocean each year.\n Currently there are about 100 million tons of plastic in the oceans.\n Please recycle plastic to avoid them being dumped into the oceans and \n to prevent killing of animals.",50,100);
//     trex.changeAnimation("collided",trex_collided);

      if(keyDown('space')){
        gameState=1;
        score=0;
        fishtrapGroup.destroyEach();
        trashGroup.destroyEach();
        powerUpGroup.destroyEach();
      }
    }
    
    text("Score: "+score,650,50);
}

function spawnFishtrap() {
  //write code here to spawn the clouds
  if (frameCount % 400 === 0) {
    var fishtrap = createSprite(800,225,90,70);
    fishtrap.y = Math.round(random(250,350));
    fishtrap.addImage(fishtrapImg);
    fishtrap.scale = 0.3;
    fishtrap.velocityX = -3;
    
    fishtrap.setCollider("circle",-20,-70,150);
    fishtrap.depth=dolphin.depth;
    dolphin.depth=dolphin.depth+1;
     //assign lifetime to the variable
    fishtrap.lifetime = 400;
    
    
    //add each cloud to the group
    fishtrapGroup.add(fishtrap);
  }
  
}
function spawnTrash() {
  if(frameCount % 80 === 0) {
    var trash = createSprite(800,240,10,40);
    trash.y= Math.round(random(260,350));
    trash.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: trash.addImage(trash1Img);
              break;
      case 2: trash.addImage(trash2Img);
              break;
      case 3: trash.addImage(trash3Img);
              break;
    
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    trash.scale=0.1;
    trash.lifetime = 140;
    
    //add each obstacle to  the group
    trashGroup.add(trash);
    if(trash.collide(dolphin)){
      trash.destroy();
    }
  }
}

function spawnPowerUps() {
  //write code here to spawn the clouds
  if (frameCount % 370 === 0) {
    var powerUp = createSprite(800,280,15,15);
    powerUp.y = Math.round(random(230,260));
    powerUp.addImage(powerUpImg);
    powerUp.scale = 0.1;
    powerUp.velocityX = -4;
    //powerUp.shapeColor= "orange";
     //assign lifetime to the variable
    powerUp.lifetime = 200;
    
    
    //add each cloud to the group
    powerUpGroup.add(powerUp);
  }
  
}
