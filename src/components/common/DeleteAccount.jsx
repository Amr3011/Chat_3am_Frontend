import { Fragment } from "react";
import DeleteAccountImg from "../../assets/DeleteAccountImg.svg";

const DeleteAccount = () => {
  return (
    <Fragment>
      <div>
        {/* Button to Open the Modal */}
        <div className="mt-4">
          <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
              <img src={DeleteAccountImg} alt="DeleteAccount-icon" />
              <span className="text-lg ms-2">Delete An Account</span>
          </div>
        </div>

        {/* Modal Dialog */}
        <dialog id="delete_account_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Account</h3>
            <p className="py-4">
              Are you sure you want to delete this account?
            </p>
            <div className="modal-action">
              {/* Yes Button */}
              <button className="btn">Yes</button>
              {/* No Button */}
              <button className="btn">No</button>
            </div>
          </div>
        </dialog>
      </div>
    </Fragment>
  );
};

export default DeleteAccount;
