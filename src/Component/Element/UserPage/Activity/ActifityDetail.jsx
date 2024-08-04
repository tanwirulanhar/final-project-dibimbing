import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGatedata";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const ActivityDetailCard = () => {
  const { id } = useParams();
  const { getData } = useGetData();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [srcUrl, setSrcUrl] = useState(null);

  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        if (!id) {
          setError("ID is not defined");
          return;
        }
        const res = await getData(`activity/${id}`);
        const activityData = res.data.data;
        setActivity(activityData);

        // Menggunakan regex untuk menangkap URL dari iframe
        const linkMap = activityData.location_maps;
        const match = linkMap.match(/<iframe[^>]+src="([^"]+)"/);
        if (match && match[1]) {
          setSrcUrl(match[1]);
        } else {
          setSrcUrl(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
    AOS.init({ duration: 1000 });
  }, [id, getData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!activity) return <div>No data found</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <div className={`overflow-x-hidden ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
    }`}>
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md" data-aos="fade-up">
          <img
            src={activity.imageUrls[0]}
            alt={activity.title}
            className="object-cover w-full mb-6 rounded-lg h-96"
            data-aos="fade-up"
          />
          <h1 className="mb-4 text-3xl font-bold text-green-800" data-aos="fade-up">{activity.title}</h1>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">Update : <span className="text-xl font-light text-gray-600">{format(new Date(activity.updatedAt), "dd-MM-yyyy")}</span></p>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">
            Price : <span className="text-xl font-light text-gray-600">{formatPrice(activity.price)} </span>
          </p>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">
            Discount Price : <span className="text-xl font-light text-gray-600">{formatPrice(activity.price_discount)} </span>
          </p>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">
            Rating : <span className="text-xl font-light text-gray-600">{activity.rating}</span>
          </p>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">
            Total Reviews : <span className="text-xl font-light text-gray-600">{activity.total_reviews}</span>
          </p>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">
            Facilities : <span className="text-xl font-light text-gray-600">{activity.facilities}</span>
          </p>
          <p className="mb-4 text-xl font-bold text-green-500" data-aos="fade-up">
            Address : <span className="text-xl font-light text-gray-600">{activity.address}</span>
          </p>
          {srcUrl ? (
            <div className="w-full h-96" data-aos="fade-up">
              <iframe
                src={srcUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <p className="text-lg text-gray-800" data-aos="fade-up">Map not available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ActivityDetailCard;
