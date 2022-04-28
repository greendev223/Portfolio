import React from 'react';
import Head from 'next/head'
import * as THREE from "three";

import Header from '../components/header/Header';
import Developer from '../components/Developer';

class Home extends React.Component<{}, {}> {   
  componentDidMount(){
    
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let ribbon: any;
    let container: any;

    const init = () => {

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 10000 )
      camera.position.z = 2

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      container = document.getElementById('service-canvas-container')
      container.appendChild( renderer.domElement )

      ribbon = new THREE.Mesh(
        new THREE.PlaneGeometry( 5, 5, 128, 128 ),
        new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
          },
          vertexShader: `
            varying vec3 vEC;
            uniform float time;

            float iqhash(float n) {
              return fract(sin(n) * 43758.5453);
            }

            float noise(vec3 x) {
              vec3 p = floor(x);
              vec3 f = fract(x);
              f = f * f * (3.0 - 2.0 * f);
              float n = p.x + p.y * 157.0 + 113.0 * p.z;
              return mix(mix(mix(iqhash(n), iqhash(n + 1.0), f.x),
                        mix(iqhash(n + 57.0), iqhash(n + 58.0), f.x), f.y),
                        mix(mix(iqhash(n + 113.0), iqhash(n + 114.0), f.x),
                        mix(iqhash(n + 170.0), iqhash(n + 171.0), f.x), f.y), f.z);
            }

            float xmb_noise2(vec3 x) {
              return cos(x.z * 5.0) * cos(x.z + time / 10.0 + x.x);
            }

            void main() {
              vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              vec3 v = vec3(pos.x, 0.0, pos.y);
              vec3 v2 = v;
              vec3 v3 = v;
              
              v.y = xmb_noise2(v2) / 8.0;

              v3.x -= time / 5.0;
              v3.x /= 4.0;

              v3.z -= time / 10.0;
              v3.y -= time / 100.0;

              v.z -= noise(v3 * 7.0) / 15.0;
              v.y -= noise(v3 * 7.0) / 15.0 + cos(v.x * 2.0 - time / 2.0) / 5.0 - 0.3;

              vEC = v;
              gl_Position = vec4(v, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            varying vec3 vEC;

            void main()
            {
              const vec3 up = vec3(0.0, 0.0, 1.0);
              vec3 x = dFdx(vEC);
              vec3 y = dFdy(vEC);
              vec3 normal = normalize(cross(x, y));
              float c = 1.0 - dot(normal, up);
              c = (1.0 - cos(c * c)) / 3.0;
              gl_FragColor = vec4(1.0, 1.0, 1.0, c * 1.5);
            }
          `,
          extensions: {
            derivatives: true,
            fragDepth: false,
            drawBuffers: false,
            shaderTextureLOD: false
          },
          side: THREE.DoubleSide,
          transparent: true,
          depthTest: false,
        })
      )
      scene.add( ribbon )
      resize()
      window.addEventListener( 'resize', resize )
    }

    const resize = () => {
      const { offsetWidth, offsetHeight } = container
      renderer.setSize( offsetWidth, offsetHeight )
      renderer.setPixelRatio( devicePixelRatio )
      camera.aspect = offsetWidth / offsetHeight
      camera.updateProjectionMatrix()
      ribbon.scale.set( camera.aspect * 1.55, 0.75, 1 )
    }

    const animate = () => {
      ribbon.material.uniforms.time.value += 0.01
      renderer.render( scene, camera )
      requestAnimationFrame( () => animate() )
    }

    init()
    animate()
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
          <div className='w-full'>                        
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='hidden md:block '>
                <div className='w-full h-full md:pl-24 flex items-center justify-center'>              
                  <Developer/>
                </div>
              </div>
              <div className='w-full h-full flex items-center justify-center md:pr-24'>
                <div className='text-white text-sm md:text-lg font-medium'>
                  <div className='text-28 md:text-36 pt-4 pb-6 font-semibold text-center md:text-left'>Technical Support</div>
                  <div className='my-1'>- HTML, HTML5, CSS, SCSS</div>
                  <div className='my-1'>- JavaScript, TypeScript, JQuery</div>
                  <div className='my-1'>- Canvas, SVG, WebGL, Three.js, Chart.js, GSAP</div>
                  <div className='my-1'>- Tailwind CSS, Material-UI, Ant-Design</div>
                  <div className='my-1'>- React, Redux, Next.js, Vue.js, Nuxt.js</div>
                  <div className='my-1'>- ASP.NET, Node/Express, Python/Django/Flask</div>
                  <div className='my-1'>- BlockChain/Smart contract/C#.NET</div>
                  <div className='my-1'>- Web Scraping and Crawling, Automation</div>
                  <div className='my-1'>- Version Control : Github/GitLab/BitBucket</div>
                  <div className='my-1'>- QA testing</div>
                  <div className='mt-4 text-base md:text-22'>Hourly Rate: <b className='text-green-400 font-semibold'>$20~50</b> depending on difficulty</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div id='service-canvas-container'></div>
        <Header/>
      </>
    );
  }
}

export default Home;