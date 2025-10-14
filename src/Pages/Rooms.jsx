import React, { useState, useEffect, useCallback } from "react";
import { Room } from "@/Entities/Room";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import RoomFilters from "../Components/Roooms/RoomFilter";
import RoomCard from "../Components/Roooms/RoomCard";
import { Skeleton } from "@/Components/UI/Skeleton";
import { SearchX } from "lucide-react";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: "",
    minPrice: 0,
    maxPrice: 50000,
    roomType: "all",
    minBeds: 1
  });

  const loadRooms = async () => {
    try {
      const data = await Room.list("-created_date");
      setRooms(data.filter(room => room.is_available));
    } catch (error) {
      console.error("Error loading rooms:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRooms();
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    if (cityParam) {
      setFilters(prev => ({ ...prev, city: cityParam }));
    }
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...rooms];

    if (filters.city) {
      filtered = filtered.filter(room =>
        room.location?.city?.toLowerCase().includes(filters.city.toLowerCase()) ||
        room.location?.area?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    filtered = filtered.filter(room =>
      room.price_per_month >= filters.minPrice &&
      room.price_per_month <= filters.maxPrice
    );

    if (filters.roomType !== "all") {
      filtered = filtered.filter(room => room.room_type === filters.roomType);
    }

    filtered = filtered.filter(room => room.available_beds >= filters.minBeds);

    setFilteredRooms(filtered);
  }, [rooms, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Find Your Perfect Room</h1>
          <p className="text-lg opacity-90">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available for students
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <RoomFilters filters={filters} setFilters={setFilters} />
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search in a different area
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <Link key={room.id} to={createPageUrl(`RoomDetail?id=${room.id}`)}>
                    <RoomCard room={room} />
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}