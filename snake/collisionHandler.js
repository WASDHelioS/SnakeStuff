// If food > run food logic & return dead = false;
// If body > return dead = false;

import {CollisionManager} from "./collisionManager.js";
import {Food} from "./Drawables/food.js";
import { PlayerBody } from "./Drawables/playerBody.js";

export class CollisionHandler{
  constructor() {
    this.collisionManager = new CollisionManager();
  }


  handleCollision(objects, scoreHandler) {
    var collision = this.collisionManager.checkCollision(objects);
    if(collision == null) {
      return objects;
    }
    if(collision instanceof PlayerBody) {
      return this._handleBodyCollision();
    }
    if(collision instanceof Food) {
      return this._handleFoodCollision(objects,collision,scoreHandler);
    }
  }

  _handleFoodCollision(objects,collision,scoreHandler) {
    objects.food = objects.food.filter(food => food !== collision);
      collision.destroy();
      scoreHandler.addScore(1);
      objects = this._addBodyAtLastBody(objects);
      return objects;
  }

  _addBodyAtLastBody(objects) {
    var lastBody = objects.body[objects.body.length-1]
    var first = false;
    if(lastBody == null) {
      lastBody = objects.player;
      first = true;
    }
    var newBody = new PlayerBody(lastBody,first);
    objects.body.push(newBody);
    return objects;
  }

  _handleBodyCollision() {
    return true;
  }
}
