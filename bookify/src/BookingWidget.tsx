import { useEffect, useState, useContext } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }: { place: any }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  // const { user } = useAuth();
  // const { user } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // async function bookThisPlace() {
  //     const response = await axios.post('/bookings', {
  //         checkIn, checkOut, numberOfGuests, name, phone,
  //         place:place._id,
  //         price:numberOfNights * place.price,
  //     });
  //     const bookingId = response.data._id;
  //     setRedirect(`/account/bookings/${bookingId}`);
  // }

  async function bookThisPlace() {
    // Validation: Check if all fields are filled
    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      alert("Please fill in all fields before booking.");
      return;
    }

    try {
      const response = await axios.post("/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking the place:", error);
      alert("An error occurred while booking. Please try again later.");
    }
  }

  function redirectToLogin() {
    setRedirect("/login");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check-in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check-out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests: </label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(Number(ev.target.value))}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone Number: </label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      {user ? (
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
          {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
        </button>
      ) : (
        <>
          <button onClick={() => setShowLoginPrompt(true)} className="primary mt-4">
            Book this place
            {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
          </button>
          
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-2xl max-w-md">
                <h2 className="text-xl font-semibold mb-4">Login Required</h2>
                <p className="mb-4">You need to login or register to book a place.</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRedirect('/login')}
                    className="primary"
                  >
                    Go to Login Page
                  </button>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-2xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
