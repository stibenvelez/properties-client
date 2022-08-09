
import FormNewProperty from "components/FormNewProperty/FormNewProperty";
import { useHistory } from "react-router-dom";

const NewPropertyPage = () => {
    const history = useHistory();
    const renderSection1 = () => {
        return (
            <div className="space-y-6 sm:space-y-8">
                <div>
                    <h2 className="text-3xl font-semibold">
                        Registra un inmuble
                    </h2>
                    <p>Registre aqui un nuevo inmueble</p>
                </div>
                <FormNewProperty />
            </div>
        );
    };

    return (
        <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="container pt-4 sm:pt-8 pb-24 lg:pb-32">
                <div>
                    <button
                        onClick={() => history.goBack()}
                        className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-500"
                    >
                        Volver
                    </button>
                </div>
                {renderSection1()}
            </div>
        </div>
    );
};

export default NewPropertyPage;
