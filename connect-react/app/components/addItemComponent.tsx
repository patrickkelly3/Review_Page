"use client";
import React, { useState } from "react";
import styles from "./addItem.module.css";

interface CourseDetails {
    title: string;
    name: string;
    professor: string;
    timeSlot: string;
}

export default function AddItemComponent() {
    const [crn, setCRN] = useState<string>(""); // Stores the CRN input
    const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null); // Stores the fetched course details
    const [error, setError] = useState<string | null>(null); // Stores any error if CRN is not found

    // Dummy database
    const dummyDatabase: Record<string, CourseDetails> = {
        CRN12345678: {
            title: "Introduction to Programming",
            name: "CS101",
            professor: "Dr. John Doe",
            timeSlot: "MWF 10:00-11:00 AM",
        },
        CRN12345679: {
            title: "Data Structures",
            name: "CS102",
            professor: "Dr. Jane Smith",
            timeSlot: "TTh 1:00-2:30 PM",
        },
        // Add more dummy entries as needed
    };

    // Handler for CRN input change
const handleCRNChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCRN(event.target.value); // Only update the CRN state
};

// Handler for Enter key press in the input field
const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission

        // Fetch course details from dummy database
        if (dummyDatabase[crn]) {
            setCourseDetails(dummyDatabase[crn]);
            setError(null); // Clear any previous error
        } else {
            setCourseDetails(null); // Clear previous details
            setError("Course not found for the entered CRN."); // Show error message
        }
    }
};

    // Handler for form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault(); // Prevent default form submission
        setCourseDetails(null); // Reset details on new input
        setError(null);
        console.log("CRN added to profile");
        
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Add New Course</h1>
            </header>
            <main className={styles.mainContent}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                    <label htmlFor="crn" className={styles.label}>Course Registration Number (CRN):</label>

                        <input
                            type="text"
                            id="crn"
                            name="crn"
                            value={crn}
                            onChange={handleCRNChange} // Update CRN state
                            onKeyDown={handleKeyPress} // Trigger search when Enter is pressed
                            placeholder="Enter CRN (e.g., CRN12345678)"
                            className={styles.input}
                            required
                        />
                    </div>
                </form>

                {error && <p className={styles.errorMessage}>{error}</p>}

                {courseDetails && (
                    <div className={styles.detailsSection}>
                        <div className={styles.detail}>
                            <span className={styles.detailTitle}>T</span>
                            <p className={styles.detailInfo}>Title: {courseDetails.title}</p>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailTitle}>N</span>
                            <p className={styles.detailInfo}>Name: {courseDetails.name}</p>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailTitle}>P</span>
                            <p className={styles.detailInfo}>Professor: {courseDetails.professor}</p>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.detailTitle}>TS</span>
                            <p className={styles.detailInfo}>Time Slot: {courseDetails.timeSlot}</p>
                        </div>
                    </div>
                )}
            </main>
            <button type="submit" className={styles.submitButton}>
                        Register
                    </button>
        </div>
    );
}

