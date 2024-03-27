import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = () => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          <TableUser />
          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
