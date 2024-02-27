import React from "react";
class MyComponent extends React.Component {
  state = {
    name: "Dung",
    address: 115,
    age: 26,
  };

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm from {this.state.address}
      </div>
    );
  }
}

export default MyComponent;
