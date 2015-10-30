(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    options.color = Bullet.COLOR;
    options.radius = Bullet.RADIUS;
    this.owner = options["owner"];
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.COLOR = "yellow";
  Bullet.RADIUS = 4;

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  };

  Bullet.prototype.isCollidedWith = function(otherObject){
    if (otherObject.constructor === Asteroids.Asteroid &&
      this.distance(otherObject) < (this.radius + otherObject.radius)) {
        this.game.remove(this);
        if(otherObject.damaged.call(otherObject)) {
          var options = {
            'url': 'lib/sprites.png',
            'pos': otherObject.pos,
            'spritePos': [0,120],
            'spriteSize': [39,50],
            'speed': 10,
            'frames': [0,1,2,3,4,5,6,7,8,9,10,11,12],
            'once': true
          };
          this.game.explosions.push(new Sprite(options));
          this.game.remove(otherObject);
        }
    }
  };

  Bullet.prototype.move = function(time){
    this.pos[0] += this.vel[0]*time*100;
    this.pos[1] += this.vel[1]*time*100;
    if (this.outofBounds(this.pos)){
      this.game.remove(this);
    }
  };

  Bullet.prototype.outofBounds = function(pos) {
     return (pos[0] < 0 || pos[0] > Asteroids.Game.DIM_X || pos[1] < 0 || pos[1] > Asteroids.Game.DIM_Y);
   };
})(this);
