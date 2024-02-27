import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Dung",
    address: 115,
    age: 26,
  };

  handleOnClick(event) {
    // console.log(">>> Click me button", event.target);

    // merge state => react class
    this.setState({
      name: "Dao",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }
  handleOnMouseOver(event) {
    // console.log(event.pageX);
  }

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        <button onMouseOver={this.handleOnMouseOver}>Hover me</button>
        <button
          onClick={(event) => {
            this.handleOnClick(event);
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}

export default MyComponent;
