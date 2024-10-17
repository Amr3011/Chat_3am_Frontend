import { Fragment, useRef } from "react";
import LogoutImg from "../../assets/LogoutImg.svg";
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  //const navigate = useNavigate();
  const modalRef = useRef(null); // Reference for modal

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout');  // This is the logout endpoint
      localStorage.removeItem('userInfo');  // Clear local storage (if you store the token here)
      window.location.href = '/login';  // Redirect the user to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openModal = () => {
    modalRef.current.showModal(); // Open modal
  };

  const closeModal = () => {
    modalRef.current.close(); // Close modal
  };

  return (
    <Fragment>
      <div className="mt-4">
        {/* Trigger for opening the modal */}
        <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
          <img src={LogoutImg} alt="LogoutImg-icon" />
          <button onClick={openModal}>Logout</button>
        </div>

        {/* Modal Dialog */}
        <dialog id="logout_modal" ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Logout</h3>
            <p className="py-4">Are you sure you want to log out?</p>
            <div className="modal-action">
              {/* Yes Button */}
              <button className="btn" onClick={handleLogout}>Yes</button>
              {/* No Button */}
              <button className="btn" onClick={closeModal}>No</button>
            </div>
          </div>
        </dialog>
      </div>
    </Fragment>
  );
};

export default Logout;
