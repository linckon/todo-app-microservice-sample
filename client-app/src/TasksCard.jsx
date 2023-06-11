export const TasksCard = ({ key,name,status }) => {
    return (
      <article className="bg-white shadow-md rounded-md p-4 my-4">
        <p>{name} <span className="text-red-500">{status}</span>

       </p>
       <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => deleteTask(key)}>
          Trash
        </button>
      </article>
      
    );
  };
  