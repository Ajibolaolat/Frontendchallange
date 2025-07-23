import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  User, 
  Tag, 
  ExternalLink,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

const NewsFeed = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const newsItems = [
    {
      id: 1,
      title: 'Q4 Results Exceed Expectations',
      summary: 'Company achieves record-breaking revenue growth of 35% year-over-year',
      content: 'We are thrilled to announce that our Q4 results have exceeded all expectations, with a remarkable 35% increase in revenue compared to the same period last year. This outstanding performance is a testament to the hard work and dedication of our entire team. Key highlights include the successful launch of three major product features, expansion into two new markets, and the onboarding of 50+ new enterprise clients. Our customer satisfaction scores have also reached an all-time high of 4.8/5. Looking ahead to 2024, we are well-positioned for continued growth and innovation.',
      date: '2024-01-10',
      author: 'CEO Office',
      category: 'Company News',
      isNew: true,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      id: 2,
      title: 'New Employee Recognition Program Launched',
      summary: 'Introducing peer-to-peer recognition system with quarterly awards',
      content: 'We are excited to introduce our new Employee Recognition Program, designed to celebrate the outstanding contributions of our team members. The program features a peer-to-peer recognition system where colleagues can nominate each other for various achievements. Quarterly awards will be presented in categories including Innovation Excellence, Team Collaboration, Customer Champion, and Leadership Impact. Each recognition comes with both monetary rewards and public acknowledgment. The program also includes a points-based system where accumulated recognitions can be redeemed for additional benefits. We believe this initiative will further strengthen our culture of appreciation and excellence.',
      date: '2024-01-08',
      author: 'HR Team',
      category: 'HR Updates',
      isNew: true,
      icon: Award,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      id: 3,
      title: 'Tech Infrastructure Upgrade Complete',
      summary: 'New cloud architecture delivers 50% faster performance and enhanced security',
      content: 'Our comprehensive technology infrastructure upgrade has been successfully completed, marking a significant milestone in our digital transformation journey. The new cloud-native architecture delivers 50% faster application performance, 99.99% uptime guarantee, and enterprise-grade security features. Key improvements include automated scaling capabilities, advanced monitoring and alerting systems, and enhanced data backup and recovery processes. The upgrade also introduces new collaboration tools and improved remote work capabilities. All systems have been thoroughly tested and are now fully operational. We expect this investment to support our growth for the next five years while providing our team with the best-in-class tools they need to excel.',
      date: '2024-01-05',
      author: 'IT Department',
      category: 'Technology',
      isNew: false,
      icon: Zap,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      id="announcements"
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
          Company News & Announcements
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Stay updated with the latest company news, achievements, and important announcements
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {newsItems.map((item, index) => (
          <motion.article
            key={item.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 ${item.bgColor}`}
          >
            {/* New Badge */}
            {item.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="absolute top-4 right-4 z-10"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white shadow-lg">
                  NEW
                </span>
              </motion.div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">
                    {item.summary}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {item.author}
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedItems.has(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border">
                      <p className="text-foreground leading-relaxed mb-4">
                        {item.content}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Read Full Article
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand/Collapse Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleExpanded(item.id)}
                className="mt-4 w-full flex items-center justify-center py-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {expandedItems.has(item.id) ? (
                  <>
                    Show Less
                    <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 pointer-events-none`} />
          </motion.article>
        ))}
      </div>

      {/* Load More Button */}
      <motion.div
        variants={itemVariants}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Load More News
          <ChevronDown className="w-5 h-5 ml-2" />
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default NewsFeed;

