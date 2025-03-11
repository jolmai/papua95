import React, { useState, useEffect } from 'react';
import { Frame } from 'react95';

function CurrentTime() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Frame className='hora' variant="well" >
      {time}
    </Frame>
  );
}

export default CurrentTime;