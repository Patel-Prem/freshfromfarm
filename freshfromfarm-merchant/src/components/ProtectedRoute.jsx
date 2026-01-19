// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectIsLoggedOut,
  setAccessToken,
  logOut,
} from "../features/auth/authSlice";
import { refreshToken } from "../api/authAPI"; // wrapper calling /refresh-token endpoint
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectCurrentToken);
  const isLoggedOut = useSelector(selectIsLoggedOut);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refresh() {
      if (!accessToken && !isLoggedOut) {
        try {
          const res = await refreshToken();
          dispatch(setAccessToken({ accessToken: res.data.accessToken }));
        } catch (error) {
          dispatch(logOut());
        }
      }
      setLoading(false);
    }
    refresh();
  }, [accessToken, isLoggedOut, dispatch]);

  if (loading) return null; // or spinner

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
