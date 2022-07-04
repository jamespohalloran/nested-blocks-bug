import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          label: "3 layer nesting",
          name: "pageBlocks3",
          type: "object",
          description:
            "This also works. It's a blockList > groupList > groupList",
          list: true,
          templates: [
            {
              label: "Page Blocks",
              name: "nestedBlocka",
              fields: [
                {
                  label: "Page Blocks",
                  name: "nestedBlockb",
                  type: "object",
                  list: true,
                  templates: [
                    {
                      label: "List Items",
                      name: "items",
                      ui: {
                        defaultItem: {
                          title: "Here's Another Feature",
                        },
                      },
                      fields: [
                        {
                          label: "Page Blocks",
                          name: "nestedBlockc",
                          type: "object",
                          list: true,
                          ui: {
                            visualSelector: true,
                          },
                          fields: [
                            {
                              label: "title",
                              name: "title",
                              type: "string",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export default schema;

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || "main";
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

export const tinaConfig = defineConfig({
  apiURL,
  schema,
  cmsCallback: (cms) => {
    import("tinacms").then(({ RouteMappingPlugin }) => {
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        return "/";
      });

      cms.plugins.add(RouteMapping);
    });
    return cms;
  },
});
