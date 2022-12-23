import { TextField, Typography, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { use, useEffect, useState } from "react";

type Props = {
  defaultText: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "overline";
  onSave: (text: string) => void;

  style?: React.CSSProperties;
};

const EditableLabel = ({ defaultText, variant, onSave, style, ...rest }: Props) => {
    
  const [text, setText] = useState(defaultText);

  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onSave(text);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setText(defaultText);
    }
  };

  // some weird bug
  useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  return (
    <>
      {isEditing ? (
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={style}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Typography
          variant={variant}
          {...rest}
          style={style}
          onClick={() => setIsEditing(true)}
        >
          {text}
        </Typography>
      )}
    </>
  );
};

export default EditableLabel;
