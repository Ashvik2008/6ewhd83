class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/Milk.png');
    }
  
    getFedTime(lastFed)
    {
      this.lastFed=lastFed;
    }

   updateFoodStock(foodStock)
   {
    this.foodStock=foodStock;
   }
  
   deductFood()
   {
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  
    getFoodStock()
    {
      return this.foodStock;
    }

    bedroom()
    {
      background(bedroom,500,500,500,500)
    }

    garden()
    {
      background(garden,500,500,500,500)
    }

    washroom()
    {
      background(washroom,500,500,500,500)
    }
    
  
    display(){
      var x=80,y=70;
      
      imageMode(CENTER);
   

      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%16==0){
            x=24;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
  }