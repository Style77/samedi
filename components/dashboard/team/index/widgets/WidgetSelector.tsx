import Image from "next/image";
import React from "react";
import { appwrite } from "../../../../../store/appwrite";

export const availableWidgets = [
  {
    previewImg: "https://via.placeholder.com/100x40",
    previewName: "Hello widget",
    id: "HelloWidget",
    layout: { i: "HelloWidget", x: 0, y: 0, w: 3, h: 1 },
  },
  {
    previewImg: "https://via.placeholder.com/100x40",
    previewName: "Clock widget",
    id: "ClockWidget",
    layout: { i: "ClockWidget", x: 0, y: 0, w: 2, h: 0.5 },
  },
  {
    previewImg: "https://via.placeholder.com/100x40",
    previewName: "Notes widget",
    id: "NotesWidget",
    layout: { i: "NotesWidget", x: 0, y: 0, w: 2, h: 3 },
  },
];

export const WidgetSelector = () => {
  return (
    <div className="relative">
      <div className="border-b-2 border-white mb-2">
        Drag and drop a widget from following list:
      </div>
      <div className="flex flex-col max-h-1/12 overflow-y-scroll">
        {availableWidgets.map((widget) => (
          <div
            key={widget.id}
            className="border-2 border-white p-2 mb-2 bg-slate-500"
            unselectable="on"
            onDragStart={(e) => {
              // this is a hack for firefox
              // Firefox requires some kind of initialization
              // which we can do by adding this attribute
              // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
              e.dataTransfer.setData("text/plain", "");
              let widgetCust = { layout: widget.layout, previewImg: widget.previewImg, previewName: widget.previewName, id: widget.id + "__" + Math.floor(Math.random()*100000)}
              e.dataTransfer.setData(
                "droppableWidget",
                JSON.stringify(widgetCust)
              );
              return true;
            }}
          >
            <img
              src={widget.previewImg}
              alt={widget.previewName}
              width="100"
              height="40"
              className="cursor-pointer"
            />
            <div>{widget.previewName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
