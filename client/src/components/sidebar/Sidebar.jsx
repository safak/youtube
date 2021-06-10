import {
  Menu,
  Home,
  Explore,
  Subscriptions,
  VideoLibrary,
} from "@material-ui/icons";
import Skeleton from "../skeleton/Skeleton";
import "./sidebar.css";

const Sidebar = ({ isLoading }) => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <Menu />
        {isLoading ? (
          <Skeleton type="menu" />
        ) : (
          <>
            <div className="sidebarItem active">
              <Home />
              <span>Home</span>
            </div>
            <div className="sidebarItem">
              <Explore />
              <span>Explore</span>
            </div>
            <div className="sidebarItem">
              <Subscriptions />
              <span>Subsriptions</span>
            </div>
            <div className="sidebarItem">
              <VideoLibrary />
              <span>Library</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
