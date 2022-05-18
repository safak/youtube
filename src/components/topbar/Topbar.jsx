import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Front Groupe</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Recherche tes amis, Commentaire ou video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Notifications</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">99</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">40</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">99</span>
          </div>
        </div>
        <img src="https://f.hellowork.com/blogdumoderateur/2013/02/nyan-cat-gif-1.gif" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}
