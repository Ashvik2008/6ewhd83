var dog,dog1_Img,dog2_Img;
var BTN1,BTN2;
var gameState
var lastFed,fedtime;

function preload()
{
  dog1_Img = loadImage("images/dogImg.png");
  dog2_Img = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/Wash Room.png");
 
}

function setup()
{
  createCanvas(1340,630);

  database = firebase.database();

  readState = database.ref('state');
  readState.on("value",function(data){
  
    gameState = data.val();
  })

  foodobject=new Food()

  var FOOD = database.ref('Food');
  FOOD.on("value", readPosition);

  dog = createSprite(850,400,20,20);
  dog.addImage(dog1_Img);
  dog.scale = 0.25;

  feed = createButton("FEED FOOD");
  feed.position(820,20);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(715,20);
  add.mousePressed(AddFood);

  reset = createButton("RESET FOOD");
  reset.position(600,20);
 
  changeName1 = createInput("CHANGE DOG NAME");
  changeName1.position(1170,20);
  changeName1.mousePressed(function()
  {
    changeName1.hide();
    changeName = createInput("");
    changeName.position(1170,20)
  })

  submitbutton = createButton("SAVE NAME");
  submitbutton.position(1254,50);
  submitbutton.mousePressed(function()
  {
    changeName.hide();
    submitbutton.hide();

    DogN = changeName.value();

    dognamedisplay = createElement('h4');
    dognamedisplay.html("YOUR DOG NAME IS : " + DogN);
    dognamedisplay.position(20,600)
  })

}
function draw()
{
  background(46,139,87);

  
  fedtime = database.ref('FeedTime');
  fedtime.on("value",function(data)
  {
    lastFed = data.val()
  })

  fill(255);
  textSize(20);
  if(lastFed>=12)
  {
    text("Last Fed : " + lastFed%12 + " PM",10,20)
  }
  else{
    text("last Fed : " + lastFed + " AM",10,20)
  }

  if(gameState !== "Hungry")
  {
   feed.hide();
   add.hide();
  }
  else
  {
    feed.show();
    add.show();
  }

  foodobject.display();

  currentTime = hour();
  if(currentTime === (lastFed+1))
  {
    update("playing");
    background(garden);
  }
  else if(currentTime == (lastFed + 2))
  {
    update("sleeping")
    background(bedroom);
  }
  else if(currentTime == (lastFed + 2)&& currentTime <= (lastFed+4))
  {
    update("Bathing");
    background(washroom);
  }
  else
  {
    update("Hungry")
    foodobject.display();
  }
  
  drawSprites();
}


function readPosition(data)
{
  position = data.val();
  foodobject.updateFoodStock(position)
 
}

function FeedDog()
{
  dog.addImage(dog2_Img)
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  database.ref('/').update({
  Food:foodobject.getFoodStock(),
   FeedTime: hour()
   })
}

function AddFood()
{
    dog.addImage(dog1_Img)
    position++
    database.ref('/').update({
    Food:position
  })
 }
  

 function update(state){
  database.ref('/').update({
    gameState:state
  })
}