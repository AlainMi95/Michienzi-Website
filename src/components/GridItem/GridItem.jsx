import React from "react";
import style from "./GridItem.module.css"

export default function GridItem({icon, display, displayValue, img}) {

    React.useEffect(()=>console.log(displayValue))


    return (
        <div className={style.mainDiv} onClick={() => display(displayValue)}>
           <img className={style.backgroundImg} src={img}/>
           <img className={style.iconImg} src={icon}/>
        </div>
    );
}