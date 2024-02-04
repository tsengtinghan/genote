"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { ScrollAreaDemo } from "./ui/sidebar";
import { Draft } from "./draft";

export function Mainpage() {
  return (
    <div className="h-full w-full flex">
      <div className="border-r w-[300px]">
        <ScrollAreaDemo />
      </div>
      <div className="w-full h-full">
        <Draft />
      </div>
    </div>
  );
}
