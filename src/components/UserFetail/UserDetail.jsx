import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useSelector } from "react-redux";

const UserDetail = () => {
    const { firstName, lastName, email, role, state, confirmed } = useSelector(
        ({ users }) => users.user
    );
    const { loading } = useSelector(({ users }) => users);

    if (loading) {
        return (
            <div className="w-full py-8  flex justify-center items-center">
                <SpinnerButton />
            </div>
        );
    }
    return (
        <div>
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
                {!confirmed && (
                    <div
                        className={`${
                            state
                                ? "bg-green-200 text-green-700"
                                : "bg-red-300 text-red-800"
                        } py-[0.5] px-2 rounded-xl text-xs `}
                    >
                        Sin confirmar
                    </div>
                )}
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
    );
};

export default UserDetail;
