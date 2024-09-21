import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard 🎉 Pardy" }];
};

export default function Events() {
  return <div>Activity</div>;
}
