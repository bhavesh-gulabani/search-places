import React, { useEffect, useRef, useState } from 'react';

import styles from './SearchBox.module.css';

const SearchBox = ({ onSubmit }) => {
  const inputRef = useRef(null);
  const [inputFocused, setInputFocused] = useState(false);

  // Set `inputFocused` state using event listeners
  useEffect(() => {
    const inputNode = inputRef.current;

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        setInputFocused(true);
      }

      if (event.key === 'Enter') {
        onSubmit(inputRef.current.value);
      }
    };

    const handleBlur = () => {
      setInputFocused(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    inputNode.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      inputNode.removeEventListener('blur', handleBlur);
    };
  }, [onSubmit]);

  // Based on the `inputFocused` state, focus the actual input textbox
  useEffect(() => {
    if (inputFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputFocused]);

  return (
    <div className={styles.searchBox}>
      <input type="text" placeholder="Search places..." ref={inputRef} />
      <div className={styles.shortcutBox}>
        <span>Ctrl + /</span>
      </div>
    </div>
  );
};

export default SearchBox;
