import React, { useState, useRef } from "react";
import { AnimatePresence, useAnimate } from "framer-motion";
import throttle from "lodash.throttle";
import ComfyJS from "comfy.js";
import NotificationCard from "./NotificationCard/NotificationCard";
import "./Notifications.css";

const options = {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};

export default function Notifications() {
  const makeApiRequestT = (user, message, extra) => {
    setIsNotifications((e) => handleNotifications(e, user, message, extra));
  };
  const transformUNIX = (unix) => {
    const reg = unix.match(/^\d{10}/g);
    const date = new Date(reg * 1000);

    return date.toLocaleTimeString("ru-RU", options);
  };

  const makeApiRequestThrottled = useRef(throttle(makeApiRequestT, 1000));

  const [isMessage, setIsMessage] = useState("");
  const [isNotifications, setIsNotifications] = useState([]);
  const [scope, animate] = useAnimate();

  ComfyJS.onConnected = (address, port, isFirstConnect) => {
    animate(scope.current, { opacity: 1 });
    setIsMessage(`Подключение успешно`);
    setTimeout(() => {
      animate(scope.current, { opacity: 0 });
    }, 3000);
  };

  ComfyJS.onChat = (user, message, flags, self, extra) => {
    makeApiRequestThrottled.current(user, message, extra);
  };

  ComfyJS.onReconnect = (reconnectCount) => {
    setIsMessage(`Попытка переподключиться ${reconnectCount}`);
  };
  ComfyJS.onError = (error) => {
    setIsMessage(`Ошибка: ${error}`);
  };

  function handleNotifications(e, user, message, extra) {
    const newArr = [
      {
        id: extra.id,
        user: user,
        message: message,
        time: transformUNIX(extra.timestamp),
      },
      ...e,
    ];
    if (newArr.length > 6) newArr.pop();

    return newArr;
  }

  return (
    <section className="notifications">
      <section className="messages">
        <AnimatePresence mode="popLayout">
          {isNotifications.map((e, i) => {
            if (i > 5) return;
            return <NotificationCard key={e.id} element={e} index={i} />;
          })}
        </AnimatePresence>
      </section>

      <section ref={scope} className="notifications__status">
        {isMessage}
      </section>
    </section>
  );
}
