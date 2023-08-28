import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useGetAllSeller } from '../../api/getAllSeller';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';


export const TableSeller = () => {
  const {sellers, fetchAllSeller, rejectSeller, approveSeller} = useGetAllSeller();
  console.log(sellers);
  return (
    <div>

        <Table striped bordered hover>
            <thead>
              <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id}>
                  <td className="text-center">{seller.name}</td>
                  <td className="text-center">{seller.email}</td>
                  <td className="text-center" style={{ color: seller.status === 'Rejected' ? 'red' : seller.status === 'Approved' ? 'green' : 'black' }}>{seller.status}</td>
                  <td className="d-flex justify-content-center gap-3">
                    <Button variant="primary" onClick={() => approveSeller(seller._id)}>Approve</Button>
                    <Button variant="primary" onClick={() => rejectSeller(seller._id)}>Reject</Button>
                  </td>
                </tr>
              ))}
              </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Button variant="secondary" onClick={fetchAllSeller}> Refresh <ArrowCounterclockwise style={{fontSize: "1.5rem",marginRight: "0.5rem",}}/></Button>
        </div>
    </div>
  )
}
