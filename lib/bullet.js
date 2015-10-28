(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    options.color = Bullet.COLOR;
    options.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.COLOR = "yellow";
  Bullet.RADIUS = 4;

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.prototype.isCollidedWith = function(otherObject){
    if (otherObject.constructor === Asteroids.Asteroid &&
      this.distance(otherObject) < (this.radius + otherObject.radius)) {
        this.game.remove(this);
        debugger;
        if(otherObject.damaged.call(otherObject)) {
          this.game.remove(otherObject);
        }
    }
  };

  Bullet.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.outofBounds(this.pos)){
      this.game.remove(this);
    }
  };

  Bullet.prototype.outofBounds = function(pos) {
     return (pos[0] < 0 || pos[0] > Asteroids.Game.DIM_X || pos[1] < 0 || pos[1] > Asteroids.Game.DIM_Y);
   };
})(this);
