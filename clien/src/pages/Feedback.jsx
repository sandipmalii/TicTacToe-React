import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext.jsx";
import axios from "axios";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [allFeedback, setAllFeedback] = useState([]);
  const { user, token } = useContext(authContext);
  useEffect(() => {
    fetchAllFeedback();
  }, []);
  const fetchAllFeedback = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/feedbacks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Error fetching feedback");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/feedback",
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Feedback submitted:", response.data);

      // Reset form after submission
      setRating(0);
      setComment("");
      toast.success("Feedback successfully sent");
      // You might want to show a success message to the user here
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("error occured while submitting feedback");
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">
            FEEDBACK FORM
          </h1>

          <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Feel free to drop us your feedback.
                </h2>
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1457119/feedback-form-template.svg"
                  alt="A woman is sitting on the floor and working on a laptop"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
              <form onSubmit={handleSubmit} className="md:w-1/2 w-full">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    OVERALL RATING?
                  </h3>
                  <div className="flex justify-between mb-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className={`w-10 h-10 rounded-full ${
                          rating >= value ? "bg-orange-500" : "bg-gray-600"
                        } transition-colors duration-200`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Shape our future! Share your thoughts and help paint a brighter experience..."
                    className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  Send Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gradient-custom">
          <h2 className="text-2xl font-bold text-center mb-4 ">
            Total Reviews: {allFeedback.length}
          </h2>

          <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-1">
            {allFeedback.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-gray-800 rounded-lg shadow-lg p-4 mx-auto w-full max-w-md"
              >
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= feedback.rating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg mb-2">{feedback.comment}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    {feedback.user.username}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
