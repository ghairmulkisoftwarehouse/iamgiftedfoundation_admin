const DotSvg = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_161_685"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="8"
        height="8"
      >
        <path d="M9 1H1V9H9V1Z" fill="white" />
      </mask>

      <g mask="url(#mask0_161_685)">
        <path
          d="M5.00018 2.77783C3.77795 2.77783 2.77795 3.77783 2.77795 5.00005C2.77795 6.22228 3.77795 7.22228 5.00018 7.22228C6.2224 7.22228 7.2224 6.22228 7.2224 5.00005C7.2224 3.77783 6.2224 2.77783 5.00018 2.77783Z"
          stroke="black"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

export default DotSvg;
