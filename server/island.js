////////////////////////////////////////////////////////////////////////////////
//                            Pirate Ship Battles                             //
//                                                                            //
//                                Server - Island                             //
////////////////////////////////////////////////////////////////////////////////


const SAT = require('sat');
const unique = require('node-uuid');

module.exports = class Island {
  constructor (x, y, radius, type, max_x, max_y) {
    try {
      if (x < 0 || x >= max_x) throw "x must be non-negative or smaller than max_x";
      if (y < 0 || y >= max_y) throw "y must be non-negative or smaller than max_y";
      if (radius <= 0) throw "radius must be bigger than zero";

      this.x = x;
      this.y = y;
      this.radius = radius;
      this.type = type;
      this.id = unique.v4();
      this.restore_poly = new SAT.Circle(new SAT.Vector(this.x, this.y), 1.25 * radius);
      this.collision_poly = new SAT.Circle(new SAT.Vector(this.x, this.y), radius);
    } catch(err) {
      console.log("Island constructor: " + err);
    }
  }

  onIsland(player) {
    var delta_dist_x = player.x - this.x;
    var delta_dist_y = player.y - this.y;
    if (delta_dist_x**2 + delta_dist_y**2 < this.radius_sqr)
      return true;
    return false;
  }
}
