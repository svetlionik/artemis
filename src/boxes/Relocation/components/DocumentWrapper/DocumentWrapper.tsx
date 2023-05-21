import { IDocumentWrapper } from 'boxes/Relocation/types';
import UploadButton from '../UploadButton/UploadButton';
import styles from './DocumentWrapper.module.scss';
import './DocumentWrapper.module.scss';
import FillOutButton from '../FillOutButton/FillOutButton';
import FileProgress from '../FileProgress/FileProgress';
import UploadedFile from '../UploadedFile/UploadedFile';
import { Overlays } from 'components';
import { ReactComponent as InfoIcon } from 'images/info-new.svg';
import { RELOCATION_DOCUMENTS } from '../../constants';

const DocumentWrapper: React.FC<IDocumentWrapper> = ({ children }) => {
  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.groupTitle}>1. Personal documents</div>
        <div className={`${styles.documentWrapper} ${styles.active}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              {RELOCATION_DOCUMENTS.INTERNATIONAL_PASSPORT.name}
              <Overlays
                text={RELOCATION_DOCUMENTS.INTERNATIONAL_PASSPORT.description}>
                <InfoIcon fill="gray" />
              </Overlays>
            </span>
            <div className={styles.uploadButton}>
              <UploadButton />
            </div>
          </div>
          <div className={styles.fileList}>
            <FileProgress />
            <UploadedFile fileName="IMG000046381369.jpeg" />
          </div>
        </div>
        <p></p>
        <div className={styles.documentWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Personal photo</span>
            <div className={styles.uploadButton}>
              <UploadButton />
            </div>
          </div>
        </div>
        <div className={styles.groupTitle}>2. Fill out data forms</div>

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
        <p></p>
        <div className={styles.documentWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Welcome form </span>
            <div className={styles.uploadButton}>
              <FillOutButton fileURL="https://forms.office.com/pages/responsepage.aspx?id=5jVABBh3JkyOcm-kNAW3cYTJQRmSWgtCvud1t0r3VgtUREg0OTJFV0sxSU85VDNCTzJGTEFTQ1k4QS4u" />
            </div>
          </div>
        </div>
        <p></p>
        <div className={styles.groupTitle}>3. Academic documents</div>
        <div className={styles.documentWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              {RELOCATION_DOCUMENTS.DIPLOMA.name}
              <Overlays text={RELOCATION_DOCUMENTS.DIPLOMA.description}>
                <InfoIcon fill="gray" />
              </Overlays>
            </span>
            <div className={styles.uploadButton}>
              <UploadButton />
            </div>
          </div>
        </div>
        <div className={styles.documentWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              {RELOCATION_DOCUMENTS.TRANSCRIPT_GRADES.name}
              <Overlays
                text={RELOCATION_DOCUMENTS.TRANSCRIPT_GRADES.description}>
                <InfoIcon fill="gray" />
              </Overlays>
            </span>
            <div className={styles.uploadButton}>
              <UploadButton />
            </div>
          </div>
        </div>
        <p></p>
        <div className={styles.groupTitle}>4. Proof of experience</div>
        <div className={styles.documentWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              {RELOCATION_DOCUMENTS.DIPLOMA.name}
              <Overlays text={RELOCATION_DOCUMENTS.DIPLOMA.description}>
                <InfoIcon fill="gray" />
              </Overlays>
            </span>
            <div className={styles.uploadButton}>
              <UploadButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentWrapper;
