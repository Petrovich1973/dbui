import React from 'react';

export const IconSettings = props => {
    const {size = '100%', style = {}, color = null} = props
    return (
        <svg
            style={style}
            height={size}
            fill={color || "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path
                d="M623.304348 731.428571l-57.242236-69.962732c6.360248-19.080745 12.720497-31.801242 12.720497-44.52174l95.403726-6.360248c6.360248 0 6.360248 0 6.360249-6.360249v-127.204968c0-6.360248 0-6.360248-6.360249-6.360249l-95.403726-6.360248-19.080746-38.161491 57.242236-69.962733v-6.360248L534.26087 260.770186h-6.360249L451.57764 318.012422l-38.161491-19.080745-12.720497-89.043478c0-6.360248 0-6.360248-6.360248-6.360249H273.490683c-6.360248 0-6.360248 0-6.360248 6.360249l-6.360249 95.403726c-12.720497 6.360248-25.440994 6.360248-38.16149 19.080746l-76.322982-63.602485h-6.360248L57.242236 349.813665v6.360248l57.242236 76.322981-19.080745 38.161491-89.043479 6.360249c-6.360248 0-6.360248 6.360248-6.360248 12.720496v120.844721c0 6.360248 0 6.360248 6.360248 6.360248l95.403727 12.720497 19.080745 38.161491-57.242236 69.962733v6.360248L146.285714 826.832298h6.360249l69.962733-57.242236c12.720497 6.360248 25.440994 12.720497 44.521739 19.080745l6.360248 95.403727c0 6.360248 0 6.360248 6.360249 6.360249h120.84472c6.360248 0 6.360248 0 6.360249-6.360249l12.720497-95.403727c12.720497-12.720497 25.440994-19.080745 38.16149-25.440993l69.962733 57.242236h6.360249l82.683229-82.68323c6.360248 0 6.360248-6.360248 6.360249-6.360249zM343.453416 699.627329s-6.360248 0 0 0c-82.68323 0-146.285714-63.602484-146.285714-146.285714 0-82.68323 63.602484-146.285714 146.285714-146.285714 76.322981 0 139.925466 63.602484 146.285714 139.925465C483.378882 629.664596 419.776398 699.627329 343.453416 699.627329zM1011.279503 248.049689l-69.962733-6.360248c-6.360248-12.720497-12.720497-31.801242-25.440994-44.521739l31.801243-63.602485V127.204969l-63.602485-38.161491h-6.360248l-38.161491 57.242236h-44.521739l-38.161491-57.242236h-6.360248l-63.602485 38.161491v6.360248l31.801243 63.602485c-12.720497 12.720497-19.080745 25.440994-25.440994 38.161491l-76.322982 6.360248s-6.360248 0-6.360248 6.360248V318.012422s0 6.360248 6.360248 6.360249l69.962733 6.360248c6.360248 12.720497 12.720497 31.801242 25.440994 44.521739l-31.801242 63.602485V445.217391l63.602484 38.161491h6.360249l38.16149-57.242236h44.52174l38.16149 57.242236h6.360249l63.602484-38.161491v-6.360248l-31.801242-63.602485c12.720497-12.720497 19.080745-25.440994 25.440994-38.16149l69.962733-6.360249h6.360248V248.049689c6.360248 0 6.360248 0 0 0z m-197.167702 108.124224c-38.161491 0-69.962733-31.801242-69.962733-69.962733s31.801242-69.962733 69.962733-69.962733 69.962733 31.801242 69.962733 69.962733-31.801242 69.962733-69.962733 69.962733zM1011.279503 782.310559l-69.962733-6.360248c-6.360248-12.720497-12.720497-31.801242-25.440994-44.52174l31.801243-63.602484v-6.360248l-63.602485-38.161491h-6.360248l-38.161491 57.242236h-44.521739l-38.161491-57.242236h-6.360248l-63.602485 38.161491v6.360248l31.801243 63.602484c-12.720497 12.720497-19.080745 25.440994-25.440994 38.161491l-69.962733 6.360249s-6.360248 0-6.360249 6.360248v76.322981s0 6.360248 6.360249 6.360249l69.962733 6.360248c6.360248 12.720497 12.720497 31.801242 25.440994 44.521739l-31.801243 63.602485v6.360248l63.602485 38.161491h6.360248l38.161491-57.242236h44.521739l38.161491 57.242236h6.360248l63.602485-38.161491v-6.360248l-31.801243-63.602485c12.720497-12.720497 19.080745-25.440994 25.440994-44.521739l69.962733-6.360248s6.360248 0 6.360249-6.360249l-6.360249-76.322981c6.360248 0 6.360248 0 0 0zM814.111801 890.434783c-38.161491 0-69.962733-31.801242-69.962733-69.962733s31.801242-69.962733 69.962733-69.962733 69.962733 31.801242 69.962733 69.962733-31.801242 69.962733-69.962733 69.962733z"/>
        </svg>
    )
}