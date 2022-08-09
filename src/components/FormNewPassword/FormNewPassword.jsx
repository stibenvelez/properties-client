import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import { Link, useParams } from "react-router-dom";
import clientAxios from "config/axios";
import Swal from "sweetalert2";
import { setAuthSuccess } from "store/slice/auth";

const FormNewPassword = () => {
    const dispatch = useDispatch();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [isValidToken, setIsValidToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [modifiedPassword, setModifiedPassword] = useState(false);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await clientAxios.get(`/users/forget-password/${token}`);
                setIsValidToken(true);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setAlert(error.response.data.msg);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setErrors({
                password: "la contraseña debe contener al menos 6 caracteres",
            });
            return;
        }

        try {
            const { data } = await clientAxios.post(
                `/users/forget-password/${token}`,
                {
                    password,
                }
            );
            Swal.fire({
                icon: "success",
                title: "Contraseña actualizada",
                text: "Se actualizo la contraseña con exito",
                timer: 2000,
            });
            setModifiedPassword(true)
        } catch (error) {}
    };

    if (!isValidToken && !loading) {
        return (
            <div className="p-2 bg-red-100 rounded shadow">
                <h1 className="text-2xl text-center text-red-800">{alert}</h1>
            </div>
        );
    }
    return (
        <div className="">
            <Card className="max-w-4xl mx-auto ">
                <form
                    className="grid grid-cols-1 gap-6"
                    onSubmit={handleSubmit}
                >
                    <label className="block">
                        <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                            contraseña
                        </span>
                        <Input
                            type="password"
                            className="mt-1"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        {errors.password && password === "" && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </label>
                    <ButtonPrimary type="submit">
                        Regenerar contraseña
                    </ButtonPrimary>
                </form>
            </Card>
            <div className="flex justify-center p-4">
                {!modifiedPassword && (
                    <Link
                        to={`${process.env.PUBLIC_URL}/admin/login`}
                        className="mx-auto text-xl hover:text-indigo-500"
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </div>
    );
};

export default FormNewPassword;
