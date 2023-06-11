const baseUrl =  "http://localhost:5001";

export const getAll = async () => {
  const resp = await fetch(`${baseUrl}/data`);
  const data = await resp.json();
  return data;
};

export const createTask = async (name) => {
  const resp = await fetch(`${baseUrl}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name:name,status:'pending' }),
  });
  const data = await resp.json();
  return data;
};

export const deleteTask = async (id) => {
  const resp = await fetch(`${baseUrl}/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await resp.json();
  return data;
};