import "./intro.css"
import Me from "../../img/me.png"

const Intro = () => {
    return (
        <div className="i">
            <div className="i-left">
                <div className="i-left-wrapper">
                    <h2 className="i-intro">Hello, My name is</h2>
                    <h1 className="i-name">Pedro Karpinski Neto</h1>
                    <div className="i-title">
                        <div className="i-title-wrapper">
                            <div className="i-title-item">Front-End Developer</div>
                            <div className="i-title-item">UI/UX Designer</div>
                        </div>
                    </div>
                    <p className="i-desc">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro cupiditate dolor a facilis similique accusamus animi tenetur delectus in. Excepturi voluptate doloremque, quam vero numquam nemo cumque tenetur dolore illo.
                    </p>
                </div>
            </div>
            <div className="i-right">
                <div className="i-bg"></div>
               {/* <img src={Me} alt="" className="i-img" /> */}
            </div>
        </div>
    )
}
export default Intro
