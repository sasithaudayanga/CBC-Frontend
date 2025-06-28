import { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${productId}`);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <div className="text-center py-8">Loading reviews...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (reviews.length === 0) return <div className="text-center py-8">No reviews yet</div>;
*/
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{review.userName}</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-2">{review.comment}</p>
          <p className="text-sm text-gray-400">
            Reviewed on {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;