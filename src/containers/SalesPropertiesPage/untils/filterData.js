export const getFilterValues = (filterValues) => {
    const {
        propertyType,
        city
    } = filterValues;

    const values = [
        {
            name: "propertyType",
            value: propertyType,
        },
        {
            name: "city",
            value: city,
        },
    ];

    return values;
};
