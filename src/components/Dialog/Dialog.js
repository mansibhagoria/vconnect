import React from "react";
import { useForm } from "react-hook-form";
import "./Dialog.css";

function Dialog({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (values) => {
  //   console.log(values);
  //   console.log("Form Submitted");
  //   onClose();
  // };
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:8800/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        console.log("Form data sent successfully");
        onClose();
      } else {
        console.error("Failed to send form data");
      }
    } catch (error) {
      console.error("Error sending form data", error);
    }
  };
  

  return (
    <div className="DialogOverlay">
      <div className="DialogBox">
        <h2>Invite Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            Event Name :
            <input className="input"
              name="eventName"
              autoComplete="off"
              {...register("eventName", {
                required: "Required",
              })}
            />
            {errors.eventName && errors.eventName.message}
          </label>
          <label className="label">
            Event Date :
            <input className="input"
              name="eventDate"
              type="date"
              autoComplete="off"
              {...register("eventDate", {
                required: "Required",
              })}
            />
            {errors.eventDate && errors.eventDate.message}
          </label>
          <label className="label">
            Event Time :
            <input className="input"
              name="eventTime"
              type="time"
              autoComplete="off"
              {...register("eventTime", {
                required: "Required",
              })}
            />
            {errors.eventTime && errors.eventTime.message}
          </label>
          <div className="buttons">
            <input type="submit" className="submit" />
            <button className="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dialog;
