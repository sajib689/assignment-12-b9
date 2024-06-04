const UserApplicationCard = ({ application, index }) => {
  const {
    _id,
    university_name,
    university_address,
    subject_category,
    applied_degree,
    application_fees,
    service_charge,
  } = application;
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
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};

export default UserApplicationCard;
