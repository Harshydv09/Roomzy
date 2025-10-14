import React, { useState, useCallback } from "react";
import { Booking } from "@/entities/Booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Users, IndianRupee } from "lucide-react";
import { format } from "date-fns";

export default function BookingForm({ room, user, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    check_in_date: "",
    check_out_date: "",
    booking_type: "monthly",
    number_of_people: 1,
    student_phone: user?.phone || "",
    special_requests: "",
    purpose: "exam"
  });
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const hourlyRate = Math.ceil(room.price_per_month / 720);

  const calculateCost = useCallback(() => {
    if (formData.check_in_date && formData.check_out_date) {
      const checkIn = new Date(formData.check_in_date);
      const checkOut = new Date(formData.check_out_date);
      
      if (formData.booking_type === 'hourly') {
        const hours = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60));
        if (hours > 0) {
          setTotalCost(hours * hourlyRate);
        }
      } else {
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const months = Math.ceil(days / 30);
        if (months > 0) {
          setTotalCost(months * room.price_per_month);
        }
      }
    }
  }, [formData.check_in_date, formData.check_out_date, formData.booking_type, room.price_per_month, hourlyRate]);

  React.useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Booking.create({
        ...formData,
        room_id: room.id,
        student_email: user.email,
        student_name: user.full_name,
        total_cost: totalCost,
        booking_status: "confirmed"
      });

      alert("Booking confirmed! You'll receive a confirmation email shortly.");
      onSuccess();
    } catch (error) {
      alert("Error creating booking. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      {room.hourly_stay_available && (
        <div>
          <Label className="mb-3 block font-medium">Booking Type</Label>
          <RadioGroup
            value={formData.booking_type}
            onValueChange={(value) => setFormData({ ...formData, booking_type: value })}
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="cursor-pointer flex-1">
                Monthly Booking (₹{room.price_per_month}/month)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly" className="cursor-pointer flex-1">
                Hourly Booking (₹{hourlyRate}/hour)
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div>
        <Label className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4" />
          {formData.booking_type === 'hourly' ? 'Start Date & Time' : 'Check-in Date'}
        </Label>
        <Input
          type={formData.booking_type === 'hourly' ? 'datetime-local' : 'date'}
          required
          min={format(new Date(), formData.booking_type === 'hourly' ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd')}
          value={formData.check_in_date}
          onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
        />
      </div>

      <div>
        <Label className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4" />
          {formData.booking_type === 'hourly' ? 'End Date & Time' : 'Check-out Date'}
        </Label>
        <Input
          type={formData.booking_type === 'hourly' ? 'datetime-local' : 'date'}
          required
          min={formData.check_in_date || format(new Date(), formData.booking_type === 'hourly' ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd')}
          value={formData.check_out_date}
          onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
        />
      </div>

      <div>
        <Label className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4" />
          Number of People
        </Label>
        <Select
          value={formData.number_of_people.toString()}
          onValueChange={(value) => setFormData({ ...formData, number_of_people: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[...Array(Math.min(room.available_beds, 4))].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1} {i === 0 ? 'Person' : 'People'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          required
          placeholder="Your contact number"
          value={formData.student_phone}
          onChange={(e) => setFormData({ ...formData, student_phone: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="purpose" className="mb-2 block">Purpose of Visit</Label>
        <Select
          value={formData.purpose}
          onValueChange={(value) => setFormData({ ...formData, purpose: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exam">Exam</SelectItem>
            <SelectItem value="college_visit">College Visit</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="requests" className="mb-2 block">Special Requests (Optional)</Label>
        <Textarea
          id="requests"
          placeholder="Any special requirements..."
          value={formData.special_requests}
          onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
          className="h-20"
        />
      </div>

      {totalCost > 0 && (
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between text-lg mb-2">
            <span className="font-medium">Total Cost:</span>
            <span className="flex items-center gap-1 font-bold text-orange-600 text-2xl">
              <IndianRupee className="w-5 h-5" />
              {totalCost}
            </span>
          </div>
          {formData.number_of_people > 1 && (
            <p className="text-sm text-gray-600">
              Cost per person: ₹{(totalCost / formData.number_of_people).toFixed(0)}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {formData.booking_type === 'hourly' ? 'Hourly booking' : 'Monthly booking'}
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          disabled={loading || !totalCost}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}