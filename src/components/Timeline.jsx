import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import time_line from "../utils/timeline_data";
import { Calendar, ScrollText, Castle, Sword } from "lucide-react";
import clsx from "clsx";

const Timeline = () => {
  const filteredTimeline = time_line.filter(
    (event) =>
      event.Day === "Day 1" || event.Day === "Day 2" || event.Day === "Day 3"
  );

  const days = [...new Set(filteredTimeline.map((event) => event.Day))];
  const [selectedDay, setSelectedDay] = useState(days[0]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-out-quart",
    });
  }, []);

  // Medieval parchment texture
  const parchmentTexture = `url("https://stackoverflow.com/questions/76964199/reloading-a-specific-page-in-hostinger-hosting-gives-404-error-its-a-react-webs")`;

  const EventIcon = ({ eventName }) => {
    if (eventName.includes("NIGHT")) return <Castle className="w-8 h-8" />;
    if (eventName.includes("Footloose")) return <Sword className="w-8 h-8" />;
    return <ScrollText className="w-8 h-8" />;
  };

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        fontFamily: "'MedievalSharp', cursive",
        backgroundImage: parchmentTexture,
      }}
    >
      {/* Decorative border */}
      <div className="absolute inset-0 border-8 border-stone-400/30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1
            className="text-4xl md:text-6xl font-bold text-stone-800 mb-6"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <span className="bg-amber-900  text-amber-100 px-6 py-2 inline-block rounded-lg shadow-lg">
              Kingdom Chronicle
            </span>
          </h1>

          <div
            className="flex flex-col md:flex-row justify-center items-center gap-3 mb-8"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {/* <div className="flex items-center gap-2 bg-stone-200/80 px-4 py-2 rounded-full">
              <Calendar className="w-6 h-6 text-stone-700" />
              <p className="text-lg md:text-xl text-stone-700">
                Scroll through the days of revelry
              </p>
            </div> */}
          </div>

          {/* Day Selection - Mobile Scroll */}
          {/* <div
            className="md:hidden overflow-x-auto pb-4 mb-8 scrollbar-hide"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="flex gap-3 px-4 w-max">
              {days.map((day, index) => (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day)}
                  className={clsx(
                    "px-6 py-2 rounded-full text-base font-semibold min-w-[120px]",
                    "shadow-lg hover:shadow-stone-300 transition-all duration-300",
                    "border-2 border-stone-300",
                    selectedDay === day
                      ? "bg-stone-800 text-amber-100"
                      : "bg-stone-100 text-stone-700"
                  )}
                >
                  Day {index + 1}
                </motion.button>
              ))}
            </div>
          </div> */}

          {/* Day Selection - Desktop */}
          <div
            className=" flex flex-wrap  md:flex justify-center  gap-4 mb-12"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {days.map((day, index) => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day)}
                className={clsx(
                  "px-8 py-3 rounded-full text-lg font-semibold",
                  "shadow-lg hover:shadow-stone-300 transition-all duration-300",
                  "border-2 border-stone-300",
                  selectedDay === day
                    ? "bg-amber-900 text-amber-100"
                    : "bg-stone-100 text-stone-700"
                )}
              >
                Day {index + 1}
                <span className="block text-sm opacity-75 mt-1">
                  {day === "Day 1"
                    ? "31st January"
                    : day === "Day 2"
                      ? "1st February"
                      : "2nd February"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline (Desktop) */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-stone-300"
            data-aos="fade-up"
            data-aos-delay="800"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredTimeline
                .filter((event) => event.Day === selectedDay)
                .map((event, index) => (
                  <motion.div
                    key={event["Pre-Event"]}
                    className={clsx(
                      "relative flex items-center mb-8 md:mb-12",
                      "md:justify-start", // Mobile always left-aligned
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    )}
                    data-aos="fade-up"
                    data-aos-delay={index * 100 + 400}
                  >
                    <div
                      style={{
                        backgroundImage: `url("https://img.freepik.com/premium-photo/aged-old-worn-out-light-brown-beige-blank-parchment-paper-background-texture-manuscript-scroll-card_685444-117.jpg")`,
                      }}
                      className={clsx(
                        "w-full md:w-5/12 p-6 rounded-xl shadow-2xl",
                        "transform transition-all duration-300 hover:scale-[1.02]",
                        " backdrop-blur-sm border-2 border-stone-200",
                        "relative overflow-hidden"
                      )}
                    >
                      {/* Decorative corner elements */}
                      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-stone-400" />
                      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-stone-400" />

                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-1 bg-stone-800 rounded-lg shadow-md">
                          {/* <EventIcon
                            eventName={event["Pre-Event"]}
                            className="text-amber-100"
                          /> */}
                          <img
                            className="h-8"
                            src="https://res.cloudinary.com/dr80y03u3/image/upload/v1737968293/bapac0tlofzyaualh5va.png"
                            alt="nhi aa rha to kya kru "
                          />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mt-1">
                          {event["Pre-Event"].toUpperCase()}
                        </h3>
                      </div>

                      <div className="space-y-2 text-stone-700 pl-2 border-l-4 border-stone-300 ml-2">
                        <p className="flex items-center gap-2">
                          <span className="font-semibold">🏛️ Venue:</span>
                          <span className="bg-stone-200 px-2 py-1 rounded">
                            {event.Venue}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-semibold">⏳ Time:</span>
                          <span className="bg-stone-200 px-2 py-1 rounded">
                            {event.Time}
                          </span>
                        </p>
                        {event["Prize Worth"] &&
                          event["Prize Worth"] !== "-" && (
                            <p className="flex items-center gap-2">
                              <span className="font-semibold">🏆 Prize:</span>
                              <span className="bg-amber-200 px-2 py-1 rounded">
                                ₹{event["Prize Worth"]}
                              </span>
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.2 }}
                      className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-stone-800 rounded-full border-4 border-amber-200 shadow-xl"
                    />

                    {/* Mobile date marker */}
                    <div className="md:hidden absolute -left-4 top-6 w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center text-amber-100 font-bold shadow-md">
                      {index + 1}
                    </div>
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
