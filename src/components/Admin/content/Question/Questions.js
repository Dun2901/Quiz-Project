import { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import "./Questions.scss";
import Lightbox from "react-awesome-lightbox";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((question) => question.id !== id);
      setQuestions(questionsClone);
    }
    console.log(">>> check: ", type, id);
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === "REMOVE") {
      let index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (answer) => answer.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);

      let index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    console.log(type, answerId, questionId, value, index);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );

      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log(">>> questions: ", questions);
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(
      (question) => question.id === questionId
    );

    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add new question:</div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      value={question.description}
                      placeholder="name@example.com"
                      onChange={(e) =>
                        handleOnChange("QUESTION", question.id, e.target.value)
                      }
                    />
                    <label>Question {index + 1} 's description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      id={`${question.id}`}
                      type="file"
                      hidden
                      onChange={(e) =>
                        handleOnChangeFileQuestion(question.id, e)
                      }
                    />
                    <span>
                      {question.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsFillPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>

                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          type="checkbox"
                          className="form-check-input iscorrect"
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              answer.id,
                              question.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            value={answer.description}
                            placeholder="name@example.com"
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                e.target.value
                              )
                            }
                          />
                          <label>Answers {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id)
                            }
                          >
                            <AiFillPlusSquare className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinusCircle className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              Save Questions
            </button>
          </div>
        )}

        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
