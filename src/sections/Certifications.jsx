import SectionHeading from '../components/SectionHeading.jsx'
import CertificateCard from '../components/CertificateCard.jsx'
import { certifications } from '../data/portfolioData.js'

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="container-content">
        <SectionHeading eyebrow="Certifications" title="Courses & certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <CertificateCard key={cert.name} certificate={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
