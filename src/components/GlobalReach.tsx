import React from 'react';
import { motion } from 'motion/react';
import TiltedCard from './TiltedCard';

const regions = [
  { name: 'Middle East', coverage: 'Dubai, Qatar, Saudi Arabia', coordinates: '25.2048° N, 55.2708° E' },
  { name: 'Far East', coverage: 'China, Japan, Singapore, Hong Kong', coordinates: '31.2304° N, 121.4737° E' },
  { name: 'USA', coverage: 'West & East Coast Ports', coordinates: '40.7128° N, 74.0060° W' },
  { name: 'Europe', coverage: 'UK, Germany, Netherlands', coordinates: '52.5200° N, 13.4050° E' },
  { name: 'Australia', coverage: 'Sydney, Melbourne', coordinates: '33.8688° S, 151.2093° E' }
];

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1663103746090-2e4274c6c7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMHBvcnR8ZW58MXx8fHwxNzY4MzAwNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Container Port Operations'
  },
  {
    src: 'https://images.unsplash.com/photo-1663801563712-ebf3c6a78239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbnxlbnwxfHx8fDE3NjgyNzM4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Ocean Cargo Transport'
  },
  {
    src: 'https://images.unsplash.com/photo-1713846047266-12aa96cbbb6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBmcmVpZ2h0JTIwYWlycGxhbmV8ZW58MXx8fHwxNzY4MzkyNzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Air Freight Services'
  },
  {
    src: 'https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY4MjgzNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Warehouse Logistics'
  },
  {
    src: 'https://images.unsplash.com/photo-1759671934974-a4928e049dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVpZ2h0JTIwdHJ1Y2slMjB0cmFuc3BvcnR8ZW58MXx8fHwxNzY4MzkyNzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Freight Transportation'
  },
  {
    src: 'https://images.unsplash.com/photo-1712704341675-d75096a6666c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMHBvcnQlMjBjcmFuZXxlbnwxfHx8fDE3NjgzOTI3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Port Crane Operations'
  },
  {
    src: 'https://images.unsplash.com/photo-1758910076068-e503d97572bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMGZvcmtsaWZ0JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NjgzOTI3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Industrial Cargo Handling'
  },
  {
    src: 'https://images.unsplash.com/photo-1758777625576-09fc43631902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWluZXIlMjB5YXJkJTIwc2hpcHBpbmd8ZW58MXx8fHwxNzY4MzkyNzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Container Yard Management'
  },
  {
    src: 'https://images.unsplash.com/photo-1760662052295-f84068499a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBkZWxpdmVyeSUyMHRydWNrfGVufDF8fHx8MTc2ODM2NTg2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Delivery & Distribution'
  },
  {
    src: 'https://images.unsplash.com/photo-1703977883249-d959f2b0c1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMHZlc3NlbCUyMG1hcml0aW1lfGVufDF8fHx8MTc2ODM5MjcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Maritime Shipping'
  }
];

export function GlobalReach() {
  return (
    <section className="relative py-32 px-6 lg:px-20 bg-[#003893]">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-white opacity-20" />
            <span className="text-white text-sm tracking-[0.2em] uppercase font-mono opacity-40">
              Global Network
            </span>
            <div className="w-12 h-px bg-white opacity-20" />
          </div>
          <h2 className="text-4xl lg:text-6xl text-white tracking-tight" style={{ fontWeight: 700 }}>
            Connecting Nepal
            <br />
            <span className="opacity-40">To The World</span>
          </h2>
        </motion.div>

        {/* Regions Stack */}
        <div className="space-y-px">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#F5F7F8] hover:bg-white transition-all duration-500 cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 lg:p-12">
                <div className="flex items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-[#FFD700] group-hover:scale-150 transition-transform duration-500" />
                    <h3 className="text-3xl lg:text-4xl text-[#003893] tracking-tight" style={{ fontWeight: 700 }}>
                      {region.name}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <p className="text-[#1A1A1B] opacity-50">
                    {region.coverage}
                  </p>
                </div>
                
                <div className="flex items-center justify-start md:justify-end">
                  <span className="font-mono text-xs text-[#1A1A1B] opacity-30 tracking-wider">
                    {region.coordinates}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Himalayan Transit Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-5xl lg:text-7xl text-white tracking-tight mb-4" style={{ fontWeight: 700 }}>
              14
            </div>
            <div className="text-white opacity-60 tracking-[0.2em] uppercase font-mono text-sm">
              Years of Himalayan Transit Excellence
            </div>
          </div>

          {/* Tilted Cards Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TiltedCard
                  imageSrc={image.src}
                  altText={image.caption}
                  captionText={image.caption}
                  containerHeight="250px"
                  containerWidth="100%"
                  imageHeight="250px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.15}
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}