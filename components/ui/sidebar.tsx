import * as React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
} from "./card";


export type Note = {
  id: string;
  data: {
    title: string;
    status: string;
  };
};

export function SideBar({notes}: {notes: Note[]}) {
 
  const sortedNotes = notes.sort((a, b) => {
    if (a.data.status === 'reviewed' && b.data.status !== 'reviewed') {
      return 1; 
    } else if (b.data.status === 'reviewed' && a.data.status !== 'reviewed') {
      return -1; 
    }
    return 0; 
  });
  // console.log(sortedNotes);
  
  return (
    <div>
      <h2 className="text-xl mx-3 my-4">Recent Notes</h2>
      {sortedNotes.map((note) => (
        <React.Fragment key={note.id}>
          <Card>
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
        </React.Fragment>
      ))}
    </div>
  );
}
