import React from "react";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

export interface Heading2Props {
    heading?: ReactNode;
    subHeading?: ReactNode;
    className?: string;
    properties?: any;
}

const Heading2: React.FC<Heading2Props> = ({
    className = "",
    heading,
    subHeading,
}) => {
    const properties = useSelector(
        ({ properties }: any) => properties.properties
    );
    return (
        <div className={`mb-12 lg:mb-16 ${className}`}>
            <h2 className="text-4xl font-semibold">{heading}</h2>
            {subHeading ? (
                subHeading
            ) : (
                <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                    {properties?.count} propiedades
                </span>
            )}
        </div>
    );
};

export default Heading2;
