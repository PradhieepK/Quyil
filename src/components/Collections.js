import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import axios from "axios";
import TypeFilter from "./TypeFilter";
import "../styles/Collections.css";
import view from "../assests/view.svg";
import search from "../assests/search.svg";

const Collections = () => {
  const navigate = useNavigate();

  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false); // To collapse the type drop down filter when clicked outside.
  const [selectedTypes, setSelectedTypes] = useState([]); // Selected options for type dropdown filter.
  const [searchTerm, setSearchTerm] = useState(""); // For Search bar filter.
  const [collections, setCollections] = useState([]); // To store collections data from API.

  // To handle collapse of type drop down filter when clicked outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".type-dropdown-container")) {
        setIsTypeFilterOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Calling /collections endpoint to fetch the data from API on mount.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/collections");
        setCollections(response.data);
      } catch (error) {
        console.log("Error Fetching Collections", error);
      }
    };

    fetchData();
  }, []);

  // If the API returns empty array when calling the endppoint.
  if (Array.isArray(collections) && collections.length === 0) {
    return <div>Collections not found</div>;
  }

  // Filtering the collections based on the search bar & type dropdown filter.
  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTypes.length === 0 || selectedTypes.includes(collection.type))
  );

  // For converting date to desired format & seconds to minutes.
  function formatDateTime(seconds) {
    if (!seconds) {
      return function (date) {
        return DateTime.fromISO(date).toFormat("dd LLL yyyy, hh:mm a");
      };
    }
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  }

  return (
    <>
      <div className="overview-title-container">
        <div className="overview-title">Overview</div>
      </div>
      <div className="collection-table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th>
                <div className="search-filter-options">
                  <div className="search-bar-container">
                    <input
                      className="search-bar"
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img className="search-icon" src={search}></img>
                  </div>
                  <div className="type-filter">
                    <TypeFilter
                      selectedTypes={selectedTypes}
                      setSelectedTypes={setSelectedTypes}
                      isOpen={isTypeFilterOpen}
                      setIsOpen={setIsTypeFilterOpen}
                    />
                  </div>
                </div>
              </th>
            </tr>
            <tr className="collection-table-heading">
              <th>Collection Name</th>
              <th>Type</th>
              <th>Song Count</th>
              <th>Duration</th>
              <th>Size</th>
              <th>Released On</th>
            </tr>
          </thead>
          <tbody>
            {filteredCollections.map((collection) => (
              <tr key={collection.id}>
                <td>
                  {collection.name}
                  <div className="collection-table-second-row">
                    {collection.artist}
                  </div>
                </td>
                <td>{collection.type}</td>
                <td>{collection.songCount}</td>
                <td>{formatDateTime(collection.durationInSeconds)} min</td>
                <td>{Math.trunc(collection.sizeInBytes / (1024 * 1024))} MB</td>
                <td>{formatDateTime()(collection.releasedOn)}</td>
                <td>
                  <button
                    className="view-details-btn"
                    onClick={() =>
                      navigate(`/CollectionDetails/${collection.id}`)
                    }
                  >
                    <img src={view}></img>View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Collections;
