import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGatedata";
import Navbar from "../../../Navbar/Navbar";
import Footer from "../../../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const ActivityDetailCard = () => {
  const { id } = useParams();
  const { getData } = useGetData();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [srcUrl, setSrcUrl] = useState(null);

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

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md" data-aos="fade-up">
          <img
            src={activity.imageUrls}
            alt={activity.title}
            className="object-cover w-full mb-6 rounded-lg h-96"
            data-aos="fade-up"
          />
          <h1 className="mb-4 text-3xl font-bold text-gray-800" data-aos="fade-up">{activity.title}</h1>
          <p className="mb-4 text-lg text-gray-600" data-aos="fade-up">{activity.description}</p>
          <p className="mb-4 text-lg text-gray-800" data-aos="fade-up">
            Price: <span className="font-bold">{activity.price}</span>
          </p>
          <p className="mb-4 text-lg text-gray-800" data-aos="fade-up">
            Discount Price: <span className="font-bold">{activity.price_discount}</span>
          </p>
          <p className="mb-4 text-lg text-gray-800" data-aos="fade-up">
            Rating: <span className="font-bold">{activity.rating}</span>
          </p>
          <p className="mb-4 text-lg text-gray-800" data-aos="fade-up">
            Total Reviews: <span className="font-bold">{activity.total_reviews}</span>
          </p>
          <p className="mb-4 text-lg text-gray-800" data-aos="fade-up">
            Facilities: <span className="font-bold">{activity.facilities}</span>
          </p>
          <p className="mb-4 text-lg text-gray-800" data-aos="fade-up">
            Address: <span className="font-bold">{activity.address}</span>
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
