import { FC, FormEventHandler } from "react";

const Select: FC<{ onChange: FormEventHandler; count: number }> = (props) => {
  const { onChange, count } = props;

  return (
    <label className="mx-2 my-1 px-2 py-1">
      Patients per load:
      <select className="mx-2 my-1 px-2 py-1" onChange={onChange} value={count}>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={500}>500</option>
      </select>
    </label>
  );
};

const Button: React.FC = () => {
  return (
    <button
      className="bg-blue-500 mx-4 my-2 px-4 py-2 text-lg text-white rounded hover:bg-blue-600"
      type="submit"
    >
      Load!
    </button>
  );
};

const Checkbox: FC<{ checked: boolean; onChange: FormEventHandler }> = (
  props
) => {
  const { checked, onChange } = props;

  return (
    <label className="mx-2 my-1 px-2 py-1">
      Show pediatric patients only:
      <input
        className="mx-2 my-1 px-2 py-1"
        onChange={onChange}
        type="checkbox"
        checked={checked}
      />
    </label>
  );
};

const Form: FC<{
  checkboxChecked: boolean;
  checkboxOnChange: FormEventHandler;
  selectOnChange: FormEventHandler;
  onSubmit: FormEventHandler;
  count: number;
}> = (props) => {
  const {
    checkboxChecked,
    checkboxOnChange,
    selectOnChange,
    onSubmit,
    count,
  } = props;

  return (
    <form className="flex items-center mx-2 my-1 px-2 py-1" onSubmit={onSubmit}>
      <Button />
      <Select onChange={selectOnChange} count={count} />
      <Checkbox checked={checkboxChecked} onChange={checkboxOnChange} />
    </form>
  );
};

export { Button, Checkbox, Form, Select };
