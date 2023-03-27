import React from 'react';

const Loading = ({placement}: {placement: string}) => {
    return <div className={placement === "center" ? "loading loading-center" : "loading"}></div>
};

export default Loading;