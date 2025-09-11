import { useNavigate } from 'react-router-dom';
import MediaRecorderComponent from '../components/MediaRecorderComponent';
import '../styles/record-page.css';

const RecordingPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/video');
  };

  const handleRestart = () => {
    // Component handles restart internally
  };

  const handleBack = () => {
    navigate('/video');
  };

  return (
    <MediaRecorderComponent 
      onSave={handleSave}
      onRestart={handleRestart}
      onBack={handleBack}
    />
  );
};

export default RecordingPage;
