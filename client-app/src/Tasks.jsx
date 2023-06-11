import { TasksCard } from "./TasksCard";

export const Tasks = ({ taskList, isCache }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center">
        Task List{" "}
        <span className="text-sm text-gray-500">({taskList.length})</span>
        {/* // put className conditionally on isCache */}
        <span className={isCache == 'yes' ? "text-red-500" : "text-green-500"}>
          {isCache == 'yes' ? " cached" : " live"}
        </span>
      </h3>
      <>
        {
          taskList.map((task) => (
            // <TasksCard key={task.id} name={task.name} status = {task.status}/>
              <article className="bg-white shadow-md rounded-md p-4 my-4">
              <p>{name} <span className="text-red-500">{status}</span>
      
            </p>
            <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => deleteTask(key)}>
                Trash
              </button>
          </article>
          ))
        }
      </>
    </div>
  );
};
