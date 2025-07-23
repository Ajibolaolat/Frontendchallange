import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  Target,
  Activity,
  Calendar,
  Award
} from 'lucide-react';

const ProductivitySnapshot = () => {
  const [animatedValues, setAnimatedValues] = useState({
    tasksCompleted: 0,
    activeUsers: 0,
    avgResponseTime: 0,
    goalCompletion: 0,
  });

  // Sample data for charts
  const weeklyData = [
    { name: 'Mon', tasks: 45, users: 120 },
    { name: 'Tue', tasks: 52, users: 135 },
    { name: 'Wed', tasks: 48, users: 128 },
    { name: 'Thu', tasks: 61, users: 142 },
    { name: 'Fri', tasks: 55, users: 138 },
    { name: 'Sat', tasks: 23, users: 45 },
    { name: 'Sun', tasks: 18, users: 32 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 35, color: '#3B82F6' },
    { name: 'Marketing', value: 25, color: '#10B981' },
    { name: 'Sales', value: 20, color: '#F59E0B' },
    { name: 'HR', value: 12, color: '#EF4444' },
    { name: 'Operations', value: 8, color: '#8B5CF6' },
  ];

  const performanceData = [
    { month: 'Jan', efficiency: 78, satisfaction: 85 },
    { month: 'Feb', efficiency: 82, satisfaction: 87 },
    { month: 'Mar', efficiency: 85, satisfaction: 89 },
    { month: 'Apr', efficiency: 88, satisfaction: 91 },
    { month: 'May', efficiency: 91, satisfaction: 93 },
    { month: 'Jun', efficiency: 94, satisfaction: 95 },
  ];

  // Animate numbers on mount
  useEffect(() => {
    const targets = {
      tasksCompleted: 1247,
      activeUsers: 342,
      avgResponseTime: 2.3,
      goalCompletion: 87,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        tasksCompleted: Math.floor(targets.tasksCompleted * easeOutQuart),
        activeUsers: Math.floor(targets.activeUsers * easeOutQuart),
        avgResponseTime: +(targets.avgResponseTime * easeOutQuart).toFixed(1),
        goalCompletion: Math.floor(targets.goalCompletion * easeOutQuart),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

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

  const stats = [
    {
      title: 'Tasks Completed',
      value: animatedValues.tasksCompleted,
      suffix: '',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Active Users',
      value: animatedValues.activeUsers,
      suffix: '',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+8%',
      changeType: 'positive',
    },
    {
      title: 'Avg Response Time',
      value: animatedValues.avgResponseTime,
      suffix: 'min',
      icon: Clock,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '-15%',
      changeType: 'positive',
    },
    {
      title: 'Goal Completion',
      value: animatedValues.goalCompletion,
      suffix: '%',
      icon: Target,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+5%',
      changeType: 'positive',
    },
  ];

  return (
    <motion.section
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
          Productivity Snapshot
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Real-time insights into team performance and organizational metrics
        </motion.p>
      </div>

      {/* Key Metrics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`p-6 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30' 
                  : 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Activity Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <Activity className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-semibold text-foreground">Weekly Activity</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          variants={itemVariants}
          className="bg-card rounded-2xl border border-border p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <Users className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-xl font-semibold text-foreground">Team Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Performance Trend */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-2xl border border-border p-6 shadow-lg"
      >
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-primary mr-3" />
          <h3 className="text-xl font-semibold text-foreground">Performance Trends</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="efficiency"
              stackId="1"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="satisfaction"
              stackId="2"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quick Insights */}
      <motion.div
        variants={itemVariants}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[
          {
            icon: Award,
            title: 'Top Performer',
            value: 'Engineering Team',
            description: 'Highest task completion rate this week',
            color: 'from-yellow-500 to-orange-600',
          },
          {
            icon: Calendar,
            title: 'Peak Hours',
            value: '10 AM - 2 PM',
            description: 'Most active collaboration period',
            color: 'from-blue-500 to-purple-600',
          },
          {
            icon: TrendingUp,
            title: 'Growth Rate',
            value: '+23%',
            description: 'Productivity increase this quarter',
            color: 'from-green-500 to-teal-600',
          },
        ].map((insight, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-2xl border border-border p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center shadow-lg mb-4`}>
              <insight.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-1">{insight.title}</h4>
            <div className="text-2xl font-bold text-primary mb-2">{insight.value}</div>
            <p className="text-sm text-muted-foreground">{insight.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProductivitySnapshot;

