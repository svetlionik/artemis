import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import UploadButton from '../UploadButton/UploadButton';
import UploadedFile from '../UploadedFile/UploadedFile';

import { Overlays } from 'components';

import styles from './Template.module.scss';

import { ReactComponent as Icon } from 'images/info-new.svg';

import { IRelocationDetails, ITemplate } from 'boxes/Relocation/types';
import FillOutButton from '../FillOutButton/FillOutButton';

export const Template = (relocationDetails: ITemplate) => {
  const [details, setDetails] = useState<IRelocationDetails[]>([]);

  let show = true;

  useEffect(() => {
    setDetails([
      ...Object.entries(relocationDetails).map(([key, value]) => ({
        name: value.name,
        documents: Object.entries(value.documentTypes).map(([key, value]) => ({
          name: value.name,
          description: value.description,
          uploadedFiles: value.documents,
        })),
      })),
    ]);
  }, []);
  return (
    <Container className={styles.mobileDetailsDiv}>
      {details.map((stage) => (
        <>
          <h6>{stage.name}</h6>
          {stage.documents.map((item) => (
            <div className={styles.documentWrapper}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>
                  {item.name}{' '}
                  {item?.description ? (
                    <Overlays text={item?.description}>
                      <Icon />{' '}
                    </Overlays>
                  ) : null}
                </span>
                <div className={styles.uploadButton}>
                  <UploadButton />
                </div>
              </div>
              {item?.uploadedFiles.length !== 0 ? (
                <div className={styles.fileList}>
                  {item?.uploadedFiles.map((file) => (
                    <UploadedFile
                      fileName={file.fileName + '.' + file.fileExtension}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </>
      ))}
      {show ? (
        <>
          <h6>Fill Out Data Forms</h6>
          <div className={styles.documentWrapper}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>
                Information consent form
              </span>
              <div className={styles.uploadButton}>
                <FillOutButton fileURL="https://forms.office.com/pages/responsepage.aspx?id=5jVABBh3JkyOcm-kNAW3cYTJQRmSWgtCvud1t0r3VgtUREg0OTJFV0sxSU85VDNCTzJGTEFTQ1k4QS4u" />
              </div>
            </div>
          </div>
          <div className={styles.documentWrapper}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Welcome form </span>
              <div className={styles.uploadButton}>
                <FillOutButton fileURL="https://forms.office.com/pages/responsepage.aspx?id=5jVABBh3JkyOcm-kNAW3cYTJQRmSWgtCvud1t0r3VgtUREg0OTJFV0sxSU85VDNCTzJGTEFTQ1k4QS4u" />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Container>
  );
};
