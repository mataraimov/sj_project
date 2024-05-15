import { useEffect, useState } from 'react';
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

  const notificationClass = `custom-notification ${type} ${visible ? 'show' : ''}`;

  return (
    <div className={notificationClass}>
      <p>{message}</p>
    </div>
  );
};

export default CustomNotification;
