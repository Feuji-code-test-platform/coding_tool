import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, CameraOff, Circle } from 'lucide-react';

function WebcamMonitor({ token, onViolation }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState('');
  const frameIntervalRef = useRef(null);

  useEffect(() => {
    startRecording();
    startFrameCapture();

    return () => {
      stopRecording();
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true
      });

      setHasPermission(true);

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          
          // Upload chunks every 30 seconds
          if (recordedChunksRef.current.length >= 30) {
            uploadVideoChunk();
          }
        }
      };

      mediaRecorder.start(1000); // Capture 1 chunk per second
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);

    } catch (err) {
      console.error('Webcam error:', err);
      setError('Camera access denied. Please enable your camera to continue.');
      onViolation({
        type: 'camera_denied',
        severity: 'critical',
        message: 'Camera access was denied'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      
      // Upload final chunk
      setTimeout(() => {
        if (recordedChunksRef.current.length > 0) {
          uploadVideoChunk();
        }
      }, 1000);
    }
    setIsRecording(false);
  };

  const uploadVideoChunk = async () => {
    if (recordedChunksRef.current.length === 0) return;

    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob, `exam-${token}-${Date.now()}.webm`);
    formData.append('token', token);

    try {
      await fetch(`http://localhost:5000/api/exam/upload-video/${token}`, {
        method: 'POST',
        body: formData
      });
      
      // Clear uploaded chunks
      recordedChunksRef.current = [];
      console.log('Video chunk uploaded');
      
    } catch (err) {
      console.error('Video upload failed:', err);
    }
  };

  const startFrameCapture = () => {
    // Capture frame every 5 seconds for AI proctoring analysis
    frameIntervalRef.current = setInterval(() => {
      captureFrameForAnalysis();
    }, 5000);
  };

  const captureFrameForAnalysis = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      // Send frame to Python proctoring service
      const response = await fetch('http://localhost:8000/api/analyze-frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frame: imageSrc,
          candidateId: token
        })
      });

      const analysis = await response.json();

      // Check for violations
      if (analysis.alerts && analysis.alerts.length > 0) {
        analysis.alerts.forEach(alert => {
          onViolation(alert);
        });
      }

    } catch (err) {
      console.error('Frame analysis error:', err);
    }
  };

  if (error) {
    return (
      <div className="webcam-error">
        <CameraOff size={32} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="webcam-monitor">
      <div className="webcam-header">
        <Camera size={16} />
        <span>Live Monitoring</span>
        {isRecording && <Circle size={8} className="recording-indicator" />}
      </div>

      <div className="webcam-preview">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 320,
            height: 240,
            facingMode: 'user'
          }}
          onUserMediaError={(err) => {
            console.error('Webcam error:', err);
            setError('Failed to access camera');
          }}
        />
      </div>

      <div className="webcam-status">
        <span className={`status-indicator ${hasPermission ? 'active' : 'inactive'}`}>
          {hasPermission ? 'Camera Active' : 'Camera Inactive'}
        </span>
      </div>
    </div>
  );
}

export default WebcamMonitor;
