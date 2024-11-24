import { useContext } from "react";
import { DELETE_TODO_COMPLETED, TOGGLE_TODO_ALL } from "../reducer";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
import { TodoContext } from "../context";

function TodoList() {
  const { state, dispatch } = useContext(TodoContext);

  const completedCount = state.list.filter((item) => item.completed).length;

  const handleToggleAll = (e) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: e.target.checked });
  };

  const handleDeleteCompleted = () => {
    dispatch({ type: DELETE_TODO_COMPLETED });
  };

  const filteredList = state.list.filter((item) => {
    switch (state.filterType) {
      case "TODO":
        return !item.completed;
      case "COMPLETED":
        return item.completed;
      default:
        return true;
    }
  });

  const isAllCompleted =
    filteredList.length > 0 && filteredList.every((item) => item.completed);

  return (
    <div className={styles["todo-list"]}>
      <div className={styles["todo-header"]}>
        <input
          type="checkbox"
          className={styles["todo-checkbox"]}
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className={styles["todo-header-text"]}>할 일</p>
        {completedCount > 0 && (
          <button
            className={styles["todo-header-button"]}
            onClick={handleDeleteCompleted}
          >
            {completedCount}개 선택 삭제
          </button>
        )}
      </div>
      <div>
        {filteredList.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
