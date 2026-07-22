const mongoose = require('mongoose');

const BrandTextSchema = new mongoose.Schema({
  heroEyebrow: {
    type: String,
    default: '❀ WELCOME TO ❀',
  },
  heroTitle: {
    type: String,
    default: 'VELVET VOWS',
  },
  heroSubtitle: {
    type: String,
    default: 'Your Dream Event planned with Love and Perfection',
  },
  homeAboutTitle: {
    type: String,
    default: 'Where Luxury Meets Tradition',
  },
  homeAboutTagline: {
    type: String,
    default: 'We design, plan and curate luxury experiences that blend the grandeur of legacy rituals with the smooth execution of modern timelines.',
  },
  homePhilosophyTitle: {
    type: String,
    default: 'Our Philosophy',
  },
  homePhilosophyDesc: {
    type: String,
    default: 'Every grand milestone celebration is a sacred narrative. Whether it is an elite corporate gala, a high-profile social anniversary, or a royal wedding, we ensure your story is told with the highest degree of grandeur, precision, and heartfelt emotion, allowing you to live every moment completely hassle-free.',
  },
  homeOfferingsTitle: {
    type: String,
    default: 'Premium Offerings',
  },
  homeOfferingsDesc: {
    type: String,
    default: 'From bespoke destination scouting, luxury floral layouts, sangeet stage management, and celebrity coordination, to custom traditional rituals, we curate every aspect with our dedicated team of hospitality professionals.',
  },
  aboutStoryTitle: {
    type: String,
    default: 'OUR STORY & VISION',
  },
  aboutStoryTagline: {
    type: String,
    default: 'Velvet Vows has defined luxury event planning by seamlessly executing traditional heritage integrated with modern grandeur.',
  },
  aboutPhilosophyTitle: {
    type: String,
    default: 'Our Philosophy',
  },
  aboutPhilosophyDesc: {
    type: String,
    default: 'We believe that a grand event is a sacred journey where families, friends, or organizations connect. Our task is to safeguard the sanctity of these moments by handling all administrative friction, vendor negotiation, travel logs, hotel checklists, stage setups, and decor timelines. We work in the background as silent directors so that you can live the happiest moments of your life fully.',
  },
  aboutSignatureTitle: {
    type: String,
    default: 'Signature Style',
  },
  aboutSignatureDesc: {
    type: String,
    default: 'Our signature aesthetic is characterized by timeless refinement, rich botanical layouts, golden lighting geometry, and curated traditional craftsmanship. We collaborate with India\'s finest floral designers, local artisans, celebrity decorators, and lighting designers to turn any space into a royal sanctuary.',
  },
  aboutExecutionTitle: {
    type: String,
    default: 'End-to-End Execution',
  },
  aboutExecutionDesc: {
    type: String,
    default: 'We manage everything from destination mapping, digital RSVP logs, catering consultations, VIP check-in logs, transport logistics, sound design, and final stage coordination. You can trust our team of dedicated event coordinators to run the event with absolute military precision.',
  },
  taglineTitle: {
    type: String,
    default: 'Ready to Begin Your Event Journey?',
  },
  taglineSubtitle: {
    type: String,
    default: 'Let\'s craft a celebration as unique and beautiful as your story.',
  }
}, { timestamps: true });

module.exports = mongoose.model('BrandText', BrandTextSchema);
