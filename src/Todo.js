import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%"
  },
  header: {
    margin: 20
  },
  input: {
    width: "50%",
    margin: 20
  },
  list: {
    width: "50%",
    marginLeft: "25%",
    fontSize: "1.2em",
    textAlign: "left"
  },
  todoElement: {
    margin: 0,
    padding: 0
  },
  removeButton: {
    marginLeft: 5
  },
  listElement: {
    display: "inline-flex"
  },
  task: {
    paddingTop: 5
  }
}));

const Todo = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([
    { id: 1, item: "First Task" },
    { id: 2, item: "Second Task" }
  ]);
  const [inputVal, setInputVal] = useState();

  const removeTask = id => {
    setTasks(tasks.filter(todo => todo.id !== id));
  };

  const addTask = data => {
    let id = tasks.length + 1;
    setTasks([
      ...tasks,
      {
        id,
        item: data
      }
    ]);
  };

  const handleChange = event => {
    setInputVal(event.target.value);
  };

  const addNewTask = e => {
    e.preventDefault();
    addTask(inputVal);
    setInputVal("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Todo List</h2>
      </div>
      <form>
        <div className={classes.container}>
          <TextField
            type="text"
            autoFocus
            value={inputVal}
            placeholder="Enter a task"
            className={classes.input}
            data-testid="input"
            onChange={event => handleChange(event)}
          />
        </div>
        <div className="row">
          <Button
            type="submit"
            onClick={addNewTask}
            className="btn btn-primary"
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        </div>
      </form>
      <div className="row todo-list">
        <h3>Lists</h3>
        {!tasks.length ? (
          <div className="no-task">No tasks!</div>
        ) : (
          <List data-testid="todos" className={classes.list}>
            {tasks.map(todo => {
              return (
                <ListItem key={todo.id} className={classes.todoElement}>
                  <div className={classes.listElement}>
                    <ListItemText className={classes.task}>
                      {todo.item}
                    </ListItemText>
                    <IconButton
                      aria-label="delete"
                      className={classes.removeButton}
                      data-testid="delete-button"
                      onClick={() => removeTask(todo.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
};
export default Todo;
