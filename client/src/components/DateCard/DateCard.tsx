import { ResponseDate } from "../../types/ReqDate"
import styles from './DateCard.module.css'

interface DateCardProps {
    date: ResponseDate,
    deleteData: (_id: string) => void,
    handleSetEditingDate: (id: string | null) => void,
}

function DateCard({date, deleteData, handleSetEditingDate}: DateCardProps) {
    const {_id, startDate, endDate, description, price} = date

    const handleDelete = (id: string) => {
        deleteData(id)
        handleSetEditingDate(null)
    }

    return (
        <div className={styles.card_container}>
            <div className={styles.date_wrapper}>
                <div className={styles.date}>
                    <p>From</p>
                    <p className={styles.date_title}>{startDate}</p>
                </div>
                <div className={styles.date}>
                    <p>To</p>
                    <p className={styles.date_title}>{endDate}</p>
                </div>
            </div>
            <div className={styles.description_container}>
                <p>{description}</p>
                <p className={styles.price}>{price} $</p>
            </div>
            <div className={styles.button_container}>
                <button onClick={() => handleSetEditingDate(_id)} type="button" className={`${styles.button} ${styles.edit_button}`}>Edit</button>
                <button onClick={() => handleDelete(_id)} type="button" className={`${styles.button} ${styles.delete_button}`}>Delete</button>
            </div>
        </div>
    )
}

export default DateCard
