"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./addItem.module.css";

interface Class {
  _id: string;
  title: string;
  name: string;
  professor: string;
  timeSlot: string;
}

export default function AddItemComponent() {
  const [_id, setID] = useState<string>(""); // Stores the CRN input
  const [oneClass, setOneClass] = useState<Class | null>(null); // Stores the fetched class by ID
  const [error, setError] = useState<string | null>(null); // Stores error messages

  const handleCRNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  const handleSearch = async () => {
    if (!_id) return;
  
    try {
      const response = await fetch(`/api/classes/${_id}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch course.");
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Add this to debug
  
      if (!data.results || data.results.length === 0) {
        console.error("No classes found:", data); // Log unexpected response
        throw new Error("No classes found for the provided CRN.");
      }
  
      // Use the first result in the array
      setOneClass(data.results[0]);
      setError(null); // Clear any error messages
    } catch (err) {
      console.error("Error fetching course:", err);
      setOneClass(null);
      setError("Could not fetch course. Please check the CRN and try again.");
    }
  };
  
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (oneClass) {
      setError(`Success! Course "${oneClass.title}" has been added.`);
      setID("");
      setOneClass(null); // Clear selected course after submission
    } else {
      setError("Please search for a valid course before submitting.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Add New Course</h1>
        <Link href="/profileComponent">
          <button className={styles.exit}>Back</button>
        </Link>
      </header>
      <main className={styles.mainContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="crn" className={styles.label}>
              Course Registration Number (CRN):
            </label>
            <input
              type="text"
              id="crn"
              name="crn"
              value={_id}
              onChange={handleCRNChange}
              placeholder="Enter CRN (e.g., CRN12345678)"
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={handleSearch}
              className={styles.searchButton}
              disabled={!_id}
            >
              Search
            </button>
          </div>
          <button type="submit" className={styles.button} disabled={!oneClass}>
            Register
          </button>
        </form>

        {error && <p className={styles.errorMessage}>{error}</p>}

        {oneClass && (
          <div className={styles.detailsSection}>
            <h2>Course Details</h2>
            <p>
              <strong>Title:</strong> {oneClass.title}
            </p>
            <p>
              <strong>Name:</strong> {oneClass.name}
            </p>
            <p>
              <strong>Professor:</strong> {oneClass.professor}
            </p>
            <p>
              <strong>Time Slot:</strong> {oneClass.timeSlot}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
