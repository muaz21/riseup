import CourseraCarousel from '../CourseraCarousel';

export function CarouselDemoPage() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Coursera Carousel Demo</h1>
        <p className="text-gray-600 mb-8">This is a responsive carousel component that replicates the Coursera homepage design.</p>
      </div>
      <CourseraCarousel />
    </div>
  );
}