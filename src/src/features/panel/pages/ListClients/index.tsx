
import { TableClients } from "../../../../shared/components";
import styles from "./listclients.module.css"


export const ListClients = () => (
    <div className={styles.container_list_clients}>
       <TableClients/>
    </div>
);


export default ListClients;