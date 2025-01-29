import React, { useState } from "react";
import time_line from "../utils/timeline_data.js";
import romanBg from "/bg23.jpg";
import marbleBg from "/bg2.jpg";

export default function Timeline() {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const filteredEvents = time_line.filter((event) => event.Day === selectedDay);

  return (
    <div
      className="min-h-screen p-5 font-serif bg-cover bg-center text-amber-900"
      style={{ backgroundImage: `url(${romanBg})` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="bg-amber-800 p-8 rounded-t-lg text-center border-4 border-amber-900 shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${marbleBg})` }}
        >
          <h1 className="text-6xl font-bold text-black m-10 mb-2">⚔️ TEMPVS LINEA ⚔️</h1>
          <p className="text-black italic text-xl">Eventus Futuri</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-8 my-6">
          {["Day 1", "Day 2", "Day 3"].map((day) => (
            <button
              key={day}
              className={`px-8 py-4 text-xl font-semibold transition-all ease-in-out duration-300 border-4 border-amber-800 text-amber-900 bg-amber-200 hover:bg-amber-800 hover:text-amber-100 shadow-md rounded-lg ${
                selectedDay === day ? "bg-amber-800 text-amber-100" : ""
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {`Day ${toRomanNumeral(parseInt(day.split(" ")[1]))}`}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-800 hidden lg:block" />

          {filteredEvents.map((event, index) => (
            <div
              key={`${event.Day}-${event["Pre-Event"]}`}
              className={`relative flex flex-col mb-12 lg:mb-24 ${
                index % 2 === 0 ? "lg:items-start" : "lg:items-end"
              } items-center`}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-amber-800 border-4 border-black flex items-center justify-center rounded-full">
                <span className="text-amber-100 font-bold">{toRomanNumeral(index + 1)}</span>
              </div>

              {/* Card Content */}
              <div
                className="w-full lg:w-5/12 p-6 bg-cover bg-center text-amber-900 rounded-lg shadow-xl border-4 border-amber-900 mt-12 lg:mt-0"
                style={{
                  backgroundImage: `url(${marbleBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span className="text-3xl font-bold text-black">⏳ Tempus: {event.Time}</span>
                <div className="mt-4 space-y-2">
                  <p className="text-2xl font-semibold text-black italic">{event["Pre-Event"]}</p>
                  <p className="text-amber-900 text-md font-bold">🏛 Locus: {event.Venue}</p>
                  <p className="text-amber-900 text-md">💰 Praemium: ₹{event["Prize Worth"]}</p>
                  <p className="text-amber-900 text-md">📋 Reservatio: {event["Status Of Booking"]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function toRomanNumeral(num) {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
  return romanNumerals[num - 1] || num.toString();
}
