import { Note } from "./sidebar";
import Markdown from "react-markdown";
const parseToMarkDown = (str: string): string => {
  return str.replace(/\\n/g, "\n");
};
export function ReviewNote({
  note,
  handleBackLink,
}: {
  note: Note;
  handleBackLink: (noteId: string) => void;
}) {
  return (
    <div className="h-full w-full p-10">
      <h1 className="text-3xl font-bold mb-4" >{note.data.title}</h1> 
      <Markdown
        className="prose"
        components={{
          a: ({ children, href, ...props }) => {
            return (
              <span className="underline text-blue-600" onClick={() => handleBackLink(children as string)} {...props}>
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
