import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  Calendar, 
  HelpCircle, 
  Settings, 
  BookOpen, 
  CreditCard, 
  Shield,
  Coffee,
  Headphones,
  Briefcase,
  Heart
} from 'lucide-react';

const ResourcesPanel = () => {
  const resources = [
    {
      id: 1,
      title: 'Leave Request',
      description: 'Submit and track your time off requests',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      hoverEffect: 'hover:shadow-blue-200 dark:hover:shadow-blue-900/50',
    },
    {
      id: 2,
      title: 'HR Documents',
      description: 'Access policies, forms, and guidelines',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      hoverEffect: 'hover:shadow-green-200 dark:hover:shadow-green-900/50',
    },
    {
      id: 3,
      title: 'IT Help Desk',
      description: 'Get technical support and assistance',
      icon: HelpCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      hoverEffect: 'hover:shadow-purple-200 dark:hover:shadow-purple-900/50',
    },
    {
      id: 4,
      title: 'Employee Directory',
      description: 'Find and connect with colleagues',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      hoverEffect: 'hover:shadow-orange-200 dark:hover:shadow-orange-900/50',
    },
    {
      id: 5,
      title: 'Learning Hub',
      description: 'Access training materials and courses',
      icon: BookOpen,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      hoverEffect: 'hover:shadow-pink-200 dark:hover:shadow-pink-900/50',
    },
    {
      id: 6,
      title: 'Expense Reports',
      description: 'Submit and manage expense claims',
      icon: CreditCard,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      hoverEffect: 'hover:shadow-teal-200 dark:hover:shadow-teal-900/50',
    },
    {
      id: 7,
      title: 'Security Center',
      description: 'Manage passwords and security settings',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      hoverEffect: 'hover:shadow-red-200 dark:hover:shadow-red-900/50',
    },
    {
      id: 8,
      title: 'System Settings',
      description: 'Configure your workspace preferences',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      hoverEffect: 'hover:shadow-gray-200 dark:hover:shadow-gray-900/50',
    },
    {
      id: 9,
      title: 'Break Room',
      description: 'Book meeting rooms and common areas',
      icon: Coffee,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      hoverEffect: 'hover:shadow-amber-200 dark:hover:shadow-amber-900/50',
    },
    {
      id: 10,
      title: 'Support Chat',
      description: 'Get instant help from our support team',
      icon: Headphones,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      hoverEffect: 'hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50',
    },
    {
      id: 11,
      title: 'Career Portal',
      description: 'Explore internal opportunities and growth',
      icon: Briefcase,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      hoverEffect: 'hover:shadow-cyan-200 dark:hover:shadow-cyan-900/50',
    },
    {
      id: 12,
      title: 'Wellness Hub',
      description: 'Access health and wellness resources',
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      hoverEffect: 'hover:shadow-rose-200 dark:hover:shadow-rose-900/50',
    },
  ];

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
          Quick Access
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Everything you need at your fingertips - from HR tools to IT support
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className={`group cursor-pointer p-6 rounded-2xl border border-border transition-all duration-300 hover:shadow-2xl ${resource.bgColor} ${resource.hoverEffect}`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon */}
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <resource.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {resource.description}
                </p>
              </div>

              {/* Hover Effect Indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className={`h-1 bg-gradient-to-r ${resource.color} rounded-full transition-all duration-300`}
              />
            </div>

            {/* Background Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.1 }}
              className={`absolute inset-0 bg-gradient-to-br ${resource.color} rounded-2xl -z-10`}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        {[
          { number: '24/7', label: 'Support Available', icon: Headphones },
          { number: '99.9%', label: 'System Uptime', icon: Shield },
          { number: '<2min', label: 'Average Response Time', icon: HelpCircle },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-card rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ResourcesPanel;

