import Label from "components/Label/Label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import { createContactManagementAction } from "store/slice/contact/contact.actions";
import { validateFormManagement } from "./utils/FormValidation";

const INITIAL_STATE_MANAGEMENT = {
    observations: "",
    state: "",
    id: "",
};

const FormUpdateContact = ({setIsOpen}) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [management, setManagement] = useState(INITIAL_STATE_MANAGEMENT);
    const [errors, setErrors] = useState({});
    const { toContact, loading, error, msg } = useSelector(
        ({ contact }) => contact
    );

    const handleChange = (e) => {
        setManagement({ ...management, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        management.id = id;
        const errors = await validateFormManagement(management);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return
        }
        setErrors({});
        dispatch(createContactManagementAction(management));
        setIsOpen(false);
    };

    return (
        <div className="">
            <h2 className="text-center mb-2 font-bold dark:text-white">
                Registrar Gestión
            </h2>
            <div className="grid space-y-4">
                <div className="w-full">
                    <Label>
                        Estado <span className="text-red-500"> *</span>
                    </Label>
                    <Select
                        className="mt-1.5 dark:text-white"
                        value={management.state}
                        name="state"
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        <option value="1">Sin contactar</option>
                        <option value="2">Contactado</option>
                        <option value="3">No responde</option>
                        <option value="4">Descartado</option>
                    </Select>
                    {errors.state && management.state === "" && (
                        <p className="text-red-500 text-xs">{errors.state}</p>
                    )}
                </div>
                <div className="w-full">
                    <Label>Observaciones</Label>
                    <Textarea
                        className="mt-1.5 w-full dark:text-white"
                        value={management.observations}
                        name="observations"
                        onChange={handleChange}
                    />
                </div>
                <div className="py-2 flex gap-2">
                    <button
                        type="button"
                        className="bg-indigo-600 text-white py-1 px-4 rounded hover:bg-indigo-500"
                        onClick={handleSubmit}
                    >
                        Registrar
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormUpdateContact;
