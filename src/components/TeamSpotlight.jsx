import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Coffee, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

const TeamSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      funFact: 'Can solve a Rubik\'s cube in under 2 minutes',
      achievement: 'Led the development of our new API architecture',
      avatar: 'data:image/jpeg;base64,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',
      color: 'from-blue-500 to-purple-600',
      icon: Award,
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'UX Design Lead',
      department: 'Design',
      funFact: 'Collects vintage vinyl records from the 80s',
      achievement: 'Redesigned our mobile app with 40% improved user engagement',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      color: 'from-green-500 to-teal-600',
      icon: Star,
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Marketing Director',
      department: 'Marketing',
      funFact: 'Has visited 35 countries and speaks 4 languages',
      achievement: 'Launched our most successful campaign with 200% ROI',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      color: 'from-pink-500 to-rose-600',
      icon: Heart,
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'DevOps Engineer',
      department: 'Infrastructure',
      funFact: 'Brews his own coffee and has 12 different brewing methods',
      achievement: 'Reduced deployment time by 75% with new CI/CD pipeline',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      color: 'from-orange-500 to-red-600',
      icon: Coffee,
    },
  ];

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
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
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: 90,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.section
      id="teams"
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
          Team Spotlight
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Celebrating the amazing people who make our company great
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="relative h-96 sm:h-80 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <div className={`h-full bg-gradient-to-br ${teamMembers[currentIndex].color} rounded-2xl overflow-hidden shadow-2xl`}>
                <div className="h-full flex flex-col sm:flex-row">
                  {/* Avatar Section */}
                  <div className="sm:w-1/3 flex items-center justify-center p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                        <img
                          src={teamMembers[currentIndex].avatar}
                          alt={teamMembers[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg"
                      >
                        {React.createElement(teamMembers[currentIndex].icon, { className: "w-6 h-6 text-gray-700" })}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="sm:w-2/3 p-8 text-white flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                        {teamMembers[currentIndex].name}
                      </h3>
                      <p className="text-lg opacity-90 mb-1">
                        {teamMembers[currentIndex].role}
                      </p>
                      <p className="text-sm opacity-75 mb-6">
                        {teamMembers[currentIndex].department}
                      </p>

                      <div className="space-y-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Star className="w-4 h-4 mr-2" />
                            Recent Achievement
                          </h4>
                          <p className="text-sm opacity-90">
                            {teamMembers[currentIndex].achievement}
                          </p>
                        </div>

                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Heart className="w-4 h-4 mr-2" />
                            Fun Fact
                          </h4>
                          <p className="text-sm opacity-90">
                            {teamMembers[currentIndex].funFact}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevMember}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg hover:bg-accent transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMember}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg hover:bg-accent transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {teamMembers.map((_, index) => (
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

        {/* Mini Cards Preview */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer p-4 rounded-xl transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card hover:bg-accent'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border-2 border-current opacity-75">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-sm">{member.name}</h4>
                <p className="text-xs opacity-75">{member.department}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TeamSpotlight;

