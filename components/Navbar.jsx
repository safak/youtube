import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Navbar.module.css"

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a>
              <Link href={"/"}>Homepage</Link>
            </a>
          </li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo-dwd-2.png" alt="" width="160px" height="69px" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Link href={"/cart"} passHref>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          </Link>
          <div className={styles.counter}>2</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
