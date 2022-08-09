import PropertyCard from "components/PropertyCard/PropertyCard";
import PropertyCardSkeleton from "components/PropertyCard/PropertyCardSkeleton";
import { useSelector } from "react-redux";

const PropertyList = () => {
    const properties = useSelector(
        ({ properties }: any) => properties.properties
    );
    const loading: any = useSelector(
        ({ properties }: any) => properties.loading
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
                <PropertyCardSkeleton />
            </div>
        );
    }

    if (properties && !properties.count) {
        return (
            <div className="p-3 text-sm text-yellow-900 bg-yellow-100 rounded-md shadow-sm">
                <p>No se encontraron resultado para mostrar</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties?.results &&
                properties.results.map((property: any) => (
                    <PropertyCard
                        key={property.idProperty}
                        property={property}
                    />
                ))}
        </div>
    );
};

export default PropertyList;
