import { useContext, useState } from "react";
import { TodoContext } from "../context";
import { ADD_TODO, SET_FILTER } from "../reducer";

function Controls() {
  const { state, dispatch } = useContext(TodoContext);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    dispatch({ type: ADD_TODO, payload: text });
    setText("");
  };

  const handleChangeFilterType = (e) => {
    dispatch({ type: SET_FILTER, payload: e.target.value });
  };

  return (
    <div className="flex gap-[6px] h-[30px]">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="grow border-[1px] border-solid rounded-[6px]  border-gray-500 bg-transparent px-[12px] py-[4px] text-[14px] leading-[20px] text-white"
      />
      <button
        onClick={handleSubmit}
        className="border-[1px] border-solid border-gray-500 bg-transparent px-[12px] py-0 text-white shrink rounded-[6px]"
      >
        추가
      </button>
      <select
        value={state.filterType}
        onChange={handleChangeFilterType}
        className="border-[1px] border-solid border-gray-500 bg-transparent px-[12px] py-0 text-white shrink rounded-[6px]"
      >
        <option value="ALL" style={{ background: "black", color: "white" }}>
          전체
        </option>
        <option value="TODO" style={{ background: "black", color: "white" }}>
          할 일
        </option>
        <option
          value="COMPLETED"
          style={{ background: "black", color: "white" }}
        >
          완료
        </option>
      </select>
    </div>
  );
}

export default Controls;
