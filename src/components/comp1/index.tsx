// 模块化引入
import styles from "./comp1.module.scss" 
function Comp(){
    return (
        <div className={styles.box1}>
            <p>这是Comp1中的内容</p>
        </div>
    )
}
export default Comp