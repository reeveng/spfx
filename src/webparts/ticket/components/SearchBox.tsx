import { TextField } from "@fluentui/react";
import * as React from "react";

interface ISearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox: React.FC<ISearchBoxProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearch = (value: string): void => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <TextField
      placeholder="Search tickets..."
      value={searchValue}
      onChange={(_, val) => handleSearch(val || "")}
      underlined
    />
  );
};
