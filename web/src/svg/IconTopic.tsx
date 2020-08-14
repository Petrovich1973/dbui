import React from 'react';
import {IconProps} from "./types";

export const IconTopic = (props: IconProps) => {
    const {size = '100%', style = {}, color = null} = props
    return (
        <svg
            style={style}
            height={size}
            width={size}
            fill={color || "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1099 1024"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path
                d="M892.06 169.3 206.26 169.3c-9.1 0-16.6 7.3-16.6 16.3l0 671.6c0 9 7.4 16.3 16.6 16.3l682.4 0c10.9 0 20-7.7 20-18L908.66 185.6C908.56 176.6 901.16 169.3 892.06 169.3zM853.96 818.5 241.86 818.5 241.86 226.1l612.1 0L853.96 818.5 853.96 818.5zM397.46 312.1 325.16 312.1l0 70.6 72.3 0L397.46 312.1 397.46 312.1zM397.46 489.5 325.16 489.5l0 70.6 72.3 0L397.46 489.5 397.46 489.5zM397.46 667.4l-71.7 0 0 70 71.8 0L397.46 667.4 397.46 667.4zM469.06 336.8l307.6 0 0 47.8L469.06 384.6 469.06 336.8zM469.06 514.2l307.6 0 0 47.8L469.06 562 469.06 514.2zM469.06 688.4l307.6 0 0 47.8L469.06 736.2 469.06 688.4z"/>
        </svg>
    )
}