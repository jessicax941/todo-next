'use client';

type TodoItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  toggleTodo: (id: string, isCompleted: boolean) => void;
};

function TodoItem({ id, title, isCompleted, toggleTodo }: TodoItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={isCompleted}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="peer-checked:line-through peer-checked:text-slate-500 cursor-pointer"
      >
        {title}
      </label>
    </li>
  );
}

export default TodoItem;
