import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { uploadPropertiescsvAction } from "store/slice/properties/propertiesActions";
import Swal from "sweetalert2";

const FormUploadCSV = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState({});

    const { response, loadingUploadCsv } = useSelector(
        ({ properties }) => properties
    );

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                !file ||
                file.type !== "text/csv" 
            ) {
                Swal.fire({
                    title: "Seleccione un archivo",
                    text: "Debe seleccionar un archivo formato .csv",
                    icon: "error",
                });
                return;
            }
            const data = new FormData();
            data.append("file", file);
            dispatch(uploadPropertiescsvAction(data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="mb-8 bg-whiterounded-lg">
            <form onSubmit={handleSubmit} encType="multipar/form-data">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col p-4 border border-gray-200 rounded-md shadow-sm dark:border-slate-600 border-1">
                        <label className="flex justify-center w-full px-4 py-10 border-2 border-indigo-200 border-dashed cursor-pointer dark:border-slate-600 bg-indigo-50 dark:bg-slate-900 ">
                            <input
                                type="file"
                                className="text-sm cursor-pointer text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:cursor-pointer hover:file:bg-indigo-800 hover:file:text-white underline-none focus-border-indigo-200 focus:outline-indigo-500 focus:shadow-outline "
                                onChange={handleChange}
                                value={file && file.filename}
                            />
                        </label>
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <ButtonPrimary type="submit" className="p-2">
                            {loadingUploadCsv && <SpinnerButton />}
                            {loadingUploadCsv ? "importando" : "Importar datos"}
                        </ButtonPrimary>
                    </div>

                    {response && response.errors && (
                        <div className="p-4 text-xs text-red-500 border rounded-md shadow-sm border-1 bg-gray-50">
                            <h3 className="text-xl font-bold text-center text-gray-700">
                                Lista de errores
                            </h3>
                            <p className="text-center text-gray-800">
                                {response.msg}
                            </p>
                            {response.errors &&
                                response.errors.map((error) => (
                                    <div className="flex flex-col gap-2 p-2 ">
                                        <div className="flex gap-2">
                                            {error?.reference && (
                                                <>
                                                    <label className="font-bold">
                                                        Referencia:
                                                    </label>
                                                    <p>{error?.reference}</p>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="font-bold">
                                                Columna:
                                            </label>
                                            <p>{error?.column}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <label className="font-bold">
                                                Error:
                                            </label>
                                            <p>{error?.error}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormUploadCSV;
