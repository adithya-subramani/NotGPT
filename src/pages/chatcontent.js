import { React,useState } from 'react'
import $ from "jquery"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import "./dark-hljs.css";
import hljs from "highlight.js";
import robo from './../assets/robo.png'
import usr from './../assets/usr.png'


const Chatcontent = () => {
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState(message);
    const handleChange = (event) => {
        setMessage(event.target.value);
    };
    
    const handleClick = () => {
        setUpdated(message);
        messagesArr.messages.push({content:message,sender:"user-msg"})
        $("#all_msg").append(`<div id="msg" class="user-msg"><img id="msg_prof" src=${usr} alt='IMG '/>${message}</div>`)
        console.log(messagesArr)
        $("#usr_msg").prop("disabled",true)
        axios.get( `http://localhost:10000/model/getmsg/${message}`)
        .then((res) => {
            $("#usr_msg").prop("disabled",false)
            console.log(res.data)
            var reply = res.data.message
            // Search query
            if(reply.startsWith("Are you looking for this?: ")){
                var first_part = reply.substring(0,27);
                console.log(first_part)
                var link = reply.substring(27,reply.length)
                console.log(link)
                $("#all_msg").append(`<div id="msg" class='bot-msg'><img id="msg_prof" src=${robo} alt='IMG '/>${first_part}<a href=${link}>${link}</a><br>
                <iframe src=${link} width="100%" height="400px" style="border:1px solid black;">
                </div>`)
            }else if(reply.startsWith("This is what I can come up with:")){ // code
                var first_part = reply.substring(0,32);
                console.log(first_part)
                var code = reply.substring(32,reply.length)
                console.log(code)
                $("#all_msg").append(`<div id="msg" class='bot-msg'><img id="msg_prof" src=${robo} alt='IMG '/>${first_part}<br>
                <div id="code-snippet"><pre><code class="language-java line-numbers">${code}</code></pre></div>
                </div>`)
                document.querySelectorAll("pre code").forEach((el) => {
                    hljs.highlightElement(el);
                });
            }else{
                $("#all_msg").append(`<div id="msg" class='bot-msg'><img id="msg_prof" src=${robo} alt='IMG '/>${reply}</div>`)
            }
        }).catch((error) => {
            console.log(error)
        });
        setMessage('')
    };

    var messagesArr = {messages:[]}

    
    return (
        <div id="chat_con">
            <div id="all_msg">
            {
                messagesArr.messages.map((msg,index) => {
                    return <div id="msg" className={msg.sender}><img id="msg_prof" src={(msg.sender=='bot-msg')?robo:usr} alt='IMG '/>{msg.content}</div>
                })
            }
            </div>
            <div id="msg_req">
                <textarea id="usr_msg"         
                onChange={handleChange}
                value={message}>
                </textarea>
                <button id="send_msg" onClick={handleClick}>
                <FontAwesomeIcon icon={faShare} />
                </button>
                <p id="joke-txt"><u>NotGPT Jan 9 Version.</u> Our goal is to make AI systems more natural and safe to interact with. 
                Your feedback will help us improve.</p>
            </div>
        </div>
    );
  }
  
  
  export default Chatcontent;