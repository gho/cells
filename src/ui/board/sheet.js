import {useSelector} from "react-redux";
import Header from "./header";
import Cell from "./cell";
import {selectSheetSize} from "./slice";

export default function Sheet({id}) {
  const size = useSelector(state => selectSheetSize(state, id));

  const rows = range(size.h, 1);
  const cols = range(size.w + 1);

  return (
    <div className="sheet">
      <table>
        <thead>
          <tr>
            {cols.map(col => (
              <th key={`column ${col}`}>
                <Header index={col} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row}>
              {cols.map(col => col === 0 ? (
                <th key={`row ${row}`}>
                  <Header index={row} />
                </th>
              ) : (
                <td key={`cell (${row},${col})`}>
                  <Cell sheetId={id} row={row} col={col} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function range(size, start=0) {
  return [...Array(size).keys()].map(i => i + start);
}
