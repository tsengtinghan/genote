'use client'
import dynamic from 'next/dynamic'
import Link from "next/link"
import React from "react"
import type { MDXEditorMethods } from '@mdxeditor/editor'
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { ScrollAreaDemo } from './ui/sidebar'
import { Draft } from './draft'


export function Mainpage() {  
  return (
    <div className="min-h-screen w-full flex ">
      <div className="border-r w-[300px]">
      <ScrollAreaDemo />
      </div>
      <div className="w-full">
      <Draft />
      </div>
    </div>
  )
}
