import React, { useEffect, useState } from 'react';
import './CustomNotification.css';

const CustomNotification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className={`custom-notification ${type}`}>
      <p>{message}</p>
    </div>
  ) : null;
};

export default CustomNotification;
