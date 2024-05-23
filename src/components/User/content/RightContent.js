import React from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz } = props;

  const onTimeUp = () => {
    props.handleFinishQuiz();
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((question, index) => {
            return (
              <div key={`question-${index}`} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
