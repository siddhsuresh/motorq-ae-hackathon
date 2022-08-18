// @ts-nocheck
import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export function EventForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <div className="p-5 m-5">
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Enter the title" />
      <LabeledTextField name="description" label="Description" placeholder="Enter the description" />
      <LabeledTextField name="logitude" label="Logitude" placeholder="Enter the logitude" type="number" step="0.01" />
      <LabeledTextField name="latitude" label="Latitude" placeholder="Enter the latitude" type="number" step="0.01" />
      <LabeledTextField name="size" label="Size" placeholder="Enter the Number of Participant allowed" type="number" />
      <LabeledTextField name="timeStart" label="Start Time" placeholder="Enter the start time" type="datetime-local" />
      <LabeledTextField name="timeEnd" label="End Time" placeholder="Enter the end time" type="datetime-local" />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </Form>
    </div>
  );
}
