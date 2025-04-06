'use client';
import React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      weekends={false}
      events={[
        { title: 'event 1', date: '2025-04-11' },
        { title: 'event 2', date: '2025-04-12' },
      ]}
    />
  );
}
