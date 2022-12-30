import { useEffect } from "react";
import styles from './userLogin.module.scss'
import axios from "axios";
import Page2Login from "./page2Login"
const login: React.FC = () => {

    
    
    
      return (
        <div className={styles.box}>
          <h1>----USER---LOGIN----</h1>
          <Page2Login></Page2Login>
           
        </div>
      );
    };
    
    
    export default login