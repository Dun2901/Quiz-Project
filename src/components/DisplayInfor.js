import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";

// class DisplayInfor extends React.Component {
//   state = {
//     isShowListUser: true,
//   };

//   handleShowHide = () => {
//     this.setState({
//       isShowListUser: !this.state.isShowListUser,
//     });
//   };

//   render() {
//     const { listUsers } = this.props; // object
//     // const listUsers = this.props.listUsers
//     // console.log(listUsers);

//     return (
//       <div className="display-infor-container">
//         <div>
//           <button
//             onClick={() => {
//               this.handleShowHide();
//             }}
//           >
//             {this.state.isShowListUser === true
//               ? " Hide list users:"
//               : " Show list users:"}
//           </button>
//         </div>

//         {this.state.isShowListUser && (
//           <>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>My name's: {user.name}</div>
//                   <div>My age's: {user.age}</div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { listUsers, handleDeleteUser } = props;
  const [isShowListUser, setShowListUser] = useState(true);

  console.log(">>> call me render");
  useEffect(() => {
    if (listUsers.length === 0) alert("you delete all the users");
    console.log(">>> call me useEffect");
  }, [listUsers]);

  const handleShowHideListUser = () => {
    setShowListUser(!isShowListUser);
  };

  return (
    <div className="display-infor-container">
      <div>
        <button
          onClick={() => {
            handleShowHideListUser();
          }}
        >
          {isShowListUser === true ? "Hide list users: " : "Show list users: "}
        </button>
      </div>

      {isShowListUser && (
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>My name's: {user.name}</div>
                <div>My age's: {user.age}</div>
                <div>
                  <button onClick={() => handleDeleteUser(user.id)}>
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
};

export default DisplayInfor;
