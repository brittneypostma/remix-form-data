import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireUser } from "~/session.server";
import invariant from "tiny-invariant";
import { createCustomer } from "~/models/customer.server";
import { redirect } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  await requireUser(request);
  const formData = await request.formData();
  const name = formData.get("name"); //null, string, file
  const email = formData.get("email");
  invariant(typeof name === "string", "name is required");
  invariant(typeof email === "string", "email is required");

  const customer = await createCustomer({ name, email });

  return redirect(`/customers/${customer.id}`);
}

export const inputClasses =
  "text-lg w-full rounded border border-gray-500 px-2 py-1";

export const submitButtonClasses =
  "w-full rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600 focus:bg-green-400";

export function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-medium uppercase leading-[24px] text-gray-400">
      {children}
    </div>
  );
}

export default function NewCustomer() {
  return (
    <div className="relative p-10">
      <h2 className="font-display mb-4">New Customer</h2>
      <Form method="post" className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">
            <LabelText>Name</LabelText>
          </label>
          <input id="name" name="name" className={inputClasses} type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <LabelText>Email</LabelText>
          </label>
          <input
            id="email"
            name="email"
            className={inputClasses}
            type="email"
          />
        </div>

        <div>
          <button
            type="submit"
            name="intent"
            value="create"
            className={submitButtonClasses}
          >
            Create Customer
          </button>
        </div>
      </Form>
    </div>
  );
}
