import React from "react";
import "./DisplayInfor.scss";

class DisplayInfor extends React.Component {
  state = {
    isShowListUser: true,
  };

  handleShowHide = () => {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  };

  render() {
    const { listUsers } = this.props; // object
    // const listUsers = this.props.listUsers
    // console.log(listUsers);

    return (
      <div className="display-infor-container">
        <div>
          <button
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowListUser === true
              ? " Hide list users:"
              : " Show list users:"}
          </button>
        </div>

        {this.state.isShowListUser && (
          <>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                  <div>My name's: {user.name}</div>
                  <div>My age's: {user.age}</div>
                  <div>
                    <button
                      onClick={() => this.props.handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
