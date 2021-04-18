import React from 'react';

import style from './Header.module.css'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className={style.mainDiv}>
            <Link className={style.amLink} to='/'>&lt;AM/&gt;</Link>
        </div>
    )
}