import React, { useEffect, useState } from 'react';

const format = (d: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(d)
    .replace(',', '');

/** Live IST clock. Renders a placeholder on the server so hydration never mismatches. */
const LocalTime: React.FC = () => {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className="about-time" dateTime={now ?? undefined}>
      <span className="about-time__dot" aria-hidden="true" />
      {now ?? '--- --:--'} IST
    </time>
  );
};

export default LocalTime;
