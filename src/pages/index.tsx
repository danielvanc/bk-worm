import Page from "components/Page";
import BookList from "components/BookList";

export default function Home() {
  return (
    <Page>
      <h1>Home</h1>
      <BookList />
    </Page>
  );
}

// export async function getStaticProps() {
//   return { props: {} }
// }
