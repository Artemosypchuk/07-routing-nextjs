import css from "./NoteForm.module.css";

import * as Yup from "yup";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, ErrorMessage, Field, type FormikHelpers } from "formik";

import type { Note } from "@/types/note";
import { createNote } from "@/lib/api";

export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

interface NoteFormProps {
  onClose: () => void;
}

const INITIAL_VALUES: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object({
  title: Yup.string()
    .required("Обов'язкове поле для заповнення!")
    .min(3, "Too short")
    .max(50, "Too long"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required!"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const formId = useId();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (
    values: NewNote,
    formikHelpers: FormikHelpers<NewNote>,
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        formikHelpers.resetForm();
      },
    });
  };

  return (
    <Formik<NewNote>
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${formId}-title`}>Title</label>
          <Field
            id={`${formId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${formId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${formId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${formId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${formId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
