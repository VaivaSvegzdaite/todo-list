import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import { v4 as uuid } from "uuid";

import "./App.css";

export default class App extends Component {
  state = {
    todos: [],
  };

  // state = {
  //   todos: [
  //     {
  //       id: uuid(),
  //       title: "Take out trash",
  //       completed: false,
  //     },
  //     {
  //       id: uuid(),
  //       title: "Dinner with ex",
  //       completed: false,
  //     },
  //     {
  //       id: uuid(),
  //       title: "Meeting with boss",
  //       completed: false,
  //     },
  //   ],
  // };

  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos?_limit=10`)
      .then((res) => this.setState({ todos: res.data }));
  }

  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };

  // delTodo = (id) => {
  //   this.setState({
  //     todos: [...this.state.todos.filter((todo) => todo.id !== id)],
  //   });
  // };

  addTodo = (title) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/todos/`, {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  // addTodo = (title) => {
  //   const newTodo = {
  //     id: uuid(),
  //     title: title,
  //     completed: false,
  //   };
  //   this.setState({ todos: [...this.state.todos, newTodo] });
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
