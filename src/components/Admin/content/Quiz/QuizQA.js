import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  getAllQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  getQuizWithQA,
} from "../../../../services/apiService";
import "./QuizQA.scss";
import Lightbox from "react-awesome-lightbox";
import { toast } from "react-toastify";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";

const QuizQA = (props) => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isInvalidQuestion: false,
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isInvalidAnswer: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState({});
  console.log(selectedQuiz);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    const fetchQuizWithQA = async () => {
      let res = await getQuizWithQA(selectedQuiz.value);
      if (res && res.EC === 0) {
        // Convert base64 to File object
        let newQA = [];
        for (let i = 0; i < res.DT.qa.length; i++) {
          let q = res.DT.qa[i];
          if (q.imageFile) {
            q.imageName = `question-${q.id}.png`;
            q.imageFile = await urltoFile(
              `data:image/png;base64,${q.imageFile}`,
              `question-${q.id}.png`,
              "image/png"
            );
          }
          newQA.push(q);
        }
        setQuestions(newQA);
        console.log(">>> check newQA: ", newQA);
        console.log(">>> check res: ", res);
      }
    };

    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuizzes = res.DT.map((quiz) => {
        return { value: quiz.id, label: `${quiz.id} - ${quiz.description}` };
      });
      setListQuiz(newQuizzes);
    }
  };

  // return a promise that resolves with a File instance
  async function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  }

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

        // Validate
        const isQuestionInvalid =
          questionsClone[index].description.trim() === "";
        questionsClone[index].isInvalidQuestion = isQuestionInvalid;
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

    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
              // Validate
              const isAnswerInvalid = value.trim() === "";
              answer.isInvalidAnswer = isAnswerInvalid;
            }
          }
          return answer;
        }
      );

      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    // Todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // Validate answer
    let isValidAnswer = true;
    let questionsClone = _.cloneDeep(questions);
    let indexA = 0,
      indexQ = 0;

    for (let i = 0; i < questionsClone.length; i++) {
      for (let j = 0; j < questionsClone[i].answers.length; j++) {
        if (!questionsClone[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          questionsClone[i].answers[j].isInvalidAnswer = true;
          break;
        }
      }

      indexQ = i;
      if (isValidAnswer === false) break;
    }

    if (isValidAnswer === false) {
      setQuestions(questionsClone);
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    // Validate question
    let isValidQ = true;
    let indexQ1 = 0;

    for (let i = 0; i < questionsClone.length; i++) {
      if (!questionsClone[i].description) {
        console.log(questionsClone[i].description);
        isValidQ = false;
        indexQ1 = i;
        questionsClone[i].isInvalidQuestion = true;
        break;
      }
    }

    if (isValidQ === false) {
      setQuestions(questionsClone);
      toast.error(`Not empty description for Question ${indexQ1 + 1}`);
      return;
    }

    // Submit questions
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      // Submit answers
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }

    toast.success("Create questions and answers succed!");
    setQuestions(initQuestions);
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
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                      className={`form-control ${
                        question.isInvalidQuestion ? "is-invalid" : ""
                      }`}
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
                            className={`form-control ${
                              answer.isInvalidAnswer ? "is-invalid" : ""
                            }`}
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

export default QuizQA;
