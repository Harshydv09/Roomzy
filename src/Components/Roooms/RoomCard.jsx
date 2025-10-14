import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, IndianRupee, Users, Star, Bed, Clock } from "lucide-react";

export default function RoomCard({ room }) {
  const hourlyRate = room.hourly_stay_available ? Math.ceil(room.price_per_month / 720) : 0;

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-none group cursor-pointer">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {room.images && room.images.length > 0 ? (
          <img
            src={room.images[0]}
            alt={room.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-purple-100">
            <Bed className="w-16 h-16 text-gray-300" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 border-none shadow-lg">
            {room.room_type}
          </Badge>
        </div>
        {room.hourly_stay_available && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-purple-500 text-white border-none shadow-lg flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Hourly Available
            </Badge>
          </div>
        )}
        {room.near_exam_centers && room.near_exam_centers.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-orange-500 text-white border-none shadow-lg">
              Near Exam Center
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {room.title}
        </h3>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="text-sm line-clamp-1">
            {room.location?.area}, {room.location?.city}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description || "Comfortable stay for students"}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {room.available_beds} beds
            </span>
            {room.rating > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {room.rating.toFixed(1)}
              </span>
            )}
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-2xl font-bold text-orange-600">
              <IndianRupee className="w-5 h-5" />
              {room.price_per_month}
            </div>
            <span className="text-xs text-gray-500">per month</span>
            {room.hourly_stay_available && (
              <div className="text-xs text-purple-600 font-medium mt-1">
                ₹{hourlyRate}/hr available
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}