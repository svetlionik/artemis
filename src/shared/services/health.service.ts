import { axiosInstance } from './axiosConfig.service';

export const health = () => {
  setInterval(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_BASE_URL}/actuator/health`)
      .then((response) => {
        return response.data.status;
      })
      .catch((error) => {
        // window.location.assign('/error-page');
      });
  }, 60000);
};
