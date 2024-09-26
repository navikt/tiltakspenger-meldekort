import { ThumbUpIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import styles from "@/styles/Home.module.css";

const Home = () => (
  <main className={styles.main}>
    <Button icon={<ThumbUpIcon title="a11y tittel" />}>Knapp</Button>
  </main>
);

export default Home;
