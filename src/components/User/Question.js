import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { data, index } = props;

  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckBox = (e, aId, qId) => {
    props.handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt="photo"
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"question image"}
              onClose={() => setIsPreviewImage(false)}
            />
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={a.isSelected}
                    onChange={(e) =>
                      handleHandleCheckBox(e, a.id, data.questionId)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {a.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
