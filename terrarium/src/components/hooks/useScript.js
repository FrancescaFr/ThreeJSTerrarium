import React from 'react';
import ReactDOM from 'react-dom/client';

import { useEffect } from 'react';

// custom hook 

const useScript = (url, load, location = 'body') => {
  useEffect(() => {
    if (load === true) {
      const script = document.createElement("script");
      script.src = url;
      script.id = url;
      script.async = false;
      script.defer = false;
      if (location === 'body') {
        document.body.appendChild(script);
      } else if (location === 'head') {
        document.head.appendChild(script);
      }
      console.log("Loaded Script");
    } else if (load === false) {
      const script = document.getElementById(url);
      script.parentNode.removeChild(script);
      console.log("Unloaded Script")
    }
  }, [url, load, location])
};

export default useScript;