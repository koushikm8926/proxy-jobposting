import React from 'react'
import {
  Laptop,
  BarChart3,
  Cog,
  Headphones,
  TrendingUp,
  Landmark,
  Heart,
  GraduationCap,
  Factory,
  Store,
  Plane,
  LayoutGrid
} from 'lucide-react'

interface JobCategoriesProps {
  onSelectCategory?: (category: string) => void
}

export const JobCategories: React.FC<JobCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    { name: 'IT & Software', icon: <Laptop size={24} /> },
    { name: 'Data & Analytics', icon: <BarChart3 size={24} /> },
    { name: 'Engineering', icon: <Cog size={24} /> },
    { name: 'BPO & Support', icon: <Headphones size={24} /> },
    { name: 'Sales & Marketing', icon: <TrendingUp size={24} /> },
    { name: 'Finance & Banking', icon: <Landmark size={24} /> },
    { name: 'Healthcare', icon: <Heart size={24} /> },
    { name: 'Education', icon: <GraduationCap size={24} /> },
    { name: 'Manufacturing', icon: <Factory size={24} /> },
    { name: 'Retail & Ecommerce', icon: <Store size={24} /> },
    { name: 'Hospitality & Travel', icon: <Plane size={24} /> },
    { name: 'More Categories', icon: <LayoutGrid size={24} /> },
  ]

  return (
    <section id="categories" className="categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-kicker">EXPLORE OPPORTUNITIES</span>
          <h2 className="section-title">Job Categories Across Industries</h2>
          <p className="section-subtitle">
            From IT to Healthcare, from Retail to Manufacturing — Proxy connects talent and opportunities across a wide range of industries.
          </p>
        </div>

        {/* 12-item Grid (6 cols x 2 rows on large screens) */}
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              className="category-card"
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
            >
              <div className="cat-icon-box">{cat.icon}</div>
              <span className="cat-name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .categories-section {
          padding: 80px 0;
          background-color: #ffffff;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        .category-card {
          background-color: #f9f9fb;
          border: 1px solid #f0f0f4;
          border-radius: 16px;
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 120px;
        }

        .category-card:hover {
          background-color: #ffffff;
          border-color: #d4d4d8;
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08);
        }

        .cat-icon-box {
          color: #0c0d0e;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .category-card:hover .cat-icon-box {
          transform: scale(1.15);
        }

        .cat-name {
          font-size: 13px;
          font-weight: 600;
          color: #18181b;
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        @media (max-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
