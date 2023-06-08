import { FormEvent } from "react";
import Link from "next/link";
import { prisma } from "./db";
import TodoItem from "./components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  console.log(id, complete);
  await prisma.todo.update({
    where: {
      id,
    },
    data: { complete },
  });
}

export default async function Home() {
  // const newTodo = await prisma.todo.create({
  //   data: {
  //     title: "test",
  //     complete: false,
  //   },
  // });
  const todos = await getTodos();
  console.log(todos);

  return (
    <>
      <header className='flex justify-between'>
        <h1 className='text-3xl'>Todo</h1>
        <Link
          className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          href={"/new"}
        >
          New
        </Link>
      </header>
      <main>
        <ul className='pl-4'>
          {todos.map((todo) => {
            return (
              <TodoItem
                title={todo.title}
                id={todo.id}
                complete={todo.complete}
                toggleTodo={toggleTodo}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
}
