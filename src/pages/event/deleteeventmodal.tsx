/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    TextInput,
} from "flowbite-react";
import type { FC } from "react";
import React, { useState, useEffect } from "react";
import {
    HiChevronLeft,
    HiChevronRight,
    HiCog,
    HiDocumentDownload,
    HiDotsVertical,
    HiExclamationCircle,
    HiHome,
    HiOutlineExclamationCircle,
    HiOutlinePencilAlt,
    HiPlus,
    HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
const DeleteEventModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const deleteEvent = () => {
        axios.delete(`http://127.0.0.1:8000/api/events/${id}`)
          .then(response => {
            console.log(response.data);
            navigate('/events/list');
            setOpen(false)
            toast.success("Xóa Thành Công")
            // Nếu xóa người dùng thành công, có thể thực hiện các hành động khác ở đây
          })
          .catch(error => {
            console.log(error);
            toast.error("Xóa Thất Bại")
            // Nếu xảy ra lỗi khi xóa người dùng, có thể xử lý lỗi ở đây
          });
      }
    return (
        <>
            <Button color="failure" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiTrash className="text-lg" />
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <form>
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Delete events</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                        <p className="text-xl text-gray-500">
                            Are you sure you want to delete this events?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button color="failure" onClick={deleteEvent}>
                                Yes, I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                </form>
            </Modal>
        </>
    );
};
export default DeleteEventModal;