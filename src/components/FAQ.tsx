import {WhatsAppIcon} from './WhatsAppIcon';
import {ArrowUpRight, Plus} from 'lucide-react';
import {site} from '@/config/site';

const questions = [
  {question: 'Where is PorkHolic located?', answer: 'Our pig farm is based in Kombai, in the Theni region of Tamil Nadu, India.'},
  {question: 'How can I contact the farm?', answer: 'Call +91 89439 58007 or +91 70126 13992, or send us a message on WhatsApp using the link below.'},
  {question: 'Can I visit the farm?', answer: 'Please contact our team before planning a visit so we can discuss arrangements and share directions.'},
  {question: 'Where can I ask about pigs and availability?', answer: 'Message or call our team for current information about the pigs, availability, and any other farm enquiries.'},
];

export function FAQ() {
  return <section id="faq" className="faq section" aria-labelledby="faq-heading">
    <div className="container faq-layout">
      <div className="faq-intro">
        <p className="eyebrow"><span/> A FEW THINGS TO KNOW</p>
        <h2 id="faq-heading">Good questions.<br/><em>Simple answers.</em></h2>
        <p>A little more about the farm.<br/>For anything else, we&apos;re a message away.</p>
        <a className="text-link whatsapp-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18}/>Ask us on WhatsApp<ArrowUpRight size={18}/></a>
      </div>
      <div className="faq-list">
        {questions.map(({question, answer}, index) => <details key={question} name="farm-faq" className="faq-item">
          <summary><span className="faq-number" aria-hidden="true">0{index + 1}</span><h3>{question}</h3><span className="faq-toggle" aria-hidden="true"><Plus size={18}/></span></summary>
          <div className="faq-answer"><p>{answer}</p></div>
        </details>)}
      </div>
    </div>
  </section>;
}
