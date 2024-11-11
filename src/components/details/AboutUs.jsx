import React from 'react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa'; // Import icons from react-icons
import NidinaImage from '../../assets/about-us/nidina.webp';
import DineshImage from '../../assets/about-us/dinesh.jpeg';
import BikalpaImage from '../../assets/about-us/bikalpa.jpeg';

const teamMembers = [
  {
    name: 'Nidina Koirala',
    position: 'Frontend Developer',
    bio: 'Nidina has over 10 years of experience in web development and specializes in frontend frameworks. Her passion for creating intuitive user experiences drives the project forward.',
    image: NidinaImage,
    nameStyle: 'text-purple-600 underline decoration-purple-400',
    social: {
      linkedin: 'https://linkedin.com/in/nidina',
      github: 'https://github.com/nidina',
      website: 'https://nidina.dev',
    },
  },
  {
    name: 'Dinesh Adhikari',
    position: 'Frontend Developer and UI/UX ',
    bio: 'Dinesh is a skilled Front-End Developer with a keen eye for design, crafting responsive, user-friendly interfaces that enhance our product`s appeal and usability.',
    image: DineshImage,
    nameStyle: 'text-teal-600 font-semibold italic',
    social: {
      linkedin: 'https://linkedin.com/in/Dinesh',
      github: 'https://github.com/Dinesh',
      website: 'https://Dinesh.design',
    },
  },
  {
    name: 'Bikalpa Pandey',
    position: 'Backend Engineer',
    bio: 'Bikalpa is responsible for ensuring the reliability and performance of our backend services. He’s skilled in Node.js, databases, and building scalable architectures.',
    image: BikalpaImage,
    nameStyle: 'text-blue-600 uppercase tracking-wide',
    social: {
      linkedin: 'https://linkedin.com/in/Bikalpa',
      github: 'https://github.com/Bikalpa',
      website: 'https://Bikalpa.tech',
    },
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      {/* About Us Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg mb-8">
          Welcome to our platform, where we bring the best Nepali artisan products to your fingertips. Our mission is to support local makers by connecting them with customers around the world, creating a marketplace that celebrates authenticity, sustainability, and craftsmanship.
        </p>
        <p className="text-gray-700 text-lg">
          We are committed to building a community of like-minded people who value high-quality, handmade products. Join us on our journey to empower artisans and bring beautiful, unique products into your life.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h3 className="text-4xl font-semibold text-gray-800 text-center mb-12">Meet Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform transition-transform hover:scale-105 hover:shadow-2xl"
              style={{ position: 'relative', top: '-20px' }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-36 h-36 rounded-full mb-4 border-4 border-gray-300 object-cover"
              />
              <h4 className={`text-2xl font-bold mb-2 ${member.nameStyle}`}>{member.name}</h4>
              <p className="text-indigo-600 text-sm font-medium mb-4">{member.position}</p>
              <p className="text-gray-600 mb-6">{member.bio}</p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={member.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  aria-label="Website"
                >
                  <FaGlobe size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
