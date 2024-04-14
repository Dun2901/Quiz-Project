import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    console.log("check question: ", res);

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
            console.log("item answers: ", item.answers);
          });

          console.log("value: ", value, " key: ", key);

          return { questionId: key, answers, questionDescription, image };
        })
        .value();

      console.log(data);
    }
  };

  return <div>components QuizDetail</div>;
};

export default DetailQuiz;
