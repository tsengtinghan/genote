import { Note } from "./sidebar";
import Markdown from "react-markdown";
import React from "react";
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { set } from "react-hook-form";
import { Button } from "@/components/ui/button";
import config from "@/lib/config";


const parseToMarkDown = (str: string): string => {
  return str.replace(/\\n/g, "\n");
};
export function ReviewNote({
  userId,
  noteId,
  handleBackLink,
}: {
  userId: string;
  noteId: string;
  handleBackLink: (noteId: string) => void;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [note, setNote] = React.useState<Note>({
    id: noteId,
    data: {
      title: "",
      content: "",
      status: "",
    },
  });
  
  React.useEffect(() => {
    axios
      .get(`${config.backendURL}/users/${userId}/notes/${noteId}`)
      .then((response) => {
        setNote({
          'id': noteId,
          'data': response.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
        
  }, [noteId]);
  
  const handleEdit = () => {
    //setIsEditing(!isEditing);
    setIsEditing(false)
  }
  
  const handleEndEdit = () => {
    // setIsEditing(!isEditing);
    setIsEditing(false)
    // save the note (put request) using axios
    setNote(prev => {prev.data.content = inputRef.current?.value as string; return prev;})
    axios.put(`${config.backendURL}/users/${userId}/notes/${note.id}`, {
      title: note.data.title,
      content: inputRef.current?.value,
    }).then((response) => {
      console.log("Note saved:", response.data);
    }).catch((error) => {
      console.error("Error saving note:", error);
    });
  }
  console.log(note)
  
  const editComponent = (
    <>
    <div onDoubleClick={handleEndEdit}>
      <div>
      <Textarea
        className="w-full h-96"
        defaultValue={note.data.content}
        ref={inputRef}
      ></Textarea>
      </div>
       
      <Button onClick={handleEndEdit}>Save</Button>
    </div>
    
    </>
  );
  
  const markdownComponent = (
    <div onClick={handleEdit} className="h-full">
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
    
  )
  const mainContent = isEditing ? editComponent : markdownComponent;
  
  return (
    <div className="h-full w-full p-10">
      <h1 className="text-3xl font-bold mb-4" >{note.data.title}</h1> 
      {mainContent}
    </div>
  );
}
