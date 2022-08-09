import { PencilAltIcon } from "@heroicons/react/outline";
import FormviewProperty from "components/FormViewProperty/FormViewProperty";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPropertyByIdByUserId } from "store/slice/properties/propertiesActions";

const PropertyDetailAdminPage = () => {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {        
            dispatch(getPropertyByIdByUserId(id));
    }, []);

    const renderSection1 = () => {
        return (
            <div className="space-y-4 sm:space-y-4">
                <div>
                    <h2 className="text-3xl font-semibold">
                        Informacion del inmueble
                    </h2>
                    <p>Este es el detalle del inmueble</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => history.goBack()}
                        className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-400"
                    >
                        Volver
                    </button>
                    <Link
                        to={`/admin/editar-inmueble/${id}`}
                        className="text-indigo-400 py-1 px-1 rounded hover:text-indigo-600"
                    >
                        <PencilAltIcon className="h-6 w-6" />
                    </Link>
                </div>
                <FormviewProperty />
            </div>
        );
    };
    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-8 pb-24 lg:pb-32">
                {renderSection1()}
            </div>
        </div>
    );
};

export default PropertyDetailAdminPage;
