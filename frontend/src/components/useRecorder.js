import { useState, useEffect } from "react";
import { startRecording, saveRecording } from "../handlers/recorder-controls";

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

const moveBox = () => {
  gsap.to('.box-up', { duration: 1.5, ease: "elastic.out(1, 0.4)", y: -200 });
}

export default function useRecorder() {
  const [recorderState, setRecorderState] = useState(initialState);
  const [timer, setTimer] = useState(0)

  // const recordController = () => {
  //   console.log(timer+1)
  //   if(timer >= 5){
  //     console.log('tripaloski')
  //     saveRecording(svSate)
  //     startRecording(srState)
  //   }
  //   console.log('trihard')
  //   setTimer(prevTime => prevTime + 1)
  // }

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mpeg" });
        chunks = [];

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: blob,
            };
          else return initialState;
        });
      };
    }

    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  useEffect(() => {
    if(timer !== 0) {
      const recordController = setTimeout(() => {
        if(timer >= 5){
          const recorder = recorderState.mediaRecorder;
          recorder.stop();
          startRecording(setRecorderState);
          setTimer(1);
        } else {
          setTimer(timer + 1);
        }
      }, 1000);
      return () => {
        clearTimeout(recordController);
      };
    }
  }, [timer]);

  return {
    recorderState,
    startRecording: () => {
      startRecording(setRecorderState)
      document.getElementById('result').textContent = '';
      setTimer(1)
      moveBox()
      // testint = setInterval(recordController, 1000);
    },
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => {
      saveRecording(recorderState.mediaRecorder)
      setTimer(0)
    },
  };

  
}