import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Heart,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Employee Directory', href: '#directory' },
        { name: 'IT Support', href: '#support' },
        { name: 'HR Portal', href: '#hr' },
        { name: 'Learning Hub', href: '#learning' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Company Policies', href: '#policies' },
        { name: 'Benefits Guide', href: '#benefits' },
        { name: 'Training Materials', href: '#training' },
        { name: 'Safety Guidelines', href: '#safety' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact IT', href: '#contact-it' },
        { name: 'Submit Feedback', href: '#feedback' },
        { name: 'Report Issue', href: '#report' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#twitter', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#instagram', color: 'hover:text-pink-500' },
    { name: 'GitHub', icon: Github, href: '#github', color: 'hover:text-gray-600' },
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

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-card border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Apex World</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering teams through innovative technology and collaborative workspaces. 
              Building the future of work, one connection at a time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">support@apexworld.com</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin className="w-4 h-4 mr-3" />
                <span className="text-sm">123 Innovation Drive, Tech City, TC 12345</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-muted-foreground hover:text-foreground transition-all duration-200 text-sm flex items-center group"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Copyright and Links */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div className="flex items-center text-muted-foreground text-sm">
              <span>© {currentYear} Apex World. Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>by our amazing team</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <motion.a
                href="#privacy"
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                <Shield className="w-4 h-4 mr-1" />
                Privacy Policy
              </motion.a>
              <motion.a
                href="#terms"
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#accessibility"
                whileHover={{ scale: 1.05 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessibility
              </motion.a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg bg-accent hover:bg-accent/80 text-muted-foreground ${social.color} transition-all duration-200`}
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-border"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
              <Globe className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">
                Available in 15+ languages
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">
                SOC 2 Type II Certified
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <Heart className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">
                Trusted by 10,000+ employees
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Scroll to top"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↑
        </motion.div>
      </motion.button>
    </motion.footer>
  );
};

export default Footer;

