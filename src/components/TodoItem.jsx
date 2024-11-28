import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";

function TodoItem({ id, text, completed }) {
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(text);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    if (edit) {
      dispatch(updateTodo({ id, text: newText }));
    }
    setEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  const handleToggle = () => {
    dispatch(toggleTodo({ id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };
  return (
    <div className="flex items-center h-[65px] gap-[12px] px-[12px] py-0">
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
        className="w-[16px] h-[16px]"
      />
      {edit ? (
        <input
          value={newText}
          onChange={handleChange}
          className="grow border-[1px] border-solid border-gray-500 rounded-[6px] bg-transparent px-[12px] py-[4px] text-sm leading-[20px] text-white"
        />
      ) : (
        <p className={`grow ${completed ? "line-through" : ""}`}>{text}</p>
      )}

      <button
        onClick={handleEdit}
        className="w-[40px] h-[30px] bg-black text-white border-none"
      >
        수정
      </button>
      <button
        onClick={handleDelete}
        className="w-[40px] h-[30px] bg-black text-white border-none"
      >
        삭제
      </button>
    </div>
  );
}

export default TodoItem;
