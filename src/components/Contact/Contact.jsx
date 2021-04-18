import React from 'react';

import style from './Contact.module.css'

export default function Contact() {
    return (
        <div className={style.mainDiv}>
            <h1>&bull; Contact Me &bull;</h1>
                <form action="#" method="post" id="contact_form">
                    <div className={style.nameDiv}>
                        <label for="fNameInput">Your Name</label>
                        <input type="text" placeholder="First name" className={style.fName} id="fNameInput" required/>
                        <input type="text" placeholder="Last name" className={style.sName} id="sNameInput" required/>
                    </div>
                    <div className={style.emailDiv}>
                        <label for="emailInput">Email Address</label>
                        <input type="email" placeholder="Eg. example@email.com" className={style.email} id="emailInput" required/>
                    </div>
                    <div className={style.phoneDiv}>
                        <label for="phoneInput">Email Address</label>
                        <input type="email" placeholder="Eg. +41 12 345 67 89" className={style.phone} id="phoneInput"/>
                    </div>
                    <div className={style.messageDiv}>
                        <label for="messageInput">Message</label>
                        <textarea placeholder="Please enter your comments..." className={style.message} id="messageInput" required/>
                    </div>
                    <div className={style.buttonDiv}>
                        <button ClassName={style.button} id="button">Submit</button>
                    </div>

                </form>
        </div>
    )
}