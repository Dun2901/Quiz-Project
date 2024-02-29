import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  //JSX
  state = {
    listUser: [
      { id: 1, name: "Hoi Dan It", age: "16" },
      { id: 2, name: "Eric", age: "26" },
      { id: 3, name: "Harry", age: "30" },
    ],
  };

  render() {
    // DRY: don't repeat yourself
    return (
      <div>
        <UserInfor />
        <br />
        <DisplayInfor listUsers={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponent;
