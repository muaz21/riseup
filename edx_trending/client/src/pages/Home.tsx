import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";

const TABS = [
  "Executive Education",
  "Courses",
  "Certificates",
  "Master's Degrees",
  "Bachelor's Degrees",
];

const CATEGORIES = [
  "Featured",
  "Computer Science",
  "Business & Management",
  "Economics & Finance",
  "Data Analysis & Statistics",
  "Social Sciences",
  "Engineering",
  "Environmental Studies",
  "Humanities",
];

const COURSES = [
  {
    id: 1,
    title: "Foundations of Generative AI",
    institution: "The Georgia Institute of Technology",
    logo: "https://via.placeholder.com/60x60?text=Georgia+Tech",
    image: "https://via.placeholder.com/300x150?text=Generative+AI",
    duration: "3 weeks to complete",
    pace: "Self-paced",
    level: "Introductory",
    category: "Computer Science",
  },
  {
    id: 2,
    title: "Computing in Python III: Data Structures",
    institution: "The Georgia Institute of Technology",
    logo: "https://via.placeholder.com/60x60?text=Georgia+Tech",
    image: "https://via.placeholder.com/300x150?text=Python+Data",
    duration: "5 weeks to complete",
    pace: "Self-paced",
    level: "Introductory",
    category: "Computer Science",
  },
  {
    id: 3,
    title: "CS50's Introduction to Computer Science",
    institution: "Harvard University",
    logo: "https://via.placeholder.com/60x60?text=Harvard",
    image: "https://via.placeholder.com/300x150?text=CS50",
    duration: "3 months to complete",
    pace: "Self-paced",
    level: "Introductory",
    category: "Computer Science",
  },
  {
    id: 4,
    title: "Unlocking Investment and Finance in Emerging Markets",
    institution: "World Bank Group",
    logo: "https://via.placeholder.com/60x60?text=World+Bank",
    image: "https://via.placeholder.com/300x150?text=Investment",
    duration: "4 weeks to complete",
    pace: "Self-paced",
    level: "Introductory",
    category: "Economics & Finance",
  },
  {
    id: 5,
    title: "Machine Learning Fundamentals",
    institution: "Stanford University",
    logo: "https://via.placeholder.com/60x60?text=Stanford",
    image: "https://via.placeholder.com/300x150?text=ML",
    duration: "6 weeks to complete",
    pace: "Self-paced",
    level: "Intermediate",
    category: "Computer Science",
  },
  {
    id: 6,
    title: "Business Strategy and Management",
    institution: "MIT Sloan",
    logo: "https://via.placeholder.com/60x60?text=MIT",
    image: "https://via.placeholder.com/300x150?text=Business",
    duration: "8 weeks to complete",
    pace: "Instructor-paced",
    level: "Intermediate",
    category: "Business & Management",
  },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("Courses");
  const [selectedCategory, setSelectedCategory] = useState("Featured");
  const [scrollPosition, setScrollPosition] = useState(0);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "Featured") {
      return COURSES;
    }
    return COURSES.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategoryScroll = (direction: "left" | "right") => {
    const container = document.getElementById("category-scroll");
    if (container) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : scrollPosition + scrollAmount;
      container.scrollLeft = newPosition;
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">edX</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Trending</span>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Register
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Trending on edX
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "text-white bg-gray-700 rounded"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category Filter with Scroll */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleCategoryScroll("left")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div
              id="category-scroll"
              className="flex gap-2 overflow-x-auto scroll-smooth flex-1"
              style={{ scrollBehavior: "smooth" }}
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleCategoryScroll("right")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* Course Image */}
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs font-semibold">
                  Course
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                {/* Institution Logo and Name */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={course.logo}
                    alt={course.institution}
                    className="w-8 h-8 rounded"
                  />
                  <span className="text-xs text-gray-600 font-medium">
                    {course.institution}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {course.title}
                </h3>

                {/* Course Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.pace}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Enroll Button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-2 text-lg font-semibold border-2 border-gray-300"
          >
            View More Courses
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About edX
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Degrees
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Teach</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Become an Instructor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 edX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

