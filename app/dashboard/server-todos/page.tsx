import { NewTodo, TodosGrid } from "@/app/todos";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Listado de todos",
  description: "Todos",
};

export default async function ServerTodosPage() {
  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((resp) => resp.json())
  //     .then(console.log);
  // }, []);

  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
