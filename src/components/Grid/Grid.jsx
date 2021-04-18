import React from "react";
import style from "./Grid.module.css"
import GridItem from "../GridItem/GridItem";
import ItemView from "../ItemView/ItemView";

export default function Grid({children}) {

    const [display, setDisplay] = React.useState(null);

    if(display===null){
        return (
        <div className={style.mainDiv}>
            <GridItem icon="/assets/images/home-solid.svg" display={setDisplay} displayValue={GridToDisplay.home} img="/assets/images/code.jpg"/>
            <GridItem icon="/assets/images/user-solid.svg" display={setDisplay} displayValue={GridToDisplay.about} img="/assets/images/guitar.jpg"/>
            <GridItem icon="/assets/images/phone-solid.svg" display={setDisplay} displayValue={GridToDisplay.contact} img="/assets/images/contact.jpg"/>
            <GridItem icon="/assets/images/code-solid.svg" display={setDisplay} displayValue={GridToDisplay.code} img="/assets/images/code.jpg"/>
        </div>
        );
    }else {
        switch (display) {
            case GridToDisplay.home:
                return <ItemView> home </ItemView>  //für jede seite einen component machen
            case GridToDisplay.about:
                return <ItemView> about </ItemView>
            case GridToDisplay.contact:
                return <ItemView> contact </ItemView>
            case GridToDisplay.code:
                return <ItemView> code </ItemView>
        }
    }
}

const GridToDisplay = {home: 1, about: 2, contact: 3, code: 4}