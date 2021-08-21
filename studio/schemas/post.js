/* eslint-disable import/no-anonymous-default-export */
import { HiOutlineDocumentAdd } from "react-icons/hi";

export default {
  name: "post",
  title: "Posts",
  icon: HiOutlineDocumentAdd,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "excerpt",
      description:
        "Write a short pararaph of this post (For SEO Purposes)",
      title: "Excerpt",
      rows: 5,
      type: "text",
      validation: Rule =>
        Rule.max(160).error(
          "SEO descriptions are usually better when its below 160"
        )
    },
  ],
    preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      });
    }
  }
};