import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Booking } from "@/entities/Booking";
import { Room } from "@/entities/Room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, IndianRupee, User as UserIcon, Clock, Home, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Dashboard() {
  const [user, setUser] = React.useState(null);
  const [bookings, setBookings] = React.useState([]);
  const [myRooms, setMyRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const currentUser = await User.me();
      
      const urlParams = new URLSearchParams(window.location.search);
      const userType = urlParams.get('userType');
      
      if (userType && !currentUser.user_type) {
        await User.updateMyUserData({ user_type: userType });
        currentUser.user_type = userType;
      }
      
      setUser(currentUser);

      if (currentUser.user_type === 'student') {
        const allBookings = await Booking.list("-created_date");
        const userBookings = allBookings.filter(b => b.student_email === currentUser.email);
        setBookings(userBookings);
      } else if (currentUser.user_type === 'host') {
        const allRooms = await Room.list("-created_date");
        const hostRooms = allRooms.filter(r => r.host_email === currentUser.email);
        setMyRooms(hostRooms);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      confirmed: "bg-green-100 text-green-700 border-green-200",
      completed: "bg-blue-100 text-blue-700 border-blue-200",
      cancelled: "bg-red-100 text-red-700 border-red-200"
    };
    return colors[status] || colors.pending;
  };

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await Room.delete(roomId);
        loadDashboard();
      } catch (error) {
        alert("Error deleting room. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name}!
          </h1>
          <p className="text-gray-600">
            {user?.user_type === 'student' ? 'Manage your bookings' : 'Manage your room listings'}
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 border-none shadow-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user?.full_name}</h2>
                <p className="opacity-90">{user?.email}</p>
                {user?.college_name && (
                  <p className="opacity-75 text-sm mt-1">{user.college_name}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  {user?.user_type === 'student' ? 'Student' : 'Room Provider'}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30">
                  {user?.is_verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Dashboard */}
        {user?.user_type === 'student' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {bookings.filter(b => b.booking_status === 'confirmed').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings */}
            <Card className="border-none shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No bookings yet</p>
                    <Link to={createPageUrl("Rooms")}>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Browse Rooms
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge className={getStatusColor(booking.booking_status)}>
                                {booking.booking_status}
                              </Badge>
                              <Badge variant="outline">
                                {booking.booking_type === 'hourly' ? 'Hourly Booking' : 'Monthly Booking'}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Booked on {format(new Date(booking.created_date), "MMM d, yyyy")}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-gray-700">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span>
                                  {format(new Date(booking.check_in_date), "MMM d")} - {format(new Date(booking.check_out_date), "MMM d, yyyy")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                <span>Room ID: {booking.room_id}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 flex items-center gap-1 justify-end">
                              <IndianRupee className="w-5 h-5" />
                              {booking.total_cost}
                            </div>
                            <p className="text-sm text-gray-500">{booking.number_of_people} {booking.number_of_people === 1 ? 'person' : 'people'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Host Dashboard */}
        {user?.user_type === 'host' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Listings</p>
                      <p className="text-3xl font-bold text-gray-900">{myRooms.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Available Rooms</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {myRooms.filter(r => r.is_available).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Room Listings */}
            <Card className="border-none shadow-lg mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Your Room Listings</CardTitle>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    + Add New Room
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {myRooms.length === 0 ? (
                  <div className="text-center py-12">
                    <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No room listings yet</p>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Add Your First Room
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myRooms.map((room) => (
                      <Card key={room.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {room.images && room.images.length > 0 ? (
                              <img
                                src={room.images[0]}
                                alt={room.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-purple-100 rounded-lg flex items-center justify-center">
                                <Home className="w-10 h-10 text-gray-300" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                {room.title}
                              </h3>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                <MapPin className="w-3 h-3" />
                                <span className="line-clamp-1">{room.location?.city}</span>
                              </div>
                              <div className="flex items-center gap-1 text-lg font-bold text-orange-600">
                                <IndianRupee className="w-4 h-4" />
                                {room.price_per_month}
                                <span className="text-xs text-gray-500 font-normal">/month</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={room.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                                  {room.is_available ? 'Available' : 'Unavailable'}
                                </Badge>
                                {room.hourly_stay_available && (
                                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                                    Hourly
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Link to={createPageUrl(`RoomDetail?id=${room.id}`)} className="flex-1">
                              <Button variant="outline" className="w-full">
                                View
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteRoom(room.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}