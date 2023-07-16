import TodoItem from '@/components/TodoItem';
import { prisma } from '@/db';
import Link from 'next/link';

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, isCompleted: boolean) {
  'use server';

  await prisma.todo.update({ where: { id }, data: { isCompleted } });
}

export default async function Home() {
  // call server code in this server component bc it's run and rendered in the server first before being passed to the client
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2l">Todos</h1>
        <Link
          href="/new"
          className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-600 outline-none"
        >
          New
        </Link>
      </header>

      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            toggleTodo={toggleTodo}
          ></TodoItem>
        ))}
      </ul>
    </>
  );
}
