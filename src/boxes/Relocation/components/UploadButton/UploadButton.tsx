import React, { useState } from 'react';
import { ReactComponent as UploadIcon } from 'images/file-upload_1.svg';
import { ReactComponent as InfoIcon } from 'images/info-new.svg';
import styles from './UploadButton.module.scss';
import { UPLOADED_FILE_CHECKS } from 'boxes/Relocation/constants';
import { Modal } from 'react-bootstrap';

const UploadButton: React.FC = () => {
  const { ALLOWED_TYPES, MIN_SIZE, MAX_SIZE, FILE_NAME } = UPLOADED_FILE_CHECKS;

  const [showErrors, setShowErrors] = useState(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const closeModal = () => setShowErrors(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file: File = event.target.files[0];
      setUploadedFile(file);
      const errors: string[] = [];
      if (!ALLOWED_TYPES.criteria.includes(file.type)) {
        errors.push(ALLOWED_TYPES.errorMessage);
      }
      if (file.size > MAX_SIZE.criteria) {
        errors.push(MAX_SIZE.errorMessage);
      }
      if (file.size === MIN_SIZE.criteria) {
        errors.push(MIN_SIZE.errorMessage);
      }
      if (!FILE_NAME.criteria.test(file.name)) {
        errors.push(FILE_NAME.errorMessage);
      }

      if (!!errors.length) {
        setFileErrors(errors);
        setShowErrors(true);

        return false;
      }
    }
  };

  return (
    <>
      <Modal show={showErrors} onHide={closeModal} centered>
        <Modal.Body className={styles.errorModal}>
          <div className={styles.modalTitle}>
            <div>
              <h5>
                <InfoIcon />
                Warning!
              </h5>
            </div>
            <div className={styles.closeButton} onClick={closeModal}>
              X
            </div>
          </div>
          <p>
            The specific file:{' '}
            <span className={styles.fileName}>{uploadedFile?.name}</span> could
            not be uploaded!
          </p>
          <ul>
            {!!fileErrors.length && fileErrors.map((error) => <li>{error}</li>)}
          </ul>
        </Modal.Body>
      </Modal>
      <div className={styles.uploadButton}>
        <label htmlFor="fileInput">
          <UploadIcon />
          Upload
          <input
            type="file"
            id="fileInput"
            className={'d-none'}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </>
  );
};

export default UploadButton;
