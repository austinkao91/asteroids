(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.url = 'lib/1945transparent.jpg';
    options.spriteSize = [20,20];
    options.spritePos = [4,47];
    options.frames = [0];
    options.health = 2;
    options.vel = Asteroids.Util.randomVec(5);
    Asteroids.HealthObject.call(this, options);
  };


  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.HealthObject);



  Asteroid.prototype.isCollidedWith = function(otherObject){

    if (otherObject.constructor === Asteroids.Battleship &&
      this.distance(otherObject) < (this.radius + otherObject.radius)) {
        otherObject.relocate();
    }
  };
})(this);
