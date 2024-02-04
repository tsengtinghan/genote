import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
 


export type Note = {
  id: string;
  data: {
    title: string;
    content: string;
    status: string;
  };
};

export function SideBar({notes, handleNoteClick, handleNewNote}: {notes: Note[], handleNoteClick: (noteId: string) => void, handleNewNote: () => void}) {
 
  // const sortedNotes = notes.sort((a, b) => {
  //   if (a.data.status === 'reviewed' && b.data.status !== 'reviewed') {
  //     return 1; 
  //   } else if (b.data.status === 'reviewed' && a.data.status !== 'reviewed') {
  //     return -1; 
  //   }
  //   return 0; 
  // });
  // console.log(sortedNotes);
  
  return (
    <div className="w-full">
      <h2 className="text-xl text-[25px] mx-3 mb-5 mt-10 text-center">My Notes</h2>
      <div className="flex items-center justify-center w-full">
        <Button className="w-full mx-3" onClick={handleNewNote}>New Note</Button>
      </div>
      {notes.map((note) => (
        <div key={note.id}>
          <Card onClick={() => handleNoteClick(note.id)} >
            <CardHeader>
              <CardTitle>
                <div className="flex justify-normal">
                    <Link
                    className={`text-sm `}
                    href={`/notes/${note.id}`}
                    >
                    {note.data.title}
                    </Link>
                    <span className={`h-2 w-2 ml-3 mt-1.5 inline-block rounded-full ${
                        note.data.status === 'added'
                        ? 'bg-red-600'
                        : note.data.status === 'edited'
                        ? 'bg-yellow-600'
                        : 'bg-transparent'
                    }`}></span>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
