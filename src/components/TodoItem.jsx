import { useContext, useState } from "react";
import { TodoContext } from "../context";
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from "../reducer";

function TodoItem({ id, text, completed }) {
  const { dispatch } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleChange = (e) => {
    dispatch({
      type: UPDATE_TODO,
      payload: {
        id,
        text: e.target.value,
      },
    });
  };

  const handleToggle = () => {
    dispatch({
      type: TOGGLE_TODO,
      payload: id,
    });
  };

  const handleDelete = () => {
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
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
          value={text}
          onChange={handleChange}
          className="grow border-[1px] border-solid border-gray-500 rounded-[6px] bg-transparent px-[12px] py-[4px] text-sm leading-[20px] text-white"
        />
      ) : (
        <p
          className={`grow ${completed ? "line-through" : ""}`}
          completed={completed}
        >
          {text}
        </p>
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
