
import FormNewPassword from "components/FormNewPassword/FormNewPassword";
import { Helmet } from "react-helmet";

const NewPasswordPage = () => {
    return (
        <div
            className={`nc-PageAbout overflow-hidden relative h-full `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Nueva contraseña</title>
            </Helmet>

            <div className="container py-4 space-y-16 lg:py-4 lg:space-y-28 ">
                <div className="py-4">
                    <h1 className="text-2xl font-bold text-gray-800">Nueva contraseña</h1>
                    <p>Ingrese una nueva contraseña</p>
                </div>
                <FormNewPassword />
            </div>
        </div>
    );
};

export default NewPasswordPage;
