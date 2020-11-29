import React, { Component } from "react";
import PropTypes from "prop-types";

// const itemStyle = { backgroundColor: "#f4f4f4" };

export default class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };
  };

  // markComplete = (e) => {
  //   console.log(this.props);
  // };

  render() {
    const { id, title } = this.props.todo;

    return (
      // <div style={{ backgroundColor: "#f4f4f4" }}>
      // <div style={itemStyle}>
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id)}
          />{" "}
          {title}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
            X
          </button>
        </p>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};
