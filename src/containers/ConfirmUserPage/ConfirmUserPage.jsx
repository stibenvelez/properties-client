import FormNewPassword from "components/FormNewPassword/FormNewPassword";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import clientAxios from "config/axios";
import { useParams, Link } from "react-router-dom";

const ConfirmUserPage = () => {
    const { token } = useParams();
    const [confirmMessage, setConfirmMessage] = useState("");

    useEffect(() => {
        const confirmUser = async () => {
            try {
                const res = await clientAxios.post(`/users/confirm/${token}`);
                setConfirmMessage(res.data.msg);
            } catch (error) {
                console.log(error);
                setConfirmMessage(error.response.data.msg);
            }
        };
        confirmUser()
    }, []);

    return (
        <div
            className={`nc-PageAbout overflow-hidden relative h-full `}
            data-nc-id="Confirmar cuenta"
        >
            <Helmet>
                <title>Confirmar cuenta</title>
            </Helmet>
            <div className="container py-4 space-y-16 lg:py-4 lg:space-y-28  ">
                <h1 className=" text-2xl mb-4">Confirmar cuenta</h1>
                <div className="flex items-center justify-center h-full ">
                    <p className="text-2xl font-bold">{confirmMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmUserPage;
