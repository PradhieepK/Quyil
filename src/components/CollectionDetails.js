import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import axios from "axios";
import rightArrow from "../assests/right-arrow.svg";
import "../styles/CollectionDetails.css";

const CollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [collectionDetails, setCollectionDetails] = useState([]); // To store collection Details data from API.

  // Calling /collections/id endpoint to fetch the data from API.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/collections/${id}`
        );
        setCollectionDetails(response.data);
      } catch (error) {
        console.log("Error fetching Collection Details", error);
      }
    };
    fetchData();
  }, [id]);

  // If the API returns empty array when calling the endppoint.
  if (Array.isArray(collectionDetails) && collectionDetails.length === 0) {
    return <h1>Collection details not found</h1>;
  }

  // For converting date to desired format & seconds to minutes.
  function formatDateTime(seconds, isSongDuration) {
    if (!seconds) {
      return function (date) {
        return DateTime.fromISO(date).toFormat("dd LLL yyyy");
      };
    } else if (isSongDuration) {
      return new Date(seconds * 1000).toISOString().substring(11, 19);
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  }

  return (
    <>
      <div className="collection-details-nav">
        <button className="overview-btn" onClick={() => navigate("/")}>
          Overview
        </button>
        <img src={rightArrow}></img>
        <div className="collection-details-nav-title">
          {collectionDetails.name}
        </div>
      </div>
      <div className="collection-details-title">{collectionDetails.name}</div>
      <div className="collection-details-container">
        <table className="collection-details-table collection-details-table-album">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Type</th>
              <th>Song Count:</th>
              <th>Total Size</th>
              <th>Total Duration</th>
              <th>Released On</th>
            </tr>
          </thead>
          <tbody>
            <tr key={collectionDetails.id}>
              <td>{collectionDetails.artist}</td>
              <td>{collectionDetails.type}</td>
              <td>{collectionDetails.songCount}</td>
              <td>
                {Math.trunc(collectionDetails.sizeInBytes / (1024 * 1024))} MB
              </td>
              <td>
                {formatDateTime(collectionDetails.durationInSeconds, false)}
              </td>
              <td>{formatDateTime()(collectionDetails.releasedOn)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="collection-details-container">
        <table className="collection-details-table collection-details-table-songs">
          <thead>
            <tr>
              <th>Song</th>
              <th>Performers</th>
              <th>Duration</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {collectionDetails.songs &&
              Array.isArray(collectionDetails.songs) &&
              collectionDetails.songs.map((song, index) => (
                <tr key={index}>
                  <td>{song.title}</td>
                  <td>{song.performers.join(", ")}</td>
                  <td>{formatDateTime(song.durationInSeconds, true)}</td>
                  <td>{Math.trunc(song.sizeInBytes / (1024 * 1024))} MB</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CollectionDetails;
