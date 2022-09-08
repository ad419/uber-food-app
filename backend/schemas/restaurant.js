export default {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().error("Description is required"),
    },
    {
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required().error("Address is required"),
    },
    {
      name: "long",
      title: "Longitude",
      type: "number",
      validation: (Rule) => Rule.required().error("Longitude is required"),
    },
    {
      name: "lat",

      title: "Latitude",
      type: "number",
      validation: (Rule) => Rule.required().error("Latitude is required"),
    },
    {
      name: "imgUrl",
      title: "Image URL",
      type: "string",

      validation: (Rule) => Rule.required().error("Image URL is required"),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
    },
    {
      name: "dishes",

      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
      validation: (Rule) => Rule.required().error("Dishes is required"),
    },
  ],
};
