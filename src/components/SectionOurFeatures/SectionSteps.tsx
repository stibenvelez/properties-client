import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import ncImg from "./Video tutorial _Outline.svg";
import ImgMap from "./bx-map.svg";
import ImgCalendar from "./bx-calendar-alt.svg";
import ImgCheckfrom from "./bx-list-check.svg";
import ImgMoney from "./bx-money-withdraw.svg";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export interface SectionOurFeaturesProps {
    className?: string;
    rightImg?: string;
    type?: "type1" | "type2";
}

const SectionSteps: FC<SectionOurFeaturesProps> = ({
    className = "lg:py-14",
    rightImg = rightImgPng,
    type = "type1",
}) => {
    return (
        <div
            className={`nc-SectionOurFeatures relative flex flex-col items-center ${
                type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
            } ${className}`}
            data-nc-id="SectionOurFeatures"
        >
            <div className="flex-grow">
                <NcImage src={ncImg} />
            </div>
            <div
                className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-3/5 ${
                    type === "type1" ? "lg:pl-16" : "lg:pr-16"
                }`}
            >
                <span className="text-sm tracking-widest text-gray-400 uppercase">
                    ¿QUIERES VENDER CON NOSOTROS?
                </span>
                <h2 className="mt-5 text-4xl font-semibold">
                    Estos son los pasos
                </h2>

                <ul className="mt-5 border border-blue-200 rounded-md ">
                    <li className="p-4 border-b border-blue-200">
                        <div className="flex gap-4 p-2">
                            <div className="p-2">
                                <div className="p-3 bg-indigo-100 rounded w-14 ">
                                    <img
                                        src={ImgMap}
                                        alt="icon-oferta"
                                        className="w-full text-indigo-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="block text-lg font-semibold">
                                    1. Cuentanos todo sobre tu inmueble y
                                    solicitas la oferta
                                </span>
                                <Disclosure>
                                    {({ open = true }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full px-4 py-2 text-sm font-medium text-left text-indigo-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                                <span>
                                                    {open
                                                        ? "Menos detalles"
                                                        : "Más detalles"}
                                                </span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        !open
                                                            ? "rotate-180 transform"
                                                            : ""
                                                    } h-5 w-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                                                <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
                                                    Recuerda indicarnos la
                                                    dirección, características
                                                    del inmueble como mt², años
                                                    de antigüedad, piso, etc.
                                                </span>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    </li>
                    <li className="p-4 border-b border-blue-200">
                        <div className="flex gap-4 p-2">
                            <div className="p-2">
                                <div className="p-3 bg-indigo-100 rounded w-14">
                                    <img
                                        src={ImgCalendar}
                                        alt="icon-oferta"
                                        className="w-full text-indigo-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <span className="block text-lg font-semibold">
                                    2. Te enviaremos la oferta inicial y
                                    programamos una visita
                                </span>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full px-4 py-2 text-sm font-medium text-left text-indigo-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                                <span>
                                                    {open
                                                        ? "Menos detalles"
                                                        : "Más detalles"}
                                                </span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        !open
                                                            ? "rotate-180 transform"
                                                            : ""
                                                    } h-5 w-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                                                <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
                                                    Recibimos tu solicitud y si
                                                    tu inmueble cumple con las
                                                    caracterisitcas uno de
                                                    nuestros asesores te llamará
                                                    para contarte la oferta
                                                    inicial y agendar una
                                                    visita.
                                                </span>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    </li>
                    <li className="p-4 border-b border-blue-200">
                        <div className="flex gap-4 p-2">
                            <div className="p-2">
                                <div className="p-3 bg-indigo-100 rounded w-14">
                                    <img
                                        src={ImgCheckfrom}
                                        alt="icon-oferta"
                                        className="w-full text-indigo-600"
                                    />
                                </div>{" "}
                            </div>

                            <div>
                                <span className="block text-lg font-semibold">
                                    3. Firmamos los acuerdos y reciber el
                                    anticipo
                                </span>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full px-4 py-2 text-sm font-medium text-left text-indigo-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                                <span>
                                                    {open
                                                        ? "Menos detalles"
                                                        : "Más detalles"}
                                                </span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        !open
                                                            ? "rotate-180 transform"
                                                            : ""
                                                    } h-5 w-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                                                <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
                                                    Si después de la visita
                                                    confirmamos la oferta y si
                                                    la aceptas, firmamos el
                                                    acuerdo y te entregamos un
                                                    anticipo.
                                                </span>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    </li>
                    <li className="p-4 border-blue-200">
                        <div className="flex gap-4 p-2">
                            <div className="p-2">
                                <div className="p-3 bg-indigo-100 rounded w-14">
                                    <img
                                        src={ImgMoney}
                                        alt="icon-oferta"
                                        className="w-full text-indigo-600"
                                    />
                                </div>{" "}
                            </div>
                            <div>
                                <span className="block text-lg font-semibold">
                                    4. Entregas el inmueble y desembolsamos
                                </span>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full px-4 py-2 text-sm font-medium text-left text-indigo-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                                                <span>
                                                    {open
                                                        ? "Menos detalles"
                                                        : "Más detalles"}
                                                </span>
                                                <ChevronUpIcon
                                                    className={`${
                                                        !open
                                                            ? "rotate-180 transform"
                                                            : ""
                                                    } h-5 w-5 text-purple-500`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                                                <span className="block mt-5 text-sm text-neutral-500 dark:text-neutral-400">
                                                    Durante todo el proceso te
                                                    acompañara uno de nuestros
                                                    expertos y una vez realizado
                                                    el proceso de escrituración
                                                    realizaremos el desembolso
                                                    del valor restante.
                                                </span>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SectionSteps;
