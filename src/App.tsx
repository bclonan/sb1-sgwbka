import React, { useState, useCallback } from 'react';
import { Database } from 'lucide-react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import ShareModal from './components/ShareModal';
import { ProcessingStatus, StoredFile } from './types';

function App() {
  const [status, setStatus] = useState<ProcessingStatus>({
    progress: 0,
    status: 'idle'
  });
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [shareFile, setShareFile] = useState<StoredFile | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setStatus({ progress: 0, status: 'processing' });
    
    try {
      // Simulate file processing
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setStatus({ progress: i, status: 'processing' });
      }

      const newFile: StoredFile = {
        metadataKey: Math.random().toString(36).substring(7),
        metadata: {
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
          hash: Math.random().toString(36).substring(7),
          chunks: [],
          useMatrix: false
        }
      };

      setFiles(prev => [...prev, newFile]);
      setStatus({ progress: 100, status: 'complete' });
    } catch (error) {
      setStatus({ 
        progress: 0, 
        status: 'error', 
        error: 'Failed to process file' 
      });
    }
  }, []);

  const handleDownload = (file: StoredFile) => {
    // Implement file download logic
    console.log('Downloading:', file.metadata.fileName);
  };

  const handleShare = (file: StoredFile) => {
    setShareFile(file);
  };

  const handleDelete = (file: StoredFile) => {
    setFiles(prev => prev.filter(f => f.metadataKey !== file.metadataKey));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              LightningDB File Manager
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <FileUpload 
            onFileSelect={handleFileSelect}
            status={status}
          />

          <FileList
            files={files}
            onDownload={handleDownload}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {shareFile && (
        <ShareModal
          file={shareFile}
          onClose={() => setShareFile(null)}
        />
      )}
    </div>
  );
}

export default App;