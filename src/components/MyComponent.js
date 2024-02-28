import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Dung",
    address: 115,
    age: 26,
  };

  handleOnClick(event) {
    console.log(">>> Click me button", event.target);
    // console.log("My name is ", this.state.name); error

    // merge state => react class
    this.setState({
      name: "Dao",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }
  handleOnMouseOver(event) {
    // console.log(event.pageX);
  }

  handleOnChangeInput = (event) => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age}
        {/* <button onClick={this.handleOnClick}>Click me</button> error */}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
