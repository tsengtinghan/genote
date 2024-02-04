import { Note } from "./sidebar";
import Markdown from 'react-markdown'
const parseToMarkDown = (str: string): string => {
  return str.replace(/\\n/g, "\n");
}
export function ReviewNote({note}: {note: Note}) {
  return (
    <div className="h-full w-full p-10">
      <Markdown className="prose">{parseToMarkDown(note.data.content)}</Markdown>
    </div>
  );
}

