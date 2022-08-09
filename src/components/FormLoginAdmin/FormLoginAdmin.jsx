import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginAction } from "store/slice/auth/authActions";
import AlertError from "./AlertError";

const INITIAL_STATE_USER = {
    email: "",
    password: "",
};

const FormLoginAdmin = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(INITIAL_STATE_USER);
    const { loading,  error, msg, auth } = useSelector(({ auth }) => auth);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAction(user));
    };
    useEffect(() => {
        if (auth) {
            <Redirect to="/admin" />;
        }
    }, []);

    return (
        <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow ">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-gray-800">Correo</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-gray-800">clave</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-200 rounded-lg"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <AlertError msg={msg} />}
                    <div>
                        <button className="flex gap-2 items-center px-4 py-2 font-bold text-white bg-indigo-800 rounded-lg hover:bg-indigo-500">
                            {loading&&<SpinnerButton />}
                            {!loading ? "Ingresar" : "Cargando..."}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormLoginAdmin;
