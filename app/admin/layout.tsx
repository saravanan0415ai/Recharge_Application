import Link from "next/link";
import { IoArrowBack, IoLogOutOutline } from "react-icons/io5";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin">
      <div className="bg" />

      <header className="topbar">
        <Link href="/" className="icon-btn">
          <IoArrowBack />
        </Link>

        <h2>Admin Panel</h2>

        <Link href="/" className="icon-btn">
          <IoLogOutOutline />
        </Link>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <Link href="/admin" className="nav-btn">Dashboard</Link>
          <Link href="/admin/plans" className="nav-btn">Plans</Link>
          <Link href="/admin/users" className="nav-btn">Users</Link>
          <Link href="/admin/history" className="nav-btn">History</Link>
          <Link href="/admin/coupons" className="nav-btn">Coupons</Link>
        </aside>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}