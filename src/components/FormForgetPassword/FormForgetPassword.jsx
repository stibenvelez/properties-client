import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import { forgetPasswordAction } from "store/slice/auth/authActions";
import { createUserAction } from "store/slice/user/userActions";

const FormForgetPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "") {
            setErrors({
                email: "Ingrese un email"
            })
            return
        }
        dispatch(forgetPasswordAction(email));
    };
    return (
        <Card className="max-w-4xl mx-auto ">
            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                        Email
                    </span>
                    <Input
                        type="email"
                        placeholder="example@example.com"
                        className="mt-1"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    {errors && email === "" && <p className="text-sm text-red-500">{errors.email}</p>}
                </label>
                <ButtonPrimary type="submit">Regenerar contraseña</ButtonPrimary>
            </form>
        </Card>
    );
};

export default FormForgetPassword;
