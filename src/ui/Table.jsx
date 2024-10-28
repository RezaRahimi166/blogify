const Table = ({ children }) => {
  return (
    <div className="bg-secondary-0 overflow-x-auto">
      <table>{children}</table>
    </div>
  );
};

export default Table;

function TabelHeader({ children }) {
  return (
    <thead>
      <tr className="title-row">{children}</tr>
    </thead>
  );
}

function TabelBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TabelRow({ children }) {
  return <tr>{children}</tr>;
}

Table.Header = TabelHeader;
Table.Body = TabelBody;
Table.Row = TabelRow;
