import UserDetail from "components/UserFetail/UserDetail";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserAction } from "store/slice/user/userActions";

const UserPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        (() => {
            dispatch(getUserAction(id));
        })();
    }, []);


    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-4 pb-24 lg:pb-32">
                <div className="pb-4 border-b">
                    <div className="pb-4">
                        <h1 className="text-2xl font-bold">
                            Información del perfil
                        </h1>
                        <p>Información detallada de tu cuenta</p>
                    </div>
                    <div className="flex gap-2 py-4">
                        <Link
                            className="text-sm px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-600"
                            to={`/admin/users/update-user/${id}`}
                        >
                            Editar cuenta
                        </Link>
                    </div>
                </div>
                <UserDetail />
            </div>
        </div>
    );
};

export default UserPage;
