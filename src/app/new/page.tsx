import {
  EventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { prisma } from "../db";
import Link from "next/link";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (!title || typeof title !== "string") {
    console.error("not a string or valid value");
  } else {
    console.log(title);
    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        complete: false,
      },
    });
    if (newTodo) {
      redirect("/");
    } else {
      throw new Error("Problem adding todo");
    }
    console.log(newTodo);
  }
}

const page = () => {
  // async function handleSubmit(
  //   e: FormEvent<HTMLFormElement>
  // ) {
  //   e.preventDefault();
  //   const title = e.currentTarget.value;
  //   if (!title) return;

  //   const newTodo = await prisma.todo.create({
  //     data: {
  //       title: title,
  //       complete: false,
  //     },
  //   });

  // }
  return (
    <div className='max-w-6xl flex flex-col items-center justify-center h-full'>
      <header className='flex justify-between'>
        <h1 className='text-3xl'>Add Todo</h1>
      </header>
      <form
        action={createTodo}
        className='flex flex-col gap-2'
      >
        <label htmlFor='title'>Event</label>
        <input
          className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
          name='title'
          type='text'
        />
        <div className='flex justify-end'>
          <Link
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
            href={".."}
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
