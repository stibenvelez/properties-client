import ToContactList from "components/ToContactList/ToContactList";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllToContactAction } from "store/slice/contact/contact.actions";

const ToContactListPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (() => {
            dispatch(getAllToContactAction());
        })();
    }, []);

    return (
        <div
            className={`nc-PageAbout overflow-hidden relative `}
            data-nc-id="PageAbout"
        >
            <Helmet>
                <title>Lista a contactar</title>
            </Helmet>
            <div className="container py-4 space-y-4 lg:py-4 lg:space-y-8">
                <div className="py-4">
                    <div>
                        <h2 className="text-3xl font-semibold">
                            Lista a contactar
                        </h2>
                        <p>Lista de prospectos pendientes por contactar</p>
                    </div>
                <button
                    onClick={() => history.goBack()}
                    className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-500"
                >
                    Volver
                </button>
                </div>
                <ToContactList />
            </div>
        </div>
    );
};

export default ToContactListPage;
