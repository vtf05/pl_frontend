import { Slide } from "react-slideshow-image";

import slideImages from "../../assets/image";

import "react-slideshow-image/dist/styles.css";
import styles from "./slider.css";

export default function Slider() {
  return (
    
      <Slide easing="ease" sx={{borderRadius:"20px"}}>
        {slideImages.map((slide, index) => {
          return (
            <div className={styles.slide} key={slide}>
              <div style={{ backgroundImage: `url(${slideImages[index]})` , height:"250px"}}>
               
              </div>
              <div>.....</div>
            </div>

          );
        })}
      </Slide>

  );
}
