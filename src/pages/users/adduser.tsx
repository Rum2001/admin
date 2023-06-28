/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Label,
    Modal,
    TextInput,
    FileInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import {
    HiPlus,
} from "react-icons/hi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router";
const AddUserModal: FC = function () {
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState();
    const [masv, setMaSV] = useState('');
    const navigate = useNavigate();
    const handlePhotoChange = (event) => {
        setAvatar(event.target.files[0]);
        console.log(event.target.files);
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.boxvlu.click/api/users', { name, email, password, phone, avatar, masv });
            console.log(response.data);
            toast.success("Thêm Thành Công")
            setOpenAdd(false)
            navigate('/users/list');
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
                    THÊM
                </div>
            </Button>

            <Modal onClose={() => setOpenAdd(false)} show={isOpenAdd}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Thêm Người Dùng</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="Name">Họ Và Tên</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="Name"
                                        name="Name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="Email">Email</Label>
                                <div className="mt-1">
                                    <TextInput id="Email" name="Email" placeholder="@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="phone">Số Điện Thoại</Label>
                                <div className="mt-1">
                                    <TextInput id="phone" name="phone" placeholder="Nhập Số Điện Thoại" value={phone} onChange={(event) => setPhone(event.target.value)} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="Password">Password</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="Password"
                                        name="Password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="ConfirmPassword"
                                        name="ConfirmPassword"
                                        type="password"
                                    />
                                </div>
                            </div>
                            <div id="fileUpload">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="file"
                                        value="Chọn ảnh đại diện"
                                    />
                                </div>
                                <FileInput
                                    id="file"
                                    accept="image/*"
                                    helperText="Chọn hình ảnh đại diện"
                                    onChange={handlePhotoChange}
                                />
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
export default AddUserModal;