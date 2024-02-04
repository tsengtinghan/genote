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


