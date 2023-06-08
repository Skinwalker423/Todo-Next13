"use client";

type TodoItemProps = {
  title: string;
  id: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
};

const TodoItem = ({
  title,
  id,
  complete,
  toggleTodo,
}: TodoItemProps) => {
  return (
    <li key={id} className='flex gap-1 items-center'>
      <input
        id={id}
        type='checkbox'
        className='cursor-pointer peer'
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        className='cursor-pointer peer-checked:line-through peer-checked:text-slate-500'
        htmlFor={id}
      >
        {title}
      </label>
    </li>
  );
};

export default TodoItem;
