"use client";
/** @jsxRuntime classic */
/** @useClient */

import React, { useState, useEffect } from 'react';
import './Channel.css'; // Import the CSS file

interface Notification {
  text: string; // Use 'text' instead of 'response'
}

const Channel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<number>(20);

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  useEffect(() => {
  // Call once immediately
    fetchNotifications();

    // Then set up the interval
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 5000); // 5000 milliseconds = 5 seconds

  // Return a cleanup function to clear the interval when the component unmounts
  return () => {
    clearInterval(intervalId);
  };
}, []); // Pass an empty dependency array to run the effect only on mount and unmount



  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8000/notification', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      console.log('Response Data:', data);

      // Update the state with the received response
      setNotifications(data.map((text: string) => ({ text }))); // Convert each string to a Notification object
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const loadMoreNotifications = () => {
    setVisibleNotifications((prev) => prev + 20);
  };

  return (
    <div>
      <div className="notificationWrapper">
        {notifications.map((notification, index) => (
          <div key={index} className="notification"> {/* Use 'index' as the key since there is no 'id' */}
            <p>{notification.text}</p>
          </div>
        ))}
        {visibleNotifications < notifications.length && (
          <button className="loadMore" onClick={loadMoreNotifications}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default Channel;