import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollectionDetails from "./components/CollectionDetails";
import Collections from "./components/Collections";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/CollectionDetails/:id" element={<CollectionDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
