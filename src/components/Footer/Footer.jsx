import React from 'react';

import style from './Footer.module.css'

export default function Footer() {
    return (
        <div className={style.mainDiv}>
           <ul className={style.footerList}>
               <li className={style.footerItem}>
                   <a className={style.links} href={'https://www.linkedin.com/in/alain-michienzi-980a39210'} target="_blank" rel="noopener noreferrer">LinkedIn</a>
               </li >
               <li className={style.footerItem}>
                   <a className={style.links} href={'https://www.github.com/AlainMi95'} target="_blank" rel="noopener noreferrer">GitHub</a>
               </li>
               <li className={style.footerItem}>
                   <a className={style.links} href={'https://www.twitter.com/Alain_Mi'} target="_blank" rel="noopener noreferrer">Twitter</a>
               </li>
           </ul>
        </div>
    )
}