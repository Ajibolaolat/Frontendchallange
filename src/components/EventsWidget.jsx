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
        avatar: 'data:image/jpeg;base64,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'
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

