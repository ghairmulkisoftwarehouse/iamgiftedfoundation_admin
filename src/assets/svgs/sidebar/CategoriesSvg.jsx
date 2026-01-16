const CategoriesSvg = ({ active = false }) => {
    const strokeColor = active ? '#000000' : '#768FA0';
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_324_4531"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <path d="M20 0H0V20H20V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_324_4531)">
        <path
          d="M6.66667 13.3337H4.525C2.61667 13.3337 1.66667 12.3837 1.66667 10.4753V4.52533C1.66667 2.61699 2.61667 1.66699 4.525 1.66699H8.33333C10.2417 1.66699 11.1917 2.61699 11.1917 4.52533"
         stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.4749 18.3337H11.6666C9.75825 18.3337 8.80825 17.3837 8.80825 15.4753V9.52533C8.80825 7.61699 9.75825 6.66699 11.6666 6.66699H15.4749C17.3833 6.66699 18.3333 7.61699 18.3333 9.52533V15.4753C18.3333 17.3837 17.3833 18.3337 15.4749 18.3337Z"
         stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.3917 12.5H15.1083"
        stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 13.8583V11.1416"
           stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default CategoriesSvg;
