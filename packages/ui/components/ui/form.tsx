import * as FormPrimitives from "@radix-ui/react-form";
import type { ComponentPropsWithRef } from "react";

export const Form = (
  props: ComponentPropsWithRef<typeof FormPrimitives.Root>,
) => <FormPrimitives.Root {...props} />;

export const FormField = (
  props: ComponentPropsWithRef<typeof FormPrimitives.Field>,
) => <FormPrimitives.Field {...props} />;

export const FormLabel = (
  props: ComponentPropsWithRef<typeof FormPrimitives.Label>,
) => <FormPrimitives.Label {...props} />;

export const FormMessage = (
  props: ComponentPropsWithRef<typeof FormPrimitives.Message>,
) => <FormPrimitives.Message {...props} />;

export const FormControl = (
  props: ComponentPropsWithRef<typeof FormPrimitives.Message>,
) => <FormPrimitives.Message {...props} />;

export const FormSubmit = (
  props: ComponentPropsWithRef<typeof FormPrimitives.Submit>,
) => <FormPrimitives.Submit {...props} />;
