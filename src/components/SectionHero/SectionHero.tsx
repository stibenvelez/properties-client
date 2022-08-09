import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import { useHistory } from "react-router-dom";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  const history = useHistory()
  return (
      <div
          className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
          data-nc-id="SectionHero"
      >
          <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="flex flex-col items-start flex-shrink-0 space-y-8 lg:w-1/2 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
                  <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
                      El inmueble que buscas, aquí
                  </h2>
                  <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                      Si busca casa, apartamento, local o quieres vender tu
                      inmueble, tenemos las mejores opciones para ti.
                  </span>
                  <ButtonPrimary
                      onClick={() => history.push("/venta")}
                  >
                      Buscar
                  </ButtonPrimary>
              </div>
              <div className="flex-grow">
                  <img className="w-full" src={imagePng} alt="hero" />
              </div>
          </div>

          <div className="z-10 w-full mb-12 lg:mb-0 lg:-mt-40">
              <HeroSearchForm />
          </div>
      </div>
  );
};

export default SectionHero;
