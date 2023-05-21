import { useHistory } from "react-router-dom";

export const resetQuestionsScroll = () => {
    document.getElementById('app')?.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

export const ResetTokenWithRedirect = () => {
    const history = useHistory();
    localStorage.removeItem('token');
    if (history.location.pathname !== '/login') {
        history.push('/login');
    }
}
