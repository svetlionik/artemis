import TimeIcon from 'images/time-1.svg';
import GitLabIcon from 'images/gitlab-icon.svg';
import SourceCodeIcon from 'images/source-code.svg';
import WifiIcon from 'images/wifi-icon.svg';
import GitIcon from 'images/new-git-icon.svg';
import ReadMeIcon from 'images/readme-icon.svg';

import styles from './InfoCard.module.scss';

export const InfoCard = () => {
  return (
    <div className={styles.grid}>
      <span>
        <img src={GitIcon} alt="number" />
        <p>
          Once the task is started you will receive access to a dedicated Git
          repository that you can clone and push your solution to.
        </p>
      </span>
      <span>
        <img src={ReadMeIcon} alt="toggle" />
        <p>
          The description of the task is available in a ReadMe file in the Git
          repository.
        </p>
      </span>
      <span>
        <img src={TimeIcon} alt="time" />
        <p>
          Please note that the task duration is 10 days from the moment you
          click "Let's Begin". If you fail to submit the task before the 10 days
          expire, the task will be closed, and you will not be able to make any
          changes after that.
        </p>
      </span>
      <span>
        <img src={GitLabIcon} alt="wi-fi" />
        <p>
          Please ensure that you have access to GitLab to start the task. You do
          not need an account but need to be able to connect to
          https://about.gitlab.com/. If you encounter any issues, please contact
          your HR representative.
        </p>
      </span>
      <span>
        <img src={WifiIcon} alt="time" />
        <p>
          Please note that the task requires an internet connection to complete.
          While the internet is not mandatory throughout the 10-day duration of
          the project, please ensure that you have a stable connection whenever
          internet access is required.
        </p>
      </span>
      <span>
        <img src={SourceCodeIcon} alt="time" />
        <p>
          Please use one of the following programming languages and any related
          library or framework of your choice: Java, Kotlin, Javascript,
          Typescript, C#, or Python. If you need to use an different language,
          please inform your HR representative before starting the task.
        </p>
      </span>
    </div>
  );
};
