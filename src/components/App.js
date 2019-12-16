import React, { Component } from "react";
import Ikea from "./Ikea/Ikea";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

class App extends Component {
  state = {
    name: ""
  };
  handleInputChange = newName => {
    this.setState({ name: newName.target.value }); 
  };

  render() {
    return (
      <>
        <Container>
          <h1> Javascript Challenge</h1>
          <TextField
            id="standard-basic"
            label="Search..."
            color="primary"
            onChange={this.handleInputChange} 
            style={{ width: "100%" }}
          />
          <Ikea
            item={this.state.name} 
          />
        </Container>
      </>
    );
  }
}
export default App;
