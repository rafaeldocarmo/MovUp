import { useState, useCallback } from 'react';

export const useVideoUpload = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = useCallback((file) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      return { success: true, file };
    }
    return { success: false, error: 'Please select a valid video file' };
  }, []);

  const uploadVideo = useCallback(async (file, onProgress) => {
    if (!file) return { success: false, error: 'No file selected' };

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      // TODO: Replace with actual API call
      const result = {
        success: true,
        videoId: 'mock-video-id-' + Date.now(),
        message: 'Video uploaded successfully'
      };

      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const clearVideo = useCallback(() => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setSelectedVideo(null);
    setVideoPreview(null);
    setUploadProgress(0);
  }, [videoPreview]);

  const resetUpload = useCallback(() => {
    clearVideo();
    setIsUploading(false);
  }, [clearVideo]);

  return {
    selectedVideo,
    videoPreview,
    isUploading,
    uploadProgress,
    handleFileSelect,
    uploadVideo,
    clearVideo,
    resetUpload
  };
};
