import "./contact.css"
import Phone from "../../img/phone.png"
import Email from "../../img/email.png"
import Address from "../../img/address.png"
import { useContext, useRef, useState } from "react"
import emailjs from '@emailjs/browser';
import {ThemeContext} from "../../context"

const Contact = () => {

    const formRef = useRef();
    const [done,setDone] = useState(false);
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;


    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_mr2k9hj', 
            'template_736eukf', 
             formRef.current, 
             'user_v045Ox3SBEvg1zrklJFCp'
        ).then((result) => {
            setDone(true)
            console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });       
    };

    return (
       <div className="c">
           <div className="c-bg"></div>
           <div className="c-wrapper">
               <div className="c-left">
                   <h1 className="c-title">Let's discuss your project</h1>
                    <div className="c-info">
                        <div className="c-info-item">
                            <img src={Phone}  alt=""  className="c-icon"  />
                            + 972 123452123
                        </div>
                        <div className="c-info-item">
                            <img src={Email}  alt=""  className="c-icon"  />
                            test@test.com
                        </div>
                        <div className="c-info-item">
                            <img src={Address}  alt=""  className="c-icon"  />
                            my test street , test , test
                        </div>
                    </div>
               </div>
               <div className="c-right">
                    <p className="c-desc">
                        <b>What’s your story?</b> Get in touch. Always available for
                        freelancing if the right project comes along. me.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <input style={{backgroundColor: darkMode && "#333" , color: darkMode && "white"}} type="text" placeholder="Name" name="user_name"/>
                        <input style={{backgroundColor: darkMode && "#333" , color: darkMode && "white"}} type="text" placeholder="Subject" name="user_subject"/>
                        <input style={{backgroundColor: darkMode && "#333" , color: darkMode && "white"}} type="text" placeholder="Email" name="user_email"/>
                        <textarea style={{backgroundColor: darkMode && "#333" , color: darkMode && "white"}} name="message" placeholder="Message" rows="5"></textarea>
                        <button>Submit</button>
                        {done && <span>Thank you</span>}
                    </form>
               </div>
           </div>
       </div>
    )
}

export default Contact
