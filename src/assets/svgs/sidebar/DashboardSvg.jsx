



const DashboardSvg = ({ active = false }) => {
  const strokeColor = active ? '#000000' : '#768FA0';

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4.16666 8.33332H5.83333C7.5 8.33332 8.33333 7.49999 8.33333 5.83332V4.16666C8.33333 2.49999 7.5 1.66666 5.83333 1.66666H4.16666C2.5 1.66666 1.66666 2.49999 1.66666 4.16666V5.83332C1.66666 7.49999 2.5 8.33332 4.16666 8.33332Z"
        stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M14.1667 8.33332H15.8333C17.5 8.33332 18.3333 7.49999 18.3333 5.83332V4.16666C18.3333 2.49999 17.5 1.66666 15.8333 1.66666H14.1667C12.5 1.66666 11.6667 2.49999 11.6667 4.16666V5.83332C11.6667 7.49999 12.5 8.33332 14.1667 8.33332Z"
        stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M14.1667 18.3333H15.8333C17.5 18.3333 18.3333 17.5 18.3333 15.8333V14.1667C18.3333 12.5 17.5 11.6667 15.8333 11.6667H14.1667C12.5 11.6667 11.6667 12.5 11.6667 14.1667V15.8333C11.6667 17.5 12.5 18.3333 14.1667 18.3333Z"
        stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <path d="M4.16666 18.3333H5.83333C7.5 18.3333 8.33333 17.5 8.33333 15.8333V14.1667C8.33333 12.5 7.5 11.6667 5.83333 11.6667H4.16666C2.5 11.6667 1.66666 12.5 1.66666 14.1667V15.8333C1.66666 17.5 2.5 18.3333 4.16666 18.3333Z"
        stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default DashboardSvg;






