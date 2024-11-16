import React from 'react';
import { FileText, Download, Share2, Trash2 } from 'lucide-react';
import { StoredFile } from '../types';

interface FileListProps {
  files: StoredFile[];
  onDownload: (file: StoredFile) => void;
  onShare: (file: StoredFile) => void;
  onDelete: (file: StoredFile) => void;
}

export default function FileList({ files, onDownload, onShare, onDelete }: FileListProps) {
  const formatSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {files.map((file) => (
          <div key={file.metadataKey} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {file.metadata.fileName}
                  </h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatSize(file.metadata.size)}</span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onDownload(file)}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onShare(file)}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(file)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="mx-auto w-12 h-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No files</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload files to see them listed here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}