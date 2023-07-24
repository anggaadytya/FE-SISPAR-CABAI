import ReportHarian from "../../../components/ReportHarian/ReportHarian";
import SideBar from "../../../components/sidebar/SideBar";
import "./Report.css";

const Report = () => {
  return (
    <div className="AppMain">
      <div className="AppGlass">
        <SideBar id={4} />
        <div className="MainDashHapen">
          <h1 className="Text1">Report Hasil Deteksi</h1>
          <ReportHarian/>
        </div>
      </div>
    </div>
  );
};

export default Report;
