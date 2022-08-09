import { useMemo, useState } from "react";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Checkbox from "shared/Checkbox/Checkbox";
import clientAxios from "config/axios";
import GoogleMapReact from "google-map-react";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import { useSelector } from "react-redux";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";

const FormviewProperty = () => {
    const { property, loading, msg } = useSelector(({ properties }) => properties);
    const [errors, setErrors] = useState({});
    const [departaments, setDepartaments] = useState([]);
    const [cities, setCities] = useState([]);


    useMemo(() => {
        const getDepartaments = async () => {
            const response = await clientAxios.get("/departaments");
            setDepartaments(response.data);
        };
        getDepartaments();
    }, []);
    useMemo(() => {
        const getCities = async () => {
            const response = await clientAxios.get("/cities");
            setCities(response.data);
        };
        getCities();
    }, [property.departament]);

    if (loading || departaments.length === 0 || cities.length === 0) {
        return (
            <div className="flex justify-center py-4">
                <SpinnerButton />
            </div>
        );
    }
    if (Object.keys(property).length === 0) {
        return (
            <div className="min-h-[300px]  flex flex-col items-center justify-center">
                <h1 className="text-2xl text-center font-bold">{msg}</h1>
               
            </div>
        );
    }

    return (
        <form encType="multipart/form-data">
            <div className="flex flex-col md:flex-row">

                <div className="flex-grow w-full mt-10 space-y-6 md:mt-0 md:pl-16">
                    <h3>Información del inmueble</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Reference </Label>
                            <Input
                                className="mt-1.5"
                                value={property.reference}
                                name="reference"
                                readOnly
                            />
                            {errors.reference && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.reference}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Title</Label>
                            <Input
                                className="mt-1.5"
                                value={property.title}
                                name="title"
                                readOnly
                            />
                            {errors.title && property.title === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="w-full">
                            <Label>Tipo de oferta </Label>
                            <Select
                                className="mt-1.5"
                                value={property.offerId}
                                name="offer"
                                readOnly
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="1">Venta</option>
                                <option value="2">Arriendo</option>
                            </Select>
                            {errors.offer && property.offer === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.offer}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Tipo de inmueble </Label>
                            <Select
                                className="mt-1.5"
                                value={property.propertyTypeId}
                                name="propertyType"
                                readOnly
                            >
                                <option hidden value="">
                                    {" "}
                                    Seleccione
                                </option>
                                <option value="1">Casa</option>
                                <option value="2">Apartamento</option>
                                <option value="3">Oficina</option>
                                <option value="4">Lote</option>
                            </Select>
                            {errors.propertyType &&
                                property.propertyType === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.propertyType}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Valor</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="$ 0"
                                value={property.price}
                                name="price"
                                readOnly
                            />
                            {errors.price &&
                                (property.price === "" ||
                                    property.price === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.price}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Descuento</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="$ 0"
                                value={property.saleOff}
                                name="saleOff"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="w-full">
                            <Label>Departamento </Label>
                            <Select
                                className="mt-1.5"
                                value={property.idDepartament}
                                name="departament"
                                readOnly
                            >
                                <option hidden value="">
                                    Seleccione un departamento
                                </option>
                                {departaments &&
                                    departaments.map((departament) => (
                                        <option
                                            key={departament.idDepartament}
                                            value={departament.idDepartament}
                                        >
                                            {departament.departament}
                                        </option>
                                    ))}
                            </Select>
                            {errors.departament &&
                                property.departament === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.departament}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Ciudad</Label>
                            <Select
                                className="mt-1.5"
                                value={property.cityId}
                                name="city"
                                readOnly
                            >
                                <option hidden value="">
                                    Seleccione un aciudad
                                </option>
                                {cities &&
                                    cities.map((city) => (
                                        <option
                                            key={city.cityId}
                                            value={city.cityId}
                                        >
                                            {city.city}
                                        </option>
                                    ))}
                            </Select>
                            {errors.city && property.city === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Barrio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="barrio donde esta ubicado el inmuble"
                                name="neighborhood"
                                value={property.neighborhood}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Direccion</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="address"
                                value={property.address}
                                readOnly
                            />
                        </div>

                        <div className="w-full">
                            <Label>Edificio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="building"
                                value={property.building}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                        <div className="w-full">
                            <Label>Area (m²) </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="area del inmuble"
                                name="area"
                                value={property.area}
                                readOnly
                            />
                            {errors.area &&
                                (property.area === "" ||
                                    property.area === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.area}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>estrato</Label>
                            <Select
                                className="mt-1.5"
                                value={property.stratum}
                                name="stratum"
                                readOnly
                            >
                                <option hidden value="">
                                    ninguno
                                </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Antiguedad</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="antiguedad del inmuble"
                                name="antiquityYears"
                                value={property.antiquityYears}
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <Label>Remodelaciones</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="remodelaciones del inmuble"
                                name="remodelation"
                                value={property.remodelation}
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <Label>Administración</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0000"
                                name="lastAdminprice"
                                value={property.lastAdminprice}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                        <div className="w-full">
                            <Label>Habitaciones </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="habitaciones del inmuble"
                                name="bedrooms"
                                value={property.bedrooms}
                                readOnly
                            />
                            {errors.bedrooms &&
                                (property.bedrooms === "" ||
                                    property.bedrooms === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.bedrooms}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Baños</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="bathrooms"
                                value={property.bathrooms}
                                readOnly
                            />
                            {errors.bathrooms && property.bathrooms === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.bathrooms}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Piso</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numFloor"
                                value={property.numFloor}
                                readOnly
                            />
                        </div>
                        <div className="w-full">
                            <Label>Asensores</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numElevators"
                                value={property.numElevators}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Garage</Label>
                            <Select
                                className="mt-1.5"
                                value={property.garage}
                                name="garage"
                                readOnly
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Parqueadero</Label>
                            <Select
                                className="mt-1.5"
                                value={property.parking}
                                name="parking"
                                readOnly
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                    </div>

                    <h3>Informacion de contacto</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Nombre del contacto </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="nombre del contacto"
                                name="contactName"
                                value={property.contactName}
                                readOnly
                            />
                            {errors.contactName &&
                                (property.contactName === "" ||
                                    property.contactName === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.contactName}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Email</Label>
                            <Input
                                className="mt-1.5"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                name="email"
                                value={property.email}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Celular</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="000 000 0000"
                                name="cellPhone"
                                value={property.cellPhone}
                                readOnly
                            />
                            {errors.cellPhone && property.cellPhone === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.cellPhone}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>telefono fijo</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="60 0 000  0000"
                                name="phone"
                                value={property.phone}
                                readOnly
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Publicar inmuble</Label>
                        <Checkbox
                            className="mt-1.5"
                            type="checkbox"
                            name="published"
                            defaultChecked={property.published}
                        />
                    </div>
                    <div>
                        <h3>Hubicación</h3>
                        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                            {!loading && (
                                <div className="overflow-hidden rounded-xl">
                                    <GoogleMapReact
                                        bootstrapURLKeys={{
                                            key: "AIzaSyDkDFnRyELEsM8J-lfKlKEq0zc0HQZzkaU",
                                        }}
                                        yesIWantToUseGoogleMapApiInternals
                                        defaultZoom={15}
                                        center={{
                                            lat: property?.latitude,
                                            lng: property?.longitude,
                                        }}
                                    >
                                        <LocationMarker
                                            lat={property?.latitude}
                                            lng={property?.longitude}
                                        />
                                    </GoogleMapReact>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3>Imagenes</h3>
                        <div className="grid grid-cols-2 justify-center gap-4 py-4 lg:justify-start">
                            {property.galleryImgs &&
                                property.galleryImgs.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden bg-gray-200 rounded shadow h-80 "
                                    >
                                        {
                                            <img
                                                className="object-contain object-center"
                                                src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${image}`}
                                            />
                                        }
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormviewProperty;
