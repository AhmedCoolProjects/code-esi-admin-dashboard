import Head from "next/head";
import { Grid } from "@mui/material";
import { MdGroups } from "react-icons/md";
import { APP_PATHS_DATA, THEME } from "../../../../src/constants";
import { Header, PageCategoryCard } from "../../../../src/components";
import { IconType } from "react-icons";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jina CODE ESI ADMIN DASHBOARD</title>
      </Head>
      <Header title="Jina CODE ESI ADMIN DASHBOARD" />
      <div className="min-h-[400px]">
        <Grid container className="py-8" spacing={3}>
          {APP_PATHS_DATA.map((cardItem) => (
            <Grid item xs={12} sm={6} md={4} key={cardItem.title}>
              <PageCategoryCard
                link={cardItem.link}
                title={cardItem.title}
                description={cardItem.description}
                Icon={cardItem.icon}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
