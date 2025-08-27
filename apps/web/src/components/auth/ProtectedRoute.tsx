import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
