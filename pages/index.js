import { staticRequest } from "tinacms";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { ExperimentalGetTinaClient } from "../.tina/__generated__/types.ts";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <Layout>{JSON.stringify(data)}</Layout>;
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};

  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.page({
    relativePath: `home.mdx`,
  });

  return {
    props: {
      data: tinaProps.data || null,
      query: tinaProps.query || null,
      variables: tinaProps.variables || null,
    },
  };
};
