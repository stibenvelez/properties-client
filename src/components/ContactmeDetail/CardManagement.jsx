import {
    PhoneMissedCallIcon,
    XCircleIcon,
    XIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/solid";
import { formatDate, formatDateTime } from "helpers/formatDate";
import { useState } from "react";
import STATES_CARD from "./utils/statesCard";

const CardManagement = ({ management }) => {
    const [isObservationOpen, setIsObservationOpen] = useState(true);
    return (
        <div
            className={`bg-green-100 rounded shadow py-2 px-3 min-h-[40px] flex gap-2 items-center ${
                STATES_CARD[management.state].style
            }`}
        >
            <div className="h-6 w-6 dark:text-gray-800">
                {STATES_CARD[management.state].icon}
            </div>
            <div className="w-full">
                <p className="dark:text-gray-800 text-sm font-bold">
                    {management.state}
                </p>
                {management.observations && <>
                    <div
                    className={`text-left overflow-hidden hover:cursor-pointer transition-all divide-blue-200 ease-in-out ${
                        isObservationOpen ? "max-h-10" : "h-full"
                    }`}
                >
                    <p className={`dark:text-gray-800 text-sm`}>
                        {management.observations}
                    </p>
                </div>
                <button
                    className="text-sm hover:text-indigo-500 font-bold"
                    onClick={() => setIsObservationOpen(!isObservationOpen)}
                >
                    {isObservationOpen ? "Ver mas" : "Ver menos"}
                    </button>
                </>}

                <p className="dark:text-gray-800 text-xs">
                    {formatDateTime(management.updatedAt)}
                </p>
                <p className="dark:text-gray-800 text-xs">
                    {management.firstName}
                </p>
            </div>
        </div>
    );
};

export default CardManagement;
