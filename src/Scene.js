import React from "react";
import Matter, { Mouse } from "matter-js";
import { getRandomInt } from "./utility"
import { selectDeselectButton } from "./utility"
import { vectorLength } from "./utility"

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
      MouseConstraint = Matter.MouseConstraint;
    //Common = Matter.Common;

    let screenSize = { x: window.innerWidth, y: window.innerHeight };
    const toolState = {};
    const setToolState = (key, value) => {
      if (!Object.keys(toolState).includes(key)) {
        toolState[key] = null
      }
      toolState[key] = value
      return toolState
    }

    const getToolState = () => toolState
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
        background: "#E4F5FC",
        showShadows: true,
        showDebug: true,
        showPositions: true,
      },
    });

    const ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    const ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });

    const wallColor = "#FCFAA4";
    World.add(engine.world, [
      // walls
      Bodies.rectangle(screenSize.x / 2, screenSize.y, screenSize.x, 50, { isStatic: true, render: { fillStyle: wallColor } }),     //bottom wall
      Bodies.rectangle(screenSize.x, screenSize.y / 2.0, 50, screenSize.y, { isStatic: true, render: { fillStyle: wallColor } }),   //right wall
      Bodies.rectangle(0, screenSize.y / 2.0, 50, screenSize.y, { isStatic: true, render: { fillStyle: wallColor } }),              //left wall
    ]);

    // Head construction
    let skinColors = ["#E0B094", "#4A2C13", "#E0C1A2", "#9E784F", "#70441F", "#D1A669", "#E8C48F"];
    let skinPicker = getRandomInt(0, skinColors.length - 1);
    let headColor = skinColors.splice(skinPicker, 1);

    // Head
    const head = Bodies.circle(screenSize.x / 2.0, screenSize.y / 2.0, 140, {
      isStatic: true,
      render: { fillStyle: headColor }
    });

    // Nose
    let noseColor = skinColors.splice(getRandomInt(0, skinColors.length - 1), 1);
    let noseSize = 10 * getRandomInt(3, 7);
    const nose = Bodies.polygon(head.position.x, head.position.y + 20, 3, noseSize, {
      angle: Math.PI / 2.0,
      render: { fillStyle: noseColor },
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
    let rightIris = Bodies.circle(rightEye.position.x, rightEye.position.y, 10, { render: { fillStyle: eyeColors[eyeColorPicker] } });
    let rightPupil = Bodies.circle(rightEye.position.x, rightEye.position.y, 4, { render: { fillStyle: "#000000" } });
    let leftIris = Bodies.circle(leftEye.position.x, leftEye.position.y, 10, { render: { fillStyle: eyeColors[eyeColorPicker] } });
    let leftPupil = Bodies.circle(leftEye.position.x, leftEye.position.y, 4, { render: { fillStyle: "#000000" } });



    // Composite object that holds all head parts
    const fullHead = Body.create({ parts: [head, nose, rightEye, leftEye, rightIris, leftIris, rightPupil, leftPupil], isStatic: true })

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

    // Button features
    const buttonStrokeColors = { transform: "#FF0000", scale: "#00FF00", rotate: "#0000FF" };
    let strokeColor = buttonStrokeColors.transform;
    let transformButton = Bodies.circle(50, 50, 20, {
      isStatic: true, isSensor: true, render: {
        opacity: 1,
        sprite: {
          texture: "../images/transform.png",
          xScale: 1,
          yScale: 1
        }
      }
    });
    let rotateButton = Bodies.circle(50, 100, 20, {
      isStatic: true, isSensor: true, render: {
        opacity: 1,
        sprite: {
          texture: "../images/rotate.png",
          xScale: 1,
          yScale: 1
        }
      }
    });
    let scaleButton = Bodies.circle(50, 150, 20, {
      isStatic: true, isSensor: true, render: {
        opacity: 1,
        sprite: {
          texture: "../images/scale.png",
          xScale: 1,
          yScale: 1
        }
      }
    });

    World.add(engine.world, [scaleButton, transformButton, rotateButton]);
    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      //const rand = Math.random();
      let initialPosition = mouse.position;
      console.log(toolState.mousePressed);
      if (!toolState.mousePressed) {
        setToolState("mouseStartPosition", initialPosition)
        console.log('mousedown event')
        console.log(toolState.mouseStartPosition);
        toolState.mouseDisplacement = 0;
      }

      // deselect previous body
      if (toolState.selectedBody) {
        toolState.selectedBody.render.lineWidth = 0;
      }

      toolState.selectedBody = mouseConstraint.body;
      toolState.mousePressed = true;



      // for buttons
      switch (toolState.selectedBody) {
        case transformButton:
          console.log("transform pressed at: " + event.mouse.position);
          selectDeselectButton(transformButton, [scaleButton, rotateButton]);
          toolState.currentTool = "transform";
          strokeColor = buttonStrokeColors.transform;
          break;

        case rotateButton:
          console.log("rotate pressed at: " + event.mouse.position);
          selectDeselectButton(rotateButton, [transformButton, scaleButton]);
          toolState.currentTool = "rotate";
          strokeColor = buttonStrokeColors.rotate;
          break;

        case scaleButton:
          console.log("scale pressed at: " + event.mouse.position);
          selectDeselectButton(scaleButton, [transformButton, rotateButton]);
          toolState.currentTool = "scale";
          strokeColor = buttonStrokeColors.scale;
          break;

        default:
          if (toolState.selectedBody && toolState.selectedBody.isStatic !== true) {
            toolState.selectedBody.render.lineWidth = 10.0;
            toolState.selectedBody.render.strokeStyle = strokeColor;
          }
          break;
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
      /*
      if(toolState.selectedBody){
        toolState.selectedBody.render.lineWidth = 0.0;
      }
      */

      toolState.mousePressed = false;
    });

    Matter.Events.on(mouseConstraint, "mousemove", function (event) {
      toolState.mouseCurrentPosition = event.mouse.position;

      if (toolState.mousePressed === true && mouseConstraint.body) {
        toolState.mouseDisplacement = vectorLength({ x: toolState.mouseCurrentPosition.x - toolState.mouseStartPosition.x, y: toolState.mouseCurrentPosition.y - toolState.mouseStartPosition.y });
        switch (toolState.currentTool) {
          case "translate":
            // just use default constraint for translate
            break;
          case "scale":

            if (mouseConstraint.body.isSensor === false || mouseConstraint.body.isStatic === false) {
              console.log('mousemove event');
              console.log('mousemove start pos', getToolState().mouseStartPosition);
              Body.scale(mouseConstraint.body, 1, 1); // scale factor
            }
            break;
          case "rotate":
            // TODO make object rotate
            break;
          default:
            break;
        }


      }
    });

    Matter.Events.on(mouseConstraint, "startdrag", function (event) {

    });

    Engine.run(engine);
    Render.run(render);

  }




  render() {
    return <div ref="scene" />;
  }
}
export default Scene;
