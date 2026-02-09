// components/global/editor/Editor.jsx

import React, { useRef } from "react";
import JoditEditor from "jodit-react";

function Editor({ content, setContent,error }) {
  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter your content here...",
    toolbarAdaptive: false,
    toolbarSticky: false,
    uploader: { insertImageAsBase64URI: true }, 
    removeButtons: ["about", "image"], 
   buttons: [
      "bold", "italic", "underline", "strikethrough", // basic formatting
      "|",
      "ul", "ol", 
      "|",
      "align", // alignment
      "font", "fontsize", // font options
      "|",
      "undo", "redo"
    ],
      defaultFontSize: "15px", // <-- default font size
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium  text-xs sm:text-sm text-black/80">Description</label>
      <JoditEditor
        ref={editor}
        value={content}
        className=" text-xs sm:text-sm"
          config={{
    ...config,
   
    pastePlain: false,
    askBeforePasteHTML: false, 
    enter: "P", 
  }}
        onBlur={(newContent) => setContent(newContent)} 
        onChange={() => {}}
      />
        {error && <div className="text-red-500 text-[11px] sm:text-xs ">{error}</div>}
    </div>
  );
}

export default Editor;
