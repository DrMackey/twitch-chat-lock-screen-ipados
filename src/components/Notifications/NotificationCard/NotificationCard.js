import React from "react";
import { motion } from "framer-motion";
import twitchImage from "../../../images/app-twitch.png";
import "./NotificationCard.css";

const variants = {
  start: { opacity: 0, scale: 0.1 },
  normal: {
    opacity: 1,
    scale: 1,
    transition: { ease: [0.41, 1.13, 0.25, 1.075], duration: 1 },
  },
  backdrop: { opacity: 1, scale: 0.96 },
  back: { opacity: 1, scale: 0.924 },
};

export default function NotificationCard({ element, index }) {
  return (
    <motion.div
      className={`message__container ${
        index > 3 && "message__container_backdrop"
      } ${index > 4 && "message__container_back"}`}
      initial={"start"}
      animate={() => {
        if (index < 4) {
          return "normal";
        } else if (index === 4) {
          return "backdrop";
        } else if (index === 5) {
          return "back";
        }
      }}
      exit={{ opacity: 0 }}
      layoutId={element.id}
      variants={variants}
      layout
    >
      <div className="message__image-container">
        <img
          className="message__image"
          src={twitchImage}
          alt="Постер."
          loading="lazy"
        ></img>
      </div>
      <div className="message__info-container">
        <div className="message__title-container">
          <div className="message__user">{element.user}</div>
          <div className="message__time">{element.time}</div>
        </div>
        <div className="message__content">{element.message}</div>
      </div>
    </motion.div>
  );
}
