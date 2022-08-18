// @ts-nocheck
import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createEvent from "app/events/mutations/createEvent";
import { showNotification } from '@mantine/notifications';
import { EventForm, FORM_ERROR } from "app/events/components/EventForm";

const NewEventPage = () => {
  const router = useRouter();
  const [createEventMutation] = useMutation(createEvent);

  return (
    <Layout title={"Create New Event"}>
      <h1 className="text-center text-white">Create New Event</h1>

      <EventForm
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateEvent}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const event = await createEventMutation(values)
            showNotification({
              title: "Event Created",
              message: "You have successfully created a new event",
            })
            router.push(Routes.ShowEventPage({ eventId: event.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.EventsPage()}>
          <a className="flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back to Events
            </button>
          </a>
        </Link>
      </p>
    </Layout>
  );
};

NewEventPage.authenticate = true;

export default NewEventPage;
