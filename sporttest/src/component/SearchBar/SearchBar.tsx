import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search Leagues"
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        className={styles.input}
        aria-label="Search Leagues"
        name="search"
      />
    </div>
  );
};

export default SearchBar;
