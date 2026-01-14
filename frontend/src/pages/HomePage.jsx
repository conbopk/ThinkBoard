import React, {useEffect, useState} from 'react'
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import NoteCard from "../components/NoteCard.jsx";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (e) {
        console.log("Error fetching notes");
        console.log(e.response);
        if (e.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchNotes();
  }, []);

    return (
        <div className='min-h-screen bg-base-300'>
          <Navbar />

          {isRateLimited && <RateLimitedUI />}

          <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary py-10 bg-base-300/10' data-theme='forest'>Loading notes...</div>}

            {notes.length === 0 && !isRateLimited && <NotesNotFound />}

            {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {notes.map((note) => (
                      <NoteCard key={note._id} note={note} setNotes={setNotes} />
                  ))}
                </div>
            )}
          </div>
        </div>
    );
};
export default HomePage;
