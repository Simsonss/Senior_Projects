import Form from "@/app/ui/groups/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Groups', href: '/dashboard/groups' },
          {
            label: 'Create New Group',
            href: '/dashboard/groups/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}