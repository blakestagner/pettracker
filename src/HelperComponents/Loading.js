import React, {useState } from 'react';

const Loading =   React.forwardRef((props, ref) => {
    const [loading, loaded] = useState(false) 

    React.useImperativeHandle(ref, () => ({
        loadingStatus() {
            loaded(!loading)
        }
    }));
     return (
        <div className={loading ? 'done-loading' : 'lds-default'}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}); 
export default Loading;