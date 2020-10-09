import React from "react";

export default () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url(/icons/404.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "contain",
        backgroundColor: "antiquewhite",
      }}
    >
      <strong style={{ fontSize: "24px", textAlign: "center" }}>
        404 This Page is Lost in the Wind
      </strong>
    </div>
  );
};
