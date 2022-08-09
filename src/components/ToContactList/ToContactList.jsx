import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { formatDate, formatDateTime } from "helpers/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { discartContactAction } from "store/slice/contact/contact.actions";

const MAP_STATE_CONTACT = {
    "1": {
        style: "bg-red-100",
    },
    "2": {
        style: "bg-green-100",
    },
    "3": {
        style: "bg-yellow-100",
    },
   "4": {
        style: "bg-gray-100",
    },
};

const ToContactList = () => {
    const dispatch = useDispatch();
    const toContactList = useSelector(({ contact }) => contact.toContactList);

    const handleDeleteProperty = (id) => {
        dispatch(discartContactAction(id));
    };
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mensaje
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
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
                    {toContactList &&
                        toContactList.map((toContact, index) => (
                            <tr
                                key={index}
                                className={`border-b  dark:border-gray-600 border-gray-200 dark:hover:bg-slate-700 hover:bg-gray-50 ${toContact.firstName}`}
                            >
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div>
                                        <Link
                                            to={`/admin/property/${toContact.id}`}
                                            className="hover:text-indigo-500 text-lg"
                                        >
                                            {toContact.firstName}{" "}
                                            {toContact.lastName}
                                        </Link>
                                    </div>
                                    <p className="text-sm">{toContact.email}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap max-w-md">
                                    <p className="truncate">
                                        {toContact.message}
                                    </p>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {formatDate(toContact.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    {console.log(
                                        MAP_STATE_CONTACT[toContact.stateId]
                                            .style
                                    )}
                                    <p
                                        className={`py-1 px-2 rounded-full text-xs text-center ${
                                            MAP_STATE_CONTACT[toContact.stateId]
                                                .style
                                        }`}
                                    >
                                        {toContact.state}
                                    </p>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="flex gap-1 ">
                                        <Link
                                            to={`to-contact/${toContact.id}`}
                                            className="text-xs
                                                hover:bg-gray-500 py-1 px-2
                                                rounded hover:text-white
                                                text-gray-500 transition
                                                duration-200 ease-in-out"
                                        >
                                            Ver
                                        </Link>
                                        {/* <button className=" hover:bg-indigo-500 py-1 px-2 rounded hover:text-white text-gray-500 transition duration-200 ease-in-out">
                                            <Link to={`#`} className="text-xs ">
                                                <PencilAltIcon className="w-4 h-4" />
                                            </Link>
                                        </button> */}
                                        {toContact.stateId !== 4 && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteProperty(
                                                        toContact.id
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

export default ToContactList;
