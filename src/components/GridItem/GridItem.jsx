import React from "react";
import style from "./GridItem.module.css"
import { Link } from 'react-router-dom';

export default function GridItem({icon, link, img}) {
    return (
        <Link className={style.mainDiv} to={link}>
           <img className={style.backgroundImg} src={img}/>
           <img className={style.iconImg} src={icon}/>
        </Link>
    );
}