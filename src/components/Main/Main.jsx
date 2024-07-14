import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import Cards from "./Cards";
import { Context } from "../../context/Context";

const Main = () => {

  const {onSent,setPrevPrompts, recentPrompt, showResult,loading,resultData,setInput,input} = useContext(Context); 

  const cardLoad=async(prompt)=>{
    setPrevPrompts(prev=> [...prev,prompt]);
    await onSent(prompt);
  }

  const title = [
    "Suggest beautiful places to see on an upcoming road trip",
    "Briefly summarize this concept :urban planning",
    "Brainstorm team bonding activities for our work retreat",
    "Improve the readability of the following code",
  ];

  return (
    <div className="main">
      <div className="nav">
        <p style={{cursor:"pointer"}} onClick={()=>{location.reload()}}>Gemini</p>
        <img src={assets.user_icon} />
      </div>
      <div className="main-container">

        {!showResult 
        ? <>
        <div className="greet">
          <p>
            <span>Hi, There.</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <Cards cardLoad={cardLoad} title={title[0]} src={assets.compass_icon} />
          <Cards cardLoad={cardLoad} title={title[1]} src={assets.bulb_icon} />
          <Cards cardLoad={cardLoad} title={title[2]} src={assets.message_icon} />
          <Cards cardLoad={cardLoad} title={title[3]} src={assets.code_icon} />
        </div>
        </>
        : <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />

            {loading 
            ? <div className="loader">
                <hr></hr>
                <hr></hr>
                <hr></hr>
            </div>
            : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
          </div>
        </div> 
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="text" placeholder="Enter a prompt here"/>
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              {input!=="" 
              ? <img src={assets.send_icon} onClick={()=>{onSent()}} alt="send" />
              :  null
              }
            </div>
          </div>
          <p className="bottom-info" >
          Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
