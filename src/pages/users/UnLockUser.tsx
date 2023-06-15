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
import { HiLockOpen } from "react-icons/hi2";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
const UnLockUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const {id} = useParams();
    const status = 'Đang hoạt động'
    const navigate = useNavigate();
    const deleteUser = () => {
        axios.put(`http://127.0.0.1:8000/api/status/${id}`,{status})
          .then(response => {
            console.log(response.data);
            navigate('/users/list');
            setOpen(false)
            toast.success("Tài khoản đã được gỡ vô hiệu hóa")
            // Nếu xóa người dùng thành công, có thể thực hiện các hành động khác ở đây
          })
          .catch(error => {
            console.log(error);
            toast.error("Lỗi không thể gỡ vô hiệu hóa")
            // Nếu xảy ra lỗi khi xóa người dùng, có thể xử lý lỗi ở đây
          });
      }
    return (
        <>
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-2">
                    <HiLockOpen className="text-lg" />
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <form>
                <Modal.Header className="px-6 pt-6 pb-0">
                    <span className="sr-only">Gỡ vô hiệu hóa người dùng</span>
                </Modal.Header>
                <Modal.Body className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="text-7xl text-green-600" />
                        <p className="text-xl text-gray-500">
                            Bạn có muốn gỡ vô hiệu hóa người dùng này?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button className="bg-green-500 hover:bg-green-600" onClick={deleteUser}>
                                Gỡ vô hiệu hóa
                            </Button>
                            <Button color="gray" onClick={() => setOpen(false)}>
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
                </form>
            </Modal>
        </>
    );
};
export default UnLockUserModal;