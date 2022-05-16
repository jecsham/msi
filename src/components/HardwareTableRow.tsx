interface HardwareTableRowProps {
  title: string;
  content: string[];
}
function HardwareTableRow({ title, content }: HardwareTableRowProps) {
  return (
    <tr>
      <td className="uk-text-small uk-text-bold ">{title}</td>
      <td className="uk-text-small uk-padding-remove-right">
        <ul className="uk-list uk-list-divider">
          {content.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

export default HardwareTableRow;
