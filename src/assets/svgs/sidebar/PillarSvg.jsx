const PillarSvg = ({ active = false }) => {
  const strokeColor = active ? '#000000' : '#768FA0';

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeWidth="1.91"
        d="M19.64,1.52H4.36A2.87,2.87,0,1,0,7.05,5.34H17a2.86,2.86,0,1,0,2.69-3.82Z"
      />
      <line
        x1="16.94"
        y1="5.34"
        x2="7.06"
        y2="5.34"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
      <line
        x1="17.73"
        y1="23.48"
        x2="17.73"
        y2="6.51"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
      <line
        x1="6.27"
        y1="23.48"
        x2="6.27"
        y2="6.51"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
      <line
        x1="10.09"
        y1="9.16"
        x2="10.09"
        y2="23.48"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
      <line
        x1="13.91"
        y1="9.16"
        x2="13.91"
        y2="23.48"
        stroke={strokeColor}
        strokeMiterlimit="10"
        strokeWidth="1.91"
      />
    </svg>
  );
};

export default PillarSvg;
