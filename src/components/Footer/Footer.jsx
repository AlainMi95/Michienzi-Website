import React from 'react';

import style from './Footer.module.css'

export default function Footer() {
    return (
        <div className={style.mainDiv}>
           <ul className={style.footerList}>
               <li className={style.footerItem}>
                   <a className={style.links} href={''}>LinkedIn</a>
               </li >
               <li className={style.footerItem}>
                   <a className={style.links} href={''}>Twitter</a>
               </li>
               <li className={style.footerItem}>
                   <a className={style.links} href={''}>Instagram</a>
               </li>
           </ul>
        </div>
    )
}