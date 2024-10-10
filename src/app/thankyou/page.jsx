'use client'
import { useState, useEffect } from "react";
import "./page.css";


export default function ThankYou({ formData }) {
    return (<div class="container" >
        <h1>Thank You!</h1>
        <p >Your submission has been received to our Dashboard.</p>
        <p>The email has been sent sucessfully.Ask customer to check the inbox and get the valuable feedback </p>
        <P>Made with ❤️ by Liva Kitchens And Interiors</P>
        <marquee>If you are facing any problems in submission or email receveing,report the issue to 9778685012 </marquee>
    </div>)
}
