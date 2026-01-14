import React, { useId } from "react";
import "./dropdown.css";

interface DropdownProps {
  label?: string;
  list: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}
const Dropdown = ({
  label = "",
  list = [],
  selectedValue = "",
  onSelect,
}: DropdownProps) => {
  const ID = useId();
  return (
    <div className="dropdown_container ">
      {label && (
        <label className="dropdown_label" htmlFor={ID}>
          {label}
        </label>
      )}
      <select
        name="pets"
        className="input-control"
        id={ID}
        onChange={({ target: { value } }) => onSelect(value)}
      >
        {/* <!-- <option value="dog">--Please choose an option--</option> --> */}
        {/* <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot" selected>
          Parrot
        </option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option> */}

        {list &&
          list.map((item) => (
            <option
              value={item}
              defaultValue={selectedValue}
              selected={selectedValue === item}
            >
              {item}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Dropdown;
