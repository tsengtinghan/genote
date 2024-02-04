import { Note } from "./sidebar";
import Markdown from "react-markdown";
const parseToMarkDown = (str: string): string => {
  return str.replace(/\\n/g, "\n");
};
export function ReviewNote({
  note,
  handleNoteClick,
}: {
  note: Note;
  handleNoteClick: (noteId: string) => void;
}) {
  return (
    <div className="h-full w-full p-10">
      <Markdown
        className="prose"
        components={{
          a: ({ children, href, ...props }) => {
            if (href === undefined) return <a {...props}>{children}</a>;
            return (
              <span className="underline text-blue-600" onClick={() => handleNoteClick(href)} {...props}>
                {children}
              </span>
            
            );
          },
        }}
      >
        {parseToMarkDown(note.data.content)}
      </Markdown>
    </div>
  );
}
