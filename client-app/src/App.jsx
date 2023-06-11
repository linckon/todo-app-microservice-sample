import { useState, useEffect } from "react";
import { getAll, createTask,deleteTask } from "../lib/db";
import { Tasks } from "./Tasks";
import { Form } from "./Form";

const App = () =>  {
  const [taskList, setTaskList] = useState([]);
  const [isCache, setIsCache] = useState('no');
  const [userInput, setUserInput] = useState("");

   // set tasks on first render
   useEffect(() => {
    getAll()
      .then(({ isCached, data }) => {
        setTaskList(data);
        setIsCache(isCached);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // handle refresh button click
  const handleRefresh = async () => {
    const { isCached, data } = await getAll();
    setTaskList(data);
    setIsCache(isCached);
  };

  // handle form submit
  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      await createTask(userInput);
      const { isCached, data } = await getAll();
      setTaskList(data);
      setIsCache(isCached);
      setUserInput("");
     
    } catch (error) {
      console.error("Error creating tasks: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id)
      await deleteTask(id);
      const { isCached, data } = await getAll();
      setTaskList(data);
      setIsCache(isCached);
     
    } catch (error) {
      console.error("Error creating tasks: ", error);
    }
  };

  return (
    <main className="grid place-items-center my-10 grid-cols-1 md:grid-cols-2">
      <section>
      <form onSubmit={handleSubmit}  className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Type here..."
          onChange={(e) => setUserInput(e.target.value)}
          className="w-96 p-2 my-4 rounded-md border-2 border-gray-300"
          required
        />
        
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Add Task
        </button>
      </form>
      </section>
      <section>
        <button
          className="block mx-auto mb-5 px-2 py-1 bg-gray-500 text-white rounded-md"
          onClick={handleRefresh}
        >
          ↻ Refresh
        </button>
        {/* <Tasks taskList={taskList} isCache={isCache} /> */}

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
                    <p>{task.name} <span className="text-red-500">{task.status}</span>
            
                  </p>
                  <button className="bg-red-500 text-white p-2 rounded-md"
                   onClick={() => handleDelete(task.id)}>
                      Trash
                    </button>
                </article>
                ))
              }
            </>
         </div>
      </section>
    </main>
  );
}

export default App;
