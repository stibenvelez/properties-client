import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { uploadImagesAction} from "store/slice/properties/propertiesActions";
import Swal from "sweetalert2";

const FormUploadImages = () => {
    const dispatch = useDispatch();
    const [files, setFiles] = useState({});

    const { loadingUploadImages } = useSelector(
        ({ properties }) => properties
    );

    const handleChange = (e) => {
        setFiles(e.target.files);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!files) {
                Swal.fire({
                    title: "Seleccione un archivo",
                    text: "Debe seleccionar un archivo formato .csv",
                    icon: "error",
                });
                return;
            }
            const data = new FormData();
            const appendedFiles = [...files].map(
                (file) => data.append("files", file)
            )
            data.append("files", appendedFiles);
            dispatch(uploadImagesAction(data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="bg-whiterounded-lg">
            <form onSubmit={handleSubmit} encType="multipar/form-data">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col p-4 border border-gray-200 rounded-md shadow-sm dark:border-slate-600 border-1">
                        <label className="flex justify-center w-full px-4 py-10 border-2 border-green-200 border-dashed cursor-pointer dark:border-slate-600 bg-green-50 dark:bg-slate-900 ">
                            <input
                                type="file"
                                className="text-sm cursor-pointer text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:cursor-pointer hover:file:bg-green-800 hover:file:text-white underline-none focus-border-green-200 focus:green-green-500 focus:shadow-outline "
                                onChange={handleChange}
                                value={files && files.filename}
                                multiple
                            />
                        </label>
                       
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <ButtonPrimary type="submit" className="p-2">
                            {loadingUploadImages && <SpinnerButton />}
                            {loadingUploadImages
                                ? "importando"
                                : "Importar imagenes"}
                        </ButtonPrimary>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormUploadImages;
