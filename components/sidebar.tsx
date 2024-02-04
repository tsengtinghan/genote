'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('https://prd-genote-bodpztde6a-an.a.run.app/users/mlOkrsQrXLaSqilkqrUD/notes')
      .then(response => response.json())
      .then(data => {
        setNotes(data);
        console.log(data)
        console.log('hi')

      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []); 

  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        {notes.map((note) => (
          <Link
            key={note.id}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#" 
          >
            {note.data.title} {/* Accessing the title from the note's data */}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
