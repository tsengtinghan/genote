import { Note } from "./sidebar";

export function ReviewNote({note}: {note: Note}) {
  return (
    <div className="h-full w-full">
      {note.id}
    </div>
  );
}
