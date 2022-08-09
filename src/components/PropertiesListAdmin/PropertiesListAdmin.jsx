import {
    PencilAltIcon,
    TrashIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePropertyAction } from "store/slice/properties/propertiesActions";
import Swal from "sweetalert2";

const STATE_PROPERTY = {
    1: "bg-green-100 text-sm",

};

const OFFER_MAP = {
    rent: "Arriendo",
    sell: "Venta",
};

const ESTATE_ITEMS = {
    0: "bg-yellow-50",
    1: "",
    2: "bg-red-50 text-red-700",
};

const PropertiesListAdmin = () => {
    const dispatch = useDispatch();
    const properties = useSelector(
        ({ properties }) => properties.properties?.results
    );
    const handleDeleteProperty = (id) => {
        Swal.fire({
            title: "¿Deseas eliminar este inmueble?",
            text: "Una vez este eliminado no podrás verlo en la web",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5046e5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                dispatch(deletePropertyAction(id));

            }
        });
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-slate-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            referencia
                        </th>
                        <th scope="col" className="px-6 py-3">
                            titulo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ciudad
                        </th>
                        <th scope="col" className="px-6 py-3">
                            tipo de inmueble
                        </th>
                        <th scope="col" className="px-6 py-3">
                            tipo de oferta
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                    {properties &&
                        properties.map((property, index) => (
                            <tr
                                key={index}
                                className={`border-b  dark:border-gray-600 border-gray-200 hover:bg-gray-50 ${
                                    ESTATE_ITEMS[property.stateId] || ""
                                }`}
                            >
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link

                                        to={`/admin/property/${property.idProperty}`}
                                        className="hover:text-indigo-500"
                                    >
                                        {property.reference}

                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link
                                        to={`/admin/property/${property.idProperty}`}
                                        className="hover:text-indigo-500"
                                    >
                                        {property.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {property.city}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {property.propertyType}
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {OFFER_MAP[property.offer]}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div
                                        className={`${
                                            STATE_PROPERTY[property.stateId]
                                        } py-0.5 rounded-xl px-2 text-sm`}
                                    >
                                        {property.state}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="flex gap-1 ">
                                        <button className=" hover:bg-gray-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link
                                                to={`/admin/property/${property.idProperty}`}
                                                className="text-xs "
                                            >
                                                Ver
                                            </Link>
                                        </button>
                                        <button className=" hover:bg-indigo-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link
                                                to={`/admin/editar-inmueble/${property.idProperty}`}
                                                className="text-xs "
                                            >
                                                <PencilAltIcon className="w-4 h-4" />
                                            </Link>
                                        </button>
                                        {property.stateId !== 2 && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteProperty(
                                                        property.idProperty
                                                    )
                                                }
                                                className=" hover:bg-red-500 py-1 px-2 text-xs rounded hover:text-white text-gray-500 transition duration-200 ease-in-out"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertiesListAdmin;
