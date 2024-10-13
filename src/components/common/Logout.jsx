import { Fragment } from "react";
import LogoutImg from "../../assets/LogoutImg.svg";

const Logout = () => {
  return (
    <Fragment>
      <div>
        {/* Button to Open the Modal */}
        <button
          className="btn"
          onClick={() => document.getElementById("logout_modal").showModal()}
        >
          <img src={LogoutImg} alt="LogoutIcon" />
          Logout
        </button>

        {/* Modal Dialog */}
        <dialog id="logout_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Logout</h3>
            <p className="py-4">Are you sure you want to log out?</p>
            <div className="modal-action">
              {/* Yes Button */}
              <button className="btn">Yes</button>
              {/* No Button */}
              <button
                className="btn"
                onClick={() => document.getElementById("logout_modal").close()}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </Fragment>
  );
};

export default Logout;
