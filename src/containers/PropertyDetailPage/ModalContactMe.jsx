import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";

import HIW3img from "../../images/HIW2-2.png";
import FormContactMe from "./FormContactMe";

const ModalContactMe = ({ isOpen, setIsOpen, property }) => {
    const history = useHistory();

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4 ">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="mx-auto  max-w-[800px] rounded bg-white dark:bg-slate-800">
                        <div className="lg:p-8 px-2 py-4">
                            <h3 className="text-center text-3xl font-bold text-indigo-500">
                                ¿Estas interesado en este inmueble?
                            </h3>
                            <p className="text-center text-gray-700 dark:text-white">
                                Llena los siguientes datos y un asesor se pondra
                                en contacto contigo cuanto antes.
                            </p>
                            <div className="flex justify-center mt-4">
                                <FormContactMe
                                    property={property}
                                    setIsOpen={setIsOpen}
                                />
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ModalContactMe;
