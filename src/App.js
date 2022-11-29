import React, { useState, useLayoutEffect } from 'react'
import { toggleTheme } from './helpers';

import axios from 'axios';

import './App.css';

const App = () => {
  const [primaryClr, setPrimaryClr] = useState(null);
  const [secondaryClr, setSecondaryClr] = useState(null);
  const [bgClr, setBgClr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    toggleTheme(primaryClr, secondaryClr, bgClr);
  };

  const getTheme = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('https://theme-switcher-server.vercel.app/2');
      
      if (res.data) {
        toggleTheme(res.data?.['--primaryClr'], res.data?.['--secondaryClr'], res.data?.['--primaryBg']);
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    getTheme();
  }, []);

  if (isLoading) {
    return (
      <div class="mainContainer">
      <div class="loaderContainer">
          <div class="loaderInner"></div>
      </div>
    </div>
    );
  }

  return (
    <div style={{height:'100vh', width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'center', paddingTop: '50px', backgroundColor: 'whitesmoke'}}>

    <div className='outermost-container'>
      <div className='header'>
        Payment powered by Groww
      </div>

      <div className='main'>
        <label className='input'>
          Primary Color

          <input value={primaryClr ?? ''} onChange={(e) => setPrimaryClr(e.target.value)} />
        </label>

        <label className='input'>
          Secondary Color
          <input value={secondaryClr ?? ''} onChange={(e) => setSecondaryClr(e.target.value)} />

        </label>

        <label className='input'>
          Background Color
          <input value={bgClr ?? ''} onChange={(e) => setBgClr(e.target.value)} />

        </label>

        <div className='button' onClick={onClick}>Change Theme</div>
      </div>

    </div>
    </div>
  )
}

export default App