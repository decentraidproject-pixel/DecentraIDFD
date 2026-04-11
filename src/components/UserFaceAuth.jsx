import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import {useNavigate} from 'react-router-dom'
export default function FaceAuth() {
  const API = "https://fbackend-3.onrender.com";

  const videoRef = useRef(null);
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const navigate=useNavigate();
  
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";

        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

        await startVideo();
        setLoaded(true);
      } catch (err) {
        console.error("Model loading error:", err);
        alert("Error loading face models");
      }
    };

    loadModels();
  }, []);

  
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraReady(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied");
    }
  };

  
  const detectFace = async () => {
    if (!videoRef.current) return null;

    const detection = await faceapi
      .detectSingleFace(videoRef.current)
      .withFaceLandmarks()
      .withFaceDescriptor();

    return detection;
  };

  
  const register = async () => {
    if (!name) {
      alert("Enter your name");
      return;
    }

    const detection = await detectFace();

    if (!detection) {
      alert("Face not detected. Move closer & ensure good lighting.");
      return;
    }

    await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        descriptor: Array.from(detection.descriptor)
      }),
    });

    alert("Face Registered Successfully");
    window.location.href = "https://decentra-vid.vercel.app/User-EmailOTP-Verification";

  };

  
  const login = async () => {
    const detection = await detectFace();

    if (!detection) {
      alert("Face not detected. Move closer & ensure good lighting.");
      return;
    }

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descriptor: Array.from(detection.descriptor)
      }),
    });

    const data = await res.json();
    alert(data.msg);
  };

  return (
   <div className="face-auth-container">
  <h2>Face Register & Login</h2>

  <video
    ref={videoRef}
    autoPlay
    playsInline
    muted
  />

  <br />

  <input
    placeholder="Enter Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <br />

  <button
    onClick={register}
    style={{ backgroundColor: "green" }}
    disabled={!loaded || !cameraReady}
  >
    Next
  </button>

 
</div>

  );
}
