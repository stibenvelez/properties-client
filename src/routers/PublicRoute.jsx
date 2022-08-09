import {  Route } from "react-router-dom";
import Footer from "shared/Footer/Footer";

const PublicRoute = ({ component: Component, ...rest }) => {
    
    return (
        <>
            <Route {...rest} render={(props) => <Component {...props} />} />
            <Footer />
        </>
    );
};

export default PublicRoute;
