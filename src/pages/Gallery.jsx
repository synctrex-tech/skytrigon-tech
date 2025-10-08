import { useMemo, useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import galleryImages from '../data/galleryImages.js';
import SectionHeading from '../components/ui/SectionHeading.jsx';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(galleryImages.map((image) => image.category))],
    []
  );

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') {
      return galleryImages;
    }
    return galleryImages.filter((image) => image.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="gallery-view">
      <SectionHeading
        align="center"
        eyebrow="Gallery"
        title="Moments from the Skytrigon universe"
        description="Peek inside our studios, product labs, and customer showcases powering next-generation outcomes."
      />

      <div className="gallery-toolbar" aria-label="Gallery filters">
        <label htmlFor="gallery-category">Category</label>
        <select
          id="gallery-category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <figure key={image.id} className="gallery-card">
            <div className="gallery-preview" role="presentation">
              <FiCamera aria-hidden />
            </div>
            <figcaption>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
              <span className="gallery-tag">{image.category}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
