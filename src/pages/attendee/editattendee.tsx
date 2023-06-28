/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    TextInput,
    Select,
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
const EditAttendeeModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [event_name, setEventName] = useState('');
    const [status, setStatus] = useState('');
    const [avatar, setAvatar] = useState();
    const [verify_code, setVerifyCode] = useState('');
    const [checkin_at, setCheckIn] = useState('');
    const handlePhotoChange = (event) => {
        setAvatar(event.target.files[0]);
        console.log(event.target.files);
    };
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.boxvlu.click/api/attendees/${id}`);
                setEmail(response.data.email);
                setEventName(response.data.event_name);
                setStatus(response.data.status);
                setVerifyCode(response.data.verify_code);
                setCheckIn(response.data.checkin_at);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://api.boxvlu.click/api/attendees/${id}`, {  email, status, verify_code, event_name });
            console.log(response.data);
            toast.success('Sửa Thành Công')
            setOpen(false)
            navigate('/attendees/list');
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
                        <strong>Chỉnh Sửa Người Tham Dự</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="Email">Email</Label>
                                <div className="mt-1">
                                    <TextInput id="Email" name="Email" placeholder={`${email}`} value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="Event">Email</Label>
                                <div className="mt-1">
                                    <TextInput id="Event" name="Event" placeholder={`${event_name}`} value={event_name} onChange={(event) => setEventName(event.target.value)} />
                                </div>
                            </div>
                            <div>
                            <Label htmlFor="status">Trạng Thái</Label>
                                <div id="select">
                                    <Select
                                        id="status"
                                        required={true}
                                        value={status}
                                        onChange={(event) => setStatus(event.target.value)}
                                    >
                                        <option>
                                            Chưa điểm danh
                                        </option>
                                        <option>
                                            Đã điểm danh
                                        </option>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="Password">Mã QR</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="Password"
                                        name="Password"
                                        type="text"
                                        value={verify_code}
                                        onChange={(event) => setVerifyCode(event.target.value)}
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
export default EditAttendeeModal;