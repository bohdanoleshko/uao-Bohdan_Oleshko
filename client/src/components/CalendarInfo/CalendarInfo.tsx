import { useFormik } from 'formik'
import { DateRange, RangeKeyDict } from 'react-date-range'
import { IDate } from '../../types/FormValues'
import * as Yup from 'yup'
import styles from './CalendarInfo.module.css'
import dateApi from '../../api/dateApi'
import { ResponseDate } from '../../types/ReqDate'
import { useEffect } from 'react'
import { dateToStringParser, dateToISOParser } from '../../utils'

interface CalendarInfoProps {
    fetchData: () => void,
    editingDate: ResponseDate | null,
    setEditingDate: React.Dispatch<React.SetStateAction<ResponseDate | null>>,
    handleDateRangeChange: (dates: Date[]) => void,
}
function CalendarInfo({ fetchData, editingDate, setEditingDate, handleDateRangeChange }: CalendarInfoProps) {
    const formik = useFormik<IDate>({
        initialValues: {
            startDate: new Date(),
            endDate: new Date(),
            description: '',
            price: null,
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required('Enter start date'),
            endDate: Yup.date().required('Enter end date'),
            description: Yup.string().required('Enter description'),
            price: Yup.number().required('Enter price'),
        }),
        onSubmit: (values, { resetForm }) => {
            if(editingDate) {
                dateApi.updateDate({
                    _id: editingDate._id,
                    startDate: dateToStringParser(values.startDate),
                    endDate: dateToStringParser(values.endDate),
                    description: values.description,
                    price: Number(values.price),
                })
            } else {
                dateApi.createDate({
                    startDate: dateToStringParser(values.startDate),
                    endDate: dateToStringParser(values.endDate),
                    description: values.description,
                    price: Number(values.price),
                })
            }
            resetForm()
            fetchData()
        }
    })

    useEffect(() => {
        if(editingDate) {
            formik.setValues({
                startDate: dateToISOParser(editingDate.startDate),
                endDate: dateToISOParser(editingDate.endDate),
                description: editingDate.description,
                price: editingDate.price,
            })
            handleDateRangeChange([dateToISOParser(editingDate.startDate), dateToISOParser(editingDate.endDate)])
        } else {
            formik.resetForm()
        }
    }, [editingDate, formik.setValues])

    const handleDateSelect = (rangesByKey: RangeKeyDict) => {
        const range = rangesByKey.range1;
        formik.setFieldValue('startDate', range.startDate);
        formik.setFieldValue('endDate', range.endDate);
        
        const typedStartDate = range.startDate ? new Date(range.startDate) : undefined;
        const typedEndDate = range.endDate ? new Date(range.endDate) : undefined;

        if (typedStartDate && typedEndDate) {
            handleDateRangeChange([typedStartDate, typedEndDate]);
        }
    }

    const handleSpecialCharacters = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (['e', '+', '-', ','].includes(e.key)) {
            e.preventDefault()
        }
    }

    const handleCancel = () => {
        setEditingDate(null)
        formik.resetForm()
    }

    return (
        <form onSubmit={formik.handleSubmit} className={styles.calendar_container}>
            <div>
                <DateRange
                    ranges={[{ startDate: formik.values.startDate, endDate: formik.values.endDate }]}
                    onChange={handleDateSelect}
                    minDate={new Date()}
                    showDateDisplay={false}
                />
            </div>
            <div className={styles.info_container}>
                <div className={styles.input_container}>
                    <p className={styles.input_title}>Description</p>
                    <textarea
                        className={`${styles.description_input} ${formik.touched.description && formik.errors.description && styles.error_field}`}
                        value={formik.values.description}
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <p className={styles.error_message}>{formik.errors.description}</p>
                    ) : null}
                </div>
                <div className={styles.input_container}>
                    <p className={styles.input_title}>Price ($)</p>
                    <input
                        className={`${styles.price_input} ${formik.touched.price && formik.errors.price && styles.error_field}`}
                        type='number'
                        value={formik.values.price || ''}
                        name="price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='0'
                        onKeyDown={handleSpecialCharacters}
                    />
                    {formik.touched.price && formik.errors.price ? (
                        <p className={styles.error_message}>{formik.errors.price}</p>
                    ) : null}
                </div>
                <div className={styles.button_container}>
                    <button onClick={handleCancel} type='button' className={`${styles.cancel_button} ${styles.button}`}>Cancel</button>
                    <button className={`${styles.button} ${styles.save_button}`} type='submit'>Save</button>
                </div>
            </div>
        </form>
    )
}

export default CalendarInfo
