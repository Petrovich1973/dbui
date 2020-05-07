import React from 'react';

export const IconDashboard = props => {
    const {size = '100%', style = {}, color = null} = props
    return (
        <svg
            style={style}
            height={size}
            fill={color || "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 384"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect x="213.333" y="0" width="170.667" height="128"/>
            <rect x="0" y="0" width="170.667" height="213.333"/>
            <rect x="0" y="256" width="170.667" height="128"/>
            <rect x="213.333" y="170.667" width="170.667" height="213.333"/>
        </svg>
    )
}