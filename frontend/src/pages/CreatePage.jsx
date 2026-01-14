import React, {useState} from 'react'
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import {Link, useNavigate} from "react-router";
import {ArrowLeftIcon} from "lucide-react";


const CreatePage = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!title.trim() || !content.trim()) {
        toast.error("All fields are required");
        return;
      }

      setLoading(true);
      try {
        await api.post("/notes", {
          title: title,
          content: content,
        });

        toast.success("Note created successfully!");
        navigate("/");
      } catch (e) {
        console.log("Error creating note", e);
        if (e.response.status === 429) {
          toast.error("Slow down! You're creating notes too fast", {
            duration: 4000,
            icon: "💀",
          });
        } else {
          toast.error("Failed to create note");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className='min-h-screen bg-base-300'>
          <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto bg-base-300/10' data-theme='forest'>
              <Link to={"/"} className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className='size-5'/>
                Back to Notes
              </Link>

              <div className='card bg-base-100'>
                <div className='card-body'>
                  <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                  <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-4 gap-2'>
                      <label htmlFor='title' className='text-sm font-medium text-base-content'>
                        <span>Title</span>
                      </label>
                      <input
                          id='title'
                          type="text"
                          placeholder="Note Title"
                          className='w-full rounded-lg border border-base-content/20 bg-base-100 px-3 py-2 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className='flex flex-col mb-4 gap-2'>
                      <label htmlFor="textarea" className='text-sm font-medium text-base-content'>
                        <span>Content</span>
                      </label>
                      <textarea
                          id="textarea"
                          placeholder='Write your think here...'
                          className='textarea h-40 w-full resize-none rounded-xl border border-base-content/20 bg-base-100 px-4 py-3 font-mono
                          text-sm leading-relaxed outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-base-content/40'
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                      />
                    </div>

                    <div className='card-actions justify-end'>
                      <button type={"submit"} className='btn btn-primary' disabled={loading}>
                        {loading ? "Creating..." : "Create Note"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CreatePage;