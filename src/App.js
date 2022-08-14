import "./App.css";
import React from "react";
import HomeScreen from "./views/HomeScreen.js";
import SendEmail from "./views/SendEmail.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

function App() {
  // const commands = [
  //   {
  //     command: "reset",
  //     callback: ({ resetTranscript }) => {
  //       return resetTranscript();
  //     },
  //   },
  //   {
  //     command: "clear",
  //     callback: ({ resetTranscript }) => resetTranscript(),
  //   },
  //   {
  //     command: "open *",
  //     callback: (site) => {
  //       return window.open("http//" + site);
  //     },
  //   },
  //   {
  //     command: "increase text size",
  //     callback: () => {
  //       return (document.getElementById("textContent").style.fontSize = "22px");
  //     },
  //   },
  //   {
  //     command: "decrease text size",
  //     callback: () => {
  //       return (document.getElementById("textContent").style.fontSize = "16px");
  //     },
  //   },
  //   {
  //     command: "change text colour to *",
  //     callback: (color) => {
  //       return (document.getElementById("textContent").style.color = color);
  //     },
  //   },
  // ];

  // SpeechRecognition.startListening({ continuous: true }); //language: "en-US"
  // const {
  //   listening,
  //   resetTranscript,
  //   transcript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition({ commands });

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  // return (
  //   <div className="Container">
  //     <header className="header">
  //       <h2>Voice Assistant - speech recognition</h2>
  //     </header>
  //     <main className="content">
  //       <p className="text" id="textContent">
  //         {transcript}
  //       </p>
  //       <p>voice command avalaible : </p>
  //       <p>
  //         <span>Clear</span> : to clear the board
  //       </p>
  //       <p>
  //         <span>Open "url address"</span> : for instance to visit the google
  //         page, say "open google.com"
  //       </p>
  //       <p>
  //         <span>Reset</span> : to reset microphone
  //       </p>
  //       {/* <p className="microStatus">Microphone : {listening ? "ON" : "OFF"}</p>
  //       <div>
  //         <button
  //           onClick={SpeechRecognition.startListening}
  //         >
  //           Start
  //         </button>
  //         <button onClick={SpeechRecognition.stopListening}>Stop</button>
  //         <button onClick={resetTranscript}>Reset</button>
  //       </div> */}
  //     </main>
  //   </div>
  // );
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/email" element={<SendEmail/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
