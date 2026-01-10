import React from 'react'

const EventSvg = ({ active = false }) => {
   const strokeColor = active ? '#000000' : '#768FA0';
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4386 2.42594L6.8946 5.08718C6.46793 5.29199 6.01203 5.34331 5.54729 5.23919C5.24314 5.17106 5.09105 5.13699 4.96858 5.12301C3.44786 4.94935 2.5 6.15293 2.5 7.53697V8.29652C2.5 9.68058 3.44786 10.8842 4.96858 10.7105C5.09105 10.6965 5.24315 10.6624 5.54729 10.5943C6.01203 10.4902 6.46793 10.5415 6.8946 10.7463L12.4386 13.4076C13.7112 14.0185 14.3475 14.3239 15.057 14.0858C15.7664 13.8477 16.0099 13.3368 16.497 12.3151C17.8343 9.50941 17.8343 6.32412 16.497 3.51838C16.0099 2.49663 15.7664 1.98576 15.057 1.74766C14.3475 1.50958 13.7112 1.81503 12.4386 2.42594Z"
         stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.54842 17.309L8.30562 18.3333C5.50429 16.1115 5.84652 15.052 5.84652 10.8333H6.79138C7.17482 13.2173 8.07927 14.3466 9.32725 15.1641C10.096 15.6676 10.2545 16.727 9.54842 17.309Z"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 10.4167V5.41675"
    stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EventSvg;


