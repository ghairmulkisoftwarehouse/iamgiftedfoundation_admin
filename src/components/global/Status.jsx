import React, { memo } from 'react';

const Status = ({ status }) => {
  if (!status) return null;

  // normalize status to lowercase for consistency
  const s = status.toLowerCase();

  // mapping status to classes
  const statusClasses = {
    pending: 'bg-thistle',
    running: 'bg-thistle',

    completed: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    approved: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    claimed: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    active: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    accepted: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    successful: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    going: 'bg-[#ECF8F0CC] text-[#1C8C6E]',
    registered: 'bg-[#ECF8F0CC] text-[#1C8C6E]',

    declined: 'bg-[#DB000026] text-[#DB0000]',
    cancelled: 'bg-[#DB000026] text-[#DB0000]',
    rejected: 'bg-[#DB000026] text-[#DB0000]',
    expired: 'bg-[#DB000026] text-[#DB0000]',

    dispatched: 'bg-[#06B6D4]/10 text-[#06B6D4]',
    waitlisted: 'bg-[#06B6D4]/10 text-[#06B6D4]',
    
    failed: 'bg-orange-500 bg-opacity-30 text-orange-500',
  };

  const classes = statusClasses[s] || '';

  return (
    <div
      className={`${classes} text-xs sm:text-sm px-2 rounded-md flex items-center gap-1 py-1 pb-1.5 font-normal w-fit capitalize`}
    >
      <span>{status}</span>
    </div>
  );
};

export default memo(Status);
