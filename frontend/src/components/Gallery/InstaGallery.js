import React, { useEffect } from "react";

const InstaGallery = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>Instagram Gallery</h2>

      {/* Instagram Embedded Post */}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/jampacked_band/?utm_source=ig_embed&amp;utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0px 7px 12px 0px",
          margin: "1px",
          maxWidth: "840px",
          minWidth: "326px",
          padding: "0",
          width: "99.375%",
        }}
      >
   
      </blockquote>

      {/* SnapWidget */}
      {/* <iframe
        src="https://snapwidget.com/embed/1082780"
        className="snapwidget-widget border-2 border-green-500 p-4"
        allowTransparency="true"
        frameBorder="0"
        scrolling="no"
        style={{
          // border: "none",
          overflow: "hidden",
          width: "100%",
          height: "500px",
        }}
        title="Posts from Instagram"
      ></iframe> */}
    </div>
  );
};

export default InstaGallery;
