"use client";

import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { homeData } from "../../data";

export default function BlogTeaser() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl text-[#0C0C0C] mb-12 text-center">
            {homeData.blog.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {homeData.blog.posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{post.date}</span>
                </div>

                <h3 className="text-2xl text-[#0C0C0C] mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-[#D4AF37] group-hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <a
              href={homeData.blog.buttonLink}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#D4AF37] text-[#0C0C0C] hover:bg-[#D4AF37] hover:text-white transition-all"
            >
              {homeData.blog.buttonText}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
