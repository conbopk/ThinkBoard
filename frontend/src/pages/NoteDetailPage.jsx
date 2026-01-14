import React, {useEffect, useState} from 'react'
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import {Link, useNavigate, useParams} from "react-router";
import {ArrowLeftIcon, LoaderIcon, Trash2Icon} from "lucide-react";

const NoteDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (e) {
        console.log("Error in fetching note", e);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    void fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (e) {
      console.log("Error deleting the note:", e);
      toast.error("Failed to delete note");
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (e) {
      console.log("Error saving the note:", e);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
        <div className='min-h-screen bg-base-300/10 flex items-center justify-center' data-theme='forest'>
          <LoaderIcon className='animate-spin size-10'/>
        </div>
    );
  }

  return (
      <div className='min-h-screen bg-base-300'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto bg-base-300/10' data-theme='forest'>
            <div className='flex items-center justify-between mb-6'>
              <Link to={"/"} className='btn btn-ghost'>
                <ArrowLeftIcon className='size-5'/>
                Back to Notes
              </Link>
              <button onClick={handleDelete} className='btn btn-error btn-outline'>
                <Trash2Icon className='h-5 w-5'/>
                Delete Note
              </button>
            </div>

            <div className='card bg-base-100'>
              <div className='card-body'>
                <div className='flex flex-col mb-4 gap-2'>
                  <label htmlFor='title' className='text-sm font-medium text-base-content'>
                    <span>Title</span>
                  </label>
                  <input
                      id='title'
                      type="text"
                      placeholder="Note Title"
                      className='w-full rounded-lg border border-base-content/20 bg-base-100 px-3 py-2 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition'
                      value={note.title}
                      onChange={(event) => setNote({...note, title: event.target.value})}
                  />
                </div>

                <div className='flex flex-col mb-4 gap-2'>
                  <label htmlFor='content' className='text-sm font-medium text-base-content'>
                    <span>Content</span>
                  </label>
                  <textarea
                      id="content"
                      placeholder='Write your think here...'
                      className='textarea h-40 w-full resize-none rounded-xl border border-base-content/20 bg-base-100 px-4 py-3 font-mono
                      text-sm leading-relaxed outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-base-content/40'
                      value={note.content}
                      onChange={(e) => setNote({...note, content: e.target.value})}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button
                      className='btn btn-primary'
                      disabled={saving}
                      onClick={handleSave}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default NoteDetailPage;