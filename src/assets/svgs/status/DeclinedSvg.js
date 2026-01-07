import React from 'react'

const DeclinedSvg = ({ size = 20 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.6967 4.6967C7.62563 1.76777 12.3743 1.76777 15.3033 4.6967C18.2323 7.62563 18.2323 12.3743 15.3033 15.3033C12.3743 18.2323 7.62563 18.2323 4.6967 15.3033C1.76777 12.3743 1.76777 7.62563 4.6967 4.6967Z"
                stroke="#FF0000"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path d="M5 5L15 15" stroke="#FF0000" strokeWidth={2} strokeLinecap="round" />
        </svg>

    )
}

export default DeclinedSvg