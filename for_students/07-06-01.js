/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";


let renderer = new T.WebGLRenderer();
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);

let scene = new T.Scene();
let camera = new T.PerspectiveCamera(
        40,
        renderer.domElement.width / renderer.domElement.height,
        1,
        1000
    );
scene.background = new T.Color("cyan");

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

scene.add(new T.AmbientLight("white", 0.2));

// two lights - both a little off white to give some contrast
let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
dirLight1.position.set(1, 1, 0);
scene.add(dirLight1);

let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
dirLight2.position.set(-1, 1, -0.2);
scene.add(dirLight2);

// make a ground plane
let groundBox = new T.BoxGeometry(10, 0.1, 10);
let groundMesh = new T.Mesh(
        groundBox,
        new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
    );
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

// this is the part the student should change
//** GET RID OF THIS SILLY DONUT! Replace it with an aircraft*/
let tempGeom = new T.TorusGeometry();
// let tempMaterial = new T.MeshStandardMaterial({ color: "red" });
// let tempMesh = new T.Mesh(tempGeom, tempMaterial);
// scene.add(tempMesh);
// tempMesh.scale.set(0.5, 0.5, 0.5);
// tempMesh.position.y = 2;

let box_material = new T.MeshStandardMaterial({ color: "purple" });
let box = new T.Mesh(new T.BoxGeometry(10,1,10,1,1,1),box_material);
box.scale.set(0.1,0.1,0.1);
box.position.y = 2;
box.castShadow = true;

let eyes_material = new T.MeshStandardMaterial({ color: "white", metalness:1 });
let r_eye = new T.Mesh(new T.SphereGeometry(1),eyes_material);
r_eye.scale.set(0.1,0.1,0.1);
r_eye.position.x = box.position.x + 0.5;
r_eye.position.y = 2;
r_eye.position.z = box.position.z + 0.15;
r_eye.castShadow = true;
let l_eye = new T.Mesh(new T.SphereGeometry(1),eyes_material);
l_eye.scale.set(0.1,0.1,0.1);
l_eye.position.x = box.position.x + 0.5;
l_eye.position.y = 2;
l_eye.position.z = box.position.z - 0.15;
l_eye.castShadow = true;

let quadcopter = new T.Group();
quadcopter.add(box);
quadcopter.add(r_eye);
quadcopter.add(l_eye);

let propeller_material = new T.MeshStandardMaterial({ color: "orange" });

let sphere = [];
let fan = [];
let propeller = [];
for(let i = 0; i < 4; i++){
    sphere[i] = new T.Mesh(new T.SphereGeometry(1),propeller_material);
    sphere[i].scale.set(0.1,0.1,0.1);
    sphere[i].position.y = 2.1;
    sphere[i].castShadow = true;

    fan[i] = new T.Mesh(new T.CapsuleGeometry(1,10,8,3),box_material);
    fan[i].scale.set(0.05,0.05,0.05);
    fan[i].rotateX(Math.PI/2);
    fan[i].position.y = 2.1;
    fan[i].castShadow = true;

    propeller[i] = new T.Mesh(new T.TorusGeometry(4,0.6,6,6,6.3),propeller_material);
    propeller[i].scale.set(0.1,0.1,0.1);
    propeller[i].position.y = 2.1;
    propeller[i].rotateX(Math.PI/2);
    propeller[i].castShadow = true;
    quadcopter.add(propeller[i]);
    quadcopter.add(fan[i]);
    quadcopter.add(sphere[i]);
}
sphere[0].position.x = box.position.x + 0.5;
sphere[0].position.z = box.position.z + 0.5;
sphere[1].position.x = box.position.x - 0.5;
sphere[1].position.z = box.position.z - 0.5;
sphere[2].position.x = box.position.x + 0.5;
sphere[2].position.z = box.position.z - 0.5;
sphere[3].position.x = box.position.x - 0.5;
sphere[3].position.z = box.position.z + 0.5;
for(let i = 0; i < 4; i++){
    fan[i].position.x = sphere[i].position.x;
    fan[i].position.z = sphere[i].position.z;
    propeller[i].position.x = sphere[i].position.x;
    propeller[i].position.z = sphere[i].position.z;
}
scene.add(quadcopter);

let radar_material = new T.MeshStandardMaterial({ color: "purple", wireframe:true});
const pt = [];
for ( let i = 0; i < 10; i ++ ) {
	pt.push( new T.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
let radar = new T.Mesh(new T.LatheGeometry(pt),radar_material);
radar.scale.set(0.05,0.05,0.05);
radar.position.y = groundMesh.position.y + 0.5;
scene.add(radar);




//second copter
let copter2 = new T.Group();
let box_material2 = new T.MeshStandardMaterial({ color: "blue" });
let box2 = new T.Mesh(new T.BoxGeometry(10,1,10,1,1,1),box_material2);
box2.scale.set(0.1,0.1,0.1);
box2.position.y = 2;
box2.castShadow = true;

let r_eye2 = new T.Mesh(new T.SphereGeometry(1),eyes_material);
r_eye2.scale.set(0.1,0.1,0.1);
r_eye2.position.x = box2.position.x + 0.5;
r_eye2.position.y = 2;
r_eye2.position.z = box2.position.z + 0.15;
r_eye2.castShadow = true;
let l_eye2 = new T.Mesh(new T.SphereGeometry(1),eyes_material);
l_eye2.scale.set(0.1,0.1,0.1);
l_eye2.position.x = box2.position.x + 0.5;
l_eye2.position.y = 2;
l_eye2.position.z = box2.position.z - 0.15;
l_eye2.castShadow = true;
copter2.add(box2);
copter2.add(r_eye2);
copter2.add(l_eye2);

let propeller_material2 = new T.MeshStandardMaterial({ color: "red" });

let sphere2 = [];
let fan2 = [];
let propeller2 = [];
for(let i = 0; i < 4; i++){
    sphere2[i] = new T.Mesh(new T.SphereGeometry(1),propeller_material2);
    sphere2[i].scale.set(0.1,0.1,0.1);
    sphere2[i].position.y = 2.1;
    sphere2[i].castShadow = true;

    fan2[i] = new T.Mesh(new T.CapsuleGeometry(1,10,8,3),box_material);
    fan2[i].scale.set(0.05,0.05,0.05);
    fan2[i].rotateX(Math.PI/2);
    fan2[i].position.y = 2.1;
    fan2[i].castShadow = true;

    propeller2[i] = new T.Mesh(new T.TorusGeometry(4,0.6,6,6,6.3),propeller_material2);
    propeller2[i].scale.set(0.1,0.1,0.1);
    propeller2[i].position.y = 2.1;
    propeller2[i].rotateX(Math.PI/2);
    propeller2[i].castShadow = true;
    copter2.add(propeller2[i]);
    copter2.add(fan2[i]);
    copter2.add(sphere2[i]);
}
sphere2[0].position.x = box2.position.x + 0.5;
sphere2[0].position.z = box2.position.z + 0.5;
sphere2[1].position.x = box2.position.x - 0.5;
sphere2[1].position.z = box2.position.z - 0.5;
sphere2[2].position.x = box2.position.x + 0.5;
sphere2[2].position.z = box2.position.z - 0.5;
sphere2[3].position.x = box2.position.x - 0.5;
sphere2[3].position.z = box2.position.z + 0.5;
for(let i = 0; i < 4; i++){
    fan2[i].position.x = sphere2[i].position.x;
    fan2[i].position.z = sphere2[i].position.z;
    propeller2[i].position.x = sphere2[i].position.x;
    propeller2[i].position.z = sphere2[i].position.z;
}
copter2.position.set(4,0.5,4);
copter2.scale.set(0.7,0.7,0.7);
scene.add(copter2);

let radar_material2 = new T.MeshStandardMaterial({ color: "green", wireframe:true});
const pt2 = [];
for ( let i = 0; i < 10; i ++ ) {
	pt2.push( new T.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
let radar2 = new T.Mesh(new T.LatheGeometry(pt2),radar_material2);
radar2.scale.set(0.05,0.05,0.05);
radar2.position.set(1,groundMesh.position.y + 0.5,2);
scene.add(radar2);




let f = 1;

// animation loop
function animateLoop(timestamp) {
    //** EXAMPLE CODE - STUDENT SHOULD REPLACE */
    // move in a circle
    let theta = timestamp / 1000;
    let x = 3 * Math.cos(theta);
    let z = 3 * Math.sin(theta);
    
    quadcopter.position.x = x;
    quadcopter.position.z = z;

    if(f && copter2.position.z <= 4){
        copter2.position.z += 0.06;
    }
    else{
        if(copter2.position.z <= -4){
            f = 1;
        }
        else{
            f = 0;
            copter2.position.z -= 0.06;
        }
    }

    for(let i = 0; i < 4; i++){
        fan[i].rotateOnWorldAxis(new T.Vector3(0,1,0), theta/20);
        propeller[i].rotateOnWorldAxis(new T.Vector3(0,1,0), theta/20);
        
        fan2[i].rotateOnWorldAxis(new T.Vector3(0,1,0), theta/20);
        propeller2[i].rotateOnWorldAxis(new T.Vector3(0,1,0), theta/20);
        
    }
    quadcopter.lookAt(radar.position.x,radar.position.y,radar.position.z);
    radar.lookAt(-x,2,-z);

    copter2.lookAt(radar2.position.x,radar2.position.y,radar2.position.z);
    radar2.lookAt(-copter2.position.x,2,-copter2.position.z);
    

    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }
window.requestAnimationFrame(animateLoop);