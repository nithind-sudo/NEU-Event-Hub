import React from 'react';
import QRCodeEvent from './components/QRCode/qr';

function App() {
  const event = {
    title: 'Northeastern Event',
    date: '2023-05-01',
    time: '20:30-22:00',
    description: 'College of Engineering Event.',
    link: 'https://www.example.com/tickets',
  };

  return (
    <div>
      <QRCodeEvent event={event} />
    </div>
  );
}

export default App;