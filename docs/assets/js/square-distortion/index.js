!function(s){function e(e){for(var n,r,o=e[0],t=e[1],u=e[2],i=0,v=[];i<o.length;i++)r=o[i],c[r]&&v.push(c[r][0]),c[r]=0;for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(s[n]=t[n]);for(l&&l(e);v.length;)v.shift()();return x.push.apply(x,u||[]),a()}function a(){for(var e,n=0;n<x.length;n++){for(var r=x[n],o=!0,t=1;t<r.length;t++){var u=r[t];0!==c[u]&&(o=!1)}o&&(x.splice(n--,1),e=i(i.s=r[0]))}return e}var r={},c={7:0},x=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return s[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=s,i.c=r,i.d=function(e,n,r){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)i.d(r,o,function(e){return n[e]}.bind(null,o));return r},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var n=window.webpackJsonp=window.webpackJsonp||[],o=n.push.bind(n);n.push=e,n=n.slice();for(var t=0;t<n.length;t++)e(n[t]);var l=o;x.push([35,6]),a()}({35:function(e,n,r){e.exports=r(36)},36:function(e,n,r){"use strict";r.r(n);var d=r(32),o=r(37),m=r.n(o),t=r(38),T=r.n(t);!function(){var r={isPlay:!1,index:0,progress:0,duration:1.7,squareSize:2,distFactor:.03},o=new Tweakpane;o.addInput(r,"progress",{min:0,max:1}).on("change",function(e){x.uniforms.uProgress.value=e}),o.addInput(r,"duration",{step:.1,min:0,max:10}),o.addInput(r,"squareSize",{step:1,min:1,max:50}).on("change",function(e){x.uniforms.uSquareSize.value=e}),o.addInput(r,"distFactor",{step:.01,min:0,max:.2}).on("change",function(e){x.uniforms.uDispFactor.value=e}),o.addButton({title:"start"}).on("click",function(){if(!0===r.isPlay)return;r.isPlay=!0;var e=r.index,n=e+1<t.length?e+1:0;x.uniforms.uTexturePrev.value=t[e].tex,x.uniforms.uTextureNext.value=t[n].tex,r.progress=0,x.uniforms.uProgress.value=0,x.uniforms.uOffset.value=Math.floor(100*Math.random()),TweenMax.to(r,r.duration,{progress:1,onUpdate:function(){o.refresh()},ease:Power3.easeOut,onComplete:function(){r.isPlay=!1,r.index=n}})});var e=d.default.imagesPath+"common/sample/",t=[{fileName:"1.jpg",tex:void 0},{fileName:"2.jpg",tex:void 0},{fileName:"3.jpg",tex:void 0}],n=[],u=new THREE.TextureLoader,i=new THREE.Vector2(2048,1536);t.forEach(function(o){n.push(new Promise(function(n,r){u.load(e+o.fileName,function(e){o.tex=e,n()},void 0,function(e){r(e)})}))});var v=new THREE.Scene,s=new THREE.OrthographicCamera(-1,1,1,-1,0,-1),a=new THREE.WebGLRenderer({canvas:document.querySelector("#canvas"),antialias:!0}),c=new THREE.PlaneGeometry(2,2,1,1),x=new THREE.ShaderMaterial({uniforms:{uResolution:{type:"v2",value:new THREE.Vector2},uTexResolution:{type:"v2",value:i},uTexturePrev:{type:"t",value:void 0},uTextureNext:{type:"t",value:void 0},uProgress:{type:"f",value:r.progress},uSquareSize:{type:"f",value:r.squareSize},uDispFactor:{type:"f",value:r.distFactor},uOffset:{type:"f",value:r.offset}},vertexShader:m.a,fragmentShader:T.a}),l=new THREE.Mesh(c,x);function p(){requestAnimationFrame(p),a.render(v,s)}function f(){var e=window.innerWidth,n=window.innerHeight;a.setPixelRatio(window.devicePixelRatio),a.setSize(e,n),x.uniforms.uResolution.value.x=e,x.uniforms.uResolution.value.y=n}v.add(l),window.addEventListener("resize",f),f(),Promise.all(n).then(function(){x.uniforms.uTexturePrev.value=t[0].tex,x.uniforms.uTextureNext.value=t[1].tex,p()},function(e){console.log(e)})}()},37:function(e,n){e.exports="#define GLSLIFY 1\nuniform vec2 uResolution;\nuniform vec2 uTexResolution;\nuniform sampler2D uTexturePrev;\nuniform sampler2D uTextureNext;\n\nvarying vec2 vUv;\nvarying vec2 vTexUv; // テクスチャ用\n\nvoid main() {\n  // 画像の縦横比を補正してbackground-size:coverの挙動にする\n  vec2 ratio = vec2(\n  min((uResolution.x / uResolution.y) / (uTexResolution.x / uTexResolution.y), 1.0),\n  min((uResolution.y / uResolution.x) / (uTexResolution.y / uTexResolution.x), 1.0)\n  );\n\n  vec2 _vTexUv = vec2(\n  uv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n  uv.y * ratio.y + (1.0 - ratio.y) * 0.5\n  );\n\n  vUv = uv;\n  vTexUv = _vTexUv;\n  gl_Position = vec4(position, 1.0);\n}\n"},38:function(e,n){e.exports="#define GLSLIFY 1\nfloat random(vec2 p) {\n  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nuniform vec2 uResolution;\nuniform vec2 uTexResolution;\nuniform sampler2D uTexturePrev;\nuniform sampler2D uTextureNext;\nuniform float uProgress;\nuniform float uSquareSize;\nuniform float uDispFactor;\nuniform float uOffset;\n\nvarying vec2 vUv;\nvarying vec2 vTexUv;\n\nvoid main() {\n  vec4 color = vec4(1.0);\n\n  // aquare UV\n  vec2 squareNum = vec2(\n  uResolution.x / uSquareSize,\n  uResolution.y / uSquareSize\n  );\n  vec2 squareUv = vUv * squareNum;\n  vec2 intPos = floor(squareUv);\n  float disp = random(intPos * vec2(uOffset)); // 歪ます量\n  float disp2 = random(intPos * vec2(uOffset + uOffset + uOffset)); // 歪ます向き\n\n  // distotion\n  vec2 prevUv = vec2(1.0);\n  vec2 nextUv = vec2(1.0);\n\n  // ← to →\n  //  prevUv = vec2(vTexUv.x - uProgress * (disp * uDispFactor), vTexUv.y);\n  //  nextUv = vec2(vTexUv.x + (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);\n\n  // → to ←\n  //  prevUv = vec2(vTexUv.x + uProgress * (disp * uDispFactor), vTexUv.y);\n  //  nextUv = vec2(vTexUv.x - (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);\n\n  // ↓ to ↑\n  //  prevUv = vec2(vTexUv.x, vTexUv.y - uProgress * (disp * uDispFactor));\n  //  nextUv = vec2(vTexUv.x, vTexUv.y + (1.0 - uProgress) * (disp * uDispFactor));\n\n  // ↑ to ↓\n  //  nextUv = vec2(vTexUv.x, vTexUv.y - (1.0 - uProgress) * (disp * uDispFactor));\n  //  prevUv = vec2(vTexUv.x, vTexUv.y + uProgress * (disp * uDispFactor));\n\n  if (disp2 < 0.05) {\n    // ↓ to ↑\n    prevUv = vec2(vTexUv.x, vTexUv.y - uProgress * (disp * uDispFactor));\n    nextUv = vec2(vTexUv.x, vTexUv.y + (1.0 - uProgress) * (disp * uDispFactor));\n  } else if (disp2 < 0.1) {\n    // ← to →\n    prevUv = vec2(vTexUv.x - uProgress * (disp * uDispFactor), vTexUv.y);\n    nextUv = vec2(vTexUv.x + (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);\n  } else if (disp2 < 0.65) {\n    // → to ←\n    prevUv = vec2(vTexUv.x + uProgress * (disp * uDispFactor), vTexUv.y);\n    nextUv = vec2(vTexUv.x - (1.0 - uProgress) * (disp * uDispFactor), vTexUv.y);\n  } else {\n    // ↑ to ↓\n    nextUv = vec2(vTexUv.x, vTexUv.y - (1.0 - uProgress) * (disp * uDispFactor));\n    prevUv = vec2(vTexUv.x, vTexUv.y + uProgress * (disp * uDispFactor));\n  }\n\n  vec4 prevColor = texture2D(uTexturePrev, prevUv);\n  vec4 nextColor = texture2D(uTextureNext, nextUv);\n  color = mix(prevColor, nextColor, uProgress);\n\n//  color = disp2;\n  gl_FragColor = color;\n}\n"}});