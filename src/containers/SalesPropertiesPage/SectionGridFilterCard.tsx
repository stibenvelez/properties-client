import { FC } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import PropertyList from "./PropertyList";

export interface SectionGridFilterCardProps {
    className?: string;
    setFilters?: any;
    filters?: any;
    categoryProperty?: string;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
    className = "",
    categoryProperty,
}) => {
    return (
        <div
            className={`nc-SectionGridFilterCard ${className}`}
            data-nc-id="SectionGridFilterCard"
        >
            <Heading2
                heading={`${
                    categoryProperty === "rent"
                        ? "Arriendo de apartamentos"
                        : "Venta de apartamentos"
                }`}
            />

            <div className="mb-8 lg:mb-11">
                <TabFilters />
            </div>
            <PropertyList />

            {/* <div className="flex items-center justify-center mt-16">
        <Pagination />
      </div> */}
        </div>
    );
};

export default SectionGridFilterCard;
