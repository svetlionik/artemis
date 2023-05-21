import React from 'react';
import { ReactComponent as DocumentIcon } from 'images/icon-uploading-document.svg';
import { ReactComponent as ThreeDotsIcon } from 'images/icon-3-dots.svg';
import { ReactComponent as ReplaceFileIcon } from 'images/icon-replace-file.svg';
import { ReactComponent as DeleteFileIcon } from 'images/icon-delete-file.svg';
import styles from './UploadedFile.module.scss';

import { IUploadedFile } from '../../types';

const UploadedFile: React.FC<IUploadedFile> = ({ fileName }) => {
  return (
    <div className={styles.uploadedFileWrapper}>
      <DocumentIcon className={styles.documentIcon} />
      <div className={styles.fileName}>{fileName}</div>
      <div className={styles.dropDown}>
        <ThreeDotsIcon className={ styles.threeDots} />
        <div className={styles.menu}>
          <div><ReplaceFileIcon/>Replace</div>
          <div><DeleteFileIcon/>Delete</div>
        </div>
        {/* <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" variant='light' >
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#action-1">Option 1</Dropdown.Item>
            <Dropdown.Item href="#action-2">Option 2</Dropdown.Item>
            <Dropdown.Item href="#action-3">Option 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </div>
    </div>
  );
};

export default UploadedFile;
