export default {
  name: "message",
  title: "Message",
  type: "document",
  fields: [
    {
      name: "user",
      title: "User",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "name",
      title: "Message",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "desc",
      title: "Desc",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "image",
      title: "Message",
      type: "image",
      validation: (Rule) => Rule.required().error("Image is required"),
    },
  ],
};
