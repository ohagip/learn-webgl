!function(l){function e(e){for(var n,o,t=e[0],i=e[1],r=e[2],a=0,u=[];a<t.length;a++)o=t[a],c[o]&&u.push(c[o][0]),c[o]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(l[n]=i[n]);for(g&&g(e);u.length;)u.shift()();return v.push.apply(v,r||[]),s()}function s(){for(var e,n=0;n<v.length;n++){for(var o=v[n],t=!0,i=1;i<o.length;i++){var r=o[i];0!==c[r]&&(t=!1)}t&&(v.splice(n--,1),e=a(a.s=o[0]))}return e}var o={},c={6:0},v=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return l[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=l,a.c=o,a.d=function(e,n,o){a.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(n,e){if(1&e&&(n=a(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)a.d(o,t,function(e){return n[e]}.bind(null,t));return o},a.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="";var n=window.webpackJsonp=window.webpackJsonp||[],t=n.push.bind(n);n.push=e,n=n.slice();for(var i=0;i<n.length;i++)e(n[i]);var g=t;v.push([22,5]),s()}({22:function(e,n,o){e.exports=o(23)},23:function(e,n,o){"use strict";o.r(n);var z=o(19),t=o(24),E=o.n(t),i=o(25),w=o.n(i);!function(){var e=new dat.GUI,n={},o={step:0,duration:2.8,noiseX:8,noiseY:8,noiseZ:1,edgeWidth:.04,animation:!0};n.step=e.add(o,"step",0,1,.001).onChange(function(e){d.uniforms.uStep.value=e}),e.add(o,"duration",.5,10),e.add(o,"noiseX",0,100).onChange(function(e){d.uniforms.uNoiseX.value=e}),e.add(o,"noiseY",0,100).onChange(function(e){d.uniforms.uNoiseY.value=e}),e.add(o,"noiseZ",0,100).onChange(function(e){d.uniforms.uNoiseZ.value=e}),e.add(o,"edgeWidth",0,.1).onChange(function(e){d.uniforms.uEdgeWidth.value=e}),e.add(o,"animation").onChange(function(e){!0===e?P():function(){if(null!==h)return h.pause();null!==m&&m.pause()}()});var i=z.default.imagesPath+"common/sample/",t=[{fileName:"1.jpg",val:void 0},{fileName:"2.jpg",val:void 0},{fileName:"3.jpg",val:void 0}],r=[],a=new THREE.TextureLoader,u=new THREE.Vector2(2048,1536);t.forEach(function(t){r.push(new Promise(function(n,o){a.load(i+t.fileName,function(e){t.val=e,n()},void 0,function(e){o(e)})}))});var l=0,s=t.length-1;var c=new THREE.Scene,v=new THREE.OrthographicCamera(-1,1,1,-1,0,-1),g=new THREE.WebGLRenderer({canvas:document.querySelector("#canvas"),antialias:!0}),f=new THREE.PlaneGeometry(2,2,1,1),d=new THREE.ShaderMaterial({uniforms:{uResolution:{type:"v2",value:new THREE.Vector2},uTexResolution:{type:"v2",value:u},uTexturePrev:{type:"t",value:void 0},uTextureNext:{type:"t",value:void 0},uStep:{type:"f",value:o.step},uNoiseX:{type:"f",value:o.noiseX},uNoiseY:{type:"f",value:o.noiseY},uNoiseZ:{type:"f",value:o.noiseZ},uEdgeWidth:{type:"f",value:o.edgeWidth}},vertexShader:E.a,fragmentShader:w.a}),x=new THREE.Mesh(f,d);function p(){requestAnimationFrame(p),g.render(c,v)}function y(){var e=window.innerWidth,n=window.innerHeight;g.setPixelRatio(window.devicePixelRatio),g.setSize(e,n),d.uniforms.uResolution.value.x=e,d.uniforms.uResolution.value.y=n}c.add(x);var m=null,h=null;function P(){null===h?null===m?m=TweenMax.to(o,o.duration,{step:1,onUpdate:function(){n.step.setValue(o.step)},ease:Power0.easeNone,onComplete:function(){h=TweenMax.delayedCall(1,function(){h=m=null,o.step=0,n.step.setValue(o.step),function(){s<(l+=1)&&(l=0);var e=l+1;s<e&&(e=0),d.uniforms.uTexturePrev.value=t[l].val,d.uniforms.uTextureNext.value=t[e].val}(),P()})}}):m.play():h.play()}window.addEventListener("resize",y),y(),Promise.all(r).then(function(){d.uniforms.uTexturePrev.value=t[0].val,d.uniforms.uTextureNext.value=t[1].val,p(),!0===o.animation&&P()},function(e){console.log(e)})}()},24:function(e,n){e.exports="#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 1.0);\n}"},25:function(e,n){e.exports='#define GLSLIFY 1\n//#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)\n//#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)\n//#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)\n//#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n//#pragma glslify: cnoise4 = require(glsl-noise/classic/4d)\n//#pragma glslify: pnoise2 = require(glsl-noise/periodic/2d)\n//#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d)\n//#pragma glslify: pnoise4 = require(glsl-noise/periodic/4d)\n\nuniform vec2 uResolution;\nuniform vec2 uTexResolution;\nuniform sampler2D uTexturePrev;\nuniform sampler2D uTextureNext;\nuniform float uStep;\nuniform float uNoiseX;\nuniform float uNoiseY;\nuniform float uNoiseZ;\nuniform float uEdgeWidth;\n\nvarying vec2 vUv;\n\n// vec2 rotate(vec2 v, float a) {\n//  float s = sin(a);\n//  float c = cos(a);\n//  mat2 m = mat2(c, -s, s, c);\n//  return m * v;\n// }\n\nvoid main() {\n  // 画像の縦横比を補正してbackground-size:coverの挙動にする\n  vec2 ratio = vec2(\n    min((uResolution.x / uResolution.y) / (uTexResolution.x / uTexResolution.y), 1.0),\n    min((uResolution.y / uResolution.x) / (uTexResolution.y / uTexResolution.x), 1.0)\n  );\n\n  vec2 uv = vec2(\n    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n  );\n\n  vec4 colorPrev = texture2D(uTexturePrev, uv);\n  vec4 colorNext = texture2D(uTextureNext, uv);\n\n  // ノイズをもとにアルファカットオフののりでテクスチャ切り替え\n  vec4 colorFinal = vec4(1.0);\n  float noise = (cnoise(vec3(vUv.x * uNoiseX, vUv.y * uNoiseY, uNoiseZ)) + 1.0) / 2.0; // noise -1〜1 => 0〜1\n  noise = noise * (1.0 - uEdgeWidth) + (uEdgeWidth * 0.5); // エッジの幅を考慮して調整 (uEdgeWidth/2)〜(1-uEdgeWidth/2)\n\n  colorPrev = colorPrev * smoothstep(uStep - (uEdgeWidth / 1.0), uStep - (uEdgeWidth / 2.0), noise);\n  colorNext = colorNext * smoothstep((1.0 - uStep) - (uEdgeWidth / 1.0), (1.0 - uStep) - (uEdgeWidth / 2.0), 1.0 - noise);\n\n//  vec4 colorEdgeStart = vec4(0, 0.5, 1, 1.0);\n//  vec4 colorEdgeEnd = vec4(0.4, 0.8, 1, 1.0);\n//  vec4 colorEdge = vec4(0.0);\n//  float edgeDist = abs((uStep - (uEdgeWidth / 2.0)) - noise);\n//  if (edgeDist < (uEdgeWidth / 4.0)) {\n//    float edgeStep = edgeDist / (uEdgeWidth / 2.0);\n//    colorEdge =  mix(colorEdgeEnd, colorEdgeStart, edgeStep);\n//  }\n\n  colorFinal = colorPrev + colorNext;\n\n  gl_FragColor = colorFinal;\n}'}});