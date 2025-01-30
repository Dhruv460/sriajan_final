import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import time_line from "../utils/timeline_data"; // Importing the timeline data
import { Calendar } from 'lucide-react';
import clsx from 'clsx';
import rock from "../assets/rock.jpeg";

const Timeline = () => {
  // Filter the timeline data to include only Day 1, Day 2, and Day 3
  const filteredTimeline = time_line.filter(event => 
    event.Day === "Day 1" || event.Day === "Day 2" || event.Day === "Day 3"
  );

  const days = [...new Set(filteredTimeline.map(event => event.Day))];
  const [selectedDay, setSelectedDay] = useState(days[0]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
    style={{
      fontFamily: "'MedievalSharp', serif",
      fontWeight: 800
    }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Event Timeline</h1>
          <div className="flex justify-center items-center gap-2 mb-8">
            <Calendar className="w-6 h-6 text-amber-700" />
            <p className="text-xl text-amber-800">Select a day to explore events</p>
          </div>

          {/* Day Selection Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {days.map((day, index) => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day)}
                className={clsx(
                  "px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300",
                  "shadow-lg hover:shadow-xl",
                  selectedDay === day
                    ? "bg-amber-800 text-white"
                    : "bg-white/80 text-amber-800 hover:bg-amber-100"
                )}
              >
                Day {index + 1}
                <span className="block text-sm opacity-75">{
                  day === "Day 1" ? "31st January" : day === "Day 2" ? "1st February" : "2nd February"
                  }</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-800"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredTimeline
                .filter(event => event.Day === selectedDay)
                .map((event, index) => (
                  <motion.div
                  data-aos = "fade-up"
                    key={event["Pre-Event"]}
                    
                    className={clsx(
                      "relative flex items-center mb-8",
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    )}
                  >
                    <div
                      className={clsx(
                        "w-5/12 p-6 rounded-lg shadow-xl bg-white/90 backdrop-blur-sm",
                        "transform transition-all duration-300 hover:scale-105"
                      )}
                      style={{
                        backgroundImage:
                          event["Pre-Event"] === "EDM NIGHT" ||
                          event["Pre-Event"] === "STAR NIGHT" ||
                          event["Pre-Event"] === "BAND NIGHT"
                            ? `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa1nWDEzB_Cqd7LAllcmHtu33n_v1wNl0Jrw&s)` // Replace with a direct image URL
                            : event["Pre-Event"] === "Footloose (LITM)"
                            ? `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZkAnX-Za_nHV1VHYqQcDS1tXco9rAbTYfA&s)` // Replace with a direct image URL
                            :
                            event["Pre-Event"] === "Street Beats (WTC)" ?
                            `url(https://images.unsplash.com/photo-1718248028314-c144318686dd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` // Replace with a direct image URL
                            :
                            event["Pre-Event"] === "Campus Princess" ?
                            `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFJX5n4y3cZK4nbwV7OINducTFmBICeWN-g&s)`
                            :
                            event["Pre-Event"].includes("(Quiz Club)") ?
                            `url(https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVlc3Rpb24lMjBtYXJrfGVufDB8fDB8fHww)`
                            :
                             `url(https://images.unsplash.com/photo-1716927111848-56163afc0107?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVpZ2UlMjB0ZXh0dXJlfGVufDB8fDB8fHww)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "300px",
                      }}
                      
                    >
                      <h3 className={`text-2xl font-bold ${event["Pre-Event"] === "EDM NIGHT" || 
                      event["Pre-Event"] === "STAR NIGHT" || event["Pre-Event"] === "BAND NIGHT"
                        ? "text-amber-900": "text-amber-900"} mb-2`}>{event["Pre-Event"].toUpperCase()}</h3>
                      <div className={`space-y-1 text-amber-800 ${event["Pre-Event"] === "EDM NIGHT" || 
                      event["Pre-Event"] === "STAR NIGHT" || event["Pre-Event"] === "BAND NIGHT" ? "text-amber-900": "text-amber-900"}`}>
                        <p><span className="font-semibold">Venue:</span> {event.Venue}</p>
                        <p><span className="font-semibold">Time:</span> {event.Time}</p>
                        { event["Prize Worth"] && 
                        event["Prize Worth"] !== "-" && (
                          <p><span className="font-semibold">Prize Worth:</span> &#x20B9; {event["Prize Worth"]}</p>
                        )}
                       
                      </div>
                    </div>

                    {/* Timeline dot with animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.2 }}
                      className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-600 rounded-full border-4 border-amber-900"
                    />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
