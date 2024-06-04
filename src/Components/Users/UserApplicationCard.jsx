const UserApplicationCard = ({ application, index }) => {
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>123 University Ave, City, Country</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="font-bold">Good application</div>
          <div className="text-sm opacity-50">No issues found</div>
        </div>
      </td>
      <td>Computer Science</td>
      <td>Bachelor of Science</td>
      <td>$100</td>
      <td>$20</td>
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
