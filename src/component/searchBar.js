import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebaseConfig";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm !== "") {
        const querySnapshot = await getDocs(collection(db, "myCollection"));
        const allData = querySnapshot.docs.map((doc) => doc.data());
        const regex = new RegExp(`^${searchTerm}`, "i");
        const filteredData = allData.filter((item) => regex.test(item.field1));
        setResults(filteredData);
      } else {
        setResults([]);
      }
    };

    performSearch();
  }, [searchTerm]);
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      <div>
        {results.map((item, index) => (
          <div key={index}>{item.field1}</div> // Adjust based on your data structure
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
