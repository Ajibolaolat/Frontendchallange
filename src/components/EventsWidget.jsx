import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Eye,
  X,
  Plus,
  UserCheck,
  UserX,
  Timer,
  User,
  ExternalLink,
  Download,
  Star
} from 'lucide-react';

const EventsWidget = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState({});
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'grid'

  const events = [
    {
      id: 1,
      title: 'Q4 All-Hands Meeting',
      date: '2024-01-15',
      time: '10:00 AM',
      endTime: '12:00 PM',
      location: 'Main Conference Room',
      attendees: 150,
      maxAttendees: 200,
      category: 'company',
      description: 'Join us for our quarterly company update and strategic planning session. We\'ll cover Q4 achievements, upcoming initiatives, and answer your questions.',
      color: 'from-blue-500 to-blue-600',
      rating: 4.8,
      reviewCount: 45,
      speaker: {
        name: 'Sarah Johnson',
        role: 'CEO',
        avatar: 'data:image/jpeg;base64,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'
      },
      agenda: ['Q4 Review', 'Strategic Planning', 'Q&A Session'],
      tags: ['mandatory', 'quarterly'],
      backgroundImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Tech Innovation Workshop',
      date: '2024-01-18',
      time: '2:00 PM',
      endTime: '5:00 PM',
      location: 'Innovation Lab',
      attendees: 25,
      maxAttendees: 30,
      category: 'tech',
      description: 'Explore cutting-edge technologies and their applications in our industry. Hands-on sessions with AI, blockchain, and IoT.',
      color: 'from-purple-500 to-purple-600',
      rating: 4.6,
      reviewCount: 28,
      speaker: {
        name: 'Dr. Alex Chen',
        role: 'CTO',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      agenda: ['AI Trends', 'Blockchain Applications', 'IoT Implementation'],
      tags: ['technical', 'hands-on'],
      backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Team Building Retreat',
      date: '2024-01-22',
      time: '9:00 AM',
      endTime: '6:00 PM',
      location: 'Mountain View Resort',
      attendees: 75,
      maxAttendees: 100,
      category: 'social',
      description: 'A day of fun activities and team bonding exercises. Includes outdoor activities, team challenges, and a BBQ lunch.',
      color: 'from-green-500 to-green-600',
      rating: 4.9,
      reviewCount: 67,
      speaker: {
        name: 'Maria Rodriguez',
        role: 'HR Director',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      agenda: ['Icebreaker Games', 'Team Challenges', 'BBQ & Networking'],
      tags: ['team-building', 'outdoor'],
      backgroundImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Product Launch Event',
      date: '2024-01-25',
      time: '3:00 PM',
      endTime: '5:30 PM',
      location: 'Auditorium',
      attendees: 200,
      maxAttendees: 250,
      category: 'product',
      description: 'Celebrating the launch of our latest product innovation. Live demos, customer testimonials, and networking reception.',
      color: 'from-orange-500 to-orange-600',
      rating: 4.7,
      reviewCount: 89,
      speaker: {
        name: 'David Kim',
        role: 'Product Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      agenda: ['Product Demo', 'Customer Stories', 'Networking Reception'],
      tags: ['launch', 'networking'],
      backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Wellness Wednesday Workshop',
      date: '2024-01-17',
      time: '12:00 PM',
      endTime: '1:00 PM',
      location: 'Wellness Center',
      attendees: 40,
      maxAttendees: 50,
      category: 'wellness',
      description: 'Monthly wellness session focusing on stress management and work-life balance techniques.',
      color: 'from-pink-500 to-pink-600',
      rating: 4.5,
      reviewCount: 32,
      speaker: {
        name: 'Dr. Emily Watson',
        role: 'Wellness Coach',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
      },
      agenda: ['Stress Management', 'Mindfulness Techniques', 'Q&A'],
      tags: ['wellness', 'monthly'],
      backgroundImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Events', count: events.length },
    { value: 'company', label: 'Company', count: events.filter(e => e.category === 'company').length },
    { value: 'tech', label: 'Technology', count: events.filter(e => e.category === 'tech').length },
    { value: 'social', label: 'Social', count: events.filter(e => e.category === 'social').length },
    { value: 'product', label: 'Product', count: events.filter(e => e.category === 'product').length },
    { value: 'wellness', label: 'Wellness', count: events.filter(e => e.category === 'wellness').length },
  ];

  // Filter events
  const filteredEvents = filter === 'all' ? events : events.filter(event => event.category === filter);

  // Calculate countdown
  const getCountdown = (eventDate, eventTime) => {
    const eventDateTime = new Date(`${eventDate} ${eventTime}`);
    const now = new Date();
    const diff = eventDateTime - now;
    
    if (diff <= 0) return 'Event started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length);
  };

  const handleRSVP = (eventId, status) => {
    setRsvpStatus(prev => ({ ...prev, [eventId]: status }));
  };

  const addToCalendar = (event) => {
    const startDate = new Date(`${event.date} ${event.time}`);
    const endDate = new Date(`${event.date} ${event.endTime}`);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      id="events"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
        >
          Upcoming Events
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Stay connected with company events, workshops, and team activities
        </motion.p>
      </div>

      {/* Controls */}
      <motion.div
        variants={itemVariants}
        className="mb-8 space-y-4"
      >
        {/* View Mode Toggle and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="view-mode-buttons flex gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('carousel')}
              className={`view-mode-button px-6 py-3 transition-all duration-200 ${
                viewMode === 'carousel' ? 'active' : ''
              }`}
            >
              Carousel View
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`view-mode-button px-6 py-3 transition-all duration-200 ${
                viewMode === 'grid' ? 'active' : ''
              }`}
            >
              Grid View
            </motion.button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setFilter(category.value);
                setCurrentSlide(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === category.value
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {category.label} ({category.count})
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Events Display */}
      {viewMode === 'carousel' ? (
        /* New Carousel View - Inspired by the provided image */
        <motion.div
          variants={itemVariants}
          className="relative max-w-6xl mx-auto"
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                {filteredEvents.length > 0 && (
                  <div className="relative">
                    {/* Main Event Card */}
                    <div className="bg-card/80 backdrop-blur-lg border border-border rounded-3xl p-8 shadow-2xl">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-grid-pattern"></div>
                      </div>

                      <div className="relative z-10">
                        {/* Header with Rating */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-2">
                            {renderStars(filteredEvents[currentSlide].rating)}
                            <span className="text-sm text-muted-foreground ml-2">
                              {filteredEvents[currentSlide].rating}/5
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Timer className="w-4 h-4" />
                            <span>{getCountdown(filteredEvents[currentSlide].date, filteredEvents[currentSlide].time)}</span>
                          </div>
                        </div>

                        {/* Event Title */}
                        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                          {filteredEvents[currentSlide].title}
                        </h3>

                        {/* Rating and Reviews */}
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="flex items-center space-x-2">
                            {renderStars(filteredEvents[currentSlide].rating)}
                            <span className="text-lg font-semibold text-foreground">
                              {filteredEvents[currentSlide].rating}/5
                            </span>
                          </div>
                          <span className="text-muted-foreground">
                            | {filteredEvents[currentSlide].reviewCount} reviews
                          </span>
                        </div>

                        {/* Description Quote */}
                        <blockquote className="text-xl text-muted-foreground italic mb-8 max-w-3xl">
                          "{filteredEvents[currentSlide].description}"
                        </blockquote>

                        {/* Event Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                          <div className="bg-accent/50 rounded-xl p-4 text-center">
                            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="text-sm text-muted-foreground">Date</div>
                            <div className="font-semibold">
                              {new Date(filteredEvents[currentSlide].date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                          <div className="bg-accent/50 rounded-xl p-4 text-center">
                            <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="text-sm text-muted-foreground">Time</div>
                            <div className="font-semibold">{filteredEvents[currentSlide].time}</div>
                          </div>
                          <div className="bg-accent/50 rounded-xl p-4 text-center">
                            <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="text-sm text-muted-foreground">Location</div>
                            <div className="font-semibold text-sm">{filteredEvents[currentSlide].location}</div>
                          </div>
                          <div className="bg-accent/50 rounded-xl p-4 text-center">
                            <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="text-sm text-muted-foreground">Attendees</div>
                            <div className="font-semibold">
                              {filteredEvents[currentSlide].attendees}/{filteredEvents[currentSlide].maxAttendees}
                            </div>
                          </div>
                        </div>

                        {/* Speaker Info */}
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center space-x-4">
                            <img
                              src={filteredEvents[currentSlide].speaker.avatar}
                              alt={filteredEvents[currentSlide].speaker.name}
                              className="w-16 h-16 rounded-full border-2 border-primary"
                            />
                            <div>
                              <h4 className="text-lg font-semibold text-foreground">
                                {filteredEvents[currentSlide].speaker.name}
                              </h4>
                              <p className="text-muted-foreground">{filteredEvents[currentSlide].speaker.role}</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedEvent(filteredEvents[currentSlide])}
                              className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => addToCalendar(filteredEvents[currentSlide])}
                              className="flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-accent transition-colors"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add to Calendar
                            </motion.button>
                          </div>
                        </div>

                        {/* RSVP Section */}
                        <div className="flex items-center justify-center space-x-4">
                          {rsvpStatus[filteredEvents[currentSlide].id] ? (
                            <div className="flex items-center px-6 py-3 bg-accent rounded-xl">
                              {rsvpStatus[filteredEvents[currentSlide].id] === 'yes' ? (
                                <>
                                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                                  <span className="font-semibold">You're attending this event</span>
                                </>
                              ) : (
                                <>
                                  <UserX className="w-5 h-5 mr-2 text-red-600" />
                                  <span className="font-semibold">You're not attending</span>
                                </>
                              )}
                            </div>
                          ) : (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRSVP(filteredEvents[currentSlide].id, 'yes')}
                                className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg"
                              >
                                <UserCheck className="w-5 h-5 mr-2" />
                                RSVP Yes
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleRSVP(filteredEvents[currentSlide].id, 'no')}
                                className="flex items-center px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-lg"
                              >
                                <UserX className="w-5 h-5 mr-2" />
                                Can't Attend
                              </motion.button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {filteredEvents.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-4 shadow-lg hover:bg-accent transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-4 shadow-lg hover:bg-accent transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </motion.button>
            </>
          )}

          {/* Dots Indicator */}
          {filteredEvents.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {filteredEvents.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-primary scale-125 shadow-lg'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        /* Grid View */
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Background Image */}
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${event.backgroundImage})` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-80`}></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-semibold">
                  {getCountdown(event.date, event.time)}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(event.rating).slice(0, 5)}
                    <span className="text-sm ml-2">{event.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees}/{event.maxAttendees}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </motion.button>
                  <div className="flex gap-1">
                    {event.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="relative h-64 bg-cover bg-center rounded-t-2xl"
                style={{ backgroundImage: `url(${selectedEvent.backgroundImage})` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedEvent.color} opacity-90 rounded-t-2xl`}></div>
                <div className="absolute top-4 right-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedEvent(null)}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedEvent.tags.map((tag, index) => (
                      <span key={index} className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-2">
                    {renderStars(selectedEvent.rating)}
                    <span className="text-lg">{selectedEvent.rating}/5</span>
                    <span className="opacity-75">({selectedEvent.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-primary" />
                        <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-primary" />
                        <span>{selectedEvent.time} - {selectedEvent.endTime}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-primary" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-3 text-primary" />
                        <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees} attendees</span>
                      </div>
                      <div className="flex items-center">
                        <Timer className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-semibold">
                          {getCountdown(selectedEvent.date, selectedEvent.time)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Speaker</h3>
                    <div className="flex items-center mb-4">
                      <img
                        src={selectedEvent.speaker.avatar}
                        alt={selectedEvent.speaker.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-lg">{selectedEvent.speaker.name}</h4>
                        <p className="text-muted-foreground">{selectedEvent.speaker.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Agenda</h3>
                  <ul className="space-y-2">
                    {selectedEvent.agenda.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {rsvpStatus[selectedEvent.id] ? (
                    <div className="flex items-center px-4 py-2 bg-secondary rounded-lg">
                      {rsvpStatus[selectedEvent.id] === 'yes' ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-2 text-green-600" />
                          <span>You're attending</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4 mr-2 text-red-600" />
                          <span>You're not attending</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRSVP(selectedEvent.id, 'yes')}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        RSVP Yes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRSVP(selectedEvent.id, 'no')}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Can't Attend
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCalendar(selectedEvent)}
                    className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Share Event
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default EventsWidget;

