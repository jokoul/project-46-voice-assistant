import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function HomeScreen({ message, onChangeMessage }) {
  const navigate = useNavigate();
  const textEl = useRef("");
  function removeLastWorld(str) {
    const lastIndexOfSpace = str.lastIndexOf(" ");
    if (lastIndexOfSpace === -1) {
      return str;
    }
    return str.substring(0, lastIndexOfSpace);
  }
  const commands = [
    {
      command: "reset",
      callback: ({ resetTranscript }) => {
        return resetTranscript();
      },
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "open *",
      callback: (site) => {
        return window.open("http//" + site);
      },
    },
    {
      command: "increase text size",
      callback: () => {
        return (document.getElementById("textContent").style.fontSize = "22px");
      },
    },
    {
      command: "decrease text size",
      callback: () => {
        return (document.getElementById("textContent").style.fontSize = "16px");
      },
    },
    {
      command: "change text colour to *",
      callback: (color) => {
        return (document.getElementById("textContent").style.color = color);
      },
    },
    {
      command: "email",
      callback: () => {
        message = textEl.current.innerText;
        message = removeLastWorld(message);
        console.log(message);
        onChangeMessage(message);
        return navigate("/email");
      },
    },
  ];

  SpeechRecognition.startListening({ continuous: true }); //language: "en-US"
  const {
    listening,
    resetTranscript,
    transcript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="Container">
      <header className="header">
        <h2>Voice Assistant - speech recognition</h2>
      </header>
      <main className="content">
        <p className="text" id="textContent" ref={textEl}>
          {transcript}
        </p>
        <p>voice command avalaible : </p>
        <p>
          <span>Clear</span> : to clear the board
        </p>
        <p>
          <span>Open "url address"</span> : for instance to visit the google
          page, say "open google.com"
        </p>
        <p>
          <span>Reset</span> : to reset microphone
        </p>
        <p>
          <span>email</span> : to send message by email
        </p>
        {/* <p className="microStatus">Microphone : {listening ? "ON" : "OFF"}</p>
        <div>
          <button
            onClick={SpeechRecognition.startListening}
          >
            Start
          </button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        </div> */}
      </main>
    </div>
  );
}

export default HomeScreen;
