(this["webpackJsonpgame-jam"]=this["webpackJsonpgame-jam"]||[]).push([[0],{119:function(e,t,n){},124:function(e,t,n){"use strict";n.r(t),n.d(t,"App",(function(){return k}));var i=n(15),o=n(16),a=n(18),r=n(20),s=n(0),l=n.n(s),c=n(9),d=n.n(c),u=(n(72),n(27)),y=n(24),p=n(1),m=n.n(p),f=function(e,t){return parseInt(Math.random()*(e-t)+t)},g=function(e,t){e.render.opacity=.3;for(var n=0;n<t.length;n++)t[n].render.opacity=1},h=n(131),S=(n(73),n(127)),x=(n(48),function(e){Object(r.a)(n,e);var t=Object(a.a)(n);function n(e){var o;return Object(i.a)(this,n),(o=t.call(this,e)).renderChooseText=function(){return o.state.hatChosen?null:l.a.createElement("h1",{style:{display:"flex",position:"absolute",fontSize:"40pt",top:"10vh",left:"32vw",fontFamily:"Bungee Inline"}},"CHOOSE STARTING HAT")},o.renderDoneButton=function(){var e=o.state.engine;return l.a.createElement(S.a,{style:{display:"flex",position:"absolute",top:"4vh",fontSize:"16pt",left:"85vw",height:"50px",alignItems:"center",backgroundColor:"#2fb51d",margin:"5px 5px 5px 5px",fontFamily:"Bungee Inline"},type:"primary",onClick:function(){return o.handleDoneClick(e)}},"I'm Done!")},o.handleDoneClick=function(e){var t=o.state.screenSize,n=t.y/2-140,i={x:250,y:n},a={x:t.x-250,y:-1100},r={x:t.x-250,y:n},s=m.a.Bounds.create([{x:250,y:-1100},i,a,r]),l=e.world.bodies.filter((function(e){return m.a.Bounds.overlaps(s,e.bounds)})),c=0;l.map((function(e){e.position.y<c&&(c=e.position.y)}));var d=Math.abs(n-c);console.log("Score:",d),o.setState({score:d,donePlaying:!0})},o.renderScore=function(){var e=o.state.score.toFixed(1);return l.a.createElement("h2",{style:{display:"flex",position:"absolute",fontSize:"30pt",top:"5vh",left:"38vw",fontFamily:"Bungee Inline"}},"You Scored: ",e)},o.renderAudioButton=function(){var e=o.state.audioPlaying;e&&document.getElementById("audio").play();var t={display:"flex",position:"absolute",fontSize:"30pt",top:"5vh",left:"95vw"};return l.a.createElement("div",{style:e?Object(y.a)({},t,{color:"#020202"}):Object(y.a)({},t,{color:"#767676"})},l.a.createElement(h.a,{onClick:e?function(){document.getElementById("audio").pause(),o.setState({audioPlaying:!1})}:function(){o.setState({audioPlaying:!0})}},"Play"))},o.state={render:null,hatChosen:!1,audioPlaying:!1,score:0,engine:null,screenSize:null,donePlaying:!1},o}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=m.a.Engine,n=m.a.Render,i=m.a.World,o=m.a.Bodies,a=m.a.Body,r=m.a.Mouse,s=m.a.MouseConstraint,l=m.a.Runner,c=m.a.Events,d=m.a.Bounds,y=m.a.Vector,h={x:window.innerWidth,y:window.innerHeight};this.setState({screenSize:h});var S={},x=function(t,n){e.setState(Object(u.a)({},t,n))},b=t.create({}),v=n.create({element:this.refs.scene,engine:b,mouse:s.mouse,options:{width:window.innerWidth,height:window.innerHeight,hasBounds:!0,wireframes:!1,background:"#E4F5FC"}});this.setState({engine:b});var w=l.create();l.run(w,b);v.options.width,v.options.height;b.world.bounds.min.y=-1e3,b.world.bounds.max.y=window.innerHeight;var E=1;c.on(b,"beforeTick",(function(){var e,t=$.mouse,n=b.world,i=-.1*t.wheelDelta;if(0!==i){(i<0&&E>=.6||i>0&&E<=1.4)&&i;var o=y.create(0,1),a=90*i;e=y.mult(o,a),v.bounds.min.x+e.x<n.bounds.min.x&&(e.x=n.bounds.min.x-v.bounds.min.x),v.bounds.max.x+e.x>n.bounds.max.x&&(e.x=n.bounds.max.x-v.bounds.max.x),v.bounds.min.y+e.y<n.bounds.min.y&&(e.y=n.bounds.min.y-v.bounds.min.y),v.bounds.max.y+e.y>n.bounds.max.y&&(e.y=n.bounds.max.y-v.bounds.max.y),d.translate(v.bounds,e);var s=y.create(0,e.y);m.a.Body.setPosition(Z,y.add(Z.position,s)),m.a.Body.setPosition(_,y.add(_.position,s)),m.a.Body.setPosition(ee,y.add(ee.position,s)),m.a.Body.setPosition(oe,y.add(oe.position,s)),m.a.Body.setPosition(ae,y.add(ae.position,s)),m.a.Body.setPosition(re,y.add(re.position,s)),r.setOffset(t,v.bounds.min)}})),c.on(b,"afterTick",(function(){e.state.score}));var B=o.circle(210,100,30,{restitution:.5}),C=o.circle(110,50,30,{restitution:.5}),k=o.rectangle(110,50,60,100,{restitution:.5}),P=o.rectangle(.8*h.x,h.y-35,270,25,{isStatic:!0,render:{fillStyle:"#020202"},chamfer:{radius:[0,0,10,10]}}),F=o.rectangle(.8*h.x-145,h.y-130,20,200,{isStatic:!0,render:{fillStyle:"#010101"},angle:-.2,chamfer:{radius:[10,10,0,0]}}),O=o.rectangle(.8*h.x+145,h.y-130,20,200,{isStatic:!0,render:{fillStyle:"#010101"},angle:.2,chamfer:{radius:[10,10,0,0]}});i.add(b.world,[o.rectangle(h.x/2,h.y,h.x,50,{isStatic:!0,render:{fillStyle:"#FCFAA4"}}),o.rectangle(h.x,h.y/2,50,2e3,{isStatic:!0,render:{fillStyle:"#FCFAA4"}}),o.rectangle(0,h.y/2,50,2e3,{isStatic:!0,render:{fillStyle:"#FCFAA4"}})]);var D=["#E0B094","#4A2C13","#E0C1A2","#9E784F","#70441F","#D1A669","#E8C48F"],T=f(0,D.length-1),A=D.splice(T,1),j=o.circle(h.x/2,h.y/2,140,{isStatic:!0,render:{fillStyle:A}}),I=D.splice(f(0,D.length-1),1),M=10*f(3,7),z=o.polygon(j.position.x,j.position.y+20,3,M,{angle:Math.PI/2,render:{fillStyle:I},chamfer:{radius:[20,0,20]}}),W=o.rectangle(j.position.x-60,j.position.y-50,50,50,{angle:Math.PI/4,render:{fillStyle:"#ffffff"},chamfer:{radius:[40,10,40,10]}}),H=o.rectangle(j.position.x+60,j.position.y-50,50,50,{angle:Math.PI/4,render:{fillStyle:"#ffffff"},chamfer:{radius:[40,10,40,10]}}),R=["#71C3DB","#86DB68","#876C1D","#4F2D11"],N=f(0,R.length-1),G=o.circle(H.position.x,H.position.y,10,{render:{fillStyle:R[N]}}),J=o.circle(H.position.x,H.position.y,4,{render:{fillStyle:"#000000"}}),L=o.circle(W.position.x,W.position.y,10,{render:{fillStyle:R[N]}}),q=o.circle(W.position.x,W.position.y,4,{render:{fillStyle:"#000000"}}),V=a.create({parts:[j,z,H,W,G,L,J,q],isStatic:!0});i.add(b.world,[B,C,k]);var Y=r.create(v.canvas),$=s.create(b,{mouse:Y,constraint:{stiffness:.1,render:{visible:!1}}});i.add(b.world,$);var K="#FF0000",Q="#00FF00",U="#0000FF",X=K,Z=o.circle(50,50,20,{isStatic:!0,isSensor:!0,render:{opacity:.4,sprite:{texture:"../images/transform.png",xScale:1,yScale:1}}}),_=o.circle(50,100,20,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/rotate.png",xScale:1,yScale:1}}}),ee=o.circle(50,150,20,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/scale.png",xScale:1,yScale:1}}}),te=o.circle(window.innerWidth/4,300,130,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/hatPreset1.png",xScale:1,yScale:1}}}),ne=o.circle(window.innerWidth/2,300,130,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/hatPreset2.png",xScale:1,yScale:1}}}),ie=o.circle(3*window.innerWidth/4,300,130,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/hatPreset3.png",xScale:1,yScale:1}}}),oe=o.circle(50,200,20,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/circle.png",xScale:1,yScale:1}}}),ae=o.circle(50,250,20,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/rectangle.png",xScale:1,yScale:1}}}),re=o.circle(50,300,20,{isStatic:!0,isSensor:!0,render:{opacity:1,sprite:{texture:"../images/triangle.png",xScale:1,yScale:1}}});m.a.Events.on(b,"collisionEnd",(function(e){e.pairs.forEach((function(e){var t=e.bodyA,n=e.bodyB;t===P&&i.remove(b.world,n),n===P&&i.remove(b.world,t)}))})),i.add(b.world,[ee,Z,_,te,ne,ie,oe,ae,re]),m.a.Events.on($,"mousedown",(function(e){var t,n,r;S.mousePressed||(t="mouseStartPosition",n=Y.mousedownPosition,Object.keys(S).includes(t)||(S[t]=null),S[t]=n,S.mouseDisplacement=0),S.selectedBody&&(S.selectedBody.render.lineWidth=0),S.selectedBody=$.body,S.mousePressed=!0;var s=["#4036E0","#F26B9B","#DBAB67","#96E0C9","#58E0B5","#8F94F2","#DB88B9","#FFD09E","#000000"],l=f(0,s.length);switch(S.selectedBody){case Z:g(Z,[ee,_,oe,ae,re]),S.currentTool="transform",X=K;break;case _:g(_,[Z,ee,oe,ae,re]),S.currentTool="rotate",X=U;break;case ee:g(ee,[Z,_,oe,ae,re]),S.currentTool="scale",X=Q;break;case te:r=o.rectangle(V.position.x,V.position.y-120,400,40,{isStatic:!0,render:{fillStyle:s[l]},chamfer:{radius:[0,0,30,30]}}),x("hatChosen",!0),i.add(b.world,[V,r,P,F,O]),i.remove(b.world,[te,ne,ie]);break;case ne:var c=o.rectangle(V.position.x,V.position.y-140,100,100,{isStatic:!0,render:{fillStyle:s[l]}}),d=o.rectangle(V.position.x,V.position.y-200,400,20,{isStatic:!0,render:{fillStyle:s[l]}}),u=o.circle(d.position.x-300,d.position.y+50,30,{render:{fillStyle:"#000000"}}),y=p.Constraint.create({bodyA:u,pointA:{x:10,y:0},bodyB:d,pointB:{x:-170,y:0},stiffness:.6,damping:.5});r=a.create({parts:[c,d],isStatic:!0}),x("hatChosen",!0),i.add(b.world,[V,r,u,y,P,F,O]),i.remove(b.world,[te,ne,ie]);break;case ie:var m=o.rectangle(V.position.x,V.position.y-130,400,50,{isStatic:!0,chamfer:{radius:[10,10,30,30]},render:{fillStyle:s[l]}}),h=o.rectangle(V.position.x+190,V.position.y-150,50,100,{isStatic:!0,angle:Math.PI/4,chamfer:{radius:[30,30,30,10]},render:{fillStyle:s[l]}}),v=o.rectangle(V.position.x-190,V.position.y-150,50,100,{isStatic:!0,angle:-Math.PI/4,chamfer:{radius:[30,30,30,30]},render:{fillStyle:s[l]}}),w=o.trapezoid(V.position.x,V.position.y-160,150,120,.5,{isStatic:!0,render:{fillStyle:s[l]}});r=a.create({parts:[m,h,v,w],isStatic:!0}),x("hatChosen",!0),i.add(b.world,[V,r,P,F,O]),i.remove(b.world,[te,ne,ie]);break;case oe:g(oe,[ee,_,Z,ae,re]),S.currentTool="createCircle",X=K;break;case ae:g(ae,[ee,_,oe,Z,re]),S.currentTool="createRectangle",X=K;break;case re:g(re,[ee,_,oe,ae,Z]),S.currentTool="createTriangle",X=K;break;default:S.selectedBody&&!0!==S.selectedBody.isStatic&&(S.selectedBody.render.lineWidth=10,S.selectedBody.render.strokeStyle=X,"rotate"===S.currentTool&&a.rotate(S.selectedBody,Math.PI/2,[S.selectedBody.position])),null===$.body&&("createCircle"===S.currentTool?i.add(b.world,o.circle(Y.position.x,Y.position.y,f(10,60),{restitution:.5})):"createRectangle"===S.currentTool?i.add(b.world,o.rectangle(Y.position.x,Y.position.y,f(40,100),f(40,100),{restitution:.5})):"createTriangle"===S.currentTool&&i.add(b.world,o.polygon(Y.position.x,Y.position.y,3,f(20,80),{restitution:.5})))}})),m.a.Events.on($,"mouseup",(function(e){S.mousePressed=!1})),m.a.Events.on($,"mousemove",(function(e){if(S.mouseCurrentPosition=y.create(Y.position.x,Y.position.y),!0===S.mousePressed&&$.body)switch(S.currentTool){case"translate":break;case"scale":if(!1===$.body.isSensor&&!1===$.body.isStatic){S.mouseDisplacement=y.create(S.mouseCurrentPosition.x-Y.mousedownPosition.x,S.mouseCurrentPosition.y-Y.mousedownPosition.y);var t=y.magnitude(S.mouseDisplacement)/3e3,n=y.normalise(S.mouseDisplacement);a.scale($.body,1+n.x*t,1-n.y*t)}break;case"rotate":if(!1===$.body.isSensor&&!1===$.body.isStatic)Math.sign(S.mouseDisplacement.x),i=S.mouseDisplacement,Math.sqrt(i.x*i.x+i.y*i.y)}var i})),m.a.Events.on($,"startdrag",(function(e){})),t.run(b),n.run(v)}},{key:"render",value:function(){var e=this.state.donePlaying;return l.a.createElement("div",{style:{diplay:"flex"}},this.renderChooseText(),this.renderDoneButton(),this.renderAudioButton(),e?this.renderScore():null,l.a.createElement("div",{ref:"scene"}))}}]),n}(l.a.Component)),b=n(14),v=n(130),w=n(129),E=n(128),B=(n(119),function(e){Object(r.a)(n,e);var t=Object(a.a)(n);function n(e){var o;return Object(i.a)(this,n),(o=t.call(this,e)).renderLandingNav=function(){var e={width:"250px",height:"100px",fontSize:"16pt"};return l.a.createElement("div",{id:"landing-nav"},l.a.createElement(E.a,null,l.a.createElement(S.a,{style:Object(y.a)({},e,{backgroundColor:"#621bc4"}),type:"primary"},l.a.createElement(b.b,{to:"/game"},"Play Hat Trick!"))),l.a.createElement(E.a,null,l.a.createElement(S.a,{style:e,type:"secondary"},l.a.createElement(b.b,{to:"/about"},"About"))))},o.renderGameNav=function(){return o.props.isOpen?l.a.createElement("div",{id:"game-nav"},l.a.createElement("nav",null,l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(b.b,{to:"/game"},"Game")),l.a.createElement("li",null,l.a.createElement(b.b,{to:"/about"},"About"))),o.renderHamburger())):o.renderHamburger()},o.renderHamburger=function(){return o.props.isOpen?l.a.createElement(v.a,{onClick:o.onClickOpen}):l.a.createElement(w.a,{onClick:o.onClickOpen})},o.onClickOpen=function(e){o.setState({isOpen:!e.isOpen})},o.state={isOpen:"/landing"===e.location.pathname},o}return Object(o.a)(n,[{key:"render",value:function(){return this.renderLandingNav()}}]),n}(s.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=n(2),k=function(e){Object(r.a)(n,e);var t=Object(a.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return l.a.createElement(b.a,null,l.a.createElement("div",{id:"main"},l.a.createElement(C.d,null,l.a.createElement(C.a,{exact:!0,from:"/",to:"/landing"}),l.a.createElement(C.b,{path:"/landing",component:B}),l.a.createElement(C.b,{path:"/game",component:x}),l.a.createElement(C.b,{path:"/about",component:P}))))}}]),n}(s.Component);function P(){return l.a.createElement("a",{href:"https://calemdar.github.io/",style:{display:"flex",position:"absolute",fontSize:"30pt",top:"10vh",left:"35vw",fontFamily:"Bungee Inline"}},"Made by Cem & Ert - 2020")}d.a.render(l.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},68:function(e,t,n){e.exports=n(124)},72:function(e,t,n){}},[[68,1,2]]]);
//# sourceMappingURL=main.c24ecda9.chunk.js.map