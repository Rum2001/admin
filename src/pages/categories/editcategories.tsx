/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    TextInput,
    FileInput,
} from "flowbite-react";
import type { FC } from "react";
import React, { useState, useEffect } from "react";
import {
    HiPencilAlt,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
const EditCategoryModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
                setName(response.data.name);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, { name});
            console.log(response.data);
            toast.success('Sửa Thành Công')
            setOpen(false)
            navigate('/categories/list');
        } catch (error) {
            toast.error("Sửa Thất Bại")
            console.error(error);
        }
    };
    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPencilAlt className="text-xl" />
                </div>
            </Button>

            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Chỉnh Sửa Danh Mục</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <div>
                                <Label htmlFor="Name">Tên Danh Mục</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="Name"
                                        name="Name"
                                        placeholder={`${name}`}
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Lưu</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};
export default EditCategoryModal;