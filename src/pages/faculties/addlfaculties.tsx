/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Label,
    Modal,
    TextInput,
} from "flowbite-react";
import type { FC } from "react";
import  { useState} from "react";
import {
    HiPlus,
} from "react-icons/hi";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router";
const AddFacultiesModal: FC = function () {
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [name, setName] = useState('');
    
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.boxvlu.click/api/faculties', { name});
            console.log(response.data);
            toast.success("Thêm Thành Công")
            setOpenAdd(false)
            navigate('/faculties/list');
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
                        <strong>Thêm Khoa Ban</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <div>
                                <Label htmlFor="Name">Khoa Ban</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="Name"
                                        name="Name"
                                        placeholder="Bonnie"
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
        </>
    );
};
export default AddFacultiesModal;