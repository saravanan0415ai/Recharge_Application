export default function Admin() {
  return (
    <div>
      <div className="card">
        <h1>Welcome Admin 👋</h1>
        <p>Manage your application using the sidebar</p>
      </div>

      <div className="grid">
        <div className="box">Plans</div>
        <div className="box">Users</div>
        <div className="box">History</div>
        <div className="box">Coupons</div>
      </div>
    </div>
  );
}