import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.css";

interface SportMultiSelectDropdownProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  options: string[];
}

const MultiSelectDropdown: React.FC<SportMultiSelectDropdownProps> = ({
  selected,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={styles.container} ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.dropdownToggle}>
        {selected.length > 0 ? (
          selected.join(", ")
        ) : (
          <span className={styles.placeholder}>Filter By Sports</span>
        )}
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option} className={styles.option}>
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
