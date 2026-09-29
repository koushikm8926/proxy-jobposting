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
  const iconProps = {
    size: 28,
    strokeWidth: 2.75,
    color: '#0c0d0e'
  }

  const categories = [
    { name: 'IT & Software', icon: <Laptop {...iconProps} /> },
    { name: 'Data & Analytics', icon: <BarChart3 {...iconProps} /> },
    { name: 'Engineering', icon: <Cog {...iconProps} /> },
    { name: 'BPO & Support', icon: <Headphones {...iconProps} /> },
    { name: 'Sales & Marketing', icon: <TrendingUp {...iconProps} /> },
    { name: 'Finance & Banking', icon: <Landmark {...iconProps} /> },
    { name: 'Healthcare', icon: <Heart {...iconProps} /> },
    { name: 'Education', icon: <GraduationCap {...iconProps} /> },
    { name: 'Manufacturing', icon: <Factory {...iconProps} /> },
    { name: 'Retail & Ecommerce', icon: <Store {...iconProps} /> },
    { name: 'Hospitality & Travel', icon: <Plane {...iconProps} /> },
    { name: 'More Categories', icon: <LayoutGrid {...iconProps} /> },
  ]

  return (
    <section id="categories" className="categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="section-kicker" style={{ color: '#52525b', letterSpacing: '0.18em', fontWeight: 800 }}>
            EXPLORE OPPORTUNITIES
          </span>
          <h2 className="categories-main-title">
            Job Categories Across Industries
          </h2>
          <p className="categories-main-subtitle">
            From IT to Healthcare, from Retail to Manufacturing — Proxy connects talent and opportunities across a wide range of industries.
          </p>
        </div>

        {/* 12-item Grid (6 cols x 2 rows on desktop) */}
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              className="category-card-bold"
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
          padding: 32px 0 16px;
          background-color: #ffffff;
        }

        .categories-main-title {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0c0d0e;
          margin: 12px 0 14px;
        }

        .categories-main-subtitle {
          font-size: 15.5px;
          font-weight: 500;
          color: #52525b;
          line-height: 1.6;
          max-width: 660px;
          margin: 0 auto;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 18px;
        }

        .category-card-bold {
          background-color: #fafafb;
          border: 1px solid #f0f0f4;
          border-radius: 18px;
          padding: 28px 12px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 128px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .category-card-bold:hover {
          background-color: #ffffff;
          border-color: #d4d4d8;
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.08);
        }

        .cat-icon-box {
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .category-card-bold:hover .cat-icon-box {
          transform: scale(1.12);
        }

        .cat-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #0c0d0e;
          letter-spacing: -0.015em;
          line-height: 1.35;
        }

        @media (max-width: 1100px) {
          .categories-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          .categories-main-title {
            font-size: 32px;
          }
        }

        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .categories-main-title {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
