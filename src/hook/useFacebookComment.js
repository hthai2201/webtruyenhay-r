import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const useFacebookComment = () => {
  const location = useLocation();
  useEffect(() => {
    const script = document.createElement('script');
    const fbRoot = document.createElement('script');
    fbRoot.id = 'fb-root';

    script.src =
      'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v8.0&appId=934306173660965&autoLogAppEvents=1';
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    script.nonce = 'wWIqmLzc';

    document.body.prepend(fbRoot);
    document.body.prepend(script);

    return () => {
      document.body.removeChild(fbRoot);
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [location]);
  return null;
};

export default useFacebookComment;
