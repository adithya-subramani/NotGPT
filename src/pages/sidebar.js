import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut,faMessage, faSun,faPlus,faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    var show = true
    var text = "Light mode"
    var chatArr = {
    chats:[
        {name:"Chat 1"},
        {name:"Chat 2"}
    ]}
    return (
        <div id="side_nav"> 
            {/* {show && (<h2 className='side_head'><img className="side_robo" src={robo} alt='IMG '/>  NotGPT
            <button id="cls_side" onClick={show=false}><FontAwesomeIcon icon={faClose}/></button></h2>)
            } */}
            <button id="new_chat"> <FontAwesomeIcon icon={faPlus} /> New chat </button>
            {
                chatArr.chats.map((chat,index) => {
                    return <div className='chatCard'><FontAwesomeIcon icon={faMessage} />{   chat.name}<br/></div>
                })
            }
            <div id="side_bottom">
                <div>______________________________</div><br/>
                <a id="btn" href=''><FontAwesomeIcon icon={faTrashAlt} /> Clear conversations</a><br/>
                <a id="btn" href=''><FontAwesomeIcon icon={faSun} /> {text}</a><br/>
                <a id="btn" href=''><FontAwesomeIcon icon={faMessage} /> Update & FAQ</a><br/>
                <a id="btn" href=''><FontAwesomeIcon icon={faSignOut} /> Log out</a><br/>
            </div>
        </div>
    );
  }
  
  
  export default Sidebar;