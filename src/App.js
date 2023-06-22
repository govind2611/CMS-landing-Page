import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the post being edited

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both the title and description.");
      return;
    }

    if (editIndex === -1) {
      // Add new post
      const newPost = { title, content };
      setPosts([...posts, newPost]);
      toast.success("Post added successfully!");
    } else {
      // Edit existing post
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = { title, content };
      setPosts(updatedPosts);
      toast.info("Post updated successfully!");
      setEditIndex(-1); // Reset editIndex
    }

    setTitle("");
    setContent("");
  };

  const handleEditPost = (index) => {
    const postToEdit = posts[index];
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
    setEditIndex(index);
  };

  const handleDeletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
    toast.warn(`Deleting post at index ${index}`);
  };

  return (
    <div className="App">
      <h1 className="title">Content Management System</h1>
      <form className="post-form" onSubmit={handlePostSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Description</label>
          <textarea
            value={content}
            id="content"
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="add-button">
          {editIndex === -1 ? "Add Post" : "Update Post"}
        </button>
      </form>
      {posts.length > 0 && <h3 className="posts-title">Posts</h3>}
      <div className="posts-container">
        {posts.map((post, index) => (
          <div className="post-card" key={index}>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
              <span className="edit-icon" onClick={() => handleEditPost(index)}>
                &#9998;
              </span>
              <span
                className="delete-icon"
                onClick={() => handleDeletePost(index)}
              >
                &#128465;
              </span>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
       position="top-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="dark"
      />
    </div>
  );
}

export default App;
