import { PageShell } from '@/components/PageShell';

export default function AcademyCoursesPage() {
  return (
    <PageShell
      title="AI Courses Chennai"
      description="Hands-on course tracks in AI tools, prompt engineering, Python automation, and web development." 
      cta={{ label: 'Enroll Today', href: '/academy/bootcamps' }}
    />
  );
}
