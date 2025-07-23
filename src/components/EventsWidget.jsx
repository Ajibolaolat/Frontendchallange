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
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
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

