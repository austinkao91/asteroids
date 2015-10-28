(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }


  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids();
    this.battleship = new Asteroids.Battleship(this.randomPosition());
  };

  Game.prototype.addAsteroids = function() {
    for(var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition()));
    }
  };

  Game.prototype.randomPosition = function(){
    return {
      "pos": [Math.random()*Game.DIM_X, Math.random()*Game.DIM_Y],
      "game": this,
      "health": 3
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
    ctx.drawImage(img, 0, 0);
    this.allObjects().forEach(function(asteroid){
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function(){
    this.allObjects().forEach(function(asteroid){
      asteroid.move();
    });
  };

  Game.prototype.wrap = function(pos){
    if (pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y){
      return [Game.DIM_X - pos[0], Game.DIM_Y - pos[1]];
    }else{
      return pos;
    }
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.allObjects().length; i++) {
      for(var j = 0; j < this.allObjects().length; j++) {
        if (i!==j){
          this.allObjects()[i].isCollidedWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.battleship).concat(this.bullets);
  };


})(this);
