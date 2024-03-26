import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function OrderTable({item, index, onDelete, onEdit}) {

    return (
      <>
        <tr>
            <td>{item.name}</td>
            <td>{item.reps}</td>
            <td>{item.weight}</td>
            <td>{item.unit}</td>
            <td>{item.date}</td>
            <td><MdEdit onClick={() => onEdit(item)}></MdEdit></td>
            <td><MdDelete onClick={ () => onDelete(item._id)}></MdDelete></td>
        </tr>
      </>
    );
  }
  
  export default OrderTable;
