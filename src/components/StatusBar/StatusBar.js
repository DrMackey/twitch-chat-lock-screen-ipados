import React from "react";
import Cellular from "../../images/SVG/Cellular.svg";
import Battery from "../../images/SVG/Battery.svg";
import "./StatusBar.css";

export default function StatusBar({ date, time }) {
  return (
    <section className="status-bar">
      <p className="status-bar__time">
        {time} <span className="status-bar__date">{date}</span>
      </p>
      <div className="status-bar__icons">
        <img
          className="status-bar__icon status-bar__cellular"
          src={Cellular}
          alt=""
        />
        <p className="status-bar__battery-text">100%</p>
        <img
          className="status-bar__icon status-bar__battery"
          src={Battery}
          alt=""
        />
      </div>
    </section>
  );
}