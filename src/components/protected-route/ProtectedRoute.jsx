import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/main";
import { ACCESS_TOKEN } from "../../utils/consts";

export default function ProtectedRoute({ redirectPath = "/" }) {
    const currentUser = useSelector(userSelector);

    return currentUser || localStorage.getItem(ACCESS_TOKEN) ? (
        <Outlet />
    ) : (
        <Navigate to={`${redirectPath}`} replace={true} />
    );
}
