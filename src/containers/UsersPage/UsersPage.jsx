import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import UserList from "components/UsersList/UserList";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersAction } from "store/slice/user/userActions";

const UsersPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (() => {
            dispatch(getAllUsersAction());
        })();
    }, []);

    return (
        <div
            className={`nc-PageAbout overflow-hidden relative `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Lista de usuarios</title>
            </Helmet>

            <div className="container py-4 space-y-4 lg:py-4 lg:space-y-8">
                <div className="pb-4">
                    <h1 className="text-2xl font-bold">
                        Información del perfil
                    </h1>
                    <p>Información detallada de tu cuenta</p>
                </div>
                <Link
                    to="users/add-user"
                    className="bg-indigo-700 text-white py-1 px-4 rounded hover:bg-indigo-500"
                >
                    Agregar usuario
                </Link>
                <UserList />
            </div>
        </div>
    );
};

export default UsersPage;
