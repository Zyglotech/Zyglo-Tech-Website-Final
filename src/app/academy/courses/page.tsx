import { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI & IT Courses in Salem',
  description: 'Hands-on course tracks in AI tools, prompt engineering, Python automation, and web development at Zyglo Academy, Salem.',
  alternates: { canonical: 'https://www.zyglotech.com/academy/courses' },
};

export default function AcademyCoursesPage() {
  return (
    <PageShell
      title="AI Courses Salem"
      description="Hands-on course tracks in AI tools, prompt engineering, Python automation, and web development." 
      cta={{ label: 'Enroll Today', href: '/academy/bootcamps' }}
    />
  );
}
