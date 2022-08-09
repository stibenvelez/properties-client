import { HomeIcon } from "@heroicons/react/solid";
import PropertiesListAdmin from "components/PropertiesListAdmin/PropertiesListAdmin";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { fetchAllPropertiesByUser } from "store/slice/properties/propertiesActions";

const PropertiesPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (() => dispatch(fetchAllPropertiesByUser()))();
    }, []);

    const { loading } = useSelector(({ properties }) => properties);

    if (loading)
        return (
            <div className="w-full py-10 flex justify-center items-center">
                <SpinnerButton />
            </div>
        );
    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-8 pb-24 lg:pb-32">
                <div className="space-y-6 sm:space-y-8">
                    <div className="space-y-2">
                        <div>
                            <h1 className="text-3xl font-semibold">
                                Lista de inmuebles
                            </h1>
                            <p className="text-sm text-gray-600">
                                Lista de los inmuebles creadosy sus diferentes
                                estados
                            </p>
                        </div>
                        <div className="flex">
                            <Link
                                to="/admin/nuevo-inmueble"
                                className="bg-indigo-600 py-1 px-2 hover:bg-indigo-500 text-white rounded-md flex gap-1 "
                            >
                                <HomeIcon className="h-5 w-5"/> Registrar inmueble
                            </Link>
                        </div>
                    </div>
                    <PropertiesListAdmin />
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
