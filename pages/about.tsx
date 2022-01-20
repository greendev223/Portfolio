import React from 'react';
import Head from 'next/head'
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// import Image from 'next/image'
// import Link from 'next/link';
// import Script from 'next/script';

import Header from '../components/header/Header';

type Props = {  
}

type ContactState = {
}

class About extends React.Component<Props, ContactState> { 
  // constructor(props:Props) {
  //   super(props)
  // }
  // state: ContactState = {};  
  
  componentDidMount(){
    let container:any;    
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
    // camera.position.set(0,30,30)
    let envMapURLs = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];
    // let envMapURLs = ['night-nature.jpg', 'night-nature.jpg', 'night-nature.jpg', 'night-nature.jpg', 'night-nature.jpg', 'night-nature.jpg'];    
    
    let reflectionCube = new THREE.CubeTextureLoader().
    setCrossOrigin('').
    setPath('assets/img/landing-page/').
    load(envMapURLs);
    reflectionCube.format = THREE.RGBFormat;
    reflectionCube.mapping = THREE.CubeRefractionMapping;

    let renderer = new THREE.WebGLRenderer({ antialias: true });
    let middle = new THREE.Vector3();

    renderer.setClearColor(0x000000);
    renderer.setSize(innerWidth, innerHeight);
    container = document.getElementById( 'about-canvas-container' );
    container.appendChild(renderer.domElement);
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update()
    scene.background = reflectionCube;

    let light = new THREE.PointLight(0x8888aa, 1, 0);
    light.position.set(100, 200, 200);
    scene.add(light)

    light = new THREE.PointLight(0x8888aa, 1, 0);
    light.position.set(100, 200, -200);
    scene.add(light);

    light = new THREE.PointLight(0x8888aa, 1, 0);
    light.position.set( -40, 50, 30);
    scene.add(light);

    let geometry = new THREE.BoxGeometry(5, 5, 0.04);
    let material = new THREE.MeshStandardMaterial({ color: 0x9999aa, roughness: 0.5, metalness: 0.3, envMap: reflectionCube });

    let cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];
    let cubeCount = 300;
    for (let i = 0; i < cubeCount; i++) {
      let cube = new THREE.Mesh(geometry, material);
      // let t = i / cubeCount * Math.PI * 2;
      // cube.t = t;
      cube.rotation.set(0, 0, i*0.003);
      scene.add(cube);
      cubes.push(cube);
    }

    function draw() {
      requestAnimationFrame(draw);
      let time = Date.now() * 0.005;
      cubes.forEach((cube, index) => {
        cube.rotation.z -= 0.007;
        cube.position.set(0, 0, -7 + index*0.04 );    
      });
      
      camera.position.set( -4, 0.5, 3);      
      camera.lookAt(middle);
      renderer.render(scene, camera);
    }

    draw();

    window.addEventListener('resize', () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }, false);
  }

  render(){
    return (
      <>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main className='flex items-center justify-center w-[100vw] h-[100vh] cursor-default absolute top-0 left-0 p-4'>
          <div className='text-white text-20 md:text-36 font-medium md:p-28'>
            &nbsp;&nbsp;I&apos;m Andrey from Russia and have 10+ years of hands-on experience.<br/>
            &nbsp;&nbsp;I got my Bachelor of Computer Science in 2011 and I&apos;ve been working as a professional software developer since 2012. During that time, I learned and experienced related technologies and improved myself and accumulated strong skills and a wealth of experience in my skill field.<br/>
            &nbsp;&nbsp;Have experience in Web and Mobiel UI from concept through deployment and worked on lots of small and large scale projects.<br/>
            &nbsp;&nbsp;I am honest and hardworking and always like new technology and challenge.<br/>
            &nbsp;&nbsp;I prefer to build trust and a long-term relationships.<br/>
          </div>
        </main>
        
        <div id='about-canvas-container' className='absolute w-full h-full top-0 left-0' style={{zIndex:'-100'}}></div>
        <Header />
      </>
    );
  }
}

export default About;