import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
  const location = useLocation();
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    // console.log("check question: ", res);

    if (res && res.EC === 0) {
      const raw = res.DT;
      const data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;

          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
            // console.log("item answers: ", item.answers);
          });

          // console.log("value: ", value, " key: ", key);

          return { questionId: key, answers, questionDescription, image };
        })
        .value();

      console.log(data);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <div className="q-body">
          <img src="" alt="" />
        </div>
        <div className="q-content">
          <div className="question">Question 1: how are you doing?</div>
          <div className="answer">
            <div className="a-child">A. adlkfja</div>
            <div className="a-child">B. alsdjfasd</div>
            <div className="a-child">C. laksdjflkasdjflk</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>

      <div className="right-content">right content</div>
    </div>
  );
};

export default DetailQuiz;
