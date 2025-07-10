import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/public/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="px-4 md:px-10 py-8">
      <div className="carousel w-full rounded-md mb-10 h-64 md:h-96">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co/FLyvVCB3/career-5.jpg"
            className="w-full object-cover"
            alt="Career Slide 1"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co/5W37ghf4/career-6.jpg"
            className="w-full object-cover"
            alt="Career Slide 2"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co/q3fzSdVr/career-7.png"
            className="w-full object-cover"
            alt="Career Slide 3"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg shadow p-4 bg-white hover:shadow-md transition"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-3">{service.name}</h3>
            <p className="text-sm text-gray-600">
              Category: {service.category}
            </p>
            <p className="text-sm text-gray-600">Price: {service.price}</p>
            <p className="text-sm text-gray-600 mb-2">
              Counselor: {service.counselor}
            </p>
            <Link
              to={`/servicesDetails/${service.id}`}
              className="block text-center mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
