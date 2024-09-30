import { useNavigation, useSubmit } from "@remix-run/react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { Modal } from "./modal";
import { Select } from "./select";
import { Category } from "@prisma/client";
import { Jsonify } from "type-fest";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Jsonify<Category[]> | undefined;
}

export function EventModal({ isOpen, onClose, categories }: EventModalProps) {
  const { register, handleSubmit, reset } = useForm();
  const submit = useSubmit();
  const navigation = useNavigation();

  const createEvent = async (data: FieldValues) => {
    submit(JSON.stringify(data), {
      method: "POST",
      encType: "application/json",
    });
    onClose();
    reset();
  };

  const handleCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal} className="w-96">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        <form
          onSubmit={handleSubmit(createEvent)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="border p-2 rounded-md"
          />
          <Input
            placeholder="Description"
            {...register("description", { required: true, maxLength: 255 })}
            className="border p-2 rounded-md"
          />
          <Input
            placeholder="Location"
            {...register("location", { maxLength: 25 })}
            className="border p-2 rounded-md"
          />

          <div className="flex gap-2">
            <Input
              required
              {...register("date", { required: true })}
              defaultValue={new Date().toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]}
              type="date"
              className="border p-2 rounded-md"
            />
            <Select {...register("categoryId")}>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button disabled={navigation.state === "submitting"} type="submit">
              {navigation.state === "submitting"
                ? "Creating..."
                : "Create Event"}
            </Button>
            <Button variant="neutral" onClick={handleCloseModal} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
