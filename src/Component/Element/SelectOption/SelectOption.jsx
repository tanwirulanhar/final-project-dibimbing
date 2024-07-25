// components/SelectOption.js
export default function SelectOption({ selectItems, id, defaultValue, onChange }) {
    return (
      <select
        className="w-full p-2 mb-2 border border-green-500 rounded-md form-select"
        id={id}
        defaultValue={defaultValue || ""}
        onChange={onChange}
      >
        <option value="">Select</option>
        {selectItems.map((item) => (
          <option
            value={item.id}
            key={item.id}
          >
            {item.name}
          </option>
        ))}
      </select>
    );
  }
  