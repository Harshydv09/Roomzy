import React, { useState, useEffect } from "react";
import { Room } from "@/Entities/Room";
import { Review } from "@/Entities/Review";
import { User } from "@/Entities/User";
import { Button } from "@/Components/UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/Card";
import { Badge } from "@/Components/UI/Badge";
import { Skeleton } from "@/Components/UI/Skeleton";
import {
  MapPin,
  IndianRupee,
  Users,
  Star,
  Wifi,
  Fan,
  Bed,
  ArrowLeft,
  Phone,
  Shield,
  Clock,
  Mail,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ReviewSection from "@/Components/Roooms/ReviewSection";

export default function RoomDetail() {
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadRoomDetails();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const loadRoomDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');

    if (!roomId) {
      setLoading(false);
      return;
    }

    try {
      const rooms = await Room.list();
      const foundRoom = rooms.find(r => r.id === roomId);
      setRoom(foundRoom);

      const allReviews = await Review.list("-created_date");
      const roomReviews = allReviews.filter(r => r.room_id === roomId);
      setReviews(roomReviews);
    } catch (error) {
      console.error("Error loading room:", error);
    }
    setLoading(false);
  };

  const handleContactEmail = () => {
    if (!user) {
      User.login();
      return;
    }
    const subject = encodeURIComponent(`Inquiry about ${room.title}`);
    const body = encodeURIComponent(`Hello ${room.host_name},\n\nI am interested in your room listing "${room.title}" at ${room.location?.city}.\n\nPlease share more details about availability and booking process.\n\nThank you,\n${user.full_name}`);
    window.location.href = `mailto:${room.host_email}?subject=${subject}&body=${body}`;
  };

  const handleContactWhatsApp = () => {
    if (!user) {
      User.login();
      return;
    }
    const message = encodeURIComponent(`Hello! I'm interested in your room listing "${room.title}" at ${room.location?.city}. Can you please share more details?`);
    const phoneNumber = room.host_contact?.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const amenityIcons = {
    "WiFi": Wifi,
    "Fan": Fan,
    "AC": Fan,
    "Study Table": Bed
  };

  const hourlyRate = room?.hourly_stay_available ? Math.ceil(room.price_per_month / 720) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <p className="text-xl text-gray-600 mb-4">Room not found</p>
          <Link to={createPageUrl("Rooms")}>
            <Button variant="outline">Browse Rooms</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 sticky top-16 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl("Rooms")}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Rooms
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.images && room.images.length > 0 ? (
                room.images.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className={`${idx === 0 ? 'md:col-span-2' : ''} h-64 rounded-xl overflow-hidden shadow-lg`}
                  >
                    <img src={img} alt={`Room ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 h-64 rounded-xl bg-gradient-to-br from-orange-100 to-purple-100 flex items-center justify-center">
                  <Bed className="w-24 h-24 text-gray-300" />
                </div>
              )}
            </div>

            {/* Room Info */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    {room.room_type}
                  </Badge>
                  {room.hourly_stay_available && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Hourly Stay Available
                    </Badge>
                  )}
                  {room.near_exam_centers && room.near_exam_centers.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      Near Exam Centers
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">{room.title}</h1>

                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>{room.location?.full_address || `${room.location?.area}, ${room.location?.city}, ${room.location?.state}`}</span>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {room.description || "Comfortable accommodation for students"}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Room Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities?.map((amenity, idx) => {
                    const Icon = amenityIcons[amenity] || Bed;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Icon className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Exam Centers Nearby */}
            {room.near_exam_centers && room.near_exam_centers.length > 0 && (
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Nearby Exam Centers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {room.near_exam_centers.map((center, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <span className="font-medium text-gray-900">{center.name}</span>
                        <span className="text-blue-600 font-semibold">{center.distance_km} km away</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* House Rules */}
            {room.rules && room.rules.length > 0 && (
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-500" />
                    House Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {room.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <ReviewSection roomId={room.id} reviews={reviews} user={user} onReviewAdded={loadRoomDetails} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Pricing Card */}
              <Card className="border-none shadow-xl bg-gradient-to-br from-orange-50 to-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-baseline gap-2 mb-6">
                    <IndianRupee className="w-6 h-6 text-orange-600" />
                    <span className="text-4xl font-bold text-gray-900">{room.price_per_month}</span>
                    <span className="text-gray-600">/ month</span>
                  </div>

                  {room.hourly_stay_available && (
                    <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 text-purple-700 font-medium mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Hourly stay available</span>
                      </div>
                      <div className="flex items-center gap-1 text-2xl font-semibold text-purple-600">
                        <IndianRupee className="w-5 h-5" />
                        {hourlyRate}
                        <span className="text-base text-purple-500">/hour</span>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">Calculated from monthly rate</p>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Available Beds</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Bed className="w-4 h-4 text-orange-500" />
                        {room.available_beds}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Users className="w-4 h-4 text-orange-500" />
                        {room.capacity} people
                      </span>
                    </div>
                    {room.room_type === 'shared' && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">Shareable Room</p>
                        <p className="text-xs text-green-600 mt-1">Split costs with other students</p>
                      </div>
                    )}
                  </div>

                  {!user && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700 text-center">
                        Please login to contact the owner
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button
                      onClick={handleContactEmail}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg text-lg gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Contact via Email
                    </Button>
                    
                    {room.host_contact && (
                      <Button
                        onClick={handleContactWhatsApp}
                        className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg text-lg gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Contact via WhatsApp
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Host Info */}
              {user && (
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Host Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                        {room.host_name?.[0] || 'H'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{room.host_name || "Host"}</div>
                        <div className="text-sm text-gray-500">Room Provider</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail className="w-4 h-4" />
                        <span className="break-all">{room.host_email}</span>
                      </div>
                      {room.host_contact && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Phone className="w-4 h-4" />
                          <span>{room.host_contact}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}