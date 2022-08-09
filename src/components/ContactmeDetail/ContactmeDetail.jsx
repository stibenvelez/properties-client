import Label from "components/Label/Label";
import SpinnerButton from "components/SpinnerButton/SpinnerButton";
import { useSelector } from "react-redux";
import Card from "shared/Card";
import Input from "shared/Input/Input";
import CardManagement from "./CardManagement";
import STATES_CARD from "./utils/statesCard";

const ContactmeDetail = () => {
    const { toContact, loading, error, msg } = useSelector(
        ({ contact }) => contact
    );


    if (loading)
        return (
            <div className="w-full py-10 flex justify-center items-center">
                <SpinnerButton />
            </div>
        );
    
    if (Object.keys(toContact).length === 0) {
        return <div className="py-4 px-4 bg-yellow-100 text-yellow-800 text-sm rounded shadow-sm">{msg}</div>
    }

    return (
        <>
            <Card className={`dark:bg-slate-700`}>
                <h2 className="text-center mb-2 font-bold">
                    Datos del prospecto
                </h2>
                <div className="space-y-4">
                    <div
                        className={`${
                            STATES_CARD[toContact.state]?.style
                        } py-0.1 px-4 rounded-full inline-block`}
                    >
                        {toContact.state}
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Primer Nombre{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                name="firstName"
                                defaultValue={toContact.firstName}
                                readOnly
                                //defaultValue={property.reference}
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                        <div className="w-full">
                            <Label>
                                Apellido{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                defaultValue={toContact.lastName}
                                name="lastName"
                                readOnly
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="w-full">
                            <Label>
                                Email <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                type="email"
                                defaultValue={toContact.email}
                                name="email"
                                readOnly
                                //defaultValue={property.reference}
                            />
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                        <div className="w-full">
                            <Label>
                                Mensaje <span className="text-red-500"> *</span>
                            </Label>
                            <p
                                className="mt-1.5 text-sm"

                                //defaultValue={property.reference}
                            >
                                {toContact.message}
                            </p>
                            {/* {errors.reference && (
                  <p className="py-1 text-sm text-red-500">
                      {errors.reference}
                  </p>
              )} */}
                        </div>
                    </div>
                </div>
            </Card>
            {/* <Card>
                <h2 className="text-center mb-2 font-bold">Gestion</h2>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="w-full">
                        <Label>
                            Estado <span className="text-red-500"> *</span>
                        </Label>
                        <Input
                            className="mt-1.5"
                            defaultValue={toContact.state}
                            name="state"
                            readOnly
                            //defaultValue={property.reference}
                        />
                        
                    </div>
                    {toContact.contactedBy && (
                        <div className="w-full">
                            <Label>
                                Contactado por{" "}
                                <span className="text-red-500"> *</span>
                            </Label>
                            <Input
                                className="mt-1.5"
                                value={toContact.contactedBy}
                                name="state"
                                //defaultValue={property.reference}
                            />
                            
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                    {" "}
                    <div className="w-full">
                        <Label>Observaciones</Label>
                        <Textarea
                            className="mt-1.5"
                            defaultValue={
                                toContact.observations || "sin información"
                            }
                            name="observation"
                            readOnly
                            //defaultValue={property.reference}
                        />
                        
                    </div>
    </div>
                
            </Card> */}
            <div className="grid gap-2">
                {toContact.management && toContact.management.length > 0 ? (
                    toContact.management.map((management, index) => (
                        <CardManagement key={index} management={management} />
                    ))
                ) : (
                    <div className="w-full">
                        <p className="text-center text-gray-700">
                            No hay gestiones
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ContactmeDetail;
