import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../api/api";
import "../../components/admin/admin.css";

const Categories = () => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return;

    await createCategory(name, token);
    setName("");
    loadCategories();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete category?")) {
      await deleteCategory(id, token);
      loadCategories();
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Category Management</h2>

      <form className="category-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => handleDelete(cat._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
