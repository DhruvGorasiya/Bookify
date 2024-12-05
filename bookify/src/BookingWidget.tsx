export default function BookingWidget({place}: {place: any}) {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl">
        <div className="flex">
          <div className="py-4 px-4 ">
            <label htmlFor="">Check-in</label>
            <input type="date" />
          </div>
          <div className=" py-4 px-4 border-l">
            <label htmlFor="">Check-out</label>
            <input type="date" />
          </div>
        </div>
        <div className=" py-4 px-4 border-t">
          <label htmlFor="">Number of Guests</label> <br />
          <input type="number" value={1} />
        </div>
      </div>

      <button className="primary mt-4">Book this place</button>
    </div>
  );
}
