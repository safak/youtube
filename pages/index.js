import Head from "next/head"
import Featured from "../components/Featured"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in New York</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/fav-icon.png" />
      </Head>
      <Featured />
      {/* <PizzaList /> */}
    </div>
  )
}
/*
import Head from "next/head"
import Image from "next/image"
import Featured from "../components/Featured"
import PizzaList from "../components/PizzaList"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in New York</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/fav-icon.png" />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  )
}
*/
