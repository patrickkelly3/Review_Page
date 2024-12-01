"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./addItem.module.css";

interface Class {
  id: string;
  crn: string;
  name: string;
  professor: string;
  period: string;
}

const AddItemComponent: React.FC = () => {
  const { data: session, status } = useSession(); // Use `useSession` at the top level
  const [_id, setID] = useState<string>(""); // Stores the CRN input
  const [oneClass, setOneClass] = useState<Class | null>(null); // Stores the fetched class by ID
  const [error, setError] = useState<string | null>(null); // Stores error messages

  // Add a log to check session data and status on every render
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);
  }, [session, status]);

  const handleCRNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setID(event.target.value);
  };

  const handleSearch = async () => {
    console.log("CRN entered:", _id);

    if (!_id) {
      setError("Please enter a valid CRN.");
      return;
    }

    try {
      const response = await fetch(`/api/classes/${_id}`, {
        method: "GET",
      });

      console.log("GET /api/classes response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to fetch course.");
      }

      const data = await response.json();
      console.log("GET /api/classes response data:", data);

      if (!data.results || data.results.length === 0) {
        throw new Error("No classes found for the provided CRN.");
      }

      setOneClass(data.results[0]);
      setError(null); // Clear any error messages
    } catch (err) {
      console.error("Error fetching course:", err);
      setOneClass(null);
      setError("Could not fetch course. Please check the CRN and try again.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const email = session?.user?.email;

    // Debugging logs
    console.log("Session object:", session);
    console.log("Session user email:", email);
    
    if (!email) {
      setError("Email is not available. User might not be authenticated.");
    } else {
      console.log("Email found:", email);
      setError(email); // Setting email as the error message for testing/debugging purposes
    }

    if (!oneClass) {
      setError("Please search for a valid course before submitting.");
      return;
    }

    if (status !== "authenticated" || !session?.user?.email) {
      console.error("Authentication error. User is not authenticated.");
      setError("User is not authenticated.");
      return;
    }

    console.log("Submitting PUT request with email:", session.user.email);

    try {
      const classResponse = await fetch(`/api/classes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email, // The authenticated user's email
          action: "add", // Specify the action (add or delete)
        }),
      });

      console.log("PUT /api/classes response status:", classResponse.status);

      const userResponse = await fetch(`/api/users/${session.user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: _id, // The authenticated user's email
          action: "add", // Specify the action (add or delete)
        }),
      });

      console.log("PUT /api/classes/email response status:", userResponse.status);

      if (classResponse.ok && userResponse.ok) {
        setError(`Success! Course "${oneClass.id}" has been added.`);
        setID("");
        setOneClass(null); // Clear selected course after submission
      } else {
        const classErrorData = await classResponse.json();
        const userErrorData = await userResponse.json();
        console.error("Class API error:", classErrorData);
        console.error("User API error:", userErrorData);
        setError(`Failed to add the user to the course. ${classErrorData.error || ""}`);
        setError(`Failed to add the class to the user. ${userErrorData.error || ""}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state
  }

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
              id="id"
              name="id"
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
              <strong>Time Slot:</strong> {oneClass.period}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddItemComponent;
