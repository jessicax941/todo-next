import { prisma } from '@/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function createTodo(data: FormData) {
  'use server'; // server actions - this is server code and will not run on the client

  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('Title is invalid');
  }

  await prisma.todo.create({ data: { title, isCompleted: false } });
  redirect('/');
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2l">New</h1>
      </header>

      <form className="flex gap-2 flex-col" action={createTodo}>
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />

        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-600 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-600 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
