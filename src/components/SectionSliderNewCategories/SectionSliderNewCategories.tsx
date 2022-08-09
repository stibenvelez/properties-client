import { FC, useEffect, useMemo, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { TaxonomyType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import NextPrev from "shared/NextPrev/NextPrev";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import useNcId from "hooks/useNcId";
import ModalCategory from "components/SectionSliderNewCategories/ModalCategory";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Ciudades",
  subHeading = "Encuentra el inmueble lo que buscas en las principales ciudades",
  className = "",
  itemClassName = "",
  categories,
  itemPerRow = 5,
  categoryCardType = "card3",
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [citySelected, setCitySelected] = useState({
    city: "",
    value: "",
  });

  const UNIQUE_CLASS =
    "SectionSliderNewCategories__" + uniqueClassName + useNcId();

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  const renderCard = (item: TaxonomyType, index: number) => {
    switch (categoryCardType) {
      case "card3":
        return (
            <CardCategory3
                setIsOpen={setIsOpen}
                taxonomy={item}
                setCitySelected={setCitySelected}
            />
        );
      case "card4":
        return <CardCategory4 isOpen={isOpen} setIsOpen={setIsOpen} taxonomy={item} />;
      case "card5":
        return <CardCategory5 isOpen={isOpen} setIsOpen={setIsOpen} taxonomy={item} />;
      default:
        return (
            <CardCategory3
                setIsOpen={setIsOpen}
                taxonomy={item}
                setCitySelected={setCitySelected}
            />
        );
    }
  };

  return (
      <div className={`nc-SectionSliderNewCategories ${className}`}>
          <div className={`${UNIQUE_CLASS} flow-root`}>
              <Heading
                  desc={subHeading}
                  hasNextPrev={sliderStyle === "style1"}
                  isCenter={sliderStyle === "style2"}
              >
                  {heading}
              </Heading>
              <div className="glide__track" data-glide-el="track">
                  <ul className="glide__slides">
                      {categories &&
                          categories.map((item, index) => (
                              <li
                                  key={index}
                                  className={`glide__slide ${itemClassName}`}
                              >
                                  {renderCard(item, index)}
                              </li>
                          ))}
                  </ul>
              </div>
              <ModalCategory
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  citySelected={citySelected}
              />
              {sliderStyle === "style2" && (
                  <NextPrev className="justify-center mt-16" />
              )}
          </div>
      </div>
  );
};

export default SectionSliderNewCategories;
