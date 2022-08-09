import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { FC, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { useSearchParams } from "hooks/useSearchParams";
import { fetchAllProperties } from "../../store/slice/properties/propertiesActions";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "hooks/useDebounce";
import {
    fetchAllCitiesAction,
    fetchAllCitieswhitPropetiesAction,
} from "store/slice/cities/citiesActions";
import { useLocation } from "react-router-dom";

export interface ListingStayPageProps {
    className?: string;
}

const SalesPropertiesPage: FC<ListingStayPageProps> = ({ className = "" }) => {
    const location = useLocation();
    const dispatch: any = useDispatch();
    const filters: any = useSelector(
        ({ properties }: any) => properties.filters
    );
    const debouncedFilters = useDebounce<string>(filters, 500);

    const CATEGORY: any = {
        arriendo: "rent",
        venta: "sell",
    };

    let category = location.pathname.split("/")[1];

    const categoryProperty: any = CATEGORY[category];

    useEffect(() => {
        dispatch(fetchAllProperties(debouncedFilters, categoryProperty));
    }, [debouncedFilters]);

    useEffect(() => {
        (() =>
            dispatch(fetchAllCitieswhitPropetiesAction(CATEGORY[category])))();
    }, []);

    return (
        <div
            className={`nc-ListingStayPage relative overflow-hidden ${className}`}
            data-nc-id="ListingStayPage"
        >
            <Helmet>
                <title>{`${
                    categoryProperty === "rent"
                        ? "Arriendo de apartamentos"
                        : "Venta de apartamentos"
                }`}</title>
            </Helmet>
            <BgGlassmorphism />

            <div className="container relative overflow-hidden">
                {/* SECTION HERO */}
                {/* <SectionHeroArchivePage
          currentPage="Stays"
          currentTab="Stays"
          className="pt-10 pb-24 lg:pb-32 lg:pt-16 "
        /> */}

                {/* SECTION */}
                <SectionGridFilterCard
                    className="pb-24 lg:pb-32"
                    categoryProperty={categoryProperty}
                />

                {/* SECTION 1 */}
                {/* <div className="relative py-16">
                  <BackgroundSection />
                  <SectionSliderNewCategories
                      heading="Explore by types of stays"
                      subHeading="Explore houses based on 10 types of stays"
                      categoryCardType="card5"
                      itemPerRow={5}
                      sliderStyle="style2"
                      uniqueClassName="ListingStayMapPage"
                  />
              </div> */}

                {/* SECTION */}
                <SectionSubscribe2 className="py-24 lg:py-32" />

                {/* SECTION */}
                {/* <div className="relative py-16 mb-24 lg:mb-32">
                  <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
                  <SectionGridAuthorBox />
              </div> */}
            </div>
        </div>
    );
};

export default SalesPropertiesPage;
