import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "shared/Button/Button";

const ProfilePage = () => {
    const { idUser, firstName, lastName, email, role, state } = useSelector(
        ({ auth }) => auth.user
    );

    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-8 pb-24 lg:pb-32">
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
                            to="/admin/users/forget-password"
                        >
                            Olvidé la contraseña
                        </Link>
                        <Link
                            className="text-sm px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-600"
                            to={`/admin/users/update-user/${idUser}`}
                        >
                            Editar cuenta
                        </Link>
                    </div>
                </div>
                <div className="flex gap-2 items-baseline py-2">
                    <h2 className="text-2xl font-bold">{firstName}</h2>
                    <h3 className="text-xl">{lastName}</h3>
                    <span
                        className={`${
                            !state
                                ? "bg-red-300 text-red-800"
                                : "bg-green-300 text-green-800"
                        } py-[0.5] px-2 rounded-xl text-xs `}
                    >
                        {state ? "Activo" : "Inactivo"}
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <label className="text-gray-500">Email:</label>
                    <p>{email}</p>
                </div>
                <div className="flex items-baseline gap-2">
                    <label className="text-gray-500">Rol:</label>
                    <p>{role}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
