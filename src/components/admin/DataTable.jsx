export const DataTable = ({ columns, data }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>{columns.map((col, i) => <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{col}</th>)}</tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data && data.length > 0 ? (
        data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, i) => (
              <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[col]}</td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">Aucune donnée</td>
        </tr>
      )}
    </tbody>
  </table>
);