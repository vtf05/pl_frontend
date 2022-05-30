import React from "react";
import Lottie from "react-lottie";

export default function LottieAnimation(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}
