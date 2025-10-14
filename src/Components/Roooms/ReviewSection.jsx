import React from "react";
import { Review } from "@/Entities/Review";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import { Textarea } from "@/Components/UI/Textarea";
import { Star, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export default function ReviewSection({ roomId, reviews, user, onReviewAdded }) {
  const [showReviewForm, setShowReviewForm] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await Review.create({
        room_id: roomId,
        student_email: user.email,
        student_name: user.full_name,
        rating,
        comment,
        cleanliness_rating: rating,
        host_rating: rating,
        value_rating: rating
      });

      setComment("");
      setRating(5);
      setShowReviewForm(false);
      onReviewAdded();
    } catch (error) {
      alert("Error submitting review");
    }
    setLoading(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            Reviews ({reviews.length})
          </CardTitle>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold">{averageRating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && !showReviewForm && (
          <Button
            onClick={() => setShowReviewForm(true)}
            variant="outline"
            className="w-full border-orange-200 hover:bg-orange-50"
          >
            Write a Review
          </Button>
        )}

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="p-4 bg-orange-50 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="h-24"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReviewForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.student_name?.[0] || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{review.student_name}</div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(review.created_date), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}