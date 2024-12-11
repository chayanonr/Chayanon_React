import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'Project One',
      image: '/images/project1.jpg', // Replace with the actual path to the image
      link: '/projects/project-one', // Replace with the actual route
    },
    {
      id: 2,
      name: 'Project Two',
      image: '/images/project2.jpg',
      link: '/projects/project-two',
    },
    {
      id: 3,
      name: 'Project Three',
      image: '/images/project3.jpg',
      link: '/projects/project-three',
    },
    // Add more projects as needed
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link to={project.link}>
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{project.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
