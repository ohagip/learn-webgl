!function(a){var n={};function i(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return a[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=a,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=22)}({22:function(e,t,a){e.exports=a(23)},23:function(e,t,a){"use strict";a.r(t);var n,i,s,o,l,r,d,h,u,c,f,p,m,v,E,w=a(24),y=a(25),M=a(27),g=a(29),T=a(31),H=a(32),R=a(33),S=a(34);console.log("game",w.default);var b,x,P,C,z,D={x:0,y:0},B=document.getElementById("distValue"),I=document.getElementById("energyBar"),L=document.getElementById("replayMessage"),F=document.getElementById("levelValue"),k=document.getElementById("levelCircleStroke");function j(){l=window.innerHeight,r=window.innerWidth,s=r/l,o.setSize(r,l),i.aspect=s,i.updateProjectionMatrix()}function O(){L.style.display="none"}function U(){w.default.newTime=Date.now(),w.default.deltaTime=w.default.newTime-w.default.oldTime,w.default.oldTime=w.default.newTime,"playing"===w.default.v.status?(Math.floor(w.default.v.distance)%w.default.v.distanceForCoinsSpawn==0&&Math.floor(w.default.v.distance)>w.default.v.coinLastSpawn&&(w.default.v.coinLastSpawn=Math.floor(w.default.v.distance),E.spawnCoins()),Math.floor(w.default.v.distance)%w.default.v.distanceForSpeedUpdate==0&&Math.floor(w.default.v.distance)>w.default.v.speedLastUpdate&&(w.default.v.speedLastUpdate=Math.floor(w.default.v.distance),w.default.v.targetBaseSpeed+=w.default.v.incrementSpeedByTime*w.default.deltaTime),Math.floor(w.default.v.distance)%w.default.v.distanceForEnnemiesSpawn==0&&Math.floor(w.default.v.distance)>w.default.v.ennemyLastSpawn&&(w.default.v.ennemyLastSpawn=Math.floor(w.default.v.distance),v.spawnEnnemies()),Math.floor(w.default.v.distance)%w.default.v.distanceForLevelUpdate==0&&Math.floor(w.default.v.distance)>w.default.v.levelLastUpdate&&(w.default.v.levelLastUpdate=Math.floor(w.default.v.distance),w.default.v.level++,F.innerHTML=Math.floor(w.default.v.level),w.default.v.targetBaseSpeed=w.default.v.initSpeed+w.default.v.incrementSpeedByLevel*w.default.v.level),function(){w.default.v.planeSpeed=Object(T.normalize)(D.x,-.5,.5,w.default.v.planeMinSpeed,w.default.v.planeMaxSpeed);var e=Object(T.normalize)(D.y,-.75,.75,w.default.v.planeDefaultHeight-w.default.v.planeAmpHeight,w.default.v.planeDefaultHeight+w.default.v.planeAmpHeight),t=Object(T.normalize)(D.x,-1,1,.7*-w.default.v.planeAmpWidth,-w.default.v.planeAmpWidth);w.default.v.planeCollisionDisplacementX+=w.default.v.planeCollisionDisplacementX,t+=w.default.v.planeCollisionDisplacementX,w.default.v.planeCollisionDisplacementY+=w.default.v.planeCollisionDisplacementY,e+=w.default.v.planeCollisionDisplacementY,p.mesh.position.y+=(e-p.mesh.position.y)*w.default.deltaTime*w.default.v.planeMoveSensivity,p.mesh.position.x+=(t-p.mesh.position.x)*w.default.deltaTime*w.default.v.planeMoveSensivity,p.mesh.rotation.z=(e-p.mesh.position.y)*w.default.deltaTime*w.default.v.planeRotXSensivity,p.mesh.rotation.x=(p.mesh.position.y-e)*w.default.deltaTime*w.default.v.planeRotZSensivity,i.for=Object(T.normalize)(D.x,-1,1,40,80),i.updateProjectionMatrix(),i.position.y+=(p.mesh.position.y-i.position.y)*w.default.deltaTime*w.default.v.cameraSensivity,w.default.v.planeCollisionSpeedX+=(0-w.default.v.planeCollisionSpeedX)*w.default.deltaTime*.03,w.default.v.planeCollisionDisplacementX+=(0-w.default.v.planeCollisionDisplacementX)*w.default.deltaTime*.01,w.default.v.planeCollisionSpeedY+=(0-w.default.v.planeCollisionSpeedY)*w.default.deltaTime*.03,w.default.v.planeCollisionDisplacementY+=(0-w.default.v.planeCollisionDisplacementY)*w.default.deltaTime*.01,p.pilot.updateHairs()}(),function(){w.default.v.distance+=w.default.v.speed*w.default.deltaTime*w.default.v.ratioSpeedDistance,B.innerHTML=Math.floor(w.default.v.distance);var e=502*(1-w.default.v.distance%w.default.v.distanceForLevelUpdate/w.default.v.distanceForLevelUpdate);k.setAttribute("stroke-dashoffset",e)}(),w.default.v.energy-=w.default.v.speed*w.default.deltaTime*w.default.v.ratioSpeedEnergy,w.default.v.energy=Math.max(0,w.default.v.energy),I.style.right=100-w.default.v.energy+"%",I.style.backgroundColor=w.default.v.energy<50?"#f25346":"#68c3c0",w.default.v.energy<30?I.style.animationName="blinking":I.style.animationName="none",w.default.v.energy<1&&(console.log("gameover"),w.default.v.status="gameover"),w.default.v.baseSpeed+=(w.default.v.targetBaseSpeed-w.default.v.baseSpeed)*w.default.deltaTime*.02,w.default.v.speed=w.default.v.baseSpeed*w.default.v.planeSpeed):"gameover"===w.default.v.status?(w.default.v.speed*=.99,p.mesh.rotation.z+=2e-4*(-Math.PI/2-p.mesh.rotation.z)*w.default.deltaTime,p.mesh.rotation.x+=3e-4*w.default.deltaTime,w.default.v.planeFallSpeed*=1.05,p.mesh.position.y-=w.default.v.planeFallSpeed*w.default.deltaTime,p.mesh.position.y<-200&&(L.style.display="block",w.default.v.status="waitingReplay")):w.default.v.status,p.propeller.rotation.x+=.2+w.default.v.planeSpeed*w.default.deltaTime*.005,c.mesh.rotation.z+=w.default.v.speed*w.default.deltaTime,c.mesh.rotation.z>2*Math.PI&&(c.mesh.rotation.z-=2*Math.PI),c.mesh.rotation.z>2*Math.PI&&(c.mesh.rotation.z-=2*Math.PI),d.intensity+=(.5-d.intensity)*w.default.deltaTime*.005,E.rotateCoins(),v.rotateEnnemies(),f.moveClouds(),c.moveWaves(),o.render(n,i),requestAnimationFrame(U)}function G(){var e=event.clientX/r*2-1,t=1-event.clientY/l*2;D.x=e,D.y=t}function A(){"waitingReplay"===w.default.v.status&&(w.default.reset(),O())}O(),w.default.reset(),F.innerHTML=Math.floor(w.default.v.level),l=window.innerHeight,r=window.innerWidth,s=r/l,(n=new THREE.Scene).fog=new THREE.Fog(16243114,100,950),(i=new THREE.PerspectiveCamera(50,s,.1,1e4)).position.x=0,i.position.y=w.default.v.planeDefaultHeight,i.position.z=200,(o=new THREE.WebGLRenderer({canvas:document.querySelector("#canvas"),alpha:!0,antialias:!0})).setSize(r,l),o.shadowMap.enabled=!0,window.addEventListener("resize",j),h=new THREE.HemisphereLight(11184810,0,.9),(u=new THREE.DirectionalLight(16777215,.9)).position.set(150,350,350),u.castShadow=!0,u.shadow.camera.left=-400,u.shadow.camera.right=400,u.shadow.camera.top=400,u.shadow.camera.bottom=-400,u.shadow.camera.near=1,u.shadow.camera.far=1e3,u.shadow.mapSize.width=2048,u.shadow.mapSize.height=2048,d=new THREE.AmbientLight(14452852,.5),n.add(d),n.add(h),n.add(u),(p=new g.default).mesh.scale.set(.25,.25,.25),p.mesh.position.y=w.default.v.planeDefaultHeight,n.add(p.mesh),(c=new y.default).mesh.position.y=-w.default.v.seaRadius,n.add(c.mesh),(f=new M.default).mesh.position.y=-w.default.v.seaRadius,n.add(f.mesh),m=new R.default,n.add(m.mesh),b=p,x=m,E=new S.default(20,b,x),n.add(E.mesh),P=p,C=m,z=d,v=new H.default(P,C,z),n.add(v.mesh),document.addEventListener("mousemove",G),document.addEventListener("mouseup",A),U()},24:function(e,t,a){"use strict";a.r(t);var n={ennemiesPool:[],particlesPool:[],deltaTime:0};n.newTime=Date.now(),n.oldTime=Date.now(),n.reset=function(){n.v={speed:0,initSpeed:35e-5,baseSpeed:35e-5,targetBaseSpeed:35e-5,incrementSpeedByTime:25e-7,incrementSpeedByLevel:5e-6,distanceForSpeedUpdate:100,speedLastUpdate:0,distance:0,ratioSpeedDistance:50,energy:100,ratioSpeedEnergy:3,level:1,levelLastUpdate:0,distanceForLevelUpdate:1e3,planeDefaultHeight:100,planeAmpHeight:80,planeAmpWidth:75,planeMoveSensivity:.005,planeRotXSensivity:8e-4,planeRotZSensivity:4e-4,planeFallSpeed:.001,planeMinSpeed:1.2,planeMaxSpeed:1.6,planeSpeed:0,planeCollisionDisplacementX:0,planeCollisionSpeedX:0,planeCollisionDisplacementY:0,planeCollisionSpeedY:0,seaRadius:600,seaLength:800,wavesMinAmp:5,wavesMaxAmp:20,wavesMinSpeed:.001,wavesMaxSpeed:.003,cameraFarPos:500,cameraNearPos:150,cameraSensivity:.002,coinDistanceTolerance:15,coinValue:3,coinsSpeed:.5,coinLastSpawn:0,distanceForCoinsSpawn:100,ennemyDistanceTolerance:10,ennemyValue:10,ennemiesSpeed:.6,ennemyLastSpawn:0,distanceForEnnemiesSpawn:50,status:"playing"}},n.addEnergy=function(){n.v.energy+=n.v.coinValue,n.v.energy=Math.min(n.v.energy,100),console.log("addEnergy",n.v.energy)},n.removeEnergy=function(){n.v.energy-=n.v.ennemyValue,n.v.energy=Math.max(0,n.v.energy),console.log("removeEnergy",n.v.energy)},t.default=n},25:function(e,t,a){"use strict";a.r(t);var o=a(24),l=a(26);function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function s(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s);var e=new THREE.CylinderGeometry(o.default.v.seaRadius,o.default.v.seaRadius,o.default.v.seaLength,40,10);e.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI/2)),e.mergeVertices();var t=e.vertices.length;this.waves=[];for(var a=0;a<t;a++){var n=e.vertices[a];this.waves.push({y:n.y,x:n.x,z:n.z,ang:Math.random()*Math.PI*2,amp:o.default.v.wavesMinAmp+Math.random()*(o.default.v.wavesMaxAmp-o.default.v.wavesMinAmp),speed:o.default.v.wavesMinSpeed+Math.random()*(o.default.v.wavesMaxSpeed-o.default.v.wavesMinSpeed)})}var i=new THREE.MeshPhongMaterial({color:l.default.blue,transparent:!0,opacity:.8,shading:THREE.FlatShading});this.mesh=new THREE.Mesh(e,i),this.mesh.name="waves",this.mesh.receiveShadow=!0}var e,t,a;return e=s,(t=[{key:"moveWaves",value:function(){for(var e=this.mesh.geometry.vertices,t=e.length,a=0;a<t;a++){var n=e[a],i=this.waves[a];n.x=i.x+Math.cos(i.ang)*i.amp,n.y=i.y+Math.sin(i.ang)*i.amp,i.ang+=i.speed}this.mesh.geometry.verticesNeedUpdate=!0}}])&&n(e.prototype,t),a&&n(e,a),s}();t.default=i},26:function(e,t,a){"use strict";a.r(t);t.default={red:15881030,white:14209233,brown:5845806,pink:16095342,brownDark:2300175,blue:6865856}},27:function(e,t,a){"use strict";a.r(t);var l=a(24),r=a(28);function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function o(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.mesh=new THREE.Object3D,this.nClouds=20,this.clouds=[];for(var e=2*Math.PI/this.nClouds,t=0;t<this.nClouds;t++){var a=new r.default,n=e*t,i=l.default.v.seaRadius+150+200*Math.random(),s=1+2*Math.random();a.mesh.position.y=Math.sin(n)*i,a.mesh.position.x=Math.cos(n)*i,a.mesh.position.z=-300-500*Math.random(),a.mesh.rotation.z=n+Math.PI/2,a.mesh.scale.set(s,s,s),this.mesh.add(a.mesh),this.clouds.push(a)}}var e,t,a;return e=o,(t=[{key:"moveClouds",value:function(){for(var e=0;e<this.nClouds;e++){this.clouds[e].rotate()}this.mesh.rotation.z+=l.default.v.speed*l.default.deltaTime}}])&&n(e.prototype,t),a&&n(e,a),o}();t.default=i},28:function(e,t,a){"use strict";a.r(t);var l=a(26);function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function o(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.mesh=new THREE.Object3D,this.mesh.name="cloud";for(var e=new THREE.BoxGeometry(20,20,20),t=new THREE.MeshPhongMaterial({color:l.default.white}),a=3+Math.floor(3*Math.random()),n=0;n<a;n++){var i=new THREE.Mesh(e,t),s=.1+.9*Math.random();i.position.x=15*n,i.position.y=10*Math.random(),i.position.z=10*Math.random(),i.rotation.z=Math.random()*Math.PI*2,i.rotation.y=Math.random()*Math.PI*2,i.scale.set(s,s,s),i.castShadow=!0,i.receiveSadow=!0,this.mesh.add(i)}}var e,t,a;return e=o,(t=[{key:"rotate",value:function(){for(var e=this.mesh.children.length,t=0;t<e;t++){var a=this.mesh.children[t];a.rotation.z+=.005*Math.random()*(t+1),a.rotation.y+=.002*Math.random()*(t+1)}}}])&&n(e.prototype,t),a&&n(e,a),o}();t.default=i},29:function(e,t,a){"use strict";a.r(t);var j=a(26),O=a(30);t.default=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.mesh=new THREE.Object3D,this.mesh.name="airPlane";var t=new THREE.BoxGeometry(80,50,50,1,1,1),a=new THREE.MeshPhongMaterial({color:j.default.red,shading:THREE.FlatShading});t.vertices[4].y-=10,t.vertices[4].z+=20,t.vertices[5].y-=10,t.vertices[5].z-=20,t.vertices[6].y+=30,t.vertices[6].z+=20,t.vertices[7].y+=30,t.vertices[7].z-=20;var n=new THREE.Mesh(t,a);n.castShadow=!0,n.receiveShadow=!0,this.mesh.add(n);var i=new THREE.BoxGeometry(20,50,50,1,1,1),s=new THREE.MeshPhongMaterial({color:j.default.white,shading:THREE.FlatShading}),o=new THREE.Mesh(i,s);o.position.x=50,o.castShadow=!0,o.receiveShadow=!0,this.mesh.add(o);var l=new THREE.BoxGeometry(15,20,5,1,1,1),r=new THREE.MeshPhongMaterial({color:j.default.red,shading:THREE.FlatShading}),d=new THREE.Mesh(l,r);d.position.set(-40,20,0),d.castShadow=!0,d.receiveShadow=!0,this.mesh.add(d);var h=new THREE.BoxGeometry(30,5,120,1,1,1),u=new THREE.MeshPhongMaterial({color:j.default.red,shading:THREE.FlatShading}),c=new THREE.Mesh(h,u);c.position.set(0,15,0),c.castShadow=!0,c.receiveShadow=!0,this.mesh.add(c);var f=new THREE.BoxGeometry(3,15,20,1,1,1),p=new THREE.MeshPhongMaterial({color:j.default.white,transparent:!0,opacity:.3,shading:THREE.FlatShading}),m=new THREE.Mesh(f,p);m.position.set(5,27,0),m.castShadow=!0,m.receiveShadow=!0,this.mesh.add(m);var v=new THREE.BoxGeometry(20,10,10,1,1,1);v.vertices[4].y-=5,v.vertices[4].z+=5,v.vertices[5].y-=5,v.vertices[5].z-=5,v.vertices[6].y+=5,v.vertices[6].z+=5,v.vertices[7].y+=5,v.vertices[7].z-=5;var E=new THREE.MeshPhongMaterial({color:j.default.brown,shading:THREE.FlatShading});this.propeller=new THREE.Mesh(v,E),this.propeller.castShadow=!0,this.propeller.receiveShadow=!0;var w=new THREE.BoxGeometry(1,80,10,1,1,1),y=new THREE.MeshPhongMaterial({color:j.default.brownDark,shading:THREE.FlatShading}),M=new THREE.Mesh(w,y);M.position.set(8,0,0),M.castShadow=!0,M.receiveShadow=!0;var g=M.clone();g.rotation.x=Math.PI/2,g.castShadow=!0,g.receiveShadow=!0,this.propeller.add(M),this.propeller.add(g),this.propeller.position.set(60,0,0),this.mesh.add(this.propeller);var T=new THREE.BoxGeometry(30,15,10,1,1,1),H=new THREE.MeshPhongMaterial({color:j.default.red,shading:THREE.FlatShading}),R=new THREE.Mesh(T,H);R.position.set(25,-20,25),this.mesh.add(R);var S=new THREE.BoxGeometry(24,24,4),b=new THREE.MeshPhongMaterial({color:j.default.brownDark,shading:THREE.FlatShading}),x=new THREE.Mesh(S,b);x.position.set(25,-28,25);var P=new THREE.BoxGeometry(10,10,6),C=new THREE.MeshPhongMaterial({color:j.default.brown,shading:THREE.FlatShading}),z=new THREE.Mesh(P,C);x.add(z),this.mesh.add(x);var D=R.clone();D.position.z=-R.position.z,this.mesh.add(D);var B=x.clone();B.position.z=-x.position.z,this.mesh.add(B);var I=x.clone();I.scale.set(.5,.5,.5),I.position.set(-35,-5,0),this.mesh.add(I);var L=new THREE.BoxGeometry(4,20,4);L.applyMatrix((new THREE.Matrix4).makeTranslation(0,10,0));var F=new THREE.MeshPhongMaterial({color:j.default.red,shading:THREE.FlatShading}),k=new THREE.Mesh(L,F);k.position.set(-35,-5,0),k.rotation.z=-.3,this.mesh.add(k),this.pilot=new O.default,this.pilot.mesh.position.set(-10,27,0),this.mesh.add(this.pilot.mesh),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0}},30:function(e,t,a){"use strict";a.r(t);var n=a(24),C=a(26);function i(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var s=function(){function P(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,P),this.mesh=new THREE.Object3D,this.mesh.name="pilot",this.angleHairs=0;var e=new THREE.BoxGeometry(15,15,15),t=new THREE.MeshPhongMaterial({color:C.default.brown,shading:THREE.FlatShading}),a=new THREE.Mesh(e,t);a.position.set(2,-12,0),this.mesh.add(a);var n=new THREE.BoxGeometry(10,10,10),i=new THREE.MeshLambertMaterial({color:C.default.pink}),s=new THREE.Mesh(n,i);this.mesh.add(s);var o=new THREE.BoxGeometry(4,4,4),l=new THREE.MeshLambertMaterial({color:C.default.brown}),r=new THREE.Mesh(o,l);r.geometry.applyMatrix((new THREE.Matrix4).makeTranslation(0,2,0));var d=new THREE.Object3D;this.hairsTop=new THREE.Object3D;for(var h=0;h<12;h++){var u=r.clone(),c=h%3,f=Math.floor(h/3);u.position.set(4*f-4,0,4*c-4),this.hairsTop.add(u)}d.add(this.hairsTop);var p=new THREE.BoxGeometry(12,4,2);p.applyMatrix((new THREE.Matrix4).makeTranslation(-6,0,0));var m=new THREE.Mesh(p,l),v=m.clone();m.position.set(8,-2,6),v.position.set(8,-2,-6),d.add(m),d.add(v);var E=new THREE.BoxGeometry(2,8,10),w=new THREE.Mesh(E,l);w.position.set(-1,-4,0),d.add(w),d.position.set(-5,5,0),this.mesh.add(d);var y=new THREE.BoxGeometry(5,5,5),M=new THREE.MeshLambertMaterial({color:C.default.brown}),g=new THREE.Mesh(y,M);g.position.set(6,0,3);var T=g.clone();T.position.z=-g.position.z;var H=new THREE.BoxGeometry(11,1,11),R=new THREE.Mesh(H,M);this.mesh.add(g),this.mesh.add(T),this.mesh.add(R);var S=new THREE.BoxGeometry(2,3,2),b=new THREE.Mesh(S,i);b.position.set(0,0,-6);var x=b.clone();x.position.set(0,0,6),this.mesh.add(b),this.mesh.add(x)}var e,t,a;return e=P,(t=[{key:"updateHairs",value:function(){for(var e=this.hairsTop.children,t=e.length,a=0;a<t;a++){e[a].scale.y=.75+.25*Math.cos(this.angleHairs+a/3)}this.angleHairs+=n.default.v.speed*n.default.deltaTime*40}}])&&i(e.prototype,t),a&&i(e,a),P}();t.default=s},31:function(e,t,a){"use strict";function n(e,t,a,n,i){return n+(Math.max(Math.min(e,a),t)-t)/(a-t)*(i-n)}a.r(t),a.d(t,"normalize",function(){return n})},32:function(e,t,a){"use strict";a.r(t);var s=a(24),o=a(26);function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function e(){l(this,e);var t=new THREE.TetrahedronBufferGeometry(8,2),a=new THREE.MeshPhongMaterial({color:o.default.red,shininess:0,specular:16777215,shading:THREE.FlatShading});this.mesh=new THREE.Mesh(t,a),this.mesh.castShadow=!0,this.angle=0,this.dist=0},i=function(){function i(e,t,a){l(this,i),this.airplane=e,this.particles=t,this.ambientLight=a,this.mesh=new THREE.Object3D,this.ennemiesInUse=[];for(var n=0;n<10;n++)s.default.ennemiesPool.push(new r)}var e,t,a;return e=i,(t=[{key:"spawnEnnemies",value:function(){for(var e=s.default.v.level,t=0;t<e;t++){var a=void 0;(a=s.default.ennemiesPool.length?s.default.ennemiesPool.pop():new r).angle=-.1*t,a.distance=s.default.v.seaRadius+s.default.v.planeDefaultHeight+(2*Math.random()-1)*(s.default.v.planeAmpHeight-20),a.mesh.position.y=-s.default.v.seaRadius+Math.sin(a.angle)*a.distance,a.mesh.position.x=Math.cos(a.angle)*a.distance,this.mesh.add(a.mesh),this.ennemiesInUse.push(a)}}},{key:"rotateEnnemies",value:function(){for(var e=0;e<this.ennemiesInUse.length;e++){var t=this.ennemiesInUse[e];t.angle+=s.default.v.speed*s.default.deltaTime*s.default.v.ennemiesSpeed,t.angle>2*Math.PI&&(t.angle-=2*Math.PI),t.mesh.position.y=-s.default.v.seaRadius+Math.sin(t.angle)*t.distance,t.mesh.position.x=Math.cos(t.angle)*t.distance,t.mesh.rotation.z+=.1*Math.random(),t.mesh.rotation.y+=.1*Math.random();var a=this.airplane.mesh.position.clone().sub(t.mesh.position.clone()),n=a.length();n<s.default.v.ennemyDistanceTolerance?(this.particles.spawnParticles(t.mesh.position.clone(),15,o.default.red,3),s.default.ennemiesPool.unshift(this.ennemiesInUse.splice(e,1)[0]),this.mesh.remove(t.mesh),s.default.v.planeCollisionSpeedX=100*a.x/n,s.default.v.planeCollisionSpeedY=100*a.y/n,this.ambientLight.intensity=2,s.default.removeEnergy(),e--):t.angle>Math.PI&&(s.default.ennemiesPool.unshift(this.ennemiesInUse.splice(e,1)[0]),this.mesh.remove(t.mesh),e--)}}}])&&n(e.prototype,t),a&&n(e,a),i}();t.default=i},33:function(e,t,a){"use strict";a.r(t);var r=a(24);a(26);function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t,a){return t&&i(e.prototype,t),a&&i(e,a),e}var l=function(){function a(){n(this,a);var e=new THREE.TetrahedronGeometry(3,0),t=new THREE.MeshPhongMaterial({color:39321,shininess:0,specular:16777215,shading:THREE.FlatShading});this.mesh=new THREE.Mesh(e,t)}return s(a,[{key:"explode",value:function(e,t,a){var n=this,i=this.mesh.parent;this.mesh.material.color=new THREE.Color(t),this.mesh.material.needsUpdate=!0,this.mesh.scale.set(a,a,a);var s=e.x+50*(2*Math.random()-1),o=e.y+50*(2*Math.random()-1),l=.6+.2*Math.random();TweenMax.to(this.mesh.rotation,l,{x:12*Math.random(),y:12*Math.random()}),TweenMax.to(this.mesh.scale,l,{x:.1,y:.1,z:.1}),TweenMax.to(this.mesh.position,l,{x:s,y:o,delay:.1*Math.random(),onComplete:function(){i&&(i.remove(n.mesh),n.mesh.scale.set(1,1,1),r.default.particlesPool.unshift(n))}})}}]),a}(),o=function(){function a(){n(this,a),this.mesh=new THREE.Object3D;for(var e=0;e<10;e++){var t=new l;r.default.particlesPool.push(t)}}return s(a,[{key:"spawnParticles",value:function(e,t,a,n){for(var i=t,s=0;s<i;s++){var o=void 0;o=r.default.particlesPool.length?r.default.particlesPool.pop():new l,this.mesh.add(o.mesh),o.mesh.visible=!0,o.mesh.position.x=e.x,o.mesh.position.y=e.y,o.explode(e,a,n)}}}]),a}();t.default=o},34:function(e,t,a){"use strict";a.r(t);var o=a(24);a(26);function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function e(){l(this,e);var t=new THREE.TetrahedronGeometry(5,0),a=new THREE.MeshPhongMaterial({color:39321,shininess:0,specular:16777215,shading:THREE.FlatShading});this.mesh=new THREE.Mesh(t,a),this.mesh.castShadow=!0,this.angle=0,this.dist=0},i=function(){function s(e,t,a){l(this,s),this.airplane=t,this.particles=a,this.mesh=new THREE.Object3D,this.coinsInUse=[],this.coinsPool=[];for(var n=0;n<e;n++){var i=new r;this.coinsPool.push(i)}}var e,t,a;return e=s,(t=[{key:"spawnCoins",value:function(){for(var e=1+Math.floor(10*Math.random()),t=o.default.v.seaRadius+o.default.v.planeDefaultHeight+-1*Math.random()*2*(o.default.v.planeAmpHeight-20),a=10+Math.round(10*Math.random()),n=0;n<e;n++){var i=void 0;i=this.coinsPool.length?this.coinsPool.pop():new r,this.mesh.add(i.mesh),this.coinsInUse.push(i),i.angle=-.02*n,i.distance=t+Math.cos(.5*n)*a,i.mesh.position.y=-o.default.v.seaRadius+Math.sin(i.angle)*i.distance,i.mesh.position.x=Math.cos(i.angle)*i.distance}}},{key:"rotateCoins",value:function(){for(var e=0;e<this.coinsInUse.length;e++){var t=this.coinsInUse[e];t.angle+=o.default.v.speed*o.default.deltaTime*o.default.v.coinsSpeed,t.angle>2*Math.PI&&(t.angle-=2*Math.PI),t.mesh.position.y=-o.default.v.seaRadius+Math.sin(t.angle)*t.distance,t.mesh.position.x=Math.cos(t.angle)*t.distance,t.mesh.rotation.z+=.1*Math.random(),t.mesh.rotation.y+=.1*Math.random(),this.airplane.mesh.position.clone().sub(t.mesh.position.clone()).length()<o.default.v.coinDistanceTolerance?(this.coinsPool.unshift(this.coinsInUse.splice(e,1)[0]),this.mesh.remove(t.mesh),this.particles.spawnParticles(t.mesh.position.clone(),5,39321,.8),o.default.addEnergy(),e--):t.angle>Math.PI&&(this.coinsPool.unshift(this.coinsInUse.splice(e,1)[0]),this.mesh.remove(t.mesh),e--)}}}])&&n(e.prototype,t),a&&n(e,a),s}();t.default=i}});