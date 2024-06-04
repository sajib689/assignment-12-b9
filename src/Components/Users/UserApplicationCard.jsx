
import Swal from 'sweetalert2';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const UserApplicationCard = ({ application, index }) => {
  const axiosPublic = useAxiosPublic()
  const {
    _id,
    university_name,
    university_address,
    subject_category,
    applied_degree,
    application_fees,
    service_charge,
  } = application;
  const handleUpdateApplication = _id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/applications/${_id}`)
        .then(res => {
         if(res.data){
          Swal.fire({
            title: "Deleted!",
            text: "Your Application has been deleted.",
            icon: "success"
          });
         }
        })
       
      }
    });
   
  }
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>{university_name}</td>
      
      <td>{university_address}</td>
      <td>
       Good Application
      </td>
      <td>{subject_category}</td>
      <td>{applied_degree}</td>
      <td>${application_fees}</td>
      <td>${service_charge}</td>
      <td>
        <span className="badge badge-info badge-sm">Pending</span>
      </td>
      <th>
        <button onClick={() => handleUpdateApplication(_id)} className="btn btn-ghost btn-xs">Delete</button>
      </th>
    </tr>
  );
};

export default UserApplicationCard;
