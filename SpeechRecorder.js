import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { theme } from '../styles/theme';

// Function to convert AudioBuffer to WAV format
const convertToWav = (audioBuffer) => {
  return new Promise((resolve) => {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length;
    
    // Create WAV header
    const buffer = new ArrayBuffer(44 + length * numChannels * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * numChannels * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * numChannels * 2, true);
    
    // Convert audio data
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    const wavBlob = new Blob([buffer], { type: 'audio/wav' });
    resolve(wavBlob);
  });
};

const SpeechRecorder = ({ 
  isRecording, 
  onRecordingStart, 
  onRecordingStop, 
  disabled = false 
}) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [hasPermission, setHasPermission] = useState(true);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = async () => {
        // Create audio blob with the recorder's native format
        const audioBlob = new Blob(chunks, { type: recorder.mimeType });
        
        try {
          // Try to convert to WAV format for better compatibility
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          // Convert to WAV format
          const wavBlob = await convertToWav(audioBuffer);
          onRecordingStop(wavBlob);
        } catch (error) {
          console.error('Error converting audio format:', error);
          // Fallback: use original format but ensure it's properly typed
          const fallbackBlob = new Blob(chunks, { 
            type: recorder.mimeType || 'audio/webm' 
          });
          onRecordingStop(fallbackBlob);
        }
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      onRecordingStart();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setHasPermission(false);
      onRecordingStop(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const handleButtonClick = () => {
    if (disabled || !hasPermission) return;
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Container>
      <RecordButton
        onClick={handleButtonClick}
        disabled={disabled || !hasPermission}
        isRecording={isRecording}
      >
        {isRecording ? <FaStop /> : <FaMicrophone />}
      </RecordButton>
      
      <StatusText>
        {isRecording ? 'Recording...' : 'Click to record'}
        {!hasPermission && ' (Microphone access denied)'}
      </StatusText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${theme.colors.surface};
  border-radius: 0.5rem;
  border: 2px dashed ${theme.colors.border};
`;

const RecordButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: ${props => 
    props.isRecording 
      ? theme.colors.error 
      : props.disabled 
        ? theme.colors.border 
        : theme.colors.primary
  };
  color: white;
  font-size: 24px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
  }
`;

const StatusText = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
  text-align: center;
`;

export default SpeechRecorder;
