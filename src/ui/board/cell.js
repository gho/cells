import {useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeCellRef, selectCellValue, setCellValue} from "./slice";

export default function Cell({sheetId, row, col}) {
  const editorRef = useRef(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (editing) editorRef.current.focus();
  }, [editing]);

  const cellRef = makeCellRef(sheetId, row, col);
  const value = useSelector(state => selectCellValue(state, cellRef));

  const dispatch = useDispatch();

  return editing ? (
    <input
      className="cell"
      onBlur={saveEdits}
      onKeyDown={onKeyDown}
      defaultValue={value}
      ref={editorRef}
    />
  ) : (
    <div
      className="cell"
      onClick={() => setEditing(true)}
    >
      {value || ""}
    </div>
  );

  function onKeyDown(e) {
    switch (e.key) {
      case "Enter":
      case "Tab":
        saveEdits(e);
        break;
      case "Escape":
        setEditing(false);
        break;
    }
  }

  function saveEdits({target: {value}}) {
    dispatch(setCellValue({cellRef, value}));
    setEditing(false);
  }
}
