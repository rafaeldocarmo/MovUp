import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import biomecanica from '../assets/biomecanica.png'
import 'primeicons/primeicons.css';
import '../styles/record-page.css'

const Video = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setShowConfirm(true);
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRecord = () => {
    navigate('/recording');
  };

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate video processing
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Handle actual video upload to backend
      alert('Vídeo analisado com sucesso!');
      setSelectedVideo(null);
      setVideoPreview(null);
      setShowConfirm(false);
    }, 3000);
  };

  const handleCancel = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
    setShowConfirm(false);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-yellow-400 flex align-items-center justify-content-center">
        <div className="text-center">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} />
          <h2 className="text-2xl font-bold text-black mt-3">Analisando Corrida...</h2>
          <p className="text-black-alpha-80 mt-2">Aguarde enquanto analisamos sua técnica</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Instructions */}
      <Card className="mb-4 shadow-none p-3">
        <div className="text-left mb-3">
          <h2>Instruções</h2>
        </div>
        <div className="text-left">
          <p className="text-black-alpha-80 line-height-3 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="text-center my-3">
            <img src={biomecanica} style={{width: '80%'}}/>
          </div>
          <p className="text-black-alpha-80 line-height-3 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <br/>
          <p className="text-black-alpha-80 line-height-3 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3 my-4">
        <Button 
          label="GRAVE SUA CORRIDA" 
          icon="pi pi-video"
          className="p-button-raised bg-yellow-400 text-black border-none button-record"
          size="large"
          style={{ height: '60px', fontSize: '16px' }}
          onClick={handleRecord}
        />
        <Button 
          label="CARREGUE SUA CORRIDA" 
          icon="pi pi-upload"
          className="p-button-raised bg-yellow-400 text-black border-none button-record"
          size="large"
          style={{ height: '60px', fontSize: '16px' }}
          onClick={handleUpload}
        />
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Video Preview */}
      {videoPreview && (
        <Card className="mb-4 bg-yellow-50 border-round">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-black mb-3">Prévia do Vídeo</h3>
            <video 
              controls 
              className="w-full max-w-md border-round mb-3"
              style={{ maxHeight: '300px' }}
            >
              <source src={videoPreview} type={selectedVideo?.type} />
              Seu navegador não suporta o elemento de vídeo.
            </video>
            <div className="flex gap-2 justify-content-center">
              <Button 
                label="Analisar" 
                icon="pi pi-check"
                className="p-button-success"
                onClick={handleConfirm}
              />
              <Button 
                label="Cancelar" 
                icon="pi pi-times"
                className="p-button-outlined p-button-secondary"
                onClick={handleCancel}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Video;
