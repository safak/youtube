import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Information utilsateur</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">lieu de naissance:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relation:</span>
            <span className="rightbarInfoValue">Solo</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Amis</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="https://f.hellowork.com/blogdumoderateur/2013/02/nyan-cat-gif-1.gif"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">une fille</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="http://c.tenor.com/zsP0bShJ5PsAAAAC/snk.gif"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Moi</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="https://c.tenor.com/eeCV7mbY4l0AAAAC/nicky-larson.gif"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Dora</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="https://i.pinimg.com/originals/b7/ff/d8/b7ffd803720bdd628ed684200acc4c71.gif"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">zoupzoup</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="https://i.pinimg.com/originals/f8/09/4e/f8094eda649d60e5a15c27252f88f8e6.gif"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">femme</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="https://thumbs.gfycat.com/DifferentImpureBorderterrier-size_restricted.gif"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Shirley</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
