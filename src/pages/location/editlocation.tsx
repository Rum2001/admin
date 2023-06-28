/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Label,
    Modal,
    TextInput,
} from "flowbite-react";
import type { FC } from "react";
import  { useState, useEffect } from "react";
import {
    HiPencilAlt,
} from "react-icons/hi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
const EditLocationModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.boxvlu.click/api/locations/${id}`);
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
            const response = await axios.put(`https://api.boxvlu.click/api/locations/${id}`, {name});
            console.log(response.data);
            toast.success('Sửa Thành Công')
            setOpen(false)
            navigate('/location/list');
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
                        <strong>Chỉnh Sửa Địa Điểm</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <div>
                                <Label htmlFor="Name">Địa Điểm</Label>
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
export default EditLocationModal;