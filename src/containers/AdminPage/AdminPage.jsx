import FormUploadCSV from "components/FormUploadCSV/FormUploadCSV";
import FormUploadImages from "components/FormUploadImages/FormUploadImages";
import { Helmet } from "react-helmet";

const AdminPage = () => {
    return (
        <div className="">
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <div className="container lg:p-4 ">
                <div className="flex flex-col">
                    <div className="mb-4">
                        <h2 className="mb-4 text-xl font-medium text-gray-800 dark:dark:text-gray-50">
                            Importar datos csv:
                        </h2>
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 dark:text-white">
                                Importe las propiedades por medio de un archivo
                                en formato csv.
                                <br />
                                Algunas consideraciones: <br />
                                <strong>1.</strong> La columna de referencia,
                                título, descripción, precio y ciudad son
                                obligatorias.
                                <br />
                                <strong>2.</strong> Las imágenes para cada
                                propiedad se importan aparte, permite máximo 6
                                imágenes para mostrar. Indique el nombre de cada
                                archivo incluyendo el formato. por ejemplo{" "}
                                <strong>
                                    Apartamento-medellin-imagen1.jpg
                                </strong>
                                . De esta forma en cada columna. Recuerde que
                                las imágenes que vaya a importar después deben
                                coincidir
                                <br />
                                Puede descargar la plantilla en el siguiente
                                link:{" "}
                            </p>
                            <a
                                className="font-semibold text-indigo-700 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                                href={`${process.env.REACT_APP_API_URL}/files/plantilla_propiedades.csv`}
                            >
                                Descargar plantilla
                            </a>
                        </div>
                        <FormUploadCSV />
                    </div>
                    <div className="mb-4">
                        <h2 className="mb-4 text-xl font-medium text-gray-800 dark:text-white">
                            Importar imagenes:
                        </h2>
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 dark:text-gray-50">
                                Una vez las propiedades estén en la base de
                                datos, puede importar las imagenes en formato{" "}
                                <strong>jpg</strong> Las imágenes deben tener el
                                mismo nombre con el que se registro en la base
                                de datos.
                                <br />
                                Recuerde, solo se admite formato jpg.
                            </p>
                        </div>
                        <FormUploadImages />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
