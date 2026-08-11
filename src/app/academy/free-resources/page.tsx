import { PageShell } from '@/components/PageShell';

export default function FreeResourcesPage() {
  return (
    <PageShell
      title="Free AI Resources"
      description="Access guides, tutorials, templates and community tools crafted for Salem learners and businesses." 
      cta={{ label: 'Download Guide', href: '/blog' }}
    />
  );
}
