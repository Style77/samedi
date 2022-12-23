import {
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ID, Query } from "appwrite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { appwrite } from "../../../store/appwrite";
import BoardCard from "./Card";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableLabel from "./EditableLabel";

type Color = "red" | "yellow" | "green" | "blue" | "purple" | "pink" | "gray";

type Props = {
  boardId: string;
};

export type Item = {
  $id: string;
  message: string;
  color: string;
  userId: string;
};

export type Column = {
  $id: string;
  label: string;
  index: number;

  items: Item[];
};

const Board = ({ boardId }: Props) => {
  const [boardDocId, setBoardDocId] = useState<string>("");
  const [boardName, setBoardName] = useState<string>("");

  const [columns, setColumns] = useState<Column[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchBoardName = async () => {
      const board = await appwrite.database.getDocument(
        process.env.APPWRITE_TEAMS_DATABASE_ID!,
        process.env.APPWRITE_BOARDS_COLLECTION_ID!,
        boardId!
      );
      console.log(board);
      setBoardName(board.name);
    };

    const fetchBoard = async () => {
      const boards = await appwrite.database.listDocuments(
        process.env.APPWRITE_BOARDS_DATABASE_ID!,
        process.env.APPWRITE_COLUMNS_COLLECTION_ID!,
        [Query.equal("boardId", boardId)]
      );
      const columns = await Promise.all(
        boards.documents.map(async (column) => {
          return {
            ...column,
            items: await appwrite.database
              .listDocuments(
                process.env.APPWRITE_BOARDS_DATABASE_ID!,
                process.env.APPWRITE_CARDS_COLLECTION_ID!,
                [Query.equal("columnId", column.$id)]
              )
              .then((cards) => {
                return cards.documents;
              }),
          };
        })
      );
      console.log(columns);
      setColumns(columns as unknown as Column[]);
    };
    fetchBoardName();
    fetchBoard();
  }, [boardId]);

  const onDragEnd = (
    result: DropResult,
    columns: Column[],
    setColumns: Dispatch<SetStateAction<Column[]>>
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId as unknown as number];
      const destColumn = columns[destination.droppableId as unknown as number];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      appwrite.database.updateDocument(
        process.env.APPWRITE_BOARDS_DATABASE_ID!,
        process.env.APPWRITE_CARDS_COLLECTION_ID!,
        removed.$id,
        {
          columnId: destColumn.$id,
        }
      );
    } else {
      const column = columns[source.droppableId as unknown as number];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });

      appwrite.database.updateDocument(
        process.env.APPWRITE_BOARDS_DATABASE_ID!,
        process.env.APPWRITE_CARDS_COLLECTION_ID!,
        removed.$id,
        {
          index: destination.index,
        }
      );
    }
  };

  const createColumn = async () => {
    const newColumn = await appwrite.database.createDocument(
      process.env.APPWRITE_BOARDS_DATABASE_ID!,
      process.env.APPWRITE_COLUMNS_COLLECTION_ID!,
      ID.unique(),
      {
        label: "New Column",
        index: columns.length,
        boardId: boardId,
      }
    );
    setColumns([...columns, newColumn as unknown as Column]);
  };

  const createCard = async (columnId: string, color: Color) => {
    console.log(
      columns.find((column) => column.$id === columnId)?.items.length
    );
    const newCard = await appwrite.database.createDocument(
      process.env.APPWRITE_BOARDS_DATABASE_ID!,
      process.env.APPWRITE_CARDS_COLLECTION_ID!,
      ID.unique(),
      {
        message: "New Text",
        color: color,
        userId: (await appwrite.account.get()).$id,
        columnId: columnId,
        index: columns.find((column) => column.$id === columnId)?.items.length,
      }
    );

    const newColumns = columns.map((column) => {
      if (column.$id === columnId) {
        column.items.push(newCard as unknown as Item);
      }
      return column;
    });

    setColumns([...newColumns]);
  };

  const deleteColumn = async (columnId: string) => {
    await appwrite.database.deleteDocument(
      process.env.APPWRITE_BOARDS_DATABASE_ID!,
      process.env.APPWRITE_COLUMNS_COLLECTION_ID!,
      columnId
    );
    setColumns(columns.filter((column) => column.$id !== columnId));
  };

  const deleteCard = async (columnId: string, cardId: string) => {
    await appwrite.database.deleteDocument(
      process.env.APPWRITE_BOARDS_DATABASE_ID!,
      process.env.APPWRITE_CARDS_COLLECTION_ID!,
      cardId
    );
    const newColumns = columns.map((column) => {
      if (column.$id === columnId) {
        column.items = column.items.filter((item) => item.$id !== cardId);
      }
      return column;
    });
    setColumns([...newColumns]);
  };

  const updateCard = async (
    columnId: string,
    cardId: string,
    message: string
  ) => {
    await appwrite.database.updateDocument(
      process.env.APPWRITE_BOARDS_DATABASE_ID!,
      process.env.APPWRITE_CARDS_COLLECTION_ID!,
      cardId,
      {
        message: message,
      }
    );
    const newColumns = columns.map((column) => {
      if (column.$id === columnId) {
        column.items = column.items.map((item) => {
          if (item.$id === cardId) {
            item.message = message;
          }
          return item;
        });
      }
      return column;
    });
    setColumns([...newColumns]);
  };

  const updateColumnLabel = async (columnId: string, label: string) => {
    await appwrite.database.updateDocument(
      process.env.APPWRITE_BOARDS_DATABASE_ID!,
      process.env.APPWRITE_COLUMNS_COLLECTION_ID!,
      columnId,
      {
        label: label,
      }
    );
    const newColumns = columns.map((column) => {
      if (column.$id === columnId) {
        column.label = label;
      }
      return column;
    });
    setColumns([...newColumns]);
  };

  const updateBoardName = async (name: string) => {
    await appwrite.database.updateDocument(
      process.env.APPWRITE_TEAMS_DATABASE_ID!,
      process.env.APPWRITE_BOARDS_COLLECTION_ID!,
      boardId,
      {
        name: name,
      }
    );
    setBoardName(name);
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <EditableLabel
        variant="h4"
        style={{ padding: "20px" }}
        onSave={(newName) => {
          updateBoardName(newName);
        }}
        defaultText={boardName}
      ></EditableLabel>
      <Stack
        direction="row"
        style={{ gap: "20px", width: "100vw", paddingInline: "20px" }}
      >
        {Object.entries(columns).map(([columnId, column]: any, index) => {
          return (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="h-[80vh] p-3 border-2 border-zinc-600 rounded-md shadow-md"
                >
                  <Stack
                    direction="row"
                    style={{ gap: "20px", width: "100%", display: "flex" }}
                  >
                    <EditableLabel
                      style={{ width: "100%" }}
                      variant="subtitle1"
                      defaultText={column.label}
                      onSave={(text) => updateColumnLabel(column.$id, text)}
                    />
                    <div className="justify-end flex">
                      <DeleteIcon
                        sx={{ fontSize: 22 }}
                        className="text-zinc-900 hover:text-zinc-600 cursor-pointer transition duration-300"
                        onClick={() => deleteColumn(column.$id)}
                      />
                    </div>
                  </Stack>
                  <Divider />
                  {column.items?.map((item: any, index: any) => (
                    <Draggable
                      key={item.$id}
                      draggableId={item.$id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={index}
                          className="bg-zinc-100 border-2 border-zinc-400/50 rounded-md mt-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteCard(column.$id, item.$id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <div>
                              <EditableLabel
                                variant="subtitle1"
                                defaultText={item.message}
                                onSave={(text) =>
                                  updateCard(column.$id, item.$id, text)
                                }
                              />
                            </div>
                          </ListItem>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  <ListItem>
                    <Button
                      endIcon={<AddIcon />}
                      onClick={() => createCard(column.$id, "gray")}
                    >
                      Add a new card
                    </Button>
                  </ListItem>
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          );
        })}
        <Button endIcon={<AddIcon />} onClick={createColumn}>
          Add a new column
        </Button>
      </Stack>
    </DragDropContext>
  );
};

export default Board;
