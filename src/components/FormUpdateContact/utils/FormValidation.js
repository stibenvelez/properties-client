

export const validateFormManagement = async (values) => {
    const errors = {};
    if (values.state === "") {
        errors.state = "Ingrese un estado de gestion";
    }
    return errors;
};