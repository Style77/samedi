import { TextField, Typography, TypographyTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useState } from "react";

type Props = OverridableComponent<TypographyTypeMap<{}, "span">> & {
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
};

const EditableLabel = ({ defaultText, variant, onSave, ...rest }: Props) => {
    
  const [text, setText] = useState(defaultText);

  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onSave(text);
    }
  };

  return (
    <>
      {isEditing ? (
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={text} onChange={(e) => setText(e.currentTarget.value)} />
      ) : (
        <Typography variant={variant} {...rest}>{text}</Typography>
      )}
    </>
  );
};

export default EditableLabel;
