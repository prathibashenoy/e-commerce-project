// src/pages/AboutUs.jsx
const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"  style={{ fontFamily: "'Great Vibes', cursive" }}>
            About Pudava
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Pudava – The Saree House celebrates timeless tradition, elegance,
            and the beauty of Indian craftsmanship.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-semibold mb-4"  style={{ fontFamily: "'Great Vibes', cursive" }}>Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pudava was born from a deep love for Indian heritage and handwoven
            sarees. Every saree carries the story of skilled artisans and
            generations of craftsmanship.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We bring together tradition and modern elegance, making our sarees
            perfect for weddings, festivals, and everyday grace.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>What We Believe</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✨ Authentic handloom & premium quality</li>
            <li>✨ Ethical sourcing & artisan empowerment</li>
            <li>✨ Affordable luxury for every woman</li>
            <li>✨ Customer-first service & trust</li>
          </ul>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Why Choose Pudava?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected fabrics with superior craftsmanship and
                finishing.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Timeless Designs</h3>
              <p className="text-gray-600">
                Traditional and contemporary sarees designed to last.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Trusted by Women</h3>
              <p className="text-gray-600">
                Loved for authenticity, quality, and customer service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-red-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Showing you what your heart truly desires
          </h2>
          <p className="text-lg">
            Discover the elegance of tradition with Pudava – The Saree House.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
