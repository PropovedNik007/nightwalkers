"use client";

import React, { useRef, useState } from "react";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const startButtonDisabled = mediaStream !== null;
  const stopButtonDisabled = mediaStream === null;

  const mediaOptions = { video: true };

  // Function to handle the start of video capture
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(mediaOptions);
      setMediaStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = handleDataAvailable;
      recorder.start();
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  // Function to handle the stop of video capture
  const stopCapture = () => {
    console.log("from stop");
    console.log(recordedChunks);
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      mediaStream?.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setMediaRecorder(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const uploadToBackend = async () => {
    console.log(recordedChunks.length);
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      mediaStream?.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setMediaRecorder(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    console.log("handling");
    console.log(recordedChunks.length);
    console.log(recordedChunks[0]);

    const videoBlob = new Blob(recordedChunks, {
      type: recordedChunks[0].type,
    });

    const formData = new FormData();
    formData.append("file", videoBlob, "video.webm");

    console.log(videoBlob.name)
    console.log(videoBlob.type)

    const BACKEND_URL = "http://localhost:8000/lip2text";
    let res = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    console.log(await res.text());
  };

  const saveVideo = () => {
    if (recordedChunks.length === 0) {
      console.error("No recorded video available.");
      return;
    }

    const blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recorded_video.webm"; // Set the desired file name and extension

    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Function to handle the recorded video data
  const handleDataAvailable = (event: BlobEvent) => {
    console.log("handling data");
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };

  return (
    <div className={"upload"} style={{ position: 'fixed' }}>
      <video ref={videoRef} width="640" height="480" autoPlay muted></video>
      <button onClick={startCapture} disabled={startButtonDisabled}>
        Start Capture
      </button>
      <button onClick={stopCapture} disabled={stopButtonDisabled}>
        Stop Capture
      </button>
      <button onClick={async () => await uploadToBackend()}>Upload</button>
    </div>
  );
}
