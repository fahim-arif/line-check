import React from "react";
import styles from "../styles/header.module.css";
import { Route, Link } from "react-router-dom";
import {
  MenuOutlined,
  Search,
  PersonOutline,
  ShoppingCartOutlined,
  KeyboardArrowDownOutlined,
} from "@material-ui/icons";
import SearchBox from "./SearchBox";
const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.header_left}>
            <div className={styles.hambergur_menu}>
              <Link to='#'>
                <i className='fas fa-bars'></i>
              </Link>
            </div>
            {/* <MenuOutlined class={styles.header_icons_menu}></MenuOutlined> */}
            <Link to='/'>
              <img
                src='/images/FR Store.png'
                alt='Logo'
                className={styles.header_logo}
              />
            </Link>
            <div className={styles.search_box}>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
          </div>
          <div className={styles.header_right}>
            <div className={styles.header_icon_content}>
              <Link to='#'>
                <PersonOutline class={styles.header_icons} />
              </Link>
              <Link to='/profile'>Account</Link>
            </div>
            <div className={styles.header_icon_content}>
              <Link to='#'>
                <ShoppingCartOutlined class={styles.header_icons} />
              </Link>
              <Link to='/cart'>Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
