import React from 'react';

export const IconClusters = props => {
    const {size = '100%', style = {}, color = null} = props
    return (
        <svg
            style={style}
            height={size}
            width={size}
            fill={color || "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.574 31.574"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d="M7.212,11.134c0-0.016,0.004-0.029,0.004-0.046c0-1.992-1.615-3.608-3.607-3.608C1.615,7.479,0,9.096,0,11.088
			c0,1.873,1.433,3.395,3.259,3.572C3.659,12.769,5.254,11.334,7.212,11.134z"/>
            <path d="M27.967,7.479c-1.994,0-3.609,1.616-3.609,3.608c0,0.017,0.004,0.03,0.004,0.045c1.958,0.2,3.553,1.637,3.953,3.527
			c1.826-0.178,3.26-1.699,3.26-3.572C31.573,9.096,29.959,7.479,27.967,7.479z"/>
            <path d="M15.335,11.088c0-1.992-1.615-3.608-3.607-3.608c-1.994,0-3.609,1.616-3.609,3.608c0,0.017,0.004,0.03,0.004,0.046
			c1.597,0.162,2.939,1.154,3.603,2.537c0.663-1.391,2.009-2.374,3.606-2.537C15.331,11.118,15.335,11.104,15.335,11.088z"/>
            <path d="M19.848,13.671c0.664-1.383,2.008-2.374,3.604-2.537c0-0.016,0.004-0.029,0.004-0.046c0-1.992-1.613-3.608-3.607-3.608
			s-3.608,1.616-3.608,3.608c0,0.016,0.004,0.03,0.004,0.046C17.84,11.296,19.184,12.28,19.848,13.671z"/>
            <path d="M11.275,15.599c-0.001-1.993-1.614-3.608-3.607-3.608c-1.994,0-3.609,1.615-3.609,3.609c0,1.723,1.209,3.158,2.824,3.518
			C7.339,17.105,9.13,15.6,11.275,15.599z"/>
            <path d="M14.874,20.203c0.001-0.033,0.01-0.062,0.01-0.094c0-1.994-1.614-3.609-3.607-3.609c-1.994,0-3.609,1.615-3.609,3.609
			c0,1.992,1.615,3.607,3.609,3.607c0.031,0,0.061-0.01,0.093-0.01C11.731,21.951,13.117,20.562,14.874,20.203z"/>
            <path d="M15.692,19.197c0.033,0,0.063,0.01,0.095,0.01c0.031,0,0.061-0.01,0.093-0.01c0.361-1.758,1.748-3.145,3.504-3.506
			c0.002-0.031,0.01-0.062,0.01-0.093c0-1.994-1.613-3.609-3.606-3.609c-1.994,0-3.609,1.615-3.609,3.609
			c0,0.03,0.009,0.062,0.009,0.092C13.944,16.054,15.331,17.438,15.692,19.197z"/>
            <path d="M23.906,11.989c-1.994,0-3.607,1.615-3.609,3.608h0.002c2.145,0,3.937,1.508,4.391,3.518
			c1.615-0.357,2.824-1.793,2.824-3.517C27.514,13.604,25.898,11.989,23.906,11.989z"/>
            <path d="M20.299,16.5c-1.994,0-3.61,1.615-3.61,3.609c0,0.031,0.009,0.061,0.009,0.092c1.758,0.361,3.144,1.748,3.506,3.506
			c0.033,0.002,0.062,0.01,0.095,0.01c1.992,0,3.607-1.615,3.607-3.605C23.905,18.115,22.29,16.5,20.299,16.5z"/>
            <circle cx="15.787" cy="24.619" r="3.607"/>
            <path d="M8.602,6.33c1.681,0.423,3.725,0.326,4.726,0.242c-0.414-0.086-0.849-0.183-1.288-0.294
			C9.946,5.751,8.493,5.143,8.493,5.143s1.938,0.242,4.03,0.769c0.443,0.111,0.849,0.228,1.229,0.339
			c-0.331-0.418-1.162-1.237-2.845-1.663c-2.31-0.582-5.338-0.183-5.338-0.183S6.295,5.747,8.602,6.33z"/>
            <path d="M22.155,4.607c0,0-1.453,0.61-3.548,1.138c-0.442,0.111-0.875,0.207-1.286,0.293c0.999,0.086,3.043,0.184,4.723-0.241
			c2.31-0.583,3.03-1.927,3.03-1.927s-3.021-0.396-5.335,0.185c-1.683,0.423-2.515,1.242-2.843,1.662
			c0.377-0.111,0.785-0.228,1.226-0.339C20.217,4.851,22.155,4.607,22.155,4.607z"/>
            <polygon points="15.649,3.348 13.417,4.409 16.157,9.943"/>
        </svg>
    )
}