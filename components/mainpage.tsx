"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { SideBar, Note } from "./sidebar";
import { ReviewNote } from "./reviewNote";
import { Draft } from "./draft";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { set } from "react-hook-form";

// load json data from public folder
const initialNotes = require("../public/initial_notes.json");

const server: string = "https://prd-genote-bodpztde6a-an.a.run.app";

export function Mainpage({ userId, onLogout }: { userId: string, onLogout: () => void }) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [initialLoading, setInitialLoading] = React.useState<boolean>(true);
  
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  function handleNoteClick (noteId: string) {
    setCurrentNoteId(noteId);
    axios.post(`${server}/users/${userId}/notes/${noteId}/review`)
    .then((response) => {
      setNotes(response.data);
    }).catch((error) => {
      console.error("Error fetching notes:", error);
    });
  }
  
  function handleDeleteNote (noteId: string) {
    axios.delete(`${server}/users/${userId}/notes/${noteId}`)
    .then((response) => {
      setNotes(notes.filter((n) => n.id !== noteId));
      // lengths of notes is zero or currentNoteId is null
      if (currentNoteId === noteId || notes.length === 1) {
        setCurrentNoteId(null);
      }
    }).catch((error) => {
      console.error("Error deleting note:", error);
    });
  }
  
  function handleBackLink (title: string) {
    axios.get(`${server}/users/${userId}/notes/from-title/${title}`)
    .then((response) => {
      handleNoteClick(response.data);
    }).catch((error) => {
      console.error("Error fetching notes:", error);
    });
  }
  
  function handleNewNote () {
    setCurrentNoteId(null);
  }

  const handleDraftInput = () => {
    const text = inputRef.current?.value;
    // delete text 
    inputRef.current!.value = "";
    toast("Your draft is being processed", {
      description: "Please wait for 30 seconds",
    });
    axios
      .post(`${server}/users/${userId}/draft`, { text: text })
      .then((response) => {
        setDrawerOpen(true);
        setNotes(response.data);
          
      })
      .catch((error) => {
        toast("Your draft could not be processed", {
          description: "Please try again",
        });
      });
  };

  // when mouse is clicked outside of the drawer, close the drawer
  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      setDrawerOpen(false);
    };
    document.addEventListener("mousedown", listener);
    console.log(userId)
    axios
      .get(`${server}/users/${userId}/notes`)
      .then((response) => {setNotes(response.data); setInitialLoading(false)})
      .catch((error) => console.error("Error fetching notes:", error));

    
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, []);
  
  let rightSideComponent: React.ReactNode
  if (currentNoteId === null) {
    rightSideComponent = <Draft inputRef={inputRef} handleDraftInput={handleDraftInput} />
  } else {
    rightSideComponent = <ReviewNote userId={userId} noteId={currentNoteId} handleBackLink={handleBackLink} />
  }

  const main_content = (
    <div className="h-full w-full flex">
      <div className="border-r w-[550px]">
        <SideBar notes={notes} handleNoteClick={handleNoteClick} handleNewNote={handleNewNote} handleDeleteNote={handleDeleteNote} onLogout={onLogout}/>
      </div>

      <div className="w-full h-full">
        {rightSideComponent}
      </div>

      <Toaster />
      <Drawer open={drawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Draft organized</DrawerTitle>
              <DrawerDescription>Review created notes.</DrawerDescription>
            </DrawerHeader>
            {/* <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
  return initialLoading ? <div className="h-screen w-screen flex items-center justify-center flex-col"><div className="text-4xl">Genote</div><br/><h2>Loading...</h2></div> : main_content;
}
