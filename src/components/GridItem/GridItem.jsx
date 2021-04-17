import React from "react";
import style from "./GridItem.module.css"

export default function GridItem({icon, display, displayValue}) {

    React.useEffect(()=>console.log(displayValue))


    return (
        <div className={style.mainDiv} onClick={() => display(displayValue)}>
            <img src={icon}/>
        </div>
    );
}