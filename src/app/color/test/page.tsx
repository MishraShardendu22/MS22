export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface border-b border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-lime-primary">MS</div>
          <div className="flex gap-8">
            <a href="#about" className="text-text-secondary hover:text-lime-primary transition">
              About
            </a>
            <a href="#work" className="text-text-secondary hover:text-lime-primary transition">
              Work
            </a>
            <a href="#contact" className="text-text-secondary hover:text-lime-primary transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-primary/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-foreground">I'm a Creative</span>
            <br />
            <span className="text-lime-primary">Developer & Designer</span>
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl mb-8">
            I craft beautiful digital experiences with attention to detail and a passion for clean code.
          </p>
          <button className="px-8 py-4 bg-lime-primary text-background font-semibold rounded-lg hover:bg-lime-hover transition-colors">
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8 bg-surface-elevated">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="h-80 bg-gradient-to-br from-blue-primary to-blue-active rounded-lg mb-6" />
            </div>
            <div>
              <p className="text-text-secondary mb-6 leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating responsive,
                user-centric digital products. My passion lies in bridging the gap between design and
                engineering to deliver exceptional user experiences.
              </p>
              <p className="text-text-secondary mb-8 leading-relaxed">
                I'm proficient in modern web technologies, always learning new tools, and dedicated to
                writing clean, maintainable code that scales.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lime-primary rounded-full" />
                  <span className="text-foreground">React & Next.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lime-primary rounded-full" />
                  <span className="text-foreground">TypeScript & JavaScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-lime-primary rounded-full" />
                  <span className="text-foreground">Tailwind CSS & Design Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-surface-elevated border border-border rounded-lg overflow-hidden hover:border-lime-primary transition group">
              <div className="h-64 bg-gradient-to-br from-blue-primary to-blue-hover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">E-Commerce Platform</h3>
                <p className="text-text-secondary mb-4 text-sm">
                  A full-featured e-commerce solution with real-time inventory management and payment
                  integration.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    React
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Node.js
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    PostgreSQL
                  </span>
                </div>
                <a href="#" className="text-lime-primary hover:text-lime-hover transition font-semibold text-sm">
                  View Project →
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-surface-elevated border border-border rounded-lg overflow-hidden hover:border-lime-primary transition group">
              <div className="h-64 bg-gradient-to-br from-lime-dark to-blue-primary" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Design System</h3>
                <p className="text-text-secondary mb-4 text-sm">
                  A comprehensive design system with 50+ components, documentation, and accessibility
                  guidelines.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Storybook
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    TypeScript
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Tailwind
                  </span>
                </div>
                <a href="#" className="text-lime-primary hover:text-lime-hover transition font-semibold text-sm">
                  View Project →
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-surface-elevated border border-border rounded-lg overflow-hidden hover:border-lime-primary transition group">
              <div className="h-64 bg-gradient-to-br from-red-accent to-blue-primary" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Analytics Dashboard</h3>
                <p className="text-text-secondary mb-4 text-sm">
                  Real-time analytics dashboard with interactive charts and data visualization.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Next.js
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Chart.js
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    API
                  </span>
                </div>
                <a href="#" className="text-lime-primary hover:text-lime-hover transition font-semibold text-sm">
                  View Project →
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-surface-elevated border border-border rounded-lg overflow-hidden hover:border-lime-primary transition group">
              <div className="h-64 bg-gradient-to-br from-success to-info" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Mobile App</h3>
                <p className="text-text-secondary mb-4 text-sm">
                  Native iOS/Android app with offline support and real-time synchronization.
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    React Native
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Firebase
                  </span>
                  <span className="text-xs bg-blue-primary text-lime-primary px-3 py-1 rounded">
                    Redux
                  </span>
                </div>
                <a href="#" className="text-lime-primary hover:text-lime-hover transition font-semibold text-sm">
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 bg-surface-elevated">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-lime-primary mb-2">50+</div>
              <p className="text-text-secondary">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-lime-primary mb-2">30+</div>
              <p className="text-text-secondary">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-lime-primary mb-2">5+</div>
              <p className="text-text-secondary">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-lime-primary mb-2">100%</div>
              <p className="text-text-secondary">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-primary/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Let's Work Together</h2>
          <p className="text-text-secondary text-lg mb-12">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-lime-primary text-background font-semibold rounded-lg hover:bg-lime-hover transition-colors">
              Get In Touch
            </button>
            <button className="px-8 py-4 bg-surface-elevated text-foreground font-semibold rounded-lg border border-border hover:border-lime-primary transition-colors">
              View Resume
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-text-secondary text-sm">
            © 2025 Shardendu Mishra. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-text-secondary hover:text-lime-primary transition">
              GitHub
            </a>
            <a href="#" className="text-text-secondary hover:text-lime-primary transition">
              LinkedIn
            </a>
            <a href="#" className="text-text-secondary hover:text-lime-primary transition">
              Twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Status Indicators Demo */}
      <div className="fixed bottom-8 right-8 space-y-3">
        <div className="flex items-center gap-2 bg-success/20 border border-success rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-success rounded-full" />
          <span className="text-success text-sm font-semibold">Online</span>
        </div>
        <div className="flex items-center gap-2 bg-warning/20 border border-warning rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-warning rounded-full" />
          <span className="text-warning text-sm font-semibold">Availability</span>
        </div>
      </div>
    </div>
  );
}
