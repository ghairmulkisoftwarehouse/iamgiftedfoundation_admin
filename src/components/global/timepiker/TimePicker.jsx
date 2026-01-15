import React, { useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styles from './TimePicker.module.css';

const TimePicker = ({ value, onChange }) => {
  const [hours, setHours] = useState(
    parseInt(value?.split(':')[0] || '07', 10)
  );
  const [minutes, setMinutes] = useState(
    parseInt(value?.split(':')[1] || '00', 10)
  );

  const handleIncrementHours = () =>
    setHours((prev) => (prev < 23 ? prev + 1 : 0));

  const handleDecrementHours = () =>
    setHours((prev) => (prev > 0 ? prev - 1 : 23));

  const handleIncrementMinutes = () =>
    setMinutes((prev) => (prev < 59 ? prev + 1 : 0));

  const handleDecrementMinutes = () =>
    setMinutes((prev) => (prev > 0 ? prev - 1 : 59));

  useEffect(() => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    onChange(`${formattedHours}:${formattedMinutes}`); // e.g. "17:05"
  }, [hours, minutes, onChange]);

  return (
    <div className={styles.timePicker}>
      <div className={styles.timeUnit}>
        <button type="button" onClick={handleIncrementHours} className={styles.arrow}>
          <IoIosArrowUp />
        </button>
        <input
          type="number"
          value={String(hours).padStart(2, '0')}
          className={styles.timeInput}
          readOnly
        />
        <button type="button" onClick={handleDecrementHours} className={styles.arrow}>
          <IoIosArrowDown />
        </button>
      </div>

      <span className={styles.separator}>:</span>

      <div className={styles.timeUnit}>
        <button type="button" onClick={handleIncrementMinutes} className={styles.arrow}>
          <IoIosArrowUp />
        </button>
        <input
          type="number"
          value={String(minutes).padStart(2, '0')}
          className={styles.timeInput}
          readOnly
        />
        <button type="button" onClick={handleDecrementMinutes} className={styles.arrow}>
          <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
};

export default TimePicker;





