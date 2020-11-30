import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { useState, useEffect } from 'react';
import Router from 'next/router';


const EditCommandCell = props => {
    return (
        <td>
            <button
                className="k-button k-primary"
                onClick={() => Router.push(`/admin/booking/detail/${props.dataItem._id}`)}>
                View Details
      </button>
        </td>
    );
};


const BookingList = ({ list }) => {
  const [state, setState] = useState();
  const createState = (skip, take) => {
    return {
      items: list && list.slice(skip, skip + take),
      total: list && list.length,
      skip: skip,
      pageSize: take,
      pageable: state ? state.pageable : {
          buttonCount: 5,
          info: false,
          type: 'numeric',
          pageSizes: true,
          previousNext: false
      }
    }
  }

     useEffect(() => {
          setState(createState(0, 10))
     },[list])


    const pageChange = (event) => {
        setState(createState(event.page.skip, event.page.take));
    }

  const MyEditCommandCell = props => (
            <EditCommandCell {...props} />
        );

    return (
        <div className="pt-5 p-2 mt-5">
            {state && <Grid
                style={{ height: '60vh' }}
                data={state.items}
                onPageChange={pageChange}
                total={state.total}
                skip={state.skip}
                pageable={state.pageable}
                pageSize={state.pageSize}>
                <Column field="booking_id"  title="Booking Id"/>
                <Column field="booking_status" title="Status" />
                <Column field="agent.name" title="Assigned to" />
                <Column field="date"  title="Date of Arr/Dep"/>
                <Column field="time" title="Time of Arr/Dep" />
                <Column field="booking_type" title="Booking Type" />
                <Column cell={MyEditCommandCell} title="Action"  />
            </Grid>}
        </div >
    );
}

 export default BookingList;
