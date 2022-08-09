const AlertError = ({ msg }) => {
    return (
        <div className="bg-red-500 p-2 text-white text-center rounded-md shadow">
            <p>{msg}</p>
        </div>
    );
};

export default AlertError