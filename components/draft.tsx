import React from "react";
import dynamic from "next/dynamic";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Draft() {
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="m-5 h-[50px] flex items-center text-2xl">Drafting</div>
      <Textarea className="p-10 w-full text-lg flex-1" placeholder="Write here" />
      <div className="h-[100px] flex justify-center items-center">
        <Button className="">Memofy</Button>
      </div>
    </div>
  );
}
