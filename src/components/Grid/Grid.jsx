import React from "react";
import style from "./Grid.module.css"
import GridItem from "../GridItem/GridItem";
import ItemView from "../ItemView/ItemView";

export default function Grid({children}) {
    return (
    <div className={style.mainDiv}>
        <GridItem icon="/assets/images/user-solid.svg" link={'/about'} img="/assets/images/guitar.jpg"/>
        <GridItem icon="/assets/images/code-solid.svg" link={'/code'} img="/assets/images/code.jpg"/>
        <GridItem icon="/assets/images/phone-solid.svg" link={'/contact'} img="/assets/images/contact.jpg"/>
        <GridItem icon="/assets/images/pencil-alt-solid.svg" link={''} img="/assets/images/blog.jpg"/>
    </div>
    );
}