import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MyRouter from "routers/index";
import { authAction } from "store/slice/auth/authActions";


function App() {
    const dispatch:any = useDispatch();

    
    useEffect(() => {
        (() => {
            dispatch(authAction());
        })();
    }, []);
    
    return (
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <MyRouter />
        </div>
    );
}

export default App;
