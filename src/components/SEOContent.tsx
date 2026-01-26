import React from 'react';

/**
 * SEO Hidden Content Component
 * Uses sr-only (screen reader only) class to hide content visually
 * but keep it accessible to search engines and screen readers
 */
export function SEOContent() {
  return (
    <div className="sr-only" aria-hidden="true">
      {/* Primary Keywords H1 */}
      <h1>
        Pan Pacific Shipping & Logistics Services Pvt. Ltd. - Nepal's Premier International Freight Forwarder and Logistics Company
      </h1>

      {/* Company Description with Keywords */}
      <section>
        <h2>About Pan Pacific Shipping & Logistics Services</h2>
        <p>
          Pan Pacific Shipping & Logistics Services Pvt. Ltd. is Nepal's leading international freight forwarding company, established in 2011 in Kathmandu. With over 14 years of expertise in Himalayan transit logistics, we specialize in sea freight, air freight, break bulk cargo, and DDU/DDP logistics solutions. As a trusted logistics partner in Nepal, we provide comprehensive customs clearance, cargo insurance, warehousing, and door-to-door delivery services for businesses across the Kathmandu Valley and throughout Nepal.
        </p>
        <p>
          Our company operates from Thamel, Kathmandu, serving as the primary logistics hub for importers and exporters in Nepal. With PAN number 600633110, we are a fully licensed and registered freight forwarding company offering reliable international shipping solutions. Under the leadership of Managing Directors Tejman Tamang and Manoj Thapa, Pan Pacific has built a reputation for excellence in Nepal's logistics industry.
        </p>
      </section>

      {/* Service Keywords */}
      <section>
        <h2>Comprehensive Logistics and Freight Services in Nepal</h2>
        <p>
          Sea Freight Services Nepal: FCL Container Shipping, LCL Consolidation, Ocean Freight Forwarding, Maritime Logistics, Container Shipping Nepal, Import Sea Freight, Export Sea Freight, International Ocean Transport
        </p>
        <p>
          Air Freight Services Nepal: Express Air Cargo, International Air Freight, Air Cargo Forwarding, Expedited Shipping, Airport to Airport Service, Door to Airport Delivery, Priority Air Freight, Time-Critical Shipping
        </p>
        <p>
          Break Bulk Cargo Nepal: Heavy Machinery Transport, Oversized Cargo Handling, Project Cargo Logistics, Industrial Equipment Shipping, Non-Containerized Freight, Special Cargo Services
        </p>
        <p>
          Specialized Logistics: DDU Delivery (Delivered Duty Unpaid), DDP Delivery (Delivered Duty Paid), Customs Clearance Services, Import Documentation, Export Documentation, Cargo Insurance, Warehousing and Storage, Distribution Services, Supply Chain Management, Last Mile Delivery
        </p>
        <p>
          Additional Services: Freight Rate Quotes, Shipment Tracking, Cargo Consolidation, Packaging Services, Palletizing, Container Loading, Door to Door Service, Port Handling, Multimodal Transport
        </p>
      </section>

      {/* Geographic Targeting - Nepal Locations */}
      <section>
        <h2>Logistics Services Across Nepal</h2>
        <p>
          Kathmandu Valley: We provide comprehensive freight forwarding and logistics services throughout Kathmandu, Lalitpur, and Bhaktapur. Our main office in Thamel, Kathmandu serves as the central hub for all international shipping operations.
        </p>
        <p>
          Kathmandu Districts and Areas: Thamel, Lazimpat, Durbarmarg, New Baneshwor, Koteshwor, Kalanki, Balaju, Chabahil, Bouddha, Maharajgunj, Hattisar, Naxal, Tripureshwor, Kalimati, Swayambhu, Patan, Jawalakhel, Pulchowk, Sanepa, Kupondole, Ekantakuna, Bhaktapur, Thimi, Suryabinayak
        </p>
        <p>
          Major Cities in Nepal: Pokhara Logistics, Biratnagar Shipping, Birgunj Customs, Hetauda Freight, Butwal Transport, Nepalgunj Cargo, Dharan Logistics, Itahari Shipping, Bharatpur Freight, Janakpur Cargo Services
        </p>
        <p>
          Border Points and Customs: Birgunj-Raxaul Border Crossing, Kakarbhitta Customs, Nepalgunj Border, Mahendranagar Customs, Bhairahawa Border, Kodari-Tatopani Border, Rasuwagadhi Border
        </p>
        <p>
          Industrial Areas: Patan Industrial Estate, Balaju Industrial District, Hetauda Industrial Zone, Bhaktapur Industrial Area, Birgunj Industrial Corridor
        </p>
      </section>

      {/* Destination Keywords - International */}
      <section>
        <h2>International Shipping Destinations from Nepal</h2>
        
        <h3>Middle East Logistics from Nepal</h3>
        <p>
          UAE Shipping: Dubai Freight Services, Abu Dhabi Cargo, Sharjah Logistics, Ajman Shipping
        </p>
        <p>
          Qatar Shipping: Doha Freight Forwarding, Qatar Cargo Services
        </p>
        <p>
          Saudi Arabia: Riyadh Shipping, Jeddah Freight, Dammam Cargo
        </p>
        <p>
          Other Middle East: Kuwait Logistics, Bahrain Shipping, Oman Freight, Muscat Cargo
        </p>

        <h3>Far East and Asia Pacific Routes</h3>
        <p>
          China Shipping: Beijing Freight, Shanghai Logistics, Guangzhou Cargo, Shenzhen Shipping, Hong Kong Freight Forwarding
        </p>
        <p>
          Japan Logistics: Tokyo Shipping, Osaka Freight, Yokohama Cargo
        </p>
        <p>
          South Korea: Seoul Freight Services, Busan Shipping, Incheon Cargo
        </p>
        <p>
          Southeast Asia: Singapore Logistics, Malaysia Shipping, Thailand Freight, Bangkok Cargo, Vietnam Shipping, Indonesia Freight, Philippines Cargo, Taiwan Shipping
        </p>

        <h3>Europe Shipping Routes</h3>
        <p>
          Western Europe: UK Freight Services, London Shipping, Germany Logistics, Hamburg Cargo, Rotterdam Freight, France Shipping, Paris Cargo, Belgium Logistics, Antwerp Freight
        </p>
        <p>
          Southern Europe: Italy Shipping, Spain Freight, Portugal Cargo
        </p>
        <p>
          Northern Europe: Netherlands Logistics, Scandinavia Shipping, Denmark Freight, Sweden Cargo
        </p>

        <h3>United States and Americas</h3>
        <p>
          USA Freight: New York Shipping, Los Angeles Cargo, Chicago Freight, Houston Logistics, Miami Shipping, Seattle Cargo, San Francisco Freight
        </p>
        <p>
          Canada: Toronto Shipping, Vancouver Freight, Montreal Cargo
        </p>
        <p>
          Latin America: Mexico Freight, Brazil Shipping, South America Cargo
        </p>

        <h3>Australia and Oceania</h3>
        <p>
          Australia Shipping: Sydney Freight Services, Melbourne Logistics, Brisbane Cargo, Perth Shipping, Adelaide Freight
        </p>
        <p>
          New Zealand: Auckland Shipping, Wellington Freight
        </p>

        <h3>Indian Subcontinent</h3>
        <p>
          India Logistics: Delhi Freight, Mumbai Shipping, Kolkata Cargo, Chennai Logistics, Bangalore Freight, Hyderabad Shipping, Pune Cargo, ICD Tughlakabad, JNPT Port, Mundra Port
        </p>
        <p>
          Bangladesh: Dhaka Shipping, Chittagong Freight
        </p>
        <p>
          Pakistan: Karachi Logistics, Lahore Freight
        </p>
        <p>
          Sri Lanka: Colombo Shipping Services
        </p>
      </section>

      {/* Industry-Specific Keywords */}
      <section>
        <h2>Industry Solutions</h2>
        <p>
          Garment Export Logistics, Handicraft Shipping, Carpet Export Services, Tea and Coffee Export, Pashmina Shipping, Electronics Import, Machinery Import, Automobile Parts Logistics, Medical Equipment Shipping, Construction Material Import, FMCG Distribution, E-commerce Fulfillment, Pharmaceutical Logistics, Textile Industry Freight
        </p>
      </section>

      {/* Long-tail Keywords */}
      <section>
        <h2>Specialized Logistics Solutions</h2>
        <p>
          How to import goods to Nepal, Export from Nepal to USA, Cheapest sea freight to Nepal, Air freight rates Nepal, Container shipping cost Nepal, Customs clearance procedure Nepal, Import duty calculator Nepal, Freight forwarder Kathmandu, Logistics company near me, Door to door delivery Nepal, Track my shipment Nepal, Get shipping quote Nepal, International courier Nepal, Temperature controlled shipping, Dangerous goods transport, Perishable cargo handling
        </p>
      </section>

      {/* Certifications and Credentials */}
      <section>
        <h2>Licensed and Certified</h2>
        <p>
          Nepal Freight Forwarders Association Member, Registered with Department of Commerce Nepal, PAN Registered Company (600633110), Customs House Agent License, IATA Certified Air Cargo Agent, ISO Certified Logistics Provider, Bonded Warehouse Operator, Authorized Economic Operator
        </p>
      </section>
    </div>
  );
}
