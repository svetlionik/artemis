import React, { useEffect, useState } from 'react';
// import * as tus from 'tus-js-client';
import { ReactComponent as DocumentIcon } from 'images/icon-uploading-document.svg';
import styles from './FileProgress.module.scss';

import { IFileUploadProgress } from '../../types';


const FileProgress: React.FC<IFileUploadProgress> = (file, uploadURL) => {
  useEffect(() => {
    setInterval(() => {
      setProgress((progress) => (progress < 100 ? (progress += 1) : 0));
    }, 100);
  }, []);

  const [progress, setProgress] = useState(0);

  // const handleUpload = (file: File) => {

  //   const upload = new tus.Upload(file, {
  //     endpoint: uploadURL,
  //     chunkSize: 1024 * 1024 * 2,
  //     retryDelays: [0, 1000, 3000, 5000],
  //     metadata: {
  //       filename: file.name,
  //       filetype: file.type,
  //       size: file.size.toString(),
  //     },
  //     onError: (error) => {
  //       console.error('Upload error', error);
  //     },
  //     onProgress: (bytesUploaded, bytesTotal) => {
  //       const uploadProgress = (bytesUploaded / bytesTotal) * 100;
  //       setProgress(uploadProgress);
  //     },
  //     onSuccess: () => {
  //       console.log('Upload successful!');
  //       setProgress(0);
  //     },
  //   });

  //   upload.start();
  // };

  return (
    <div className={styles.fileProgressWrapper}>
      <DocumentIcon className={styles.documentIcon} />
      <div>
        <div className={styles.fileName}>IMG000046381369.jpeg</div>
        <div className={styles.progressBar}>
          <div style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className={styles.stopIcon}>x</div>
    </div>
  );
};

export default FileProgress;
