import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/context';

const InvalidRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const redirectPath = location.state?.path || '/home';
  useEffect(() => {
    !auth.user
      ? navigate('/login', { replace: true })
      : navigate(redirectPath, { replace: true });
  }, []);
};

export default InvalidRoute;
