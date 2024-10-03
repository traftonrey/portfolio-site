import React, { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import Parallax from 'parallax-js';
import './CSS/App.css';
import myPortrait from './assets/my-portrait.jpg'; // Replace with your portrait image
import splashBg from './assets/splash-bg.jpg'; // Replace with your background image
import Projects from './Projects';
import Experience from './Experience';

function App() {
  const parallaxRef = useRef(null);
  const [parallaxDepth, setParallaxDepth] = useState(0.2); // Normal depth for the background

  // Initialize parallax.js when the component mounts
  useEffect(() => {
    const parallaxInstance = new Parallax(parallaxRef.current, {
      relativeInput: true,
    });

    return () => {
      parallaxInstance.destroy(); // Cleanup on unmount
    };
  }, []);

  const handleMouseEnter = () => {
    setParallaxDepth(0.025); // Reduce parallax effect when hovering over portrait
  };

  const handleMouseLeave = () => {
    setParallaxDepth(0.2); // Restore normal parallax depth
  };

  return (
    <div className="site-container">
      <div className="splash-container">
        {/* Parallax container for the background */}
        <div className="parallax-container" ref={parallaxRef}>
          <div className="parallax-background" data-depth={parallaxDepth.toString()}>
            <img src={splashBg} alt="Splash Background" className="background-image" loading="lazy" />
          </div>
        </div>
        <div className="splash-content">
          <Tilt
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            scale={1.05}
            className="tilt-portrait"
            onEnter={handleMouseEnter}
            onLeave={handleMouseLeave}
          >
            <div className="portrait-container">
              <img src={myPortrait} alt="Portrait of me" className="portrait" loading="lazy" />
            </div>
          </Tilt>
          <h1>Welcome to My Portfolio</h1>
          <p>Trafton Reynolds | Software & Data Engineer</p>
          <button onClick={() => window.location.href = '#projects'}>View My Projects</button>
        </div>
      </div>
      {/* Render Experience Component */}
      <Experience />

      {/* Render Projects Component */}
      <Projects />

    </div>
  );
}

export default App;
