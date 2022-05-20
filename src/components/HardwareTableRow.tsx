interface HardwareTableRowProps {
  title: string;
  content: string[];
}
function HardwareTableRow({ title, content }: HardwareTableRowProps) {
  const contentValue = (content: string[]) => {
    if (content?.length === 0) {
      return <li key="0">No data available</li>;
    }
    return (
      <>
        {content.map((e, index) => (
          <li key={index}>{e}</li>
        ))}
      </>
    );
  };

  return (
    <tr>
      <td className="uk-text-small uk-text-bold ">{title}</td>
      <td className="uk-text-small uk-padding-remove-right">
        <ul className="uk-list uk-list-divider">{contentValue(content)}</ul>
      </td>
    </tr>
  );
}

export default HardwareTableRow;
