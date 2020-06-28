import React from "react";
import Matter, { Mouse, Constraint } from "matter-js";
import { getRandomInt } from "./utility";
import { selectDeselectButton } from "./utility";
import { vectorLength } from "./utility";
import { SoundOutlined } from "@ant-design/icons";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
import { Button } from "antd";
import "antd/dist/antd.css";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: null,
      hatChosen: false,
      audioPlaying: false,
      score: 0,
      engine: null,
      screenSize: null,
      donePlaying: false,
    };
  }

  componentDidMount() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner,
      Events = Matter.Events,
      Bounds = Matter.Bounds,
      Vector = Matter.Vector;
    //Common = Matter.Common;
    let screenSize = { x: window.innerWidth, y: window.innerHeight };
    this.setState({ screenSize });
    const toolState = {};
    const setToolState = (key, value) => {
      if (!Object.keys(toolState).includes(key)) {
        toolState[key] = null;
      }
      toolState[key] = value;
      return toolState;
    };

    const getToolState = () => toolState;
    const setReactState = (key, value) => {
      this.setState({ [key]: value });
    };
    const getReactState = () => this.state;
    const engine = Engine.create({
      // positionIterations: 20
    });
    const render = Render.create({
      element: this.refs.scene,
      engine: engine,
      mouse: MouseConstraint.mouse,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        hasBounds: true,
        wireframes: false,
        background: "#E4F5FC",
      },
    });
    this.setState({ engine });
    // create runner (viewport)
    const runner = Runner.create();
    Runner.run(runner, engine);

    const viewportCentre = {
      x: render.options.width * 0.5,
      y: render.options.height * 0.5,
    };

    // make the world bounds a little bigger than the render bounds
    engine.world.bounds.min.y = -1000;
    engine.world.bounds.max.y = window.innerHeight;

    // keep track of current bounds scale (view zoom)
    let boundsScaleTarget = 1;
    const boundsScale = {
      x: 1,
      y: 1,
    };

    Events.on(engine, "beforeTick", function () {
      let mouse = mouseConstraint.mouse;
      let world = engine.world;
      let translate;
      // mouse wheel controls zoom
      let scaleFactor = mouse.wheelDelta * -0.1;
      if (scaleFactor !== 0) {
        if (
          (scaleFactor < 0 && boundsScale.x >= 0.6) ||
          (scaleFactor > 0 && boundsScale.x <= 1.4)
        ) {
          boundsScaleTarget += scaleFactor;
        }
        // create a vector to translate the view, allowing the user to control view speed
        let direction = Vector.create(0, 1);
        let speed = scaleFactor * 90;

        translate = Vector.mult(direction, speed);

        // prevent the view moving outside the world bounds
        if (render.bounds.min.x + translate.x < world.bounds.min.x)
          translate.x = world.bounds.min.x - render.bounds.min.x;

        if (render.bounds.max.x + translate.x > world.bounds.max.x)
          translate.x = world.bounds.max.x - render.bounds.max.x;

        if (render.bounds.min.y + translate.y < world.bounds.min.y)
          translate.y = world.bounds.min.y - render.bounds.min.y;

        if (render.bounds.max.y + translate.y > world.bounds.max.y)
          translate.y = world.bounds.max.y - render.bounds.max.y;

        // move the view
        Bounds.translate(render.bounds, translate);

        // Move buttons
        const upVector = Vector.create(0, translate.y);
        Matter.Body.setPosition(
          transformButton,
          Vector.add(transformButton.position, upVector)
        );
        Matter.Body.setPosition(
          rotateButton,
          Vector.add(rotateButton.position, upVector)
        );
        Matter.Body.setPosition(
          scaleButton,
          Vector.add(scaleButton.position, upVector)
        );
        Matter.Body.setPosition(
          createCircleButton,
          Vector.add(createCircleButton.position, upVector)
        );
        Matter.Body.setPosition(
          createRectangleButton,
          Vector.add(createRectangleButton.position, upVector)
        );
        Matter.Body.setPosition(
          createTriangleButton,
          Vector.add(createTriangleButton.position, upVector)
        );

        // we must update the mouse too
        Mouse.setOffset(mouse, render.bounds.min);
      }
    });

    Events.on(engine, "afterTick", function () {
      const currentScore = getReactState().score;
    });

    const ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    const ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
    const rectC = Bodies.rectangle(110, 50, 60, 100, { restitution: 0.5 });
    const trashCan = Bodies.rectangle(
      screenSize.x * 0.8,
      screenSize.y - 35,
      270,
      25,
      {
        isStatic: true,
        render: { fillStyle: "#020202" },
        chamfer: { radius: [0, 0, 10, 10] },
      }
    );
    const trashCanBoundaryLeft = Bodies.rectangle(
      screenSize.x * 0.8 - 145,
      screenSize.y - 130,
      20,
      200,
      {
        isStatic: true,
        render: { fillStyle: "#010101" },
        angle: -0.2,
        chamfer: { radius: [10, 10, 0, 0] },
      }
    );
    const trashCanBoundaryRight = Bodies.rectangle(
      screenSize.x * 0.8 + 145,
      screenSize.y - 130,
      20,
      200,
      {
        isStatic: true,
        render: { fillStyle: "#010101" },
        angle: 0.2,
        chamfer: { radius: [10, 10, 0, 0] },
      }
    );

    const wallColor = "#FCFAA4";

    World.add(engine.world, [
      // walls
      Bodies.rectangle(screenSize.x / 2, screenSize.y, screenSize.x, 50, {
        isStatic: true,
        render: { fillStyle: wallColor },
      }), //bottom wall
      Bodies.rectangle(screenSize.x, screenSize.y / 2.0, 50, 2000, {
        isStatic: true,
        render: { fillStyle: wallColor },
      }), //right wall
      Bodies.rectangle(0, screenSize.y / 2.0, 50, 2000, {
        isStatic: true,
        render: { fillStyle: wallColor },
      }), //left wall
    ]);

    // Head constructi
    let skinColors = [
      "#E0B094",
      "#4A2C13",
      "#E0C1A2",
      "#9E784F",
      "#70441F",
      "#D1A669",
      "#E8C48F",
    ];
    let skinPicker = getRandomInt(0, skinColors.length - 1);
    let headColor = skinColors.splice(skinPicker, 1);

    // Head
    const head = Bodies.circle(screenSize.x / 2.0, screenSize.y / 2.0, 140, {
      isStatic: true,
      render: { fillStyle: headColor },
    });

    // Nose
    let noseColor = skinColors.splice(
      getRandomInt(0, skinColors.length - 1),
      1
    );
    let noseSize = 10 * getRandomInt(3, 7);
    const nose = Bodies.polygon(
      head.position.x,
      head.position.y + 20,
      3,
      noseSize,
      {
        angle: Math.PI / 2.0,
        render: { fillStyle: noseColor },
        chamfer: { radius: [20, 0, 20] },
      }
    );

    // Eyes
    let leftEye = Bodies.rectangle(
      head.position.x - 60,
      head.position.y - 50,
      50,
      50,
      {
        angle: Math.PI / 4.0,
        render: { fillStyle: "#ffffff" },
        chamfer: { radius: [40, 10, 40, 10] },
      }
    );

    let rightEye = Bodies.rectangle(
      head.position.x + 60,
      head.position.y - 50,
      50,
      50,
      {
        angle: Math.PI / 4.0,
        render: { fillStyle: "#ffffff" },
        chamfer: { radius: [40, 10, 40, 10] },
      }
    );

    let eyeColors = ["#71C3DB", "#86DB68", "#876C1D", "#4F2D11"];
    let eyeColorPicker = getRandomInt(0, eyeColors.length - 1);
    // Pupils
    let rightIris = Bodies.circle(
      rightEye.position.x,
      rightEye.position.y,
      10,
      { render: { fillStyle: eyeColors[eyeColorPicker] } }
    );
    let rightPupil = Bodies.circle(
      rightEye.position.x,
      rightEye.position.y,
      4,
      { render: { fillStyle: "#000000" } }
    );
    let leftIris = Bodies.circle(leftEye.position.x, leftEye.position.y, 10, {
      render: { fillStyle: eyeColors[eyeColorPicker] },
    });
    let leftPupil = Bodies.circle(leftEye.position.x, leftEye.position.y, 4, {
      render: { fillStyle: "#000000" },
    });

    // Composite object that holds all head parts
    const fullHead = Body.create({
      parts: [
        head,
        nose,
        rightEye,
        leftEye,
        rightIris,
        leftIris,
        rightPupil,
        leftPupil,
      ],
      isStatic: true,
    });

    World.add(engine.world, [ballA, ballB, rectC]);

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
    const buttonStrokeColors = {
      transform: "#FF0000",
      scale: "#00FF00",
      rotate: "#0000FF",
    };
    let strokeColor = buttonStrokeColors.transform;
    const transformButton = Bodies.circle(50, 50, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 0.4,
        sprite: {
          texture: "../images/transform.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const rotateButton = Bodies.circle(50, 100, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/rotate.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const scaleButton = Bodies.circle(50, 150, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/scale.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const baseHatButton1 = Bodies.circle(window.innerWidth / 4, 300, 130, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/hatPreset1.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const baseHatButton2 = Bodies.circle(window.innerWidth / 2, 300, 130, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/hatPreset2.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const baseHatButton3 = Bodies.circle(
      (window.innerWidth * 3) / 4,
      300,
      130,
      {
        isStatic: true,
        isSensor: true,
        render: {
          opacity: 1,
          sprite: {
            texture: "../images/hatPreset3.png",
            xScale: 1,
            yScale: 1,
          },
        },
      }
    );

    const createCircleButton = Bodies.circle(50, 200, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/circle.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    const createRectangleButton = Bodies.circle(50, 250, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/rectangle.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });
    const createTriangleButton = Bodies.circle(50, 300, 20, {
      isStatic: true,
      isSensor: true,
      render: {
        opacity: 1,
        sprite: {
          texture: "../images/triangle.png",
          xScale: 1,
          yScale: 1,
        },
      },
    });

    Matter.Events.on(engine, "collisionEnd", ({ pairs }) => {
      pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA === trashCan) World.remove(engine.world, bodyB);
        if (bodyB === trashCan) World.remove(engine.world, bodyA);
      });
    });

    World.add(engine.world, [
      scaleButton,
      transformButton,
      rotateButton,
      baseHatButton1,
      baseHatButton2,
      baseHatButton3,
      createCircleButton,
      createRectangleButton,
      createTriangleButton,
    ]);
    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      //const rand = Math.random();

      if (!toolState.mousePressed) {
        setToolState("mouseStartPosition", mouse.mousedownPosition);
        toolState.mouseDisplacement = 0;
      }

      // deselect previous body
      if (toolState.selectedBody) {
        toolState.selectedBody.render.lineWidth = 0;
      }
      toolState.selectedBody = mouseConstraint.body;
      toolState.mousePressed = true;
      let baseHat;
      const hatColors = [
        "#4036E0",
        "#F26B9B",
        "#DBAB67",
        "#96E0C9",
        "#58E0B5",
        "#8F94F2",
        "#DB88B9",
        "#FFD09E",
        "#000000",
      ];
      let hatColorSelector = getRandomInt(0, hatColors.length);

      // for buttons
      switch (toolState.selectedBody) {
        case transformButton:
          selectDeselectButton(transformButton, [
            scaleButton,
            rotateButton,
            createCircleButton,
            createRectangleButton,
            createTriangleButton,
          ]);
          toolState.currentTool = "transform";
          strokeColor = buttonStrokeColors.transform;
          break;

        case rotateButton:
          selectDeselectButton(rotateButton, [
            transformButton,
            scaleButton,
            createCircleButton,
            createRectangleButton,
            createTriangleButton,
          ]);
          toolState.currentTool = "rotate";
          strokeColor = buttonStrokeColors.rotate;
          break;

        case scaleButton:
          selectDeselectButton(scaleButton, [
            transformButton,
            rotateButton,
            createCircleButton,
            createRectangleButton,
            createTriangleButton,
          ]);
          toolState.currentTool = "scale";
          strokeColor = buttonStrokeColors.scale;
          break;

        case baseHatButton1:
          baseHat = Bodies.rectangle(
            fullHead.position.x,
            fullHead.position.y - 120,
            400,
            40,
            {
              isStatic: true,
              render: { fillStyle: hatColors[hatColorSelector] },
              chamfer: { radius: [0, 0, 30, 30] },
            }
          );
          setReactState("hatChosen", true);
          World.add(engine.world, [
            fullHead,
            baseHat,
            trashCan,
            trashCanBoundaryLeft,
            trashCanBoundaryRight,
          ]);
          World.remove(engine.world, [
            baseHatButton1,
            baseHatButton2,
            baseHatButton3,
          ]);
          break;

        case baseHatButton2:
          const hatBody = Bodies.rectangle(
            fullHead.position.x,
            fullHead.position.y - 140,
            100,
            100,
            {
              isStatic: true,
              render: { fillStyle: hatColors[hatColorSelector] },
            }
          );
          const hatTop = Bodies.rectangle(
            fullHead.position.x,
            fullHead.position.y - 200,
            400,
            20,
            {
              isStatic: true,
              render: { fillStyle: hatColors[hatColorSelector] },
            }
          );

          const danglingBall = Bodies.circle(
            hatTop.position.x - 300,
            hatTop.position.y + 50,
            30,
            { render: { fillStyle: "#000000" } }
          );
          const danglingChain = Constraint.create({
            bodyA: danglingBall,
            pointA: { x: 10, y: 0 },
            bodyB: hatTop,
            pointB: { x: -170, y: 0 },
            stiffness: 0.6,
            damping: 0.5,
          });

          baseHat = Body.create({ parts: [hatBody, hatTop], isStatic: true });

          setReactState("hatChosen", true);
          World.add(engine.world, [
            fullHead,
            baseHat,
            danglingBall,
            danglingChain,
            trashCan,
            trashCanBoundaryLeft,
            trashCanBoundaryRight,
          ]);
          World.remove(engine.world, [
            baseHatButton1,
            baseHatButton2,
            baseHatButton3,
          ]);
          break;

        case baseHatButton3:
          const hatBottom = Bodies.rectangle(
            fullHead.position.x,
            fullHead.position.y - 130,
            400,
            50,
            {
              isStatic: true,
              chamfer: { radius: [10, 10, 30, 30] },
              render: { fillStyle: hatColors[hatColorSelector] },
            }
          );
          const hatRightSide = Bodies.rectangle(
            fullHead.position.x + 190,
            fullHead.position.y - 150,
            50,
            100,
            {
              isStatic: true,
              angle: Math.PI / 4,
              chamfer: { radius: [30, 30, 30, 10] },
              render: { fillStyle: hatColors[hatColorSelector] },
            }
          );
          const hatLeftSide = Bodies.rectangle(
            fullHead.position.x - 190,
            fullHead.position.y - 150,
            50,
            100,
            {
              isStatic: true,
              angle: -Math.PI / 4,
              chamfer: { radius: [30, 30, 30, 30] },
              render: { fillStyle: hatColors[hatColorSelector] },
            }
          );
          const hatMiddle = Bodies.trapezoid(
            fullHead.position.x,
            fullHead.position.y - 160,
            150,
            120,
            0.5,
            {
              isStatic: true,
              render: { fillStyle: hatColors[hatColorSelector] },
              //chamfer: { radius: [10, 30, 10, 30] }
            }
          );
          baseHat = Body.create({
            parts: [hatBottom, hatRightSide, hatLeftSide, hatMiddle],
            isStatic: true,
          });
          setReactState("hatChosen", true);
          World.add(engine.world, [
            fullHead,
            baseHat,
            trashCan,
            trashCanBoundaryLeft,
            trashCanBoundaryRight,
          ]);
          World.remove(engine.world, [
            baseHatButton1,
            baseHatButton2,
            baseHatButton3,
          ]);
          break;

        case createCircleButton:
          selectDeselectButton(createCircleButton, [
            scaleButton,
            rotateButton,
            transformButton,
            createRectangleButton,
            createTriangleButton,
          ]);
          toolState.currentTool = "createCircle";
          strokeColor = buttonStrokeColors.transform;
          break;

        case createRectangleButton:
          selectDeselectButton(createRectangleButton, [
            scaleButton,
            rotateButton,
            createCircleButton,
            transformButton,
            createTriangleButton,
          ]);
          toolState.currentTool = "createRectangle";
          strokeColor = buttonStrokeColors.transform;
          break;

        case createTriangleButton:
          selectDeselectButton(createTriangleButton, [
            scaleButton,
            rotateButton,
            createCircleButton,
            createRectangleButton,
            transformButton,
          ]);
          toolState.currentTool = "createTriangle";
          strokeColor = buttonStrokeColors.transform;
          break;

        // for moveable non static objects
        default:
          if (
            toolState.selectedBody &&
            toolState.selectedBody.isStatic !== true
          ) {
            toolState.selectedBody.render.lineWidth = 10.0;
            toolState.selectedBody.render.strokeStyle = strokeColor;

            // code for rotate
            if (toolState.currentTool === "rotate") {
              Body.rotate(toolState.selectedBody, Math.PI / 2, [
                toolState.selectedBody.position,
              ]);
            }
          }

          if (mouseConstraint.body === null) {
            if (toolState.currentTool === "createCircle") {
              World.add(
                engine.world,
                Bodies.circle(
                  mouse.position.x,
                  mouse.position.y,
                  getRandomInt(10, 60),
                  { restitution: 0.5 }
                )
              );
            } else if (toolState.currentTool === "createRectangle") {
              World.add(
                engine.world,
                Bodies.rectangle(
                  mouse.position.x,
                  mouse.position.y,
                  getRandomInt(40, 100),
                  getRandomInt(40, 100),
                  { restitution: 0.5 }
                )
              );
            } else if (toolState.currentTool === "createTriangle") {
              World.add(
                engine.world,
                Bodies.polygon(
                  mouse.position.x,
                  mouse.position.y,
                  3,
                  getRandomInt(20, 80),
                  { restitution: 0.5 }
                )
              );
            }
          }
          break;
      }
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
      //let mouse = mouseConstraint.mouse;
      toolState.mouseCurrentPosition = Vector.create(
        mouse.position.x,
        mouse.position.y
      );

      if (toolState.mousePressed === true && mouseConstraint.body) {
        switch (toolState.currentTool) {
          case "translate":
            // just use default constraint for translate
            break;
          case "scale":
            if (
              mouseConstraint.body.isSensor === false &&
              mouseConstraint.body.isStatic === false
            ) {
              toolState.mouseDisplacement = Vector.create(
                toolState.mouseCurrentPosition.x - mouse.mousedownPosition.x,
                toolState.mouseCurrentPosition.y - mouse.mousedownPosition.y
              );

              let scaleFactor =
                Vector.magnitude(toolState.mouseDisplacement) / 3000;
              let scaleDirection = Vector.normalise(
                toolState.mouseDisplacement
              );

              console.log(scaleFactor);
              console.log(scaleDirection);

              Body.scale(
                mouseConstraint.body,
                1 + scaleDirection.x * scaleFactor,
                1 - scaleDirection.y * scaleFactor
              ); // scale factor
            }
            break;
          case "rotate":
            // TODO make object rotate
            if (
              mouseConstraint.body.isSensor === false &&
              mouseConstraint.body.isStatic === false
            ) {
              let rotateFactor =
                (Math.sign(toolState.mouseDisplacement.x) *
                  vectorLength(toolState.mouseDisplacement)) /
                100;
            }
            break;
          default:
            break;
        }
      }
    });

    Matter.Events.on(mouseConstraint, "startdrag", function (event) {});

    Engine.run(engine);
    Render.run(render);
  }

  render() {
    const { donePlaying } = this.state;
    return (
      <div style={{ diplay: "flex" }}>
        {this.renderChooseText()}
        {this.renderDoneButton()}
        {this.renderAudioButton()}
        {donePlaying ? this.renderScore() : null}
        <div ref="scene" />
      </div>
    );
  }

  renderChooseText = () => {
    const { hatChosen } = this.state;
    return !hatChosen ? (
      <h1
        style={{
          display: "flex",
          position: "absolute",
          fontSize: "40pt",
          top: "10vh",
          left: "32vw",
          fontFamily: "Bungee Inline",
        }}
      >
        CHOOSE STARTING HAT
      </h1>
    ) : null;
  };

  renderDoneButton = () => {
    const { engine } = this.state;
    const styles = {
      display: "flex",
      position: "absolute",
      top: "4vh",
      fontSize: "16pt",
      left: "85vw",
      height: "50px",
      alignItems: "center",
      backgroundColor: "#2fb51d",
      margin: "5px 5px 5px 5px",
      fontFamily: "Bungee Inline",
    };
    return (
      <Button
        style={styles}
        type="primary"
        onClick={() => this.handleDoneClick(engine)}
      >
        I'm Done!
      </Button>
    );
  };

  handleDoneClick = (engine) => {
    const { screenSize } = this.state;
    console.log("Done: ");
    const headPeak = screenSize.y / 2 - 140;
    const point1 = { x: 250, y: -1100 };
    const point2 = { x: 250, y: headPeak };
    const point3 = { x: screenSize.x - 250, y: -1100 };
    const point4 = { x: screenSize.x - 250, y: headPeak };
    const scoreBounds = Matter.Bounds.create([point1, point2, point3, point4]);
    console.log("scoreBounds", scoreBounds);
    const overlaps = engine.world.bodies.filter((body) =>
      Matter.Bounds.overlaps(scoreBounds, body.bounds)
    );
    console.log(
      "overlaps",
      overlaps,
      engine.world.bodies.length - overlaps.length
    );

    let maxHeight = 0;
    overlaps.map((body) => {
      if (body.position.y < maxHeight) {
        maxHeight = body.position.y;
      }
    });

    const score = Math.abs(headPeak - maxHeight);
    console.log("Score:", score);
    this.setState({ score: score, donePlaying: true });
  };

  renderScore = () => {
    const { score } = this.state;
    const modifiedScore = score.toFixed(1);
    const styles = {
      display: "flex",
      position: "absolute",
      fontSize: "30pt",
      top: "5vh",
      left: "38vw",
      fontFamily: "Bungee Inline",
    };
    return <h2 style={styles}>You Scored: {modifiedScore}</h2>;
  };

  renderAudioButton = () => {
    const { audioPlaying } = this.state;
    if (audioPlaying) {
      document.getElementById("audio").play();
    }
    const start = () => {
      this.setState({ audioPlaying: true });
    };
    const pause = () => {
      document.getElementById("audio").pause();
      this.setState({ audioPlaying: false });
    };
    const styles = {
      display: "flex",
      position: "absolute",
      fontSize: "30pt",
      top: "5vh",
      left: "95vw",
    };
    return (
      <div
        style={
          audioPlaying
            ? { ...styles, color: "#020202" }
            : { ...styles, color: "#767676" }
        }
      >
        <SoundOutlined onClick={audioPlaying ? pause : start}>
          Play
        </SoundOutlined>
      </div>
    );
  };
}
export default Scene;
