import React from 'react';
import Head from 'next/head'
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import Image from 'next/image'
// import Link from 'next/link';
import Script from 'next/script';

import Header from '../components/header/Header';
// import Footer from '../components/footer/Footer';

type Props = {  
}

type ContactState = {
}

class Home extends React.Component<Props, ContactState> { 
  // constructor(props:Props) {
  //   super(props)
  // }
  // state: ContactState = {};  
  
  componentDidMount(){        
    let container:any, clock:any = new THREE.Clock();    
    let camera:any, scene:any, renderer:any, controls:any;
    let particles_model: THREE.Points<THREE.BufferGeometry, any>;
    let mixer: THREE.AnimationMixer;

    init();
    animate();
    
    function particles() {
      var geometry, i, j, material:any, numParticles, orbitSizes, orbitSpeeds, particles, posIndex, positions, pulseSpeeds, ref, sprite1, textureLoader;
      textureLoader = new THREE.TextureLoader();
      sprite1 = textureLoader.load("assets/models/particle1.jpg");
      numParticles = 1000;
      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(numParticles * 3);
      pulseSpeeds = new Float32Array(numParticles);
      orbitSizes = new Float32Array(numParticles);
      orbitSpeeds = new Float32Array(numParticles);
      for (i = j = 0, ref = numParticles; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        posIndex = i * 3;
        positions[posIndex] = Math.random() * 200 - 100;
        positions[posIndex + 1] = Math.random() * 200 - 100;
        positions[posIndex + 2] = Math.random() * 200 - 100;
        pulseSpeeds[i] = 1 + (Math.random() * 2);
        orbitSizes[i] = 1 + (Math.random() * 2);
        orbitSpeeds[i] = -2 + (Math.random() * 4);
      }
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.addAttribute('pulseSpeed', new THREE.BufferAttribute(pulseSpeeds, 1));
      geometry.addAttribute('orbitSize', new THREE.BufferAttribute(orbitSizes, 1));
      geometry.addAttribute('orbitSpeed', new THREE.BufferAttribute(orbitSpeeds, 1));
      material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone({
          map: { type: "t", value: null },
          offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
          time: { type: "f", value: 0 }, 
          color: { type: "c", value: new THREE.Color(0xdddddd) },
          size: { type: "f", value: .9 },
          scale: { type: "f", value: 500 }
        }),
        vertexShader: "uniform float time; uniform float size; uniform float scale; attribute float pulseSpeed; attribute float orbitSpeed; attribute float orbitSize; void main() { vec3 animatedPosition = position; animatedPosition.x += sin(time * orbitSpeed) * orbitSize; animatedPosition.y += cos(time * orbitSpeed) * orbitSize; animatedPosition.z += cos(time * orbitSpeed) * orbitSize; vec3 transformed = vec3( animatedPosition ); vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 ); gl_Position =  projectionMatrix * mvPosition; float animatedSize = size * ( scale / - mvPosition.z ); animatedSize *= 1.0 + sin(time * pulseSpeed); gl_PointSize = animatedSize; }",
        fragmentShader: "uniform sampler2D map; uniform vec4 offsetRepeat; uniform vec3 color; void main() { gl_FragColor = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy ); gl_FragColor.rgb *= color.rgb; }",
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      material.uniforms.map.value = sprite1;
      material.uniforms.size.value = 0.4;
      particles_model = new THREE.Points(geometry, material);
      scene.add(particles_model);
      scene.children.pop();
      scene.children.unshift(particles_model);
    };
    async function init() {
      //=========== scene, camera, renderer ===========
      container = document.getElementById( 'canvas-container' );
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 5000 ); 
      camera.position.y=2
      camera.position.z=100
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setClearColor(0x000000);
      renderer.setSize( window.innerWidth, window.innerHeight );
      controls = new OrbitControls( camera, renderer.domElement );
      controls.maxDistance = 200;
      controls.minDistance = 10;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;
      controls.update();
      container.appendChild( renderer.domElement );
      window.addEventListener( 'resize', onWindowResize );
      //=========== lights ===========
      // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
      // scene.add( ambientLight );     
      const light = new THREE.DirectionalLight( 0xaabbff, 0.4 );
      light.position.x = 0;
      light.position.y = 150;
      light.position.z = 0;
      scene.add( light );

      const geometry = new THREE.BoxGeometry(1000, 1000, 1000);     
      
      const loadManager = new THREE.LoadingManager();
      const loader = new THREE.TextureLoader(loadManager);

      const materials = [
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/px.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/nx.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/py.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/ny.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/pz.jpg')}),
        new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: loader.load('assets/img/landing-page/nz.jpg')}),
      ];
      loadManager.onLoad = () => {
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
      };     
      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        // progressBarElem.style.transform = `scaleX(${progress})`;
        console.log(progress)
      };

      particles();

    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {      
			controls.update();      
      requestAnimationFrame( animate );
      render();      
    }

    function render() {
      const delta = clock.getDelta();
      particles_model.material.uniforms.time.value += delta;
      if ( mixer ) mixer.update( delta );
      renderer.render( scene, camera );
    }
  }


  render(){
    return (
      <>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Script>          
        </Script>
        
        <main className=''>        
          <Header />
          <iframe src='/assets/pages/text-animation/index.html' className='absolute w-[50%] h-[80%] top-[15%] left-[5%]'/>
          {/* <Footer/> */}
        </main>
        <div id='canvas-container' className='absolute w-full h-full top-0 left-0' style={{zIndex:'-100'}}></div>
        
      </>
    );
  }
}

export default Home;