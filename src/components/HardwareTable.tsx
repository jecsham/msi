import HardwareTableRow from "./HardwareTableRow";

interface HardwareTableProps {
  data: any[];
}
function HardwareTable({ data }: HardwareTableProps) {
  return (
    <table className="uk-table uk-table-divider uk-table-small uk-table-middle uk-margin-remove-top">
      <thead>
        <tr>
          <th></th>
          <th className="uk-table-expand">Hardware</th>
        </tr>
      </thead>
      <tbody id="table-body">
        {data.map((e, index) => (
          <HardwareTableRow key={index} title={e.title} content={e.content} />
        ))}
      </tbody>
    </table>
  );
}

export default HardwareTable;
