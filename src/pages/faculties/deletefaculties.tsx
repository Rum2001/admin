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
const DeleteFacultiesModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const deleteCategories = () => {
        axios.delete(`http://127.0.0.1:8000/api/faculties/${id}`)
          .then(response => {
            console.log(response.data);
            navigate('/faculties/list');
            setOpen(false)
            toast.success("Xóa Thành Công")
            // Nếu xóa người dùng thành công, có thể thực hiện các hành động khác ở đây
          })
          .catch(error => {
            console.log(error);
            const errorMessage = error.response?.data?.error
            toast.error(errorMessage)
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
                    <span className="sr-only">Delete Faculties</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="text-7xl text-red-500" />
                        <p className="text-xl text-gray-500">
                            Bạn có chắc chắn muốn xóa không?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button color="failure" onClick={deleteCategories}>
                                Đồng ý 
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                Từ chối
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                </form>
            </Modal>
        </>
    );
};
export default DeleteFacultiesModal;