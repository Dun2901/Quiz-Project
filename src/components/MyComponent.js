import React, { useState } from "react";
import DisplayInfor from "./DisplayInfor";
import AddUserInfor from "./AddUserInfor";

// class MyComponent extends React.Component {
//   //JSX
//   state = {
//     listUser: [
//       { id: 1, name: "Hoi Dan It", age: "16" },
//       { id: 2, name: "Eric", age: "26" },
//       { id: 3, name: "Harry", age: "30" },
//     ],
//   };

//   handleAddNewUser = (userObj) => {
//     this.setState({
//       listUser: [userObj, ...this.state.listUser],
//     });
//   };
//   handleDeleteUser = (userId) => {
//     let listUsersClone = [...this.state.listUser];
//     listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUser: listUsersClone,
//     });
//   };

//   render() {
//     // DRY: don't repeat yourself
//     return (
//       <div>
//         <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//         <br />
//         <DisplayInfor
//           listUsers={this.state.listUser}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </div>
//     );
//   }
// }

const MyComponent = () => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Hoi Dan It", age: "16" },
    { id: 2, name: "Eric", age: "26" },
    { id: 3, name: "Harry", age: "30" },
  ]);

  const handleAddNewUser = (userObj) => {
    setListUsers(() => [userObj, ...listUsers]);
  };
  const handleDeleteUser = (userId) => {
    let listUsersClone = listUsers;
    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    setListUsers(listUsersClone);
  };

  return (
    <div>
      <AddUserInfor handleAddNewUser={handleAddNewUser} />
      <br />
      <DisplayInfor listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default MyComponent;
