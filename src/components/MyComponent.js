import React from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

class MyComponent extends React.Component {
  //JSX
  state = {
    listUser: [
      { id: 1, name: "Hoi Dan It", age: "16" },
      { id: 2, name: "Eric", age: "26" },
      { id: 3, name: "Harry", age: "30" },
    ],
  };

  handleAddNewUser = (userObj) => {
    this.setState({
      listUser: [userObj, ...this.state.listUser],
    });
  };
  handleDeleteUser = (userId) => {
    let listUsersClone = [...this.state.listUser];
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    this.setState({
      listUser: listUsersClone,
    });
  };

  render() {
    // DRY: don't repeat yourself
    return (
      <div>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <br />
        <DisplayInfor
          listUsers={this.state.listUser}
          handleDeleteUser={this.handleDeleteUser}
        />
      </div>
    );
  }
}

export default MyComponent;
