export const Input = ({ label, ...props }) => (
  <div className="flex flex-col space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" {...props} />
  </div>
);