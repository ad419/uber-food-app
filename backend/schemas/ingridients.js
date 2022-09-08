export default {
  name: "ingridient",
  title: "Ingridients",
  type: "document",
  fields: [
    {
      name: "ingridient_name",
      title: "Ingridient Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    },

    {
      name: "ingridient_image",
      title: "Ingridient Image",
      type: "image",
      validation: (Rule) => Rule.required().error("Title is required"),
    },
  ],
};
