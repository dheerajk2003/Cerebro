import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import VANTA from 'vanta/dist/vanta.birds.min';

export default function Homing() {
  const [vantaEffect, setVantaEffect] = useState(null);


  const vantaRef = useRef(null);

  useEffect(() => {
    const loadVanta = async () => {
      if (!vantaEffect) {
        const VANTA = await import('vanta/dist/vanta.globe.min');
        VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff3f3f,
          backgroundColor: 0x1b143c
        });
        setVantaEffect(VANTA);
      }
    };

    loadVanta();

    // return () => {
    //   if (vantaEffect) vantaEffect.destroy();
    // };
  }, [vantaEffect]);

  return <div ref={vantaRef} style={{ width: '100%', height: '100vh' }} >
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left', paddingLeft: '10%' }}>
        <h1 className='text-white text-4xl font-bold text-5xl m-2'>Welcome to Cerebro</h1>
        <p className='text-white text-lgv m-2'>Your foreground content goes here</p>
        <Link className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 shadow-lg w-40 m-2" to="/registration">
            Get Started
        </Link>
        {/* Add more components, text, or other elements as needed */}
      </div>
  </div>;

};




