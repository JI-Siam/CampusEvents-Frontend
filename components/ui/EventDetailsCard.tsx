export default function EventDetailCard({ event }: { event: any }) {
  return (
    <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-12 gap-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h2 className="font-extrabold text-3xl font-serif text-green-950 text-center">
        {event.eventTitle}
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">Description</h3>
          <p className="text-gray-700 text-base">{event.eventDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-800">Date</h4>
            <p className="text-gray-700">{event.eventDate}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Location</h4>
            <p className="text-gray-700">{event.eventLocation}</p>
          </div>
        </div>

        {event.clubs && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Organized by
            </h3>
            <p className="font-medium text-gray-900">{event.clubs.clubName}</p>
            <p className="text-gray-600 text-sm">
              {event.clubs.clubDescription}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Established: {event.clubs.clubEstablishedYear}
            </p>
            <p className="text-gray-600 text-sm">
              Contact: {event.clubs.contactEmail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
