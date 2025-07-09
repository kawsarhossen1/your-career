import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServicesDetails = () => {
  const { id } = useParams();
  const [service, setServices] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/public/services.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item.id === id);
        setServices(selected);
      });
  }, [id]);

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
    }
  };

  if (!service) return <div className="text-center mt-10">Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
      <p className="text-gray-600 mb-1">Category: {service.category}</p>
      <p className="text-gray-600 mb-1">Price: {service.price}</p>
      <p className="text-gray-600 mb-3">Counselor: {service.counselor}</p>
      <p className="mb-6">{service.description}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Feedback</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow border px-3 py-2 rounded"
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
        <ul className="space-y-2">
          {comments.map((com, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              {com}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServicesDetails;
