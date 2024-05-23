import { useState, useEffect } from "react";
import moment from "moment";
import "moment-duration-format";

const CountDown = (props) => {
  const [count, setCount] = useState(300);

  useEffect(() => {
    if (count === 0) {
      props.onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div className="countdown-container">
      {moment.duration(count, "seconds").format("mm:ss", { trim: false })}
    </div>
  );
};

export default CountDown;
