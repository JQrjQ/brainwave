import React, { useEffect } from 'react';

function KickOffFormEmbed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://b.kickoffpages.com/2.2.0/kol.js";
    script.id = "koljs";
    script.async = true;
    script.setAttribute('data-campaign-id', '180875');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div data-kol-snippet="embedpage" data-kolPageId="385131" className="kol-embed-page-frame default"></div>
  );
}

export default KickOffFormEmbed;
