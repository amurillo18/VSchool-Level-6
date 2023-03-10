import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import Ticket from '../components/Ticket'

function Tickets() {
  const { tickets } = useSelector((state) => state.tickets)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (!tickets) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div className='ticket-date'>Date</div>
          <div className='ticket-product'>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <Ticket key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets