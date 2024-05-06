import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);

  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setDataUpdate({});
    setDataDelete({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleUpdate = (quiz) => {
    setDataUpdate(quiz);
    setIsShowModalUpdate(true);
  };

  const handleDelete = (quiz) => {
    setDataDelete(quiz);
    setIsShowModalDelete(true);
  };

  return (
    <>
      <div>List Quizzes:</div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(quiz)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(quiz)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ModalUpdateQuiz
        show={isShowModalUpdate}
        setShow={setIsShowModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchQuiz={fetchQuiz}
      />
      <ModalDeleteQuiz
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        dataDelete={dataDelete}
        setDataDelete={setDataDelete}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
