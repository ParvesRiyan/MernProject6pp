// import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children  }) => {
    const {loading, isAuthenticated, user } = useSelector((state) => state.user);

    const navigate = useNavigate()

    if(loading) return null;

    if (isAdmin === true && user.role !== "admin") { 
            return navigate("/login");
        }

    if(isAuthenticated){
        return children
    }else{
        navigate("/login")
    }

    // return children;

    // return (
    //     <Fragment>
    //         {loading === false && (
    //             {/* <Routes>
    //                 <Route
    //                     {...rest}
    //                     render={(props) => {
    //                         if (isAuthenticated === false) {
    //                             return <Navigate to="/login" replace />;
    //                         }

    //                         

    //                         return <Component {...props} />;
    //                     }}
    //                 />
    //             </Routes> */}


    //         )}
    //     </Fragment>
    // );
};



export default ProtectedRoute;