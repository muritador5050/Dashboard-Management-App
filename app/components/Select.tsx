'use client';
import React from 'react';
import Select from 'react-select';
const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

function SearchableDropdown() {
  return (
    <Select options={options} isSearchable menuPortalTarget={document.body} />
  );
}

export default SearchableDropdown;
