import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/main";

export default function ProtectedRouteIsLogin({ redirectPath = "/" }) {
    const currentUser = useSelector(userSelector);

    return !currentUser ? <Outlet /> : <Navigate to={`${redirectPath}`} replace={true} />;
}
