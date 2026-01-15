import { useEffect, useState } from "react";
import { getAdminProjects, createProject } from "../../api/api";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "ongoing",
    image: "",
  });

  const loadProjects = async () => {
    const data = await getAdminProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const submit = async () => {
    await createProject(form);
    setForm({ title: "", description: "", status: "ongoing", image: "" });
    loadProjects();
  };

  return (
    <div className="admin-page">
      <h2>Manage Projects</h2>

      <input placeholder="Title" value={form.title}
        onChange={e=>setForm({...form,title:e.target.value})} />

      <textarea placeholder="Description" value={form.description}
        onChange={e=>setForm({...form,description:e.target.value})} />

      <input placeholder="Image URL" value={form.image}
        onChange={e=>setForm({...form,image:e.target.value})} />

      <select value={form.status}
        onChange={e=>setForm({...form,status:e.target.value})}>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>

      <button onClick={submit}>Add Project</button>

      <hr />

      {projects.map(p => (
        <div key={p._id}>
          <b>{p.title}</b> — {p.status}
        </div>
      ))}
    </div>
  );
};

export default AdminProjects;
