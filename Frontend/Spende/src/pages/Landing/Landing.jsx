import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  LuTrendingUp, 
  LuTrendingDown, 
  LuWallet, 
  LuTrendingUpDown,
  LuShield,
  LuSmartphone,
  LuDownload,
  LuCheck,
  LuArrowRight,
  LuZap,
  LuLock,
  LuCloud,
  LuLayoutDashboard,
  LuFileText,
  LuTarget,
  LuSparkles,
  LuRocket
} from 'react-icons/lu';
import logo from '../../assets/logo (2).png';

const Landing = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const createFloatingShapes = () => {
      const container = document.querySelector('.floating-shapes');
      if (!container) return;

      for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 5 + 's';
        shape.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(shape);
      }
    };

    createFloatingShapes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/8 to-primary/15 animate-pulse"></div>
        <div className="floating-shapes absolute inset-0"></div>
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/40 to-primary-dark/30 rounded-full blur-3xl animate-blob shadow-2xl shadow-primary/30"></div>
        <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary-dark/35 to-primary/40 rounded-full blur-3xl animate-blob animation-delay-2000 shadow-2xl shadow-primary-dark/30"></div>
        <div className="absolute -bottom-8 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/35 to-primary-dark/40 rounded-full blur-3xl animate-blob animation-delay-4000 shadow-2xl shadow-primary/30"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/35 rounded-full blur-3xl animate-blob animation-delay-1000 shadow-xl shadow-primary/25"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary-dark/35 rounded-full blur-3xl animate-blob animation-delay-3000 shadow-xl shadow-primary-dark/25"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-primary/30 rounded-full blur-2xl animate-blob animation-delay-5000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Spendee Logo" className="h-12 w-12 object-contain animate-bounce-slow" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                SPENDEE
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-primary transition-colors font-medium">Features</a>
              <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors font-medium">Benefits</a>
              <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors font-medium">Testimonials</a>
              <a href="#faq" className="text-gray-700 hover:text-primary transition-colors font-medium">FAQ</a>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary transition-colors font-medium hidden sm:block"
              >
                Sign In
              </Link>
              <Link 
                to="/signUp" 
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 font-semibold hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-8 animate-fade-in">
              <LuSparkles className="w-4 h-4 animate-spin-slow" />
              <span>Smart Expense Tracking Made Simple</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Take Control of Your
              <span className="block bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent animate-gradient">
                Financial Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
              Track income, manage expenses, and gain powerful insights into your spending habits. 
              Make smarter financial decisions with our intuitive expense tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay">
              <Link 
                to="/signUp" 
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:shadow-xl hover:shadow-primary/40 transition-all duration-200 font-semibold text-lg flex items-center gap-2 group hover:scale-105"
              >
                <LuRocket className="w-5 h-5" />
                Start Free Trial
                <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-primary hover:text-primary transition-all duration-200 font-semibold text-lg hover:scale-105"
              >
                View Demo
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6 animate-fade-in-delay-2">No credit card required • Free forever</p>
          </div>
        </div>
        
        {/* Hero Dashboard Preview with Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary-dark/30 to-primary/40 rounded-2xl blur-3xl transform rotate-3 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-primary-dark/30 to-primary/30 rounded-2xl blur-2xl transform -rotate-3 animate-pulse animation-delay-2000"></div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 relative transform hover:scale-[1.02] transition-transform duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-600 text-sm font-semibold">Total Balance</span>
                    <LuWallet className="w-6 h-6 text-blue-600 animate-pulse" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">$12,450</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-green-600 text-sm font-semibold">Total Income</span>
                    <LuTrendingUp className="w-6 h-6 text-green-600 animate-bounce" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">$15,200</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-red-600 text-sm font-semibold">Total Expenses</span>
                    <LuTrendingDown className="w-6 h-6 text-red-600 animate-pulse" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">$2,750</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop" 
                  alt="Financial Dashboard" 
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="h-48 flex items-center justify-center hidden">
                  <LuTrendingUpDown className="w-24 h-24 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="block bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Manage Your Finances
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you track, analyze, and optimize your spending habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={LuWallet}
              title="Real-Time Balance Tracking"
              description="See your total balance, income, and expenses at a glance. Get instant updates as you add transactions."
              color="from-blue-500 to-blue-600"
              image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuTrendingUp}
              title="Income Management"
              description="Track all your income sources in one place. Add, categorize, and analyze your earnings effortlessly."
              color="from-green-500 to-green-600"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuTrendingDown}
              title="Expense Tracking"
              description="Categorize expenses by type (Food, Transport, Shopping, etc.) and monitor your spending patterns."
              color="from-red-500 to-red-600"
              image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuTrendingUpDown}
              title="Interactive Charts"
              description="Visualize your financial data with beautiful pie charts, line graphs, and bar charts for better insights."
              color="from-purple-500 to-purple-600"
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuFileText}
              title="Excel Export"
              description="Download your income and expense data in Excel format for further analysis or record keeping."
              color="from-orange-500 to-orange-600"
              image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuSmartphone}
              title="Mobile Responsive"
              description="Access your financial data anywhere, anytime. Fully responsive design works perfectly on all devices."
              color="from-pink-500 to-pink-600"
              image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuShield}
              title="Secure & Private"
              description="Your financial data is encrypted and secure. We use industry-standard security practices to protect your information."
              color="from-indigo-500 to-indigo-600"
              image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuCloud}
              title="Cloud Sync"
              description="Your data is automatically synced across all your devices. Access your finances from anywhere."
              color="from-cyan-500 to-cyan-600"
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
            />
            <FeatureCard
              icon={LuLayoutDashboard}
              title="Financial Analytics"
              description="Get detailed insights into your spending habits with category breakdowns and trend analysis."
              color="from-teal-500 to-teal-600"
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section with Image */}
      <section id="benefits" className="py-24 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Spendee?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their finances
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <BenefitItem
                title="Save Time & Money"
                description="Automate your expense tracking and spend less time managing spreadsheets. Focus on what matters most."
                icon={LuZap}
              />
              <BenefitItem
                title="Make Better Decisions"
                description="Get insights into your spending patterns and identify areas where you can save money."
                icon={LuTarget}
              />
              <BenefitItem
                title="Stay Organized"
                description="Keep all your financial records in one place. Never lose track of an expense or income source again."
                icon={LuLock}
              />
              <BenefitItem
                title="Privacy First"
                description="Your data belongs to you. We never share your financial information with third parties."
                icon={LuShield}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-2xl transform rotate-3"></div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" 
                  alt="Financial Planning" 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <LuCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Free Forever</h3>
                      <p className="text-gray-600">No hidden fees, no subscriptions. All core features are completely free.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <LuCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Easy Setup</h3>
                      <p className="text-gray-600">Get started in minutes. No complex configuration or training required.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <LuCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">24/7 Access</h3>
                      <p className="text-gray-600">Access your financial data anytime, anywhere. Your dashboard is always available.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <LuCheck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Export & Backup</h3>
                      <p className="text-gray-600">Download your data anytime in Excel format. Your data, your control.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about Spendee
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Freelance Designer"
              content="Spendee has completely transformed how I track my finances. The visualizations are beautiful and the interface is so intuitive. I can't imagine managing my expenses without it!"
              rating={5}
              image="https://i.pravatar.cc/150?img=47"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Small Business Owner"
              content="As a business owner, I need to track both personal and business expenses. Spendee makes it so easy to categorize and analyze everything. The Excel export feature is a lifesaver!"
              rating={5}
              image="https://i.pravatar.cc/150?img=12"
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Student"
              content="Being a student on a budget, Spendee helps me see exactly where my money goes. The category breakdowns help me identify areas where I can save. Highly recommend!"
              rating={5}
              image="https://i.pravatar.cc/150?img=33"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 to-white relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Spendee
            </p>
          </div>

          <div className="space-y-6">
            <FAQItem
              question="Is Spendee really free?"
              answer="Yes! Spendee is completely free to use. All core features including income tracking, expense management, charts, and Excel exports are available at no cost. We believe everyone should have access to powerful financial tools."
            />
            <FAQItem
              question="How secure is my financial data?"
              answer="Your security is our top priority. We use industry-standard encryption, secure authentication with JWT tokens, and follow best practices for data protection. Your financial information is never shared with third parties."
            />
            <FAQItem
              question="Can I export my data?"
              answer="Absolutely! You can export both your income and expense data to Excel format at any time. This allows you to keep backups, perform additional analysis, or migrate your data if needed."
            />
            <FAQItem
              question="Does Spendee work on mobile devices?"
              answer="Yes! Spendee is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can access your financial dashboard from anywhere with an internet connection."
            />
            <FAQItem
              question="How do I get started?"
              answer="Getting started is easy! Simply click 'Get Started' to create a free account. You'll be up and running in less than a minute. No credit card required."
            />
            <FAQItem
              question="Can I track multiple income sources?"
              answer="Yes! You can add unlimited income sources and track them separately. This is perfect for freelancers, multiple jobs, or any situation where you have various income streams."
            />
            <FAQItem
              question="What expense categories are available?"
              answer="We provide categories like Food, Transport, Shopping, Bills, Entertainment, Healthcare, Education, and Other. You can use these to organize and analyze your spending patterns."
            />
            <FAQItem
              question="Is my data backed up?"
              answer="Yes, your data is automatically stored securely in our database. We recommend exporting your data periodically as an additional backup measure."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=600&fit=crop')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are already managing their expenses smarter with Spendee. 
            Get started in less than a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signUp" 
              className="px-8 py-4 bg-white text-primary rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 group hover:scale-105"
            >
              <LuRocket className="w-5 h-5" />
              Create Free Account
              <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all duration-200 font-semibold text-lg hover:scale-105"
            >
              Sign In
            </Link>
          </div>
          <p className="text-white/80 text-sm mt-6">No credit card required • Free forever • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Spendee Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold text-white">SPENDEE</span>
              </div>
              <p className="text-sm text-gray-400">
                Smart expense tracking made simple. Take control of your financial future.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#benefits" className="hover:text-primary transition-colors">Benefits</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Spendee. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        .floating-shape {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.35));
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2);
          animation: float 15s infinite ease-in-out;
          border: 2px solid rgba(16, 185, 129, 0.2);
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, image }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-primary/50 group overflow-hidden">
      <div className={`bg-gradient-to-br ${color} p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <img 
        src={image} 
        alt={title}
        className="w-full h-32 object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, content, rating, image }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <img 
          src={image} 
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.target.src = 'https://ui-avatars.com/api/?name=' + name + '&background=10b981&color=fff';
          }}
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className={`text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
};

export default Landing;
