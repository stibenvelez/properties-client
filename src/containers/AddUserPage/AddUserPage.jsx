import FormCreateUser from "components/FormCreateUser/FormCreateUser";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";


const AddUserPage = () => {
    const history = useHistory();
    return (
        <div
            className={`nc-PageAbout overflow-hidden relative h-full `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Agregar usuario</title>
            </Helmet>

            <div className="container py-4 space-y-4 lg:py-4 ">
                <div className="py-4">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Crear usuario
                        </h2>
                        <p>Cree aquí un usuario nuevo.</p>
                    </div>
                </div>
                <button
                    onClick={() => history.goBack()}
                    className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-500"
                >
                    Volver
                </button>
                <FormCreateUser />
            </div>
        </div>
    );
};

export default AddUserPage;
