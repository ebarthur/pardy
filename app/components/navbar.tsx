import { Form, Link, useRouteLoaderData } from "@remix-run/react";
import React from "react";
import { loader } from "~/root";
import { Button } from "./button";
import { Input } from "./input";
import { Layout } from "./layout";
import { Modal } from "./modal";
import { Username } from "./username";
import { EventModal } from "./event-modal";

export default function Navbar() {
  const { user, categories } = useRouteLoaderData<typeof loader>("root") || {};
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
  };
  const handleCreateEventClick = () => setIsOpen(true);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      <div className="mt-4 flex w-full justify-between items-center p-2 border-b dark:border-neutral-700">
        <Link to="/" className="font-mono text-xl font-semibold">
          <h1 className="flex items-center pl-2 gap-2 font-mono text-2xl font-semibold">
            <div className="i-lucide-handshake text-[1rem]" />
            <p className="text-sm">Pardy</p>
          </h1>
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            {user.role === "ORGANIZER" && (
              <Button
                onClick={handleCreateEventClick}
                variant="ghost"
                className="!py-2"
              >
                <div className="i-lucide-circle-plus" />
              </Button>
            )}
            <div className=" hidden md:block min-w-2xl max-w-2xl">
              <Input placeholder="search" className="" />
            </div>
          </div>
        )}

        <EventModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          categories={categories}
        />

        {user ? (
          <div className="flex items-center gap-2">
            <Link to="/s/settings">
              <div className="rounded-full px-2 py-1 bg-neutral-200 dark:bg-neutral-700 font-mono text-sm ">
                <Username showVerfied user={user} />
              </div>
            </Link>
            <Button onClick={handleLogoutClick}>
              <div className="i-lucide-log-out" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 items-center text-sm">
            <div className="rounded-full hover:scale-105 transition duration-200 hover:text-purple">
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to={"https://github.com/ebarthur/pardy"}>
                <img src="./github.svg" alt="github.com" className="h-6 w-6" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onClose={handleCancelLogout}>
        <div className="p-4">
          <h2 className="flex items-center gap-1 font-semibold">
            Logout <div className="i-lucide-frown" />
          </h2>
          <p className="mt-2 text-sm">Are you sure you want to log out?</p>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              className="!text-black px-2 py-1 text-sm bg-gray-200 dark:bg-neutral-800 text-gray-800 !dark:text-white"
              onClick={handleCancelLogout}
            >
              Cancel
            </Button>
            <Form
              action="logout"
              method="post"
              className="transition-[background] duration-200 group cursor-pointer"
            >
              <Button
                onClick={handleConfirmLogout}
                className="text-white text-sm !bg-red-500"
              >
                Continue
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
