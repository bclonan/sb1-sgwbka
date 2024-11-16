export interface FileMetadata {
  fileName: string;
  mimeType: string;
  size: number;
  hash: string;
  chunks: string[];
  useMatrix: boolean;
}

export interface ProcessingStatus {
  progress: number;
  status: 'idle' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface StoredFile {
  metadataKey: string;
  metadata: FileMetadata;
}