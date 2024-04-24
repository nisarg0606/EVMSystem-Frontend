import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CsvDownload from "../../utils/CsvDownload";

const CsvDownloadModel = ({ id, onClose }) => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CsvDownload(id);
        if (response.success) {
          setCsvData(response.data);
        } else {
          console.error("Failed to fetch CSV data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (csvData) {
      downloadCsv();
    }
  }, [csvData]);

  const downloadCsv = () => {
    if (!csvData) return;

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "participants.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return null; 
};

export default CsvDownloadModel;
