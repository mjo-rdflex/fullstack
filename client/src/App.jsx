import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://fullstack-nspz.onrender.com/api/posts"; 

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("All fields required");
    try {
      await axios.post(API_URL, form);
      setForm({ title: "", content: "" });
      fetchBlogs();
    } catch (err) {
      console.error("Error adding blog:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Simple Blog</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
          style={styles.input}
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Blog Content"
          style={{ ...styles.input, height: 80 }}
        />
        <button type="submit" style={styles.button}>
          Add Blog
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        blogs.map((blog, idx) => (
          <div key={idx} style={styles.blogCard}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "30px auto",
    padding: 20,
    fontFamily: "sans-serif",
    background: "#f7f7f7",
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    fontSize: 16,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  blogCard: {
    background: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
};




