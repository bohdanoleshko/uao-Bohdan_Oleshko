import { useState } from "react"
import { ResponseDate } from "../../types/ReqDate"
import DateCard from "../DateCard/DateCard"
import styles from './DatesList.module.css'
import { dateToISOParser } from "../../utils"

interface DatesListProps {
    dates: ResponseDate[],
    deleteData: (_id: string) => void,
    handleSetEditingDate: (id: string | null) => void,
    dateRange: Date[] | undefined,
}

function DatesList({dates, deleteData, handleSetEditingDate, dateRange}: DatesListProps) {
    const [toggleAllEvents, setToggleAllEvents] = useState<boolean>(true)

    const filteredEvents = dateRange && dates.filter(date => {
        const startInRange = dateToISOParser(date.startDate) <= dateRange[1]
        const endInRange = dateToISOParser(date.endDate) >= dateRange[0]
        return startInRange && endInRange
    })

    return (
        <div className={styles.container}>
            <div className={styles.toggle_container}>
                <div onClick={() => setToggleAllEvents(true)} className={`${styles.toggler} ${toggleAllEvents ? styles.selectedTab : ''}`}>
                    <p>All events</p>
                </div>
                <div onClick={() => setToggleAllEvents(false)} className={`${styles.toggler} ${toggleAllEvents ? '' : styles.selectedTab}`}>
                    <p>Events in range</p>
                </div>
            </div>
            <div className={styles.list}>
                {toggleAllEvents ? 
                <>
                {dates.length ? dates.map(date => (
                    <DateCard key={date._id} date={date} deleteData={deleteData} handleSetEditingDate={handleSetEditingDate} />
                )) : 
                <div className={styles.empty_message}>
                    <p>Nothing here, lets set your first event!</p>
                </div>
                }
                </> :
                <>
                {filteredEvents?.length ? filteredEvents?.map(date => (
                    <DateCard key={date._id} date={date} deleteData={deleteData} handleSetEditingDate={handleSetEditingDate} />
                )) : 
                <div className={styles.empty_message}>
                    <p>Nothing here, set a new event or change the date range</p>
                </div>
                }
                </>
                }
            </div>
        </div>
    )
}

export default DatesList
