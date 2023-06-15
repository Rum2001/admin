import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const EventsPage = () => {
    const { id } = useParams();
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [isOpenCancel, setOpenCancel] = useState(false);
    const [path, setPath] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [locations, setLocation] = useState('')
    const [start_time, setStartTime] = useState('')
    const [quanlity_ticket, setQuality] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}`);
                setPath(response.data.path);
                setEmail(response.data.email);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setLocation(response.data.locations);
                setStartTime(response.data.start_time);
                setQuality(response.data.quantity_ticket)

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);
    const handleApproveConfirmation = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/events/${id}/status`, {
                status: 'Đã duyệt',
            });
            setOpenAdd(false);
            toast.success("Phê duyệt thành công")

        } catch (error) {
            toast.error('Phê duyệt thất bại')
            console.error(error);
        }
    };
    const handleCancelConfirmation = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/events/${id}/status`, {
                status: 'Không duyệt',
            }
            );
            toast.success("Phê duyệt thành công")
            setOpenCancel(false);

        } catch (error) {
            toast.error('Phê duyệt thất bại')
            console.error(error);
        }
    };
    return (
        <section className=" bg-gray-50">
            <div className="container mx-auto px-4 relative">
                <div className="flex my-8 w-full items-center justify-between">
                    <Link to='/events/list'>
                        <Button className="w-[24rem] bg-yellow-300 hover:bg-yellow-400" >
                            Quay lại
                        </Button>
                    </Link>
                    <Button className="w-[24rem] bg-green-500 hover:bg-green-600" onClick={() => setOpenAdd(true)}>
                        Phê Duyệt
                    </Button>
                    <Modal
                        onClose={() => setOpenAdd(false)} show={isOpenAdd}
                    >
                        <Modal.Header>
                            Xác nhận phê duyệt
                        </Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    <p>
                                        Bạn đồng ý phê duyệt cho sự kiện này chứ ?
                                    </p>
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className=" bg-green-500 hover:bg-green-600"
                                onClick={handleApproveConfirmation} >
                                Đồng ý

                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setOpenAdd(false)}
                            >
                                <p>
                                    Thoát
                                </p>
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Button className="w-[24rem] bg-red-500 hover:bg-red-600" onClick={() => setOpenCancel(true)}>
                        Hủy
                    </Button>
                    <Modal
                        onClose={() => setOpenCancel(false)} show={isOpenCancel}
                    >
                        <Modal.Header>
                            Xác nhận phê duyệt
                        </Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    <p>
                                        Bạn không đồng ý phê duyệt cho sự kiện này ?
                                    </p>
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className=" bg-red-500 hover:bg-red-600"
                                onClick={handleCancelConfirmation} >
                                Không đồng ý

                            </Button>
                            <Button
                                color="gray"
                                onClick={() => setOpenCancel(false)}
                            >
                                <p>
                                    Thoát
                                </p>
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="block mb-20" data-aos="fade-up" data-aos-delay={300}><img className="object-cover h-min w-full" src={`http://127.0.0.1:8000/api/images/${path}`} alt="freetailwindui.co" /></div>
                <div className="md:flex mb-10 justify-between">
                    <div className="md:w-5/12 mb-5 md:mb-0">
                        <h2 className="font-bold text-xl lg:text-3xl text-gray-700 leading-tight" data-aos="fade-up" data-aos-delay={0}>{title}</h2>
                        <h3 className="font-bold text-xl lg:text-2xl text-blue-600 leading-tight" data-aos="fade-up" data-aos-delay={0}>Địa điểm :{locations}</h3>
                        <h3 className="font-bold text-xl lg:text-2xl text-blue-600 leading-tight" data-aos="fade-up" data-aos-delay={0}>Số lượng vé còn lại :{quanlity_ticket}</h3>
                        <h3 className="font-bold text-xl lg:text-2xl text-blue-600 leading-tight" data-aos="fade-up" data-aos-delay={0}>Thời gian bắt đầu :{start_time}</h3>
                    </div>
                    <div className="md:w-6/12">
                        <p className="text-gray-500 mb-5 leading-relaxed" data-aos="fade-up" data-aos-delay={100}>{description}</p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </section>
    )
}
export default EventsPage