(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS;
    options.vel = Asteroids.Util.randomVec(5);
    Asteroids.HealthObject.call(this, options);
  };

  Asteroid.COLOR = "#ff0000";
  Asteroid.RADIUS = 30;

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.HealthObject);

  Asteroid.prototype.isCollidedWith = function(otherObject){

    if (otherObject.constructor === Asteroids.Battleship &&
      this.distance(otherObject) < (this.radius + otherObject.radius)) {
        otherObject.relocate();
    }
  };
})(this);
