/*jshint esversion: 6 */
// @ts-check

// get things we need
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import {
  GrSimpleSwing,
  GrColoredRoundabout,
  GrSimpleRoundabout,
  GrAdvancedSwing,
  GrCarousel,
  GrCopter
} from "./07-08-parkobjects.js";
import { SimpleBouncer } from "./07-08-simplepark.js";

let parkDiv = document.getElementById("div1");
let world = new GrWorld({ groundplanesize: 20, where: parkDiv });

//world.add(new SimpleBouncer(0, 5));

let roundabout = new GrSimpleRoundabout({ x: -2 });
world.add(roundabout);

let roundabout_2 = new GrColoredRoundabout({ x: 5 });
world.add(roundabout_2);

let swing_2 = new GrSimpleSwing({ x: 10 });
world.add(swing_2);

let myswing = new GrSimpleSwing({ x:10, z:2 });
world.add(myswing);

let advanced_swing = new GrAdvancedSwing({x:5, z:5});
world.add(advanced_swing);

let carousel = new GrCarousel({x:-12, z:12});
world.add(carousel);

let copter = new GrCopter({x:7, z:7});
world.add(copter);

world.go();
