import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import { updateUserAction } from "store/slice/user/userActions";


const USER_INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    idRole: "",
};

const FormUpdateUser = () => {
    const dispatch = useDispatch();
    const [updatedUser, setUpdatedUser] = useState(USER_INITIAL_STATE);
    const [errors, setErrors] = useState({});

    const { loading, user } = useSelector(({ users }) => users);
    const { role } = useSelector(({ auth }) => auth.user);

    useEffect(() => {
        setUpdatedUser(user);
    }, [user]);
    

    const validateForm = () => {
        let errors = {};
        if (updatedUser.firstName === "") errors.firstname = "El nombre es requerido";
        if (updatedUser.lastName === "") errors.lastname = "El apellido es requerido";
        if (updatedUser.email === "") errors.email = "El email es requerido";
        if (updatedUser.idRole === "") errors.idRole = "El rol es requerido";
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return true;
        }
        setErrors(errors);
        return false;
    };

    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const Errors = validateForm();
        if (Errors) return false;

        dispatch(updateUserAction(updatedUser));
        //setUpdatedUser(USER_INITIAL_STATE);
    };

    if (role !== "admin") {
        return (
            <div className="relative py-2 px-3 bg-red-200 text-sm text-red-800 rounded shadow">
                "No tiene los permisos suficientes para crear un usuario"
            </div>
        );
    }

    return (
        <Card className=" max-w-4xl mx-auto">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="flex gap-4">
                    <label className="block  w-1/2">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Primer nombre
                        </span>
                        <Input
                            type="text"
                            placeholder="Ingrese un primer nombre"
                            className="mt-1"
                            name="firstName"
                            value={updatedUser.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && updatedUser.firstName === "" && (
                            <p className="text-sm text-red-500">
                                {errors.firstname}
                            </p>
                        )}
                    </label>
                    <label className="block w-1/2">
                        <span className="text-neutral-800 dark:text-neutral-200">
                            Primer apellido
                        </span>
                        <Input
                            type="text"
                            placeholder="Ingrese un apellido"
                            className="mt-1"
                            name="lastName"
                            value={updatedUser.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && updatedUser.lastName === "" && (
                            <p className="text-sm text-red-500">
                                {errors.lastName}
                            </p>
                        )}
                    </label>
                </div>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Email
                    </span>
                    <Input
                        type="email"
                        placeholder="example@example.com"
                        className="mt-1 bg-gray-200"
                        name="email"
                        autoComplete="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        required
                        disabled="true"
                    />
                    {errors.email && updatedUser.email === "" && (
                        <p className="text-sm text-red-500"> {errors.email}</p>
                    )}
                </label>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Rol
                    </span>
                    <Select
                        name="idRole"
                        value={updatedUser.idRole}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        {role === "admin" && <option value="1">Admin</option>}
                        <option value="2">Encargado</option>
                        <option value="3">Asesor</option>
                    </Select>
                    {errors.idRole && updatedUser.idRole === "" && (
                        <p className="text-sm text-red-500"> {errors.idRole}</p>
                    )}
                </label>
                <ButtonPrimary className="flex gap-2" type="submit">
                    {loading ? (
                        <>
                            <SpinnerButton /> Editando
                        </>
                    ) : (
                        "Editar usuario"
                    )}
                </ButtonPrimary>
            </form>
        </Card>
    );
};
export default FormUpdateUser;
