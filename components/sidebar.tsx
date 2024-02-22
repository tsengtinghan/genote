import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
 
export type Note = {
  id: string;
  data: {
    title: string;
    content: string;
    status: string;
  };
};

export function SideBar({
  notes,
  handleNoteClick,
  handleNewNote,
  handleDeleteNote,
  onLogout,
}: {
  notes: Note[];
  handleNoteClick: (noteId: string) => void;
  handleNewNote: () => void;
  handleDeleteNote: (noteId: string) => void;
  onLogout: () => void;
}) {
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
    <div className="w-full relative">
      <h2 className="text-xl text-[25px] mx-3 mb-5 mt-10 text-center">
        My Notes
      </h2>
      <div className="flex items-center justify-center w-full ">
        <Button className="w-full mx-3 mb-3" onClick={handleNewNote}>
          New Draft
        </Button>
      </div>
      <ScrollArea className="h-dvh w-full rounded-md border">
        {notes.map((note) => (
          <div key={note.id}>
            <Card
              className={`border-4 mt-4 ${
                note.data.status === "added"
                  ? "border-green-300"
                  : note.data.status === "edited"
                  ? "border-yellow-300"
                  : "bg-transparent"
              }`}
              onClick={() => handleNoteClick(note.id)}
            >
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <Link className={`text-lg font-normal`} href={``}>
                      {note.data.title}
                    </Link>
                    {/* <span
                      className={`h-2 w-2 ml-3 mt-1.5 inline-block rounded-full ${
                        note.data.status === "added"
                          ? "bg-red-600"
                          : note.data.status === "edited"
                          ? "bg-yellow-600"
                          : "bg-transparent"
                      }`}
                    ></span> */}
                    <Button className="ml-3 bg-slate-900" onClick={() => handleDeleteNote(note.id)}>
                      <svg
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </ScrollArea>
      <Button className="absolute" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
