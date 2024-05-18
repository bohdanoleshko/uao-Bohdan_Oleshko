import { CalendarInfo, Header, DatesList } from "./components";
import styles from './App.module.css'
import { useEffect, useState } from "react";
import { ResponseDate } from "./types/ReqDate";
import dateApi from "./api/dateApi";

export default function App() {
  const [dates, setDates] = useState<ResponseDate[]>([])
  const [editingDate, setEditingDate] = useState<ResponseDate | null>(null)
  const [dateRange, setDateRange] = useState<Date[]>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await dateApi.fetchDate()
      setDates(data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteData = (id: string) => {
    dateApi.deleteDate(id)
    setDates(dates => dates.filter(date => date._id !== id))
  }

  const handleSetEditingDate = (id: string | null) => {
    setEditingDate(dates.find(date => date._id === id) || null)
  }

  const handleDateRangeChange = (dates: Date[]) => {
    setDateRange(dates)
  }

  return (
    <>
      <Header />
      <div className={styles.app_container}>
        <CalendarInfo fetchData={fetchData} editingDate={editingDate} setEditingDate={setEditingDate} handleDateRangeChange={handleDateRangeChange} />
        <DatesList dates={dates} deleteData={deleteData} handleSetEditingDate={handleSetEditingDate} dateRange={dateRange} />
      </div>
    </>
  )
}
