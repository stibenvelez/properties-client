import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Checkbox from "shared/Checkbox/Checkbox";
import {
    INITIAL_STATE_NEW_PROPERTY,
    TEST_INITIAL_STATE_NEW_PROPERTY,
} from "./utils";
import clientAxios from "config/axios";
import GoogleMapReact from "google-map-react";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import { formValidate } from "./utils/FormValidate";
import { CheckIcon, TrashIcon } from "@heroicons/react/solid";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
    createPropertyAction,
    updatePropertyAction,
} from "store/slice/properties/propertiesActions";
import { Link, useParams } from "react-router-dom";

const FormEditProperty = () => {
    const dispatch = useDispatch();
    const property = useSelector(({ properties }) => properties.property);

    const [editedProperty, setEditedProperty] = useState({});
    const [errors, setErrors] = useState({});
    const [departaments, setDepartaments] = useState([]);
    const [cities, setCities] = useState([]);
    const inputFilesRef = useRef();

    useEffect(() => {
        setEditedProperty(property);
    }, [property]);

    const handleOnChange = (data) => {
        setEditedProperty({
            ...editedProperty,
            [data.name]: data.value,
        });
    };

    const handleImages = (e) => {
        const { files } = e.target;
        const images = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            file.id = Math.random().toString(36);
            images.push(file);
        }
        const limitImages = editedProperty.galleryImgs
            .concat(images)
            .slice(0, 6);

        setEditedProperty({
            ...editedProperty,
            galleryImgs: limitImages,
        });
    };

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
            let filteredCities = response.data.filter(
                (city) =>
                    city.IdDepartament === editedProperty.idDepartament * 1
            );
            setCities(filteredCities);
        };
        getCities();
    }, [editedProperty.idDepartament]);

    useEffect(() => {
        (async () => {
            try {
                if (editedProperty.reference === "") {
                    return false;
                }
                const res = await clientAxios.get(
                    `properties?reference=${editedProperty.reference}`
                );

                if (
                    res.data.results.length > 0 &&
                    property.reference !== res.data.results[0].reference
                ) {
                    setErrors({
                        ...errors,
                        reference: "La referencia ya existe",
                    });
                    return;
                }

                setErrors({
                    ...errors,
                    reference: "",
                });
            } catch (error) {
                setErrors({
                    ...errors,
                    reference: "",
                });
                console.log(error);
            }
        })();
    }, [editedProperty.reference]);

    const handleDeleteImage = (item) => {
        const newArrayImages = editedProperty.galleryImgs.filter(
            (file) => file !== item
        );

        setEditedProperty({
            ...editedProperty,
            galleryImgs: newArrayImages,
        });
    };
    /*
    useEffect(() => {
        if (editedProperty?.galleryImgs.length === 0) {
            inputFilesRef.current.value = "";
        }
    }, [editedProperty.galleryImgs]);
*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await formValidate(editedProperty);
        if (Object.keys(result).length > 0) {
            setErrors(result);
            Swal.fire({
                icon: "error",
                title: "Faltan campos por llenar",
                text: "Verifique que todos los campos obligatorios se encuentren diligenciados",
            });
            return;
        }
        setErrors({});
        dispatch(updatePropertyAction(editedProperty));
        //setEditedProperty(INITIAL_STATE_NEW_PROPERTY);
    };

    const RenderImgPreviw = (image) => {
        if (typeof image === "string") {
            return (
                <img
                    className="object-contain object-center"
                    src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${image}`}
                />
            );
        }
        if (typeof image === "object") {
            return (
                <img
                    className="object-contain object-center"
                    src={URL.createObjectURL(image)}
                />
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow w-full mt-10 space-y-6 md:mt-0 md:pl-16">
                    <h3>Información del inmueble</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Reference{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                value={editedProperty.reference}
                                defaultValue={property.reference}
                                name="reference"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.reference && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.reference}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Title <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                value={editedProperty.title}
                                name="title"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.title && editedProperty.title === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="w-full">
                            <Label>
                                Tipo de oferta{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.offerId}
                                name="offerId"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="1">Venta</option>
                                <option value="2">Arriendo</option>
                            </Select>
                            {errors.offer && editedProperty.offer === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.offer}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Tipo de inmueble{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.propertyTypeId}
                                name="propertyTypeId"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option hidden value="">
                                    Seleccione
                                </option>
                                <option value="1">Casa</option>
                                <option value="2">Apartamento</option>
                                <option value="3">Oficina</option>
                                <option value="4">Lote</option>
                            </Select>
                            {errors.propertyType &&
                                editedProperty.propertyType === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.propertyType}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Valor <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0"
                                value={editedProperty.price}
                                min="0"
                                name="price"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.price &&
                                (editedProperty.price === "" ||
                                    editedProperty.price === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.price}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>Descuento</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0"
                                value={editedProperty.saleOff}
                                name="saleOff"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="w-full">
                            <Label>
                                Departamento{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.idDepartament}
                                name="idDepartament"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
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
                            {errors.idDepartament &&
                                editedProperty.idDepartament === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.idDepartament}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Ciudad <span className="text-red-500"> *</span>
                            </Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.cityId}
                                name="cityId"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                                disabled={
                                    editedProperty.departament === ""
                                        ? true
                                        : false
                                }
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
                            {errors.cityId && editedProperty.cityId === "" && (
                                <p className="py-1 text-sm text-red-500">
                                    {errors.cityId}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <Label>Barrio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="barrio donde esta ubicado el inmuble"
                                name="neighborhood"
                                value={editedProperty.neighborhood}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
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
                                value={editedProperty.address}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="w-full">
                            <Label>Edificio</Label>
                            <Input
                                className="mt-1.5"
                                placeholder="direccion del inmuble"
                                name="building"
                                value={editedProperty.building}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                        <div className="w-full">
                            <Label>
                                Area (m²){" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="area del inmuble"
                                name="area"
                                min="0"
                                value={editedProperty.area}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.area &&
                                (editedProperty.area === "" ||
                                    editedProperty.area === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.area}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>estrato</Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.stratum}
                                name="stratum"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
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
                                value={editedProperty.antiquityYears}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Remodelaciones</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="remodelaciones del inmuble"
                                name="remodelation"
                                value={editedProperty.remodelation}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Administración</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="$ 0000"
                                name="lastAdminprice"
                                value={editedProperty.lastAdminprice}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Habitaciones{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                placeholder="habitaciones del inmuble"
                                name="bedrooms"
                                value={editedProperty.bedrooms}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.bedrooms &&
                                (editedProperty.bedrooms === "" ||
                                    editedProperty.bedrooms === 0) && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.bedrooms}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>
                                Baños <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="bathrooms"
                                value={editedProperty.bathrooms}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.bathrooms &&
                                editedProperty.bathrooms === "" && (
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
                                value={editedProperty.numFloor}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="w-full">
                            <Label>Asensores</Label>
                            <Input
                                className="mt-1.5"
                                type="number"
                                name="numElevators"
                                value={editedProperty.numElevators}
                                min="0"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>Garage</Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.garage}
                                name="garage"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                        <div className="w-full">
                            <Label>Parqueadero</Label>
                            <Select
                                className="mt-1.5"
                                value={editedProperty.parking}
                                name="parking"
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            >
                                <option value="0">no</option>
                                <option value="1">sí</option>
                            </Select>
                        </div>
                    </div>

                    <h3>Informacion de contacto</h3>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Nombre del contacto{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="nombre del contacto"
                                name="contactName"
                                value={editedProperty.contactName}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.contactName &&
                                (editedProperty.contactName === "" ||
                                    editedProperty.contactName === 0) && (
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
                                name="contactEmail"
                                value={editedProperty.contactEmail}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Celular <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="000 000 0000"
                                name="contactCellphone"
                                autoComplete="cellPhone"
                                value={editedProperty.contactCellphone}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,
                                    })
                                }
                            />
                            {errors.contactCellphone &&
                                editedProperty.contactCellphone === "" && (
                                    <p className="py-1 text-sm text-red-500">
                                        {errors.contactCellPhone}
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <Label>telefono fijo</Label>
                            <Input
                                className="mt-1.5"
                                type="text"
                                placeholder="60 0 000  0000"
                                name="contactPhone"
                                autoComplete="phone"
                                value={editedProperty.contactPhone}
                                onChange={(e) =>
                                    handleOnChange({
                                        name: e.target.name,
                                        value: e.target.value,  
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <Label id="stateId">Estado del inmueble</Label>

                        <Select
                            className="lg:w-1/5"
                            value={editedProperty.stateId}
                            name="stateId"
                            onChange={(e) =>
                                handleOnChange({
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            }
                        >
                            <option value="0">Sin publicar</option>
                            <option value="1">Publicado</option>
                            <option value="2">Desactivado</option>
                        </Select>
                    </div>
                    <div>
                        <h3>Hubicación</h3>
                        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                            <div className="overflow-hidden rounded-xl">
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: "AIzaSyDkDFnRyELEsM8J-lfKlKEq0zc0HQZzkaU",
                                    }}
                                    yesIWantToUseGoogleMapApiInternals
                                    defaultZoom={15}
                                    center={{
                                        lat: editedProperty?.latitude,
                                        lng: editedProperty?.longitude,
                                    }}
                                    onClick={(e) => {
                                        setEditedProperty({
                                            ...editedProperty,
                                            latitude: e.lat,
                                            longitude: e.lng,
                                        });
                                    }}
                                >
                                    <LocationMarker
                                        lat={editedProperty?.latitude}
                                        lng={editedProperty?.longitude}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Imagenes</h3>
                        <p className="text-sm text-gray-400">
                            Aqui puedes subir las imagenes del inmueble. Puedes
                            cargar hasta 6 imagenes
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 py-4 lg:justify-start">
                            {editedProperty.galleryImgs &&
                                editedProperty.galleryImgs.map(
                                    (image, index) => (
                                        <div
                                            key={index}
                                            className="relative overflow-hidden bg-gray-200 rounded shadow w-44 h-28"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDeleteImage(image)
                                                }
                                                type="button"
                                                className="absolute p-1 rounded-full bottom-1 right-1 text-gray-50 bg-gray-100/70 hover:bg-red-100/80 hover:text-red-400 "
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                            {RenderImgPreviw(image)}
                                            {/* <img
                                                className="object-contain object-center"
                                                src={`${process.env.REACT_APP_API_PUBLIC_IMG}/${image}`}
                                            /> */}
                                        </div>
                                    )
                                )}
                        </div>
                        <div className="border-gray-200 boder">
                            {editedProperty.galleryImgs &&
                                editedProperty.galleryImgs.length < 6 && (
                                    <label className="block">
                                        <span className="sr-only">
                                            Choose File
                                        </span>
                                        <input
                                            multiple
                                            type="file"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 hover:file:text-white focus:outline-none focus:shadow-outline hover:file:cursor-pointer"
                                            aria-describedby="user_avatar_help"
                                            id="user_avatar"
                                            name="files"
                                            onChange={handleImages}
                                            ref={inputFilesRef}
                                        />
                                    </label>
                                )}
                            <div className="py-2">
                                {editedProperty.files &&
                                    editedProperty.files.map((file, index) => (
                                        <div className="flex items-center">
                                            <CheckIcon className="w-4 h-4 text-green-400" />
                                            <p
                                                key={index}
                                                className="text-sm text-gray-500"
                                            >
                                                {file.name}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 pt-2 items-center">
                        <ButtonPrimary>Editar inmueble</ButtonPrimary>
                        <Link to="/admin/inmuebles">Cancelar</Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormEditProperty;
