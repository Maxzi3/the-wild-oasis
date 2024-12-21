import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinToUpdate = {} }) {
  const { id: UpdateId, ...UpdateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(UpdateId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? UpdateValues : {},
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { UpdateCabin, isUpdating } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;
  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isUpdateSession)
      UpdateCabin(
        { newCabinData: { ...data, image }, id: UpdateId },
        { onSuccess: () => reset() }
      );
    else createCabin({ ...data, image: image }, { onSuccess: () => reset() });
  };
  const onError = (error) => {
    console.error(error);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Regular price is required",
            min: {
              value: 1,
              message: "Minimum price is 1",
            },
            valueAsNumber: true, // Convert input value to number
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "Discount is required",
            valueAsNumber: true, // Convert input value to number
            validate: (value) => {
              const regularPrice = getValues().regularPrice || 0;
              return (
                value <= regularPrice ||
                `Discount should be less than the regular price (${regularPrice})`
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>

      <FormRow label="image">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isUpdateSession ? false : "image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? "Update cabin" : "Create New cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
