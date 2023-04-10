import React, {useState} from 'react';
import '../styles/style.css'

const Notification = ({message}) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!message) {
        return null;
    }

    return (
        <>
            {isVisible && (
                <div className="notification">
                    <p>{message}</p>
                    <button className="close-button" onClick={() => setIsVisible(false)}>Закрыть</button>
                </div>
            )}
        </>
    );
};

export default Notification;