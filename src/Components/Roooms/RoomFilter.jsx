import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/Card";
import { Input } from "@/Components/UI/Input";
import { Label } from "@/Components/UI/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/UI/Select";
import { Slider } from "@/Components/UI/Slider";
import { MapPin, IndianRupee, Bed, Home } from "lucide-react";

export default function RoomFilters({ filters, setFilters }) {
  return (
    <Card className="sticky top-20 shadow-lg border-none">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-purple-50">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Home className="w-5 h-5 text-orange-500" />
          Filter Rooms
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label className="flex items-center gap-2 mb-2 font-medium">
            <MapPin className="w-4 h-4 text-gray-500" />
            City or Area
          </Label>
          <Input
            placeholder="Enter city name..."
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="border-gray-200"
          />
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-3 font-medium">
            <IndianRupee className="w-4 h-4 text-gray-500" />
            Monthly Rent Range
          </Label>
          <div className="px-2">
            <Slider
              min={0}
              max={50000}
              step={1000}
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={(value) =>
                setFilters({ ...filters, minPrice: value[0], maxPrice: value[1] })
              }
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.minPrice}</span>
              <span>₹{filters.maxPrice}</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2 font-medium">
            <Home className="w-4 h-4 text-gray-500" />
            Room Type
          </Label>
          <Select
            value={filters.roomType}
            onValueChange={(value) => setFilters({ ...filters, roomType: value })}
          >
            <SelectTrigger className="border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2 font-medium">
            <Bed className="w-4 h-4 text-gray-500" />
            Minimum Beds
          </Label>
          <Select
            value={filters.minBeds.toString()}
            onValueChange={(value) => setFilters({ ...filters, minBeds: parseInt(value) })}
          >
            <SelectTrigger className="border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+ Bed</SelectItem>
              <SelectItem value="2">2+ Beds</SelectItem>
              <SelectItem value="3">3+ Beds</SelectItem>
              <SelectItem value="4">4+ Beds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}