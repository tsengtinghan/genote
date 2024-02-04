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
      <Markdown
        className="prose"
        components={{
          a: ({ children, href, ...props }) => {
            return (
              <span className="underline text-blue-600" onClick={() => handleBackLink(children)} {...props}>
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
