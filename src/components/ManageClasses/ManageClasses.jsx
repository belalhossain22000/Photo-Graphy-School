import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useGetData from '../../hooks/useGetData';
import { AuthContext } from '../../Provider/AuthProvider';

const ManageClasses = () => {
  const { user } = useContext(AuthContext);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  
  };
  

  const { data } = useGetData('http://localhost:5000/classes',headers);
  const [classes, setClasses] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setClasses(data);
  }, [user, data]);

  const handleApprove = async (classId) => {
    try {
      await axios.patch(`http://localhost:5000/classes/${classId}`, { status: 'approved' });
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === classId ? { ...classItem, status: 'approved' } : classItem
        )
      );
      alert('Status changed successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeny = async (classId) => {
    try {
      await axios.patch(`http://localhost:5000/classes/${classId}`, { status: 'denied' });
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === classId ? { ...classItem, status: 'denied' } : classItem
        )
      );
      alert('Status changed successfully');
    } catch (error) {
      console.error(error);
    }
    alert('Status changed successfully');
  };

  //send feedback
  const sendFeedback = async (id) => {
    alert("are you sure you want to send feedback")
    try {
      await axios.patch(`http://localhost:5000/classes/${id}`, {feedback:feedback});
      setClasses((prevClasses) =>
        prevClasses.map((classItem) =>
          classItem._id === id ? { ...classItem, feedback: feedback } : classItem
        )
      );
      alert('feedback send successfully');
    } catch (error) {
      console.error(error);
    }
  }
  //modal button
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.close();
    }
  };


  return (
    <div className='w-[70%] ml-[18%]'>
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Class Image</th>
            <th className="border-b px-4 py-2">Class Name</th>
            <th className="border-b px-4 py-2">Instructor Name</th>
            <th className="border-b px-4 py-2">Instructor Email</th>
            <th className="border-b px-4 py-2">Available Seats</th>
            <th className="border-b px-4 py-2">Price</th>
            <th className="border-b px-4 py-2">Status</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes?.map((classItem) => (
            <tr key={classItem._id}>
              <td className="border-b px-4 py-2">
                <img src={classItem.classImage} alt="Class Image" className="w-12 h-12" />
              </td>
              <td className="border-b px-4 py-2">{classItem.className}</td>
              <td className="border-b px-4 py-2">{classItem.instructorName}</td>
              <td className="border-b px-4 py-2">{classItem.instructorEmail}</td>
              <td className="border-b px-4 py-2">{classItem.availableSeats}</td>
              <td className="border-b px-4 py-2">{classItem.price}</td>
              <td className="border-b px-4 py-2">{classItem.status}</td>
              <td className="border-b px-4 py-2 ">
                {classItem.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 mr-2 rounded disabled:opacity-50"
                      onClick={() => handleApprove(classItem._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 mt-1 text-white px-4 py-1 mr-2 rounded disabled:opacity-50"
                      onClick={() =>{
                        openModal(`modal-${classItem._id}`);
                         handleDeny(classItem._id)
                        }}
                    >
                      Deny
                    </button>
                  </>
                )}
                {classItem.status !== 'pending' && (
                  <button
                    className="bg-gray-500 text-white px-4 py-1 rounded cursor-not-allowed"
                    disabled
                  >
                    {classItem.status === 'approved' ? 'Approved' : 'Denied'}
                  </button>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-600 mt-1 text-white px-4 py-1 mr-2 rounded disabled:opacity-50"
                  onClick={() => openModal(`modal-${classItem._id}`)}
                >
                  Feedback
                </button>
              </td>
              <td>
                <dialog id={`modal-${classItem._id}`} className="modal">
                  <form method="dialog" className="modal-box">
                    <button
                      htmlFor={`modal-${classItem._id}`}
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => closeModal(`modal-${classItem._id}`)}
                    >
                      ✕
                    </button>
                    <h3 className="font-bold text-lg">Send a Feedback!</h3>
                    <label htmlFor="feedback" className="block mb-2">Feedback:</label>
                    <textarea
                      onChange={(e) => setFeedback(e.target.value)}
                      id="feedback"
                      className="w-full h-24 p-2 border border-gray-300 mb-4"
                      placeholder="Enter your feedback"
                      value={feedback}

                    ></textarea>
                    <button
                      onClick={() => sendFeedback(classItem._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"

                    >
                      Send Feedback
                    </button>
                  </form>
                </dialog>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
