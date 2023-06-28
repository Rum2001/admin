/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Label,
    Modal,
    Select,
} from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import {
    HiKey,
} from "react-icons/hi2";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
const EditUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
    const [allRole, setRole] = useState([])
    const { id } = useParams();
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.boxvlu.click/api/roles`);
                setRole(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    const handleFormSubmit = async (data) => {
        data.preventDefault();
        try {
            const response = await axios.put(`https://api.boxvlu.click/api/role/${id}`, data);
            console.log(response.data);
            toast.success('Cấp quyền thành công')
            setOpen(false)
            navigate('/users/list');
        } catch (error) {
            toast.error("Cấp quyền thất bại")
            console.error(error);
        }
    };
    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                <div className="flex items-center gap-x-3">
                    <HiKey className="text-xl" />
                </div>
            </Button>

            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Cấp quyền tài khoản</strong>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="role"
                                    value="Quyền hạn"
                                />
                            </div>
                            <Select required={true} {...register("role")}>
                                {allRole.map(item => (
                                    <option value="data">{item.name}</option>
                                ))}
                            </Select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Cấp quyền</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};
export default EditUserModal;