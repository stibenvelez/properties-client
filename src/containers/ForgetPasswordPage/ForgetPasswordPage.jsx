import FormCreateUser from "components/FormCreateUser/FormCreateUser";
import FormForgetPassword from "components/FormForgetPassword/FormForgetPassword";
import { Helmet } from "react-helmet";

const ForgetPasswordPage = () => {
    return (
        <div
            className={`nc-PageAbout overflow-hidden relative h-full `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Regenerar contraseña</title>
            </Helmet>

            <div className="container py-4 space-y-16 lg:py-4 lg:space-y-28 ">
                <div className="py-4">
                    <h1 className="text-2xl text-gray-800">
                        Regenerar contraseña
                    </h1>
                </div>
                <FormForgetPassword />
            </div>
        </div>
    );
};

export default ForgetPasswordPage;
