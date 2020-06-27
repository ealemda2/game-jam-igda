import React from "react";
import Matter from "matter-js";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Common = Matter.Common;

    let screenSize = {x: window.innerWidth, y: window.innerHeight};
    // to get a random int in range
    let getRandomInt = function (min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }

    const engine = Engine.create({
      // positionIterations: 20
    });

    const render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "#A0F2CF"
      },
    });

    const ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    const ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
  
    const wallColor = "#FCFAA4";
    World.add(engine.world, [
      // walls
      Bodies.rectangle(screenSize.x / 2.0, 0, screenSize.x, 50, { isStatic: true, render: {fillStyle: wallColor} }),              //top wall
      Bodies.rectangle(screenSize.x / 2, screenSize.y, screenSize.x, 50, { isStatic: true, render: {fillStyle: wallColor} }),     //bottom wall
      Bodies.rectangle(screenSize.x, screenSize.y / 2.0, 50, screenSize.y, { isStatic: true, render: {fillStyle: wallColor} }),   //right wall
      Bodies.rectangle(0, screenSize.y / 2.0, 50, screenSize.y, { isStatic: true, render: {fillStyle: wallColor} }),              //left wall
    ]);

    // Head construction
    let skinColors = ["#E0B094", "#4A2C13", "#E0C1A2", "#9E784F", "#70441F", "#D1A669", "#E8C48F"];
    let skinPicker = getRandomInt(0, skinColors.length - 1);
    let headColor = skinColors.splice(skinPicker, 1);

    // Head
    const head = Bodies.circle(screenSize.x / 2.0, screenSize.y / 2.0, 140, {
      isStatic: true, 
      render: {fillStyle: headColor}
    });

    // Nose
    let noseColor = skinColors.splice(getRandomInt(0, skinColors.length - 1), 1);
    let noseSize = 10 * getRandomInt(3, 7);
    const nose = Bodies.polygon(head.position.x, head.position.y + 20, 3, noseSize, { 
      angle: Math.PI / 2.0,
      render: {fillStyle: noseColor},
      chamfer: { radius: [20, 0, 20] }
    });

    // Eyes
    let leftEye = Bodies.rectangle(head.position.x - 60, head.position.y - 50, 50, 50, { 
      angle: Math.PI / 4.0,
      render: { fillStyle: "#ffffff" },
      chamfer: { radius: [40, 10, 40, 10] }
    });

    let rightEye = Bodies.rectangle(head.position.x + 60, head.position.y - 50, 50, 50, { 
      angle: Math.PI / 4.0,
      render: { fillStyle: "#ffffff" },
      chamfer: { radius: [40, 10, 40, 10] }
    });

    let eyeColors = ["#71C3DB", "#86DB68", "#876C1D", "#4F2D11"];
    let eyeColorPicker = getRandomInt(0, eyeColors.length - 1);
    console.log(eyeColorPicker);
    // Pupils
    let rightIris = Bodies.circle(rightEye.position.x, rightEye.position.y, 10, { render: { fillStyle: eyeColors[eyeColorPicker]}});
    let rightPupil = Bodies.circle(rightEye.position.x, rightEye.position.y, 4, { render: { fillStyle: "#000000" }});
    let leftIris = Bodies.circle(leftEye.position.x, leftEye.position.y, 10, { render: { fillStyle: eyeColors[eyeColorPicker]}});
    let leftPupil = Bodies.circle(leftEye.position.x, leftEye.position.y, 4, { render: { fillStyle: "#000000" }});
    


    // Composite object that holds all head parts
    const fullHead = Body.create({parts: [head, nose, rightEye, leftEye, rightIris, leftIris, rightPupil, leftPupil], isStatic: true})

    World.add(engine.world, [ballA, ballB, fullHead]);

    // add mouse control
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          render: {
            visible: false,
          },
        },
      });

    World.add(engine.world, mouseConstraint);

    // Mouse input
    let selectedBody

    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      //const rand = Math.random();

      selectedBody = mouseConstraint.body;

      if(selectedBody && selectedBody.isStatic !== true){
        selectedBody.render.lineWidth = 10.0;
      }
      
      /* Adding more objects by clicking
      if (rand >= 0.5) {
        World.add(
          engine.world,
          Bodies.circle(mouse.position.x, mouse.position.y, 30, { restitution: 0.7 })
        );
      } else {
        World.add(
          engine.world,
          Bodies.rectangle(mouse.position.x, mouse.position.y, 30, 15, { restitution: 0.7 })
        );
      }
      */
    });

    Matter.Events.on(mouseConstraint, "mouseup", function (event) {
      if(selectedBody){
        selectedBody.render.lineWidth = 0.0;
      }
    });

    Engine.run(engine);
    Render.run(render);

  }


  render() {
    return <div ref="scene" />;
  }
}
export default Scene;
