(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }


  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.explosions = [];
    this.addAsteroids();
    this.battleship = new Asteroids.Battleship(this.shipPosition());
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition()));
    }
  };

  Game.prototype.shipPosition = function() {
    var canvasPos = [Game.DIM_X*0.5, Game.DIM_Y*0.8];
    var shipImg = new Sprite('lib/sprites.png', [0, 120], canvasPos, [39, 50], 10, [0,1,2,3,4,5,6,7,8,9,10,11,12],'horizontal', true);
    // var shipImg = new Sprite('lib/airplane.png',
    //                         [400,400], [200,200], 5, [0,1]);
    return {
      "url": 'lib/1945transparent.jpg',
      "spriteSize": [39,39],
      "spritePos": [136,270],
      "frames": [0],
      "speed": 15,
      "pos": canvasPos,
      "game": this,
      "health": 3
    };

  };

  Game.prototype.randomPosition = function(){
    return {
      "pos": [Math.random()*Game.DIM_X, Math.random()*Game.DIM_Y],
      "game": this
    };
  };

  Game.prototype.remove = function(object) {
    if(object.constructor === Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object),1);
    }
    if(object.constructor === Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object),1);
    }
  };

  Game.NUM_ASTEROIDS = 10;
  Game.DIM_X = 800;
  Game.DIM_Y = 600;

  Game.prototype.draw = function(ctx){
    ctx.drawImage(Asteroids.img, 0, 0);
    this.allObjects().forEach(function(asteroid){
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function(time){
    this.allObjects().forEach(function(asteroid){
      asteroid.move(time);
      if(typeof asteroid.sprite !== "undefined") {
        debugger
        asteroid.sprite.update(time);
      }
    });
  };

  Game.prototype.wrap = function(pos){
    if (pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y){
      return [Game.DIM_X - pos[0], Game.DIM_Y - pos[1]];
    }else{
      return pos;
    }
  };

  Game.prototype.boundary = function(pos) {
    if( pos[0] < 0) {
      pos[0] = 0;
    } else if(pos[0] > Game.DIM_X) {
      pos[0] = Game.DIM_X;
    }
    if( pos[1] < 0) {
      pos[1] = 0;
    } else if(pos[1] > Game.DIM_Y) {
      pos[1] = Game.DIM_Y;
    }
    return pos;
  };

  Game.prototype.checkCollisions = function() {

    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = 0; j < this.allObjects().length; j++) {
        if (i!==j){
          if(typeof this.allObjects()[i] !== "undefined" ) {
            this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
           }
        }
      }
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.battleship).concat(this.bullets).concat(this.explosions);
  };


})(this);
