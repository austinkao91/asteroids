(function() {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Battleship = Asteroids.Battleship = function(options) {
    options.color = Battleship.COLOR;
    options.radius = Battleship.RADIUS;
    options.vel = [0,0];
    Asteroids.MovingObject.call(this, options);
    this.direction = Asteroids.Util.normalize([3,4]);


  };

  Battleship.COLOR = "green";
  Battleship.RADIUS = 5;

  Asteroids.Util.inherits(Asteroids.Battleship, Asteroids.MovingObject);

  Battleship.prototype.rotate = function(angle) {
    this.direction[0] = this.direction[0]*Math.cos(angle) - this.direction[1]*Math.sin(angle);
    this.direction[1] = this.direction[0]*Math.sin(angle) + this.direction[1]*Math.cos(angle);
  };

  Battleship.prototype.relocate = function(){
    this.pos = this.game.randomPosition().pos;
    this.vel = [0,0];
  };

  Battleship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Battleship.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0]+20, this.pos[1] -20);
    ctx.lineTo(this.pos[0]+20,this.pos[1]);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  Battleship.prototype.fireBullet = function(){
    var position = this.pos.slice();
    var velocity = Asteroids.Util.normalize(this.vel,5);
    this.game.bullets.push(new Asteroids.Bullet({"pos": position, "vel": velocity, "game": this.game}));
  };

})();
