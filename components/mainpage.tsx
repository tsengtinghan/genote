"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { ScrollAreaDemo } from "./ui/sidebar";
import { Draft } from "./draft";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button"


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const server: string = "https://prd-genote-bodpztde6a-an.a.run.app"
const userId: string = "mlOkrsQrXLaSqilkqrUD"


export function Mainpage() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  
  const handleDraftInput = () => {
    const text = inputRef.current?.value;
    toast("Your draft is being processed", {
      description: "Please wait for 30 seconds",
    })
    setDrawerOpen(true)
    // axios.post(`${server}/users/${userId}/draft`, {text: text})
    // .then((response) => {
    //   setDrawerOpen(true)
    // }).catch((error) => {
    //   toast("Your draft could not be processed", {
    //     description: "Please try again",
    //   })
    // })
    
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
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, []);
  
  return (
    
    <div className="h-full w-full flex">
      <div className="border-r w-[300px]">
        <ScrollAreaDemo />
      </div>
    
      <div className="w-full h-full">
        <Draft inputRef={inputRef} handleDraftInput={handleDraftInput}/>
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
