import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import {toast} from 'react-toastify'


function Tickets() {

    const {tickets, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(isSuccess){
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading){
        return <Spinner />
    }

    return (
        <div>Tickets</div>
    )

}

export default Tickets