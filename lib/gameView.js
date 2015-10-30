(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }
  var requestAnimFrame = (function(){
      return root.requestAnimationFrame       ||
          root.webkitRequestAnimationFrame ||
          root.mozRequestAnimationFrame    ||
          root.oRequestAnimationFrame      ||
          root.msRequestAnimationFrame     ||
          function(callback){
              root.setTimeout(callback, 1000 / 60);
          };
  })();

  var GameView = Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.lastTime = null;
    this.collisionCheck = null;
    this.moveObjects = null;
    this.draw = null;
  };

  GameView.prototype.main = function() {
      var now = Date.now();
      var dt = (now - this.lastTime) / 1000.0;
      this.update(dt);
      this.render();
      this.lastTime = now;
      requestAnimFrame(this.main.bind(this));
  };

  GameView.prototype.update = function(time) {
    this.handleInput(time);
    this.game.checkCollisions();
    this.game.moveObjects(time);
  };

  GameView.prototype.render = function() {
    this.game.draw(this.ctx);
  };

  GameView.prototype.start = function(){
    // this.bindKeyHandlers();
    this.lastTime = Date.now();
    this.main();
  };

  GameView.prototype.stop = function() {
    root.clearInterval(this.collisionCheck);
    root.clearInterval(this.moveObjects);
    root.clearInterval(this.draw);
  };

  GameView.prototype.handleInput = function(time) {
    if(Asteroids.input.getKeyState('W')) {
      this.game.battleship.power([0,-3]);
    }
    if(Asteroids.input.getKeyState('A')) {
      this.game.battleship.power([-3,0]);
    }
    if(Asteroids.input.getKeyState('S')) {
      this.game.battleship.power([0,3]);
    }
    if(Asteroids.input.getKeyState('D')) {

      this.game.battleship.power([3,0]);
    }
    if(Asteroids.input.getKeyState(" ")) {
      this.game.battleship.fireBullet();
    }

  };

  GameView.prototype.bindKeyHandlers = function() {
    var that = this;
    key('w', function(){ that.game.battleship.power([0, -3]); });
    key('a', function(){ that.game.battleship.power([-3, 0]); });
    key('s', function(){ that.game.battleship.power([0, 3]); });
    key('d', function(){ that.game.battleship.power([3, 0]); });
    key('space', function(){ that.game.battleship.fireBullet(); });
  };

})(this);
