import SideBar from "./components/common/SideBar";
import ChangePassword from "./pages/ChangePassword";
import EditPersonalInfo from "./pages/EditPersonalInfo";
import FAQs from "./pages/FAQs";
import Notification from "./pages/Notification";
import UserInfo from "./pages/UserInfo";

export default function App() {
  return (
    <main>
      <SideBar>
        <UserInfo />
        {/* <EditPersonalInfo /> */}
        {/* <ChangePassword /> */}
        {/* <FAQs /> */}
        {/* <Notification /> */}
      </SideBar>
    </main>
  );
}
