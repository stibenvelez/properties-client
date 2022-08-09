import FormUpdateUser from "components/FormUpdateUser/FormUpdateUser";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getUserAction } from "store/slice/user/userActions";
import { Helmet } from "react-helmet";

const UpdateUserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getUserAction(id));
    }, []);

    return (
        <div
            className={`nc-PageAbout overflow-hidden relative `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Lista de usuarios</title>
            </Helmet>
            <div className="container py-4 space-y-4 lg:py-4 ">
                <div className="py-4">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Lista de usuarios
                        </h2>
                        <p>Aquí puede editar la inforacion del usuario</p>
                    </div>
                </div>
                <button
                    onClick={() => history.goBack()}
                    className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-500"
                >
                    Volver
                </button>
                <FormUpdateUser />
            </div>
        </div>
    );
};

export default UpdateUserPage;
