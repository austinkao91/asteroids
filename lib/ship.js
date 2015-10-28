(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  var Battleship = Asteroids.Battleship = function(options) {
    options.color = Battleship.COLOR;
    options.radius = Battleship.RADIUS;
    options.vel = [0,0];
    Asteroids.MovingObject.call(this, options);
    this.direction = Asteroids.Util.normalize([3,4]);
    this.fire = true;
  };

  Battleship.COLOR = "green";
  Battleship.RADIUS = 5;

  Asteroids.Util.inherits(Asteroids.Battleship, Asteroids.MovingObject);


  Battleship.prototype.relocate = function(){
    this.pos = this.game.randomPosition().pos;
    this.vel = [0,0];

  };

  Battleship.prototype.power = function(impulse) {
    this.pos[0] += impulse[0];
    this.pos[1] += impulse[1];
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

  Battleship.prototype.enableFire = function() {
    this.fire = true;
  };

  Battleship.prototype.fireBullet = function(){
    if(this.fire) {
      this.fire = false;
      var position = this.pos.slice();
      var velocity = [0,-10];
      this.game.bullets.push(new Asteroids.Bullet({"pos": position, "vel": velocity, "game": this.game}));
      setTimeout(this.enableFire.bind(this), 300);

    }
  };


})(this);
