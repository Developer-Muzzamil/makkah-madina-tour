import React, { useEffect, useState } from 'react';
import GuideCard, { GuideGrid } from './GuideCard';
import BookGuideModal from './BookGuideModal';

const API_BASE = import.meta.env.VITE_API_URL;

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/guides/list`)
      .then(res => res.json())
      .then(data => {
        setGuides(data);
        setFilteredGuides(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch guides:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let data = [...guides];
    if (search) {
      data = data.filter(g =>
        g.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (locationFilter) {
      data = data.filter(g =>
        (g.location || "").toLowerCase() === locationFilter.toLowerCase()
      );
    }
    if (availabilityFilter) {
      data = data.filter(g =>
        (g.availability || "").toLowerCase() === availabilityFilter.toLowerCase()
      );
    }
    setFilteredGuides(data);
  }, [search, locationFilter, availabilityFilter, guides]);

  const handleBookNow = (guide) => {
    setSelectedGuide(guide);
    setShowModal(true);
  };

  // For filter dropdowns
  const locations = Array.from(new Set(guides.map(g => g.location).filter(Boolean)));
  const availabilities = Array.from(new Set(guides.map(g => g.availability).filter(Boolean)));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold text-yellow-700 mb-7 text-center drop-shadow">Available Guides</h2>
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-8 items-center justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 rounded-xl border border-yellow-200 shadow bg-white/80 focus:ring-2 focus:ring-yellow-400 w-full md:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-yellow-200 shadow bg-white/80 focus:ring-2 focus:ring-yellow-400 w-full md:w-48"
        >
          <option value="">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select
          value={availabilityFilter}
          onChange={e => setAvailabilityFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-yellow-200 shadow bg-white/80 focus:ring-2 focus:ring-yellow-400 w-full md:w-48"
        >
          <option value="">All Availability</option>
          {availabilities.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          {/* Simple loader spinner */}
          <svg className="animate-spin h-10 w-10 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-40" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
          </svg>
        </div>
      ) : filteredGuides.length === 0 ? (
        <div className="text-center text-lg text-yellow-800 mt-16">
          No guides found matching your search.
        </div>
      ) : (
        <GuideGrid guides={filteredGuides} onBookNow={handleBookNow} />
      )}
      {showModal && selectedGuide && (
        <BookGuideModal
          guide={selectedGuide}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default GuideList;