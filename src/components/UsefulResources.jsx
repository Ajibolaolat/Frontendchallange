import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Users,
  Calendar,
  Settings,
  HelpCircle,
  BookOpen,
  Shield,
  Coffee,
  MessageCircle,
  Briefcase,
  Heart,
  ExternalLink
} from 'lucide-react';

const UsefulResources = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const resources = [
    {
      id: 1,
      title: 'Employee Handbook',
      description: 'Complete guide to company policies, procedures, and benefits',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      category: 'Documentation',
      link: '#handbook',
      featured: true,
    },
    {
      id: 2,
      title: 'Learning Portal',
      description: 'Access training courses, certifications, and skill development',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      category: 'Education',
      link: '#learning',
      featured: true
    },
    {
      id: 3,
      title: 'IT Support Center',
      description: 'Technical assistance, software requests, and troubleshooting',
      icon: HelpCircle,
      color: 'from-green-500 to-green-600',
      category: 'Support',
      link: '#it-support',
      featured: false,
    },
    {
      id: 4,
      title: 'Employee Directory',
      description: 'Find contact information and organizational structure',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      category: 'Directory',
      link: '#directory',
      featured: false,
    },
    {
      id: 5,
      title: 'Meeting Rooms',
      description: 'Book conference rooms and check availability',
      icon: Calendar,
      color: 'from-teal-500 to-teal-600',
      category: 'Facilities',
      link: '#rooms',
      featured: false,
    },
    {
      id: 6,
      title: 'Security Center',
      description: 'Password management, VPN access, and security policies',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      category: 'Security',
      link: '#security',
      featured: true,
    },
    {
      id: 7,
      title: 'Wellness Hub',
      description: 'Health resources, mental wellness, and fitness programs',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      category: 'Wellness',
      link: '#wellness',
      featured: false,
    },
    {
      id: 8,
      title: 'Career Development',
      description: 'Internal job postings, career paths, and mentorship',
      icon: Briefcase,
      color: 'from-indigo-500 to-indigo-600',
      category: 'Career',
      link: '#career',
      featured: true,
    },
    {
      id: 9,
      title: 'Break Room Chat',
      description: 'Casual conversations and team social interactions',
      icon: Coffee,
      color: 'from-amber-500 to-amber-600',
      category: 'Social',
      link: '#chat',
      featured: false,
    },
    {
      id: 10,
      title: 'System Settings',
      description: 'Customize your workspace and notification preferences',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      category: 'Settings',
      link: '#settings',
      featured: false,
    },
    {
      id: 11,
      title: 'Support Chat',
      description: 'Live chat with HR and administrative support',
      icon: MessageCircle,
      color: 'from-cyan-500 to-cyan-600',
      category: 'Support',
      link: '#support-chat',
      featured: false,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, resources.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      id="resources"
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
          Useful Resources
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Quick access to essential tools, documentation, and services you need every day
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="relative"
      >
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                variants={cardVariants}
                className={`flex-shrink-0 px-3`}
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group cursor-pointer h-full"
                >
                  <div className={`bg-gradient-to-br ${resource.color} rounded-2xl p-6 h-full text-white relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}>
                    {/* Featured Badge */}
                    {resource.featured && (
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                        Featured
                      </div>
                    )}

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-grid-pattern"></div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4"
                      >
                        {React.createElement(resource.icon, { className: "w-6 h-6" })}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                        <p className="text-sm opacity-90 mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            {resource.category}
                          </span>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          Access Resource
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        {resources.length > itemsPerView && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg hover:bg-accent transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg hover:bg-accent transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </motion.button>
          </>
        )}

        {/* Dots Indicator */}
        {resources.length > itemsPerView && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
      >
        {[
          { label: 'Total Resources', value: resources.length, icon: FileText },
          { label: 'Categories', value: [...new Set(resources.map(r => r.category))].length, icon: Settings },
          { label: 'Featured', value: resources.filter(r => r.featured).length, icon: Heart },
          { label: 'Available 24/7', value: '100%', icon: Shield },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-4 text-center border border-border hover:bg-accent transition-colors"
          >
            <div className="flex justify-center mb-2">
              {React.createElement(stat.icon, { className: "w-6 h-6 text-primary" })}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default UsefulResources;

