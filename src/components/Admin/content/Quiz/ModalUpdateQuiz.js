import { useEffect, useState } from "react";
import _ from "lodash";
import { putUpdateForAdmin } from "../../../../services/apiService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcPlus } from "react-icons/fc";

const types = ["EASY", "MEDIUM", "HARD"];

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;

  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
    }
  }, [dataUpdate]);

  const handleChangeInput = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    // Validate
    if (!quiz.name) {
      toast.error("Invalid Name");
      return;
    }
    if (!quiz.description) {
      toast.error("Invalid Description");
      return;
    }

    let data = await putUpdateForAdmin(
      dataUpdate.id,
      quiz.name,
      quiz.description,
      difficulty,
      image
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchQuiz();
      handleClose();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const handleClose = () => {
    setShow(false);
    setQuiz({
      name: "",
      description: "",
    });
    setDifficulty("EASY");
    setImage("");
    setPreviewImage("");
    setDataUpdate({});
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update the quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={quiz.name}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={quiz.description}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                id="inputState"
                className="form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {types.map((type) => {
                  return <option key={type}>{type}</option>;
                })}
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="myPhoto" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
