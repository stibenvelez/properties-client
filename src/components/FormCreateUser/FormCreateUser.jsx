import { createUserAdapter } from "adapters/user.adapter";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import { createUserAction, readUserAction } from "store/slice/user/userActions";
import { validateForm } from "./utils/formValidation"

const FormCreateUser = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const { loading, newUser } = useSelector(({ users }) => users);
    const { role } = useSelector(({ auth }) => auth.user);

    const handleChange = (e) => {
        dispatch(
            readUserAction({
                ...newUser,
                [e.target.name]: e.target.value,
            })
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Errors = await validateForm(newUser);
        console.log(Errors);
        if (Object.keys(Errors).length > 0) {
            setErrors(Errors);
            return
        }
        dispatch(createUserAction(createUserAdapter(newUser)));
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
                            value={newUser.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">
                                {errors.firstName}
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
                            value={newUser.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && newUser.lastName === "" && (
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
                        className="mt-1"
                        name="email"
                        autoComplete="email"
                        value={newUser.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && newUser.email === "" && (
                        <p className="text-sm text-red-500"> {errors.email}</p>
                    )}
                </label>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Rol
                    </span>
                    <Select
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        {role === "admin" && <option value="1">Admin</option>}
                        <option value="2">Encargado</option>
                        <option value="3">Asesor</option>
                    </Select>
                    {errors.role && newUser.role === "" && (
                        <p className="text-sm text-red-500"> {errors.role}</p>
                    )}
                </label>
                <label className="block">
                    <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        contraseña
                    </span>
                    <Input
                        type="password"
                        className="mt-1"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                    {errors.password && newUser.password === "" && (
                        <p className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </label>
                <label className="block">
                    <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                        confirmar contraseña
                    </span>
                    <Input
                        type="password"
                        className="mt-1"
                        name="passwordConfirm"
                        value={newUser.passwordConfirm}
                        onChange={handleChange}
                    />
                    {errors.passwordConfirm &&
                        newUser.passwordConfirm !== newUser.password && (
                            <p className="text-sm text-red-500">
                                {errors.passwordConfirm}
                            </p>
                        )}
                </label>
                <ButtonPrimary className="flex gap-2" type="submit">
                    {loading ? (
                        <>
                            <SpinnerButton /> Agregando
                        </>
                    ) : (
                        "Agregar usuario"
                    )}
                </ButtonPrimary>
            </form>
        </Card>
    );
};

export default FormCreateUser;
