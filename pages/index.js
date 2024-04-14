import styles from "./index.module.css";
import { Heebo } from "next/font/google";
import Image from "next/image";
import { LuArrowUpRightSquare } from "react-icons/lu";

// If loading a variable font, you don't need to specify the font weight
const quicksand = Heebo({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const topNewsResponse = await fetch(
    "https://api.thenewsapi.com/v1/news/top?api_token=1BdDnAz98RVV1c7mEzKk9awJwof0yqUgQ8lHFkc2&locale=us&limit=3"
  );
  const topNews = await topNewsResponse.json();

  const allNewsResponse = await fetch(
    "https://api.thenewsapi.com/v1/news/all?api_token=1BdDnAz98RVV1c7mEzKk9awJwof0yqUgQ8lHFkc2&language=en&limit=3"
  );
  const allNews = await allNewsResponse.json();

  const news = { data: [...topNews.data, ...allNews.data] };
  return {
    props: { news },
  };
}

export default function Home(props) {
  return (
    <div className="flex" style={{ userSelect: "none" }}>
      <div className="flex justify-center items-center flex-col h-screen pl-14 pr-2 w-3/4">
        <div className="flex justify-center items-start flex-col fixed">
          <h1 className={styles.newsProjectTitle + " " + quicksand.className}>
            News Blog
          </h1>
          <p className={styles.newsProjectSubTitle + " " + quicksand.className}>
            Next.js news blog project which uses SSR to present updated news.
          </p>
        </div>
      </div>
      <div className="flex flex-col h-full pt-14 pl-2 pr-14 pb-14 w-full">
        {props.news.data.map((individualNew) => {
          return (
            <div key={individualNew.uuid} className={styles.newContainer}>
              <div>
                <img
                  src={individualNew.image_url}
                  width={200}
                  alt="Picture of the author"
                />
              </div>
              <div className="w-full">
                <h1
                  onClick={() => window.open(individualNew.url)}
                  className={styles.newPageTitle + " " + quicksand.className}
                >
                  {individualNew.title}
                </h1>
                <hr />
                <p>{individualNew.description}</p>
                <a
                  className={styles.newLink}
                  href={individualNew.url}
                  target="_blank"
                >
                  Read more <LuArrowUpRightSquare />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
