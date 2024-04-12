export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const response = await fetch(
    "https://api.thenewsapi.com/v1/news/top?api_token=1BdDnAz98RVV1c7mEzKk9awJwof0yqUgQ8lHFkc2&locale=us&limit=3"
  );
  const news = await response.json();
  console.log("Gerou!");

  return {
    props: { news },
  };
}

export default function Home(props) {
  console.log(props);
  return <div>Home</div>;
}
