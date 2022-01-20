import React from 'react';
import Head from 'next/head'
import Link from 'next/link';

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

import Header from '../components/header/Header';

const sendEmail = () => {    
  window.open("mailto:darkrut22@gmail.com?subject=Contact");
};
class Home extends React.Component<{},{}> { 
  
  componentDidMount(){

    let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
    let container:any, controls: OrbitControls;
    let group = new Array();
    let winWidth: number, winHeight: number;

    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    init();
    animate();

    function init(){
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2('#222', 0.001);

      camera = new THREE.PerspectiveCamera(40, winWidth/winHeight, 1, 2000);
      camera.position.z = 500;
      
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
      renderer.setSize(winWidth, winHeight);
      renderer.setClearColor('#222', 0);
      controls = new OrbitControls( camera, renderer.domElement );
      controls.maxDistance = 300;
      controls.minDistance = 10;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.update();
      
      container = document.getElementById('contact-canvas-container')
      container.appendChild( renderer.domElement )
      window.addEventListener( 'resize', onWindowResize );

      const ambientLight = new THREE.AmbientLight( 0xaaaaaa);
			scene.add( ambientLight );

			const light1 = new THREE.PointLight( 0x8888aa, 1, 0 );
			light1.position.set( -500, 1000, 1000 );
			scene.add( light1 );

			const light2 = new THREE.PointLight( 0x8888aa, 1, 0 );
			light2.position.set( 500, 1000, 1000 );
			scene.add( light2 );

			// const light3 = new THREE.PointLight( 0xffffff, 1, 0 );
			// light3.position.set( - 100, - 200, - 100 );
			// scene.add( light3 );

      const cubegeometry = new THREE.BoxGeometry(1000, 1000, 1000);     
      
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
        const cube = new THREE.Mesh(cubegeometry, materials);
        scene.add(cube);
      };     
      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        // progressBarElem.style.transform = `scaleX(${progress})`;
        console.log(progress)
      };

      const geometry = new THREE.SphereGeometry( 1, 32, 16 );
      const material = new THREE.MeshStandardMaterial( { color: 0xffffff, metalness:0.5, roughness:0, emissive:0x333399 } );
      
      for ( let i = 0; i < 2000; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 1000 );
        const y = THREE.MathUtils.randFloatSpread( 1000 );
        const z = THREE.MathUtils.randFloatSpread( 1000 );
        
        const sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(x,y,z);
        
        group.push(sphere);
        scene.add(group[i])        
      }
    }
    
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate(){
      requestAnimationFrame(animate);
      // パーティクル上下移動
      var i = 2000;
      while(i--){        
        if(group[i].position.y < -500){
          group[i].position.y = 500;  
        }
        if(group[i].position.x>500) group[i].position.x = -500;  
        if(group[i].position.x<-500) group[i].position.x = 500; 
        if(group[i].position.z>500) group[i].position.z = -500;  
        if(group[i].position.z<-500) group[i].position.z = 500;  

        var p = new THREE.Vector3();
        p = group[i].position;
        group[i].position.y = p.y - 0.2;
        group[i].position.x = p.x + Math.pow(-1,i) * 0.02;
        group[i].position.z = p.z + Math.pow(-1,i) * 0.02;
      }      
      controls.update();
      render();
    }

    function render(){
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
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
        <main className='flex items-center justify-center w-[100vw] h-[100vh] absolute top-0 left-0'>          
          <div className='text-white text-base md:text-36 font-medium p-6'>
            <div className='pb-20 text-xl md:text-45 text-center'>Contact Info</div>
            <div className='hidden md:block w-full h-8'></div>
            <Link href={'#'}>
              <a className='hover:text-amber-500' onClick={()=>sendEmail()}>
                <div className='py-6'>Mail : darkrut22@gmail.com</div>                
              </a>
            </Link>
            <Link href={'https://join.skype.com/invite/xZi9LkzgQzuG'}>
              <a target={'_blank'} className='hover:text-amber-500'>
                <div className='py-6'>Skype : live:.cid.d5b65e4998f1a2b3</div>                
              </a>
            </Link>
            <Link href={'https://github.com/perfectdev000'}>
              <a target={'_blank'} className='hover:text-amber-500'>
                <div className='py-6'>Github : https://github.com/perfectdev000</div>                
              </a>
            </Link>
            <Link href={'https://discord.gg/YgNKvera'}>
              <a target={'_blank'} className='hover:text-amber-500'>
                <div className='py-6'>Discord : https://discord.gg/YgNKvera</div>                
              </a>
            </Link>
          </div>
        </main>
        <div id='contact-canvas-container' className='absolute w-[100vw] h-[100vh] top-0 left-0' style={{zIndex:'-100'}}></div>        
        <Header/>
      </>
    );
  }
}

export default Home;