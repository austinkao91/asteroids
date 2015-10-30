(function(root) {
  if(typeof Asteroids === "undefined") {
    root.Asteroids = {};
  }

  root.Asteroids.Sprite = Sprite = function(options) {
    this.spritePos = options["spritePos"];
    this.spriteSize = options["spriteSize"];
    this.speed = typeof options["speed"] === 'number' ? options["speed"] : 0;
    this.frames = options["frames"];
    this._index = 0;
    this.url = options["url"];
    this.dir = options["dir"] || 'horizontal';
    this.once = options["once"];
    this.pos = options["pos"];
  };

  Sprite.prototype = {
    move: function(time) {
      this._index += time*this.speed;
    },
    isCollidedWith: function() {

    },
    draw: function(ctx, canvasPos, scale) {
      if(typeof canvasPos === "undefined") { canvasPos = this.pos; }
      var frames;
      if(this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if(this.once && idx >=max) {
          this.done = true;
          return;
        }
      } else {
        frame = 0;
      }

      var x = this.spritePos[0];
      var y = this.spritePos[1];
      if(this.dir === "vertical") {
        y += frame * this.spriteSize[1];
      } else {
        x+= frame*this.spriteSize[0];
      }

      var canvasX = canvasPos[0] - this.spriteSize[0]/2;
      var canvasY = canvasPos[1] - this.spriteSize[1]/2;
      ctx.drawImage(Asteroids.resources.get(this.url),x,y,
                    this.spriteSize[0], this.spriteSize[1], canvasX, canvasY,
                    this.spriteSize[0], this.spriteSize[1]);
    }
  };

})(this);
