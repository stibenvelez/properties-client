import { CheckCircleIcon, MinusCircleIcon, PhoneMissedCallIcon, XCircleIcon } from "@heroicons/react/outline";


const STATES_CARD = {
    "Sin contactar": {
        style: "bg-yellow-200 text-yellow-800",
        icon: <MinusCircleIcon />,
    },
    Contactado: {
        style: "bg-green-200 text-green-800",
        icon: <CheckCircleIcon />,
    },
    "No responde": {
        style: "bg-red-200 text-red-800",
        icon: <PhoneMissedCallIcon />,
    },
    Descartado: {
        style: "bg-gray-200 text-gray-800",
        icon: <XCircleIcon />,
    },
};

export default STATES_CARD;
