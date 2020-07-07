import loading from "../../assets/loading.svg";
import React from 'react';

const Loading = () => {
    return (
        <div className="spinner">
            <img src={loading} alt="Loading" />
        </div>
    );
}
 
export default Loading;