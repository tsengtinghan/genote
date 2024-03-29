import React from "react";
import dynamic from "next/dynamic";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
export function Draft({inputRef, handleDraftInput}: {inputRef: React.RefObject<HTMLTextAreaElement>, handleDraftInput: () => void}) {
  return (
    <div className="flex flex-col w-full h-full justify-between p-10">
      <h1 className="h-[50px] flex items-center text-[30px] font-bold">Drafting</h1>
      <Textarea ref={inputRef}
        className="pl-5 w-full text-lg flex-1"
        placeholder="Write down your draft here, don't worry about grammar or formatting"
      />
      <div className="h-[100px] flex justify-center items-center">
        <Button onClick={handleDraftInput} className="">Dump</Button>
      </div>
    </div>
  );
}
