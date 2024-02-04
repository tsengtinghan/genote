import * as React from "react";
import Link from 'next/link';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function ScrollAreaDemo() {
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    fetch('https://prd-genote-bodpztde6a-an.a.run.app/users/mlOkrsQrXLaSqilkqrUD/notes') 
        .then(response => response.json())
        .then(data => setNotes(data))
        .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <ScrollArea className="h-72 w rounded-md">
      <div className="p-4">
        {notes.map((note) => (
          <React.Fragment key={note.id}>
            <Link className="text-sm hover:text-blue-600" href={`/notes/${note.id}`}>
                {note.data.title}
            </Link>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}


function StickyNoteIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
        <path d="M15 3v6h6" />
      </svg>
    )
  }
