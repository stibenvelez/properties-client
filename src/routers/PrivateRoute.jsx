import SidebarAdmin from "components/SidebarAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { authAction } from "store/slice/auth/authActions";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();

    const { auth, loading } = useSelector(({ auth }) => auth);

    if (loading) {
        return <div></div>;
    }

    return (
        <div className="relative flex w-full overflow-hidden bg-gray-50 dark:bg-slate-800 ">
            <SidebarAdmin />

            <div className="w-full h-full overflow-y-auto">
                <Route
                    {...rest}
                    render={(props) =>
                        auth ? (
                            <Component {...props} />
                        ) : (
                            <Redirect to="/admin/login" />
                        )
                    }
                />
            </div>
        </div>
    );
};

export default PrivateRoute;
