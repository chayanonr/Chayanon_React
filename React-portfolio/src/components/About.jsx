import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const About = () => {
  return (
    <div name="about" className="w-full min-h-screen bg-[#0a192f] text-gray-300 py-16">
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
        <h2
          className="text-4xl font-bold inline border-b-4 border-pink-600 mb-8"
          data-aos="fade-up"
        >
          About Me
        </h2>
        <p className="text-lg mb-8" data-aos="fade-up">
          Hi! I’m Chayanon Rodjanawon, a passionate full-stack developer with a love for solving
          complex problems through code. Here’s a glimpse into my journey:
        </p>

        {/* Timeline */}
        <VerticalTimeline>
          {/* Education */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: "#1e293b", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1e293b" }}
            date="2018 - 2022"
            iconStyle={{ background: "#ff69b4", color: "#fff" }}
            icon={<FaGraduationCap />}
          >
            <h3 className="vertical-timeline-element-title">Bachelor's Degree in Computer Science</h3>
            <h4 className="vertical-timeline-element-subtitle">SIIT || Thammasat University</h4>
            <p>Graduated with enjoyment.</p>
          </VerticalTimelineElement>

          {/* Work Experience */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#1e293b", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #1e293b" }}
            date="2022 - Present"
            iconStyle={{ background: "#ff69b4", color: "#fff" }}
            icon={<FaBriefcase />}
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Gold Durian Co.,Ltd</h4>
            <p>
              Build and maintain Web application to a fruit exporter company.
            </p>
          </VerticalTimelineElement>
          
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default About;
