import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/Header';

// comment test

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note! I can add new notes by typing input on the orange note.",
      date: "15/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note! I can delete notes by selecting the trash can symbol in the bottom right corner of the note.",
      date: "15/05/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note! I can search for keywords using the search bar above the notes section.",
      date: "15/06/2021",
    },
    {
      id: nanoid(),
      text: "This is my new note! You can toggle dark mode on and off by clicking the Toggle Mode button at the top of the page.",
      date: "15/07/2021",
    },
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
      );

      if(savedNotes)
      {
        setNotes(savedNotes);
      }
    }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data', 
      JSON.stringify(notes) 
      );
  }, [notes]);

  const addNote = (text) => {
    // console.log(text);
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  } 

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText} />
        <NotesList  
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
            )} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}/>
      </div>
    </div>
  );
};

export default App;