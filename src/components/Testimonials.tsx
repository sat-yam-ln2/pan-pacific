import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "I have received all goods. Everything is perfect. Thank you to all of the team for the work realized.",
    name: "Mr. Scepi Demory",
    title: "Import Director",
    company: "Demory Enterprises",
    location: "Paris, France",
    continent: "Europe"
  },
  {
    id: 2,
    quote: "The shipment has arrived safely. Thank you for all of your help and also for an excellent packing job!",
    name: "Mr. Damien Therrian",
    title: "Operations Manager",
    company: "Therrian Logistics",
    location: "Brussels, Belgium",
    continent: "Europe"
  },
  {
    id: 3,
    quote: "Pan Pacific has been instrumental in expanding our export business. Their expertise in customs clearance and timely deliveries is unmatched.",
    name: "Mr. Bikram Shrestha",
    title: "CEO",
    company: "Himalayan Exports Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    continent: "Asia"
  },
  {
    id: 4,
    quote: "Outstanding service from start to finish. They handled our complex DDU shipment with professionalism and efficiency.",
    name: "Ms. Sarah Mitchell",
    title: "Supply Chain Director",
    company: "Mitchell & Associates",
    location: "New York, USA",
    continent: "North America"
  },
  {
    id: 5,
    quote: "Reliable, professional, and always delivers on time. Pan Pacific is our trusted partner for all Asia-Pacific shipments.",
    name: "Mr. James Anderson",
    title: "Procurement Head",
    company: "Anderson Trading Co.",
    location: "Sydney, Australia",
    continent: "Australia"
  },
  {
    id: 6,
    quote: "Their break bulk cargo handling is exceptional. We've never experienced such smooth operations for oversized shipments.",
    name: "Mr. Kwame Osei",
    title: "Logistics Coordinator",
    company: "Osei International",
    location: "Lagos, Nigeria",
    continent: "Africa"
  },
  {
    id: 7,
    quote: "Pan Pacific transformed our global supply chain. Fast, efficient, and incredibly responsive to our needs.",
    name: "Ms. Maria Rodriguez",
    title: "International Trade Manager",
    company: "Rodriguez Import & Export",
    location: "São Paulo, Brazil",
    continent: "South America"
  },
  {
    id: 8,
    quote: "Working with Pan Pacific has been a game-changer for our business. Their air freight services are second to none.",
    name: "Mr. Rajesh Thapa",
    title: "Managing Director",
    company: "Thapa Global Solutions",
    location: "Pokhara, Nepal",
    continent: "Asia"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 bg-white">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl lg:text-6xl mb-6 text-[#1A1A1B]">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#1A1A1B]/60 font-mono tracking-wide">
            Real feedback from businesses we've helped grow globally
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-[#F5F7F8] p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#003893]/20"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-[#003893] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Testimonial Text */}
              <blockquote className="mb-8 text-[#1A1A1B]/80 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-[#003893]/10 pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-sm tracking-wider text-[#003893] mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#1A1A1B]/60 mb-1">
                      {testimonial.title}
                    </p>
                    <p className="text-xs text-[#1A1A1B]/60 mb-2">
                      {testimonial.company}
                    </p>
                    <p className="text-xs text-[#1A1A1B]/40 font-mono">
                      {testimonial.location}
                    </p>
                  </div>
                  
                  {/* Continent Badge */}
                  <div className="flex-shrink-0">
                    <span className="inline-block px-3 py-1 text-xs font-mono tracking-wider bg-[#003893]/5 text-[#003893] border border-[#003893]/20 group-hover:bg-[#003893] group-hover:text-white transition-all duration-500">
                      {testimonial.continent}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#DC143C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-[#003893]/20 to-transparent" />
      </div>
    </section>
  );
}
