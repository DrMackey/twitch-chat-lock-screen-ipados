import React from "react";
import "./MainClock.css";

export default function MainClock({ date, time }) {
  return (
    <section className="main-clock">
      <p className="main-clock__date">{date}</p>
      <p className="main-clock__time">{time}</p>
    </section>
  );
}
