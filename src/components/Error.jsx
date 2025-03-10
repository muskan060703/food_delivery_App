import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log("Error Details:", error); // This will help debug errors in the console

    return (
        <div>
            <h1>OOPS!!! Something went wrong!</h1>
            <h3>Status: {error?.status || "Unknown Error"}</h3>
            <h4>Message: {error?.statusText || error?.message || "No error message available"}</h4>
        </div>
    );
};

export default Error;
