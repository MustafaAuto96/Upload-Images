import React, { useState, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface ImageData {
  file: File;
  preview: string;
}

const App: React.FC = () => {
  const [image, setImage] = useState<ImageData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [botToken, setBotToken] = useState('');
  const [channelId, setChannelId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      processImageFile(imageFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find(item => item.type.startsWith('image/'));
    
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        processImageFile(file);
      }
    }
  }, []);

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage({
        file,
        preview: e.target?.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const sendToTelegram = async () => {
    if (!image || !botToken || !channelId) {
      setMessage('Please provide image, bot token, and channel ID');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('photo', image.file);
      formData.append('chat_id', channelId);
      
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendPhoto`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();
      
      if (data.ok) {
        setMessage('✅ Image sent successfully to Telegram!');
        setImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage(`❌ Error: ${data.description || 'Failed to send image'}`);
      }
    } catch (error) {
      setMessage(`❌ Error: Failed to send image. Please check your bot token and channel ID.`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="App" onPaste={handlePaste}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h1 className="card-title h3 mb-0 text-center">
                  📸 Telegram Image Uploader
                </h1>
              </div>
              <div className="card-body">
                {/* Configuration Section */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="botToken" className="form-label">
                      Bot Token
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="botToken"
                      placeholder="Enter your bot token"
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="channelId" className="form-label">
                      Channel ID (with @)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="channelId"
                      placeholder="@yourchannel"
                      value={channelId}
                      onChange={(e) => setChannelId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Upload Area */}
                <div
                  className={`upload-area border-2 border-dashed rounded p-4 text-center mb-4 ${
                    isDragging ? 'border-primary bg-light' : 'border-secondary'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {image ? (
                    <div className="preview-container">
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="img-fluid rounded mb-3"
                        style={{ maxHeight: '300px' }}
                      />
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-outline-danger"
                          onClick={clearImage}
                        >
                          🗑️ Clear
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          📁 Choose Different
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <div className="mb-3">
                        <i className="bi bi-cloud-upload display-1 text-muted"></i>
                      </div>
                      <h5 className="text-muted mb-3">
                        Drag & Drop Image Here
                      </h5>
                      <p className="text-muted mb-3">or</p>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        📁 Browse Files
                      </button>
                      <p className="text-muted small mt-3 mb-0">
                        You can also paste an image using Ctrl+V
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="d-none"
                />

                {/* Send Button */}
                {image && (
                  <div className="text-center">
                    <button
                      className="btn btn-success btn-lg px-5"
                      onClick={sendToTelegram}
                      disabled={isLoading || !botToken || !channelId}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          📤 Send to Telegram
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Message Display */}
                {message && (
                  <div className={`alert mt-4 ${
                    message.includes('✅') ? 'alert-success' : 'alert-danger'
                  }`}>
                    {message}
                  </div>
                )}

                {/* Instructions */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="fw-bold">📋 Instructions:</h6>
                  <ol className="small mb-0">
                    <li>Create a Telegram bot using @BotFather</li>
                    <li>Get your bot token from BotFather</li>
                    <li>Add your bot to your channel as an administrator</li>
                    <li>Enter your bot token and channel ID above</li>
                    <li>Upload or paste an image and click "Send to Telegram"</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;