import React, { useState } from 'react'

const Websocket = () => {
  // Connect to the WebSocket echo server
  const [message, setMessage] = useState('default message');
  const eventSource = new EventSource('https://echo.websocket.org/.sse');

  // Listen for messages
  eventSource.onmessage = (event) => {
    console.log('SSE message received:', event.data);
    setMessage(event.data);
  };
  
  // Handle connection open
  eventSource.onopen = () => {
    console.log('SSE connection established');
    setMessage("listening")
  };
  
  // Handle errors
  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
    if (eventSource.readyState === EventSource.CLOSED) {
      console.log('SSE connection closed');
    }
  };

    return (
        <div>
            {message}
        </div>
    )
}

export default Websocket