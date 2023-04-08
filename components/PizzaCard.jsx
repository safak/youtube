import Image from "next/image"
import Link from "next/link"
import styles from "../styles/PizzaCard.module.css"

const PizzaCard = () => {
  return (
    <div className={styles.container}>
      <Link href={"/product/1"} passHref>
        <Image src="/img/pizza.png" alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>FIORI DI ZUCCA</h1>
      <span className={styles.price}>$19.90</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  )
}

export default PizzaCard
