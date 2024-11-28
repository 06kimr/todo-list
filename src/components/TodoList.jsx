import { useDispatch, useSelector } from "react-redux";
import { deleteTodoCompleted, toggleTodoAll } from "../store/todoSlice";
import TodoItem from "./TodoItem";

function TodoList() {
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const completedCount = state.list.filter((item) => item.completed).length;

  const handleToggleAll = (e) => {
    dispatch(toggleTodoAll(e.target.checked));
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteTodoCompleted());
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
    <div className="border-[1px] border-solid border-gray-500 rounded-[6px] mt-[16px]">
      <div className="flex items-center h-[40px] px-[12px] py-0 gap-[12px]">
        <input
          className="w-[16px] h-[16px]"
          type="checkbox"
          checked={isAllCompleted}
          onChange={handleToggleAll}
        />
        <p className="grow">할 일</p>
        {completedCount > 0 && (
          <button
            className="border-[1px] border-solid border-gray-500 rounded-[6px] bg-transparent px-[12px] py-0 text-white shrink h-[30px] "
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
