import {useSelector} from "react-redux";
import Sheet from "./sheet";

export default function Board() {
  const {title, sheets} = useSelector(state => state.board);
  return (
    <div className="board">
      <h2>{title}</h2>
      <main>
        {Object.entries(sheets).map(([id]) => (
          <Sheet id={id} key={id} />
        ))}
      </main>
    </div>
  );
}
