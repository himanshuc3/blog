import React, { useEffect } from 'react';

declare global {
  interface Window {
    smartlook: (action: string, key?: string) => void;
  }
}

const Smartlook: React.FC = () => {
  useEffect(() => {
    const projectKey = process.env.GATSBY_SMARTLOOK_PROJECT_KEY;

    if (!projectKey) {
      console.warn('Smartlook project key is not defined');
      return;
    }

    // Initialize Smartlook
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      window.smartlook||(function(d) {
        var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
        var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
        c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
      })(document);
      smartlook('init', '${projectKey}');
    `;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default Smartlook;
