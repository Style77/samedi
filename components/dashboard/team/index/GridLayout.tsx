import React, { Component, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";

import { appwrite } from "../../../../store/appwrite";
import { Query } from "appwrite";

import { IoMdAdd, IoMdCheckmark, IoMdRemove } from "react-icons/io";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

import DefaultWidget from "./Widget";
import { useRouter } from "next/router";
import { WidgetSelector } from "./widgets/WidgetSelector";
import Fab from "@mui/material/Fab";

const ResponsiveGridLayout = WidthProvider(Responsive);

type Tile = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type ITile = {
  id: string;
  layout: Tile;
};

type Props = {
  setShowBackgroundSelectorModal: (show: boolean) => void;
}

const GridLayout = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const [isEditable, setIsEditable] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  const [tiles, setTiles] = useState<ITile[]>([]);

  const [layoutDocId, setLayoutDocId] = useState("");

  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const fetchLayout = async () => {
      const layouts = await appwrite.database.listDocuments(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
        [Query.equal("teamId", id as string)]
      );
      const layoutDocId = layouts.documents[0].$id;
      setLayoutDocId(layoutDocId);

      const layout = await appwrite.database.getDocument(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
        layoutDocId
      );

      let tiles: Tile[] = layout.tiles.map((tile: string) => {
        return JSON.parse(tile);
      });

      setTiles(tiles.map((tile) => ({ id: tile.i, layout: tile })));
    };
    fetchLayout();
  }, [id]);

  const handleSave = async () => {
    return appwrite.database.updateDocument(
      process.env.APPWRITE_TEAMS_DATABASE_ID!,
      process.env.APPWRITE_LAYOUTS_COLLECTION_ID!,
      layoutDocId,
      {
        tiles: tiles.map((tile) => {
          return JSON.stringify(tile.layout);
        }),
      }
    );
  };

  const handleEdit = async () => {
    if (isEditable) {
      await handleSave()
      setIsEditable(false);

      // turn off grid
      const elem = document.querySelector(".react-grid-layout");
      elem!.classList.remove("dashboard-grid");

    } else {
      setIsEditable(true);

      // turn on grid
      const elem = document.querySelector(".react-grid-layout");
      elem!.classList.add("dashboard-grid");
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const user = await appwrite.account.get();
      const membership = await appwrite.teams.listMemberships(id as string, [
        Query.equal("userId", user.$id),
      ]);
      setRoles(membership.memberships[0].roles);
    };
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRemoveItem = useCallback(
    (i: string) => {
      setTiles((tiles) => tiles.filter((tile) => tile.id !== i));
    },
    []
  );

  const onDragStop = useCallback(
    (_: any, oldItem: Tile, newItem: Tile) => {
      const newWidgetArr = [...tiles];
      newWidgetArr.forEach((x) => {
        if (x.id === oldItem.i) {
          x.layout = newItem;
        }
      });
      setTiles(newWidgetArr);
    },
    [tiles]
  );

  const onDrop = useCallback(
    (_: Layout[], item: Layout, e: DragEvent) => {
      const raw = e.dataTransfer?.getData("droppableWidget");
      if (!raw) {
        return;
      }

      const droppableWidget = JSON.parse(raw);

      const newWidgetArr = [...tiles];

      droppableWidget.layout.x = item.x;
      droppableWidget.layout.y = item.y;
      droppableWidget.layout.isDraggable = undefined;
      newWidgetArr.push(droppableWidget);

      setTiles(newWidgetArr);
    },
    [tiles]
  );

  return (
    <>
      <ResponsiveGridLayout
        className="backdrop-blur-sm"
        style={{ height: "calc(100vh - 64px)" }}
        isDroppable
        useCSSTransforms
        preventCollision
        autoSize
        onDrop={onDrop}
        onDragStop={onDragStop}
        isDraggable={isEditable}
        compactType={null}
        breakpoints={{ lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {tiles.map((tile) => (
          <DefaultWidget key={tile.id} widget={tile} data-grid={tile.layout}>
            {isEditable ? (
              <div className="absolute top-0 right-0">
                <button
                  onClick={() => onRemoveItem(tile.id)}
                  className="text-gray-800 p-2 rounded-md text-lg"
                >
                  <AiOutlineClose />
                </button>
              </div>
            ) : null}
          </DefaultWidget>
        ))}
      </ResponsiveGridLayout>

      {roles?.includes("owner") ? (
        <Fab
          onClick={handleEdit}
          style={{
            zIndex: 1000,
            bottom: "2rem",
            right: "2rem",
            position: "absolute",
          }}
        >
          {isEditable ? <IoMdCheckmark /> : <AiOutlineEdit />}
        </Fab>
      ) : null}
      {isEditable ? (
        <>
          {showSelector ? (
            <div className="bg-black text-white p-2 rounded-md text-2xl my-2">
              <WidgetSelector />
            </div>
          ) : null}
          <Fab
            style={{
              zIndex: 1000,
              bottom: "2rem",
              right: "6rem",
              position: "absolute",
            }}
            onClick={() => setShowSelector(!showSelector)}
          >
            {showSelector ? <IoMdRemove /> : <IoMdAdd />}
          </Fab>

          <Fab
            style={{
              zIndex: 1000,
              bottom: "2rem",
              right: "10rem",
              position: "absolute",
            }}
            onClick={() => props.setShowBackgroundSelectorModal(true)}
          >
            <WallpaperIcon />
          </Fab>
        </>
      ) : null}
    </>
  );
};

export default GridLayout;
