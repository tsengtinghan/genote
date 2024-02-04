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

// load json data from public folder
const initialNotes = require("../public/initial_notes.json");

const server: string = "https://prd-genote-bodpztde6a-an.a.run.app";

export function Mainpage() {
  const [userId, setUserId] = React.useState<string>("mlOkrsQrXLaSqilkqrUD");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = React.useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  
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
  
  function handleNewNote () {
    setCurrentNoteId(null);
  }

  const handleDraftInput = () => {
    const text = inputRef.current?.value;
    toast("Your draft is being processed", {
      description: "Please wait for 30 seconds",
    });
    axios
      .post(`${server}/users/${userId}/draft`, { text: text })
      .then((response) => {
        setDrawerOpen(true);
        
        // axios
        //   .get(`${server}/users/${userId}/notes`)
        //   .then((response) => {
        //     setNotes(response.data);
        //     setDrawerOpen(true);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching notes:", error);
        //   });
        setNotes(response.data);
          
      })
      .catch((error) => {
        toast("Your draft could not be processed", {
          description: "Please try again",
        });
      });
  };
  
  const handleNewUser = () => {
    axios
      .post(`${server}/users`, initialNotes)
      .then((response) => {
        const userId = response.data;
        setUserId(response.data);
        axios
          .get(`${server}/users/${userId}/notes`)
          .then((response) => setNotes(response.data))
          .catch((error) => console.error("Error fetching notes:", error));
      });
  }

  // when mouse is clicked outside of the drawer, close the drawer
  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      // if (e.target instanceof HTMLElement) {
      //   if (e.target.closest("[data-drawer]") === null) {
      //     setDrawerOpen(false);
      //   }
      // }
      setDrawerOpen(false);
    };
    document.addEventListener("mousedown", listener);
    console.log(initialNotes)
    
    axios
      .post(`${server}/users`, initialNotes)
      .then((response) => {
        const userId = response.data;
        setUserId(response.data);
        axios
          .get(`${server}/users/${userId}/notes`)
          .then((response) => setNotes(response.data))
          .catch((error) => console.error("Error fetching notes:", error));
      });

    
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, []);
  
  let rightSideComponent: React.ReactNode
  if (currentNoteId === null) {
    rightSideComponent = <Draft inputRef={inputRef} handleDraftInput={handleDraftInput} />
  } else {
    const note = notes.find((note) => note.id === currentNoteId);
    if (note === undefined) {
      rightSideComponent = <div>Could not find note</div>
    } else {
      rightSideComponent = <ReviewNote note={note} handleNoteClick={handleNoteClick} />
    }
  }

  return (
    <div className="h-full w-full flex">
      <div className="border-r w-[550px]">
        <SideBar notes={notes} handleNoteClick={handleNoteClick} handleNewNote={handleNewNote} handleNewUser={handleNewUser}/>
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
}
