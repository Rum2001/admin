/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Label,
    Modal,
    TextInput,
    Select,
} from "flowbite-react";
import type { FC } from "react";
import  { useState } from "react";
import {
    HiPlus,
} from "react-icons/hi";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,} from "react-router";
const AddAttendeeModal: FC = function () {
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [email, setEmail] = useState('');
    const [event_name, setEventsName] = useState('');
    const [verify_code, setVerifyCode] = useState('');
    const [status, setStatus] = useState('');
    const [checkin_at, setCheckIn] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.boxvlu.click/api/attendees', { email,event_name,verify_code,checkin_at,status });
            console.log(response.data);
            toast.success("Thêm Thành Công")
            setOpenAdd(false)
            navigate('/attendees/list');
        } catch (error) {
            toast.error("Thêm Thất Bại")
            console.error(error);
        }
    };
    return (
        <>
            <Button color="success" onClick={() => setOpenAdd(true)}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    ADD
                </div>
            </Button>

            <Modal onClose={() => setOpenAdd(false)} show={isOpenAdd}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Thêm Người tham dự</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="Email">Email</Label>
                                <div className="mt-1">
                                    <TextInput id="Email" name="Email" placeholder="@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="MaSV">Sự Kiện</Label>
                                <div className="mt-1">
                                    <TextInput id="MaSV" name="MaSV" placeholder="Tên Sự Kiện" value={event_name} onChange={(event) => setEventsName(event.target.value)} />
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
                                <Label htmlFor="Password">Verify_Code</Label>
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
        </>
    );
};
export default AddAttendeeModal;