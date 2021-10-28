// Run collision check from here;
// Manage returned value appropriately
// If food > run food logic & return dead = false;
// If body > return dead = false;


export class CollisionManager{
  constructor() {
  }


  //Generic collision checking. checks if _PLAYER_ collides with any object in our list.
  //if so: Return the object the player collided with.
  //if not: Return null.
  checkCollision(objects) {
    //sorting for breaking early when player x < obj.hbx, cause if player x < obj.hbx, any obj after that will also not need to be checked
    var temp =[];
    for(var property in objects) {
      if(Array.isArray(objects[property])) {
        temp = objects[property].slice();
        temp.sort(this._compareObjectsByX);
        for(var obj of temp) {
          if(objects.player.hbx_max <= obj.hbx_min) {
            break;
          } else {
            if((objects.player.hbx_min >= obj.hbx_min && objects.player.hbx_min <= obj.hbx_max &&
                objects.player.hby_min >= obj.hby_min && objects.player.hby_min <= obj.hby_max) ||

              (objects.player.hbx_max >= obj.hbx_min && objects.player.hbx_max <= obj.hbx_max
                && objects.player.hby_min >= obj.hby_min && objects.player.hby_min <= obj.hby_max) ||

              (objects.player.hbx_min >= obj.hbx_min && objects.player.hbx_min <= obj.hbx_max &&
                objects.player.hby_max >= obj.hby_min && objects.player.hby_max <= obj.hby_max) ||

              (objects.player.hbx_max >= obj.hbx_min && objects.player.hbx_max <= obj.hbx_max &&
                objects.player.hby_max >= obj.hby_min && objects.player.hby_max <= obj.hby_max)) {
                return obj;
            }
          }
        }
      }
    }
    return null;
  }

  //Compare obj a to obj b. Used to compare x coords of input.
  _compareObjectsByX(a,b) {
    if(a.x < b.x) {
      return -1;
    } else if(a.x > b.x) {
      return 1;
    }
    return 0;
  }
}
