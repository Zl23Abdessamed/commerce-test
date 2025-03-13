"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { initialProducts } from './utils/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white text-center py-20">
        <div className="animate-pulse text-green-700 text-2xl font-bold">Loading...</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden flex flex-col">
      <main className="flex-grow">
        <EnhancedHero />
        <EnhancedAboutUs />
        <ProductShowcase />
        <TestimonialsSection />
        <HairCareGuide />
        <FeedbackSection />
      </main>
      <EnhancedFooter />
    </div>
  );
};


function EnhancedHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-500/70 z-10"></div>
        <Image width={1000}
                        height={1000}
          src="/api/placeholder/2000/1200"
          alt="Beautiful woman with healthy hair"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-left md:pr-12">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight"
          >
            Unlock Your Hair&apos;s <span className="text-yellow-300 italic">Natural Beauty</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white mb-8 max-w-xl"
          >
            Discover our premium collection of hair care products crafted with pure, natural ingredients.
            Each formula is designed to nourish, repair, and transform your hair for a radiant, healthy look.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">
              Shop Collection
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:w-1/2 mt-12 md:mt-0 hidden md:block"
        >
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-yellow-300 rounded-full opacity-20"></div>
            <Image width={1000}
                            height={1000}
              src="/api/placeholder/600/800"
              alt="Premium hair product"
              className="relative z-10 rounded-xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [0, 10, 0], opacity: 1 }}
          transition={{ y: { repeat: Infinity, duration: 2 }, opacity: { duration: 1, delay: 1 } }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

function EnhancedAboutUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-green-200 rounded-lg"></div>
              <Image width={1000}
                              height={1000}

                src="/api/placeholder/600/600"
                alt="Natural ingredients"
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 md:pl-16"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6 font-medium">
              Our Philosophy
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-6 leading-tight">
              Nature&apos;s Finest <br />For Your Hair
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mb-8"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Elevate store, we believe in the extraordinary power of nature&apos;s most precious ingredients.
              Our journey began with a simple mission: to create hair care products that work in harmony with
              your hair&apos;s natural chemistry.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We carefully select each ingredient for its proven benefits - from nourishing argan oil
              to soothing aloe vera. Our formulations are free from harsh chemicals, ensuring your hair
              receives only the purest care it deserves.
            </p>
            <div className="flex flex-row gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-800 mb-2">100%</div>
                <div className="text-sm text-gray-600">Natural Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-800 mb-2">0%</div>
                <div className="text-sm text-gray-600">Harmful Chemicals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-800 mb-2">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function ProductShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6 font-medium">
            Our Collection
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Transform Your Hair Routine
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our award-winning products designed to address every hair concern.
            From repair to hydration to volume, we&apos;ve got your hair needs covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <Image width={1000}
                height={1000}
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-800">{product.price}</span>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={"/products"} className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center">
            View All Products
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    {
      id: 1,
      text: "After trying countless products for my damaged hair, Elevate store's Repair Mask transformed my hair in just two weeks. It's now smoother, shinier, and so much more manageable!",
      author: "Sarah Johnson",
      role: "Hair Stylist",
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      text: "The Argan Oil Shampoo is a game-changer. My curls have never looked so defined and bouncy. Plus, it smells absolutely divine!",
      author: "Michael Chen",
      role: "Customer",
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      text: "As someone with sensitive skin, I appreciate that Elevate store's products are gentle yet effective. The Scalp Treatment relieved my irritation while giving my hair incredible volume.",
      author: "Emily Rodriguez",
      role: "Beauty Blogger",
      image: "/api/placeholder/100/100"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-green-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6 font-medium">
            Customer Love
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-6">
            Real Results from Real People
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <svg className="text-yellow-400 w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0H0v6c0 3.866 3.134 7 7 7h1v-2H7c-2.761 0-5-2.239-5-5V2h4V0zm14 0h-6v6c0 3.866 3.134 7 7 7h1v-2h-1c-2.761 0-5-2.239-5-5V2h4V0z"></path>
                </svg>
              </div>
              <p className="text-gray-700 mb-6 text-center italic">{testimonial.text}</p>
              <div className="flex items-center justify-center">
                <Image
                                height={1000}

                  width={1000}
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-green-900">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function HairCareGuide() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const tips = [
    {
      id: 1,
      title: "Wash Less, Condition More",
      text: "Over-washing can strip your hair of natural oils. Try to wash 2-3 times a week and use a high-quality conditioner.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: "Weekly Deep Treatment",
      text: "Use our Repair Mask once a week to deeply nourish and repair damage from heat styling and environmental factors.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Protect Before Heat",
      text: "Always apply a heat protectant before using hot tools. This creates a barrier that prevents moisture loss and damage.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
        </svg>
      )
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6 font-medium">
              Expert Hair Tips
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-6 leading-tight">
              Unlock the Secrets to <br />Gorgeous Hair
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mb-8"></div>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              Our experts have compiled their best advice for maintaining healthy,
              beautiful hair. Follow these simple tips to maximize the benefits of your
              Elevate store products.
            </p>

            <div className="space-y-8">
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  className="flex"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                >
                  <div className="flex-shrink-0 mr-4 text-green-700">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 text-green-800 font-semibold inline-flex items-center group"
            >
              Read our complete hair care guide
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-yellow-100 rounded-lg"></div>
              <Image
                width={1000}
                height={1000}
                src="/api/placeholder/600/800"
                alt="Woman with beautiful hair"
                className="relative z-10 rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function FeedbackSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-green-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <Image src="/api/placeholder/1920/1080" width={1000} height={1000} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Share Your Feedback with Us
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-lg text-green-100 mb-10 leading-relaxed">
            We value your opinions and ideas! Please let us know how we can improve or what
            you loved about our services. Your feedback helps us grow.
          </p>

          <motion.form
            className="flex flex-col gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <textarea
              placeholder="Your feedback..."
              className="flex-grow px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-green-900 h-32 resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-bold transition-colors"
            >
              Submit Feedback
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

function EnhancedFooter() {
  return (
    <footer className="bg-green-950 text-green-300">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Elevate store</h3>
            <p className="mb-6">
              Premium natural hair care products designed to bring out your hair&apos;s natural beauty.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhone className="mr-3" />
                <a href="tel:+18722821898" className="hover:text-white transition-colors">+18722821898</a>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-3" />
                <a href="mailto:elevatehair.shop@gmail.com" className="hover:text-white transition-colors">elevatehair.shop@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Feedback Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Feedback</h3>
            <p className="mb-6">
              Your feedback is valuable to us! Let us know how we can improve.
            </p>
            <form>
              <textarea
                className="w-full px-4 py-2 mb-4 bg-green-800 text-green-300 border border-green-600 rounded resize-none h-24"
                placeholder="Your feedback..."
              ></textarea>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-sm text-green-600 border-t border-green-800 pt-8">
          &copy; {new Date().getFullYear()} Elevate store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

