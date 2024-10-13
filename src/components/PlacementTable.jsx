// src/components/PlacementTable.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const PlacementTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Google Sheets published URL
  const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/10zBg09MB1QSW2-gHAf2-kEbyM6GUhBksEc4JBvUbVps/pub?output=csv';

  useEffect(() => {
    // Fetch the CSV data from the published Google Sheet
    fetch(GOOGLE_SHEET_URL)
      .then(response => response.text())
      .then(csvText => {
        // Parse the CSV text using Papa.parse
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching Google Sheet data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="table-container">
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                // Bold the company name in the first column (assuming it's index 0)
                <td key={cellIndex} style={cellIndex === 0 ? { fontWeight: 'bold' } : {}}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlacementTable;
