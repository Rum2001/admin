/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Button,
    Label,
    Modal,
    TextInput,
    FileInput,
    Select,
    Textarea,
} from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import {
    HiPlus,
} from "react-icons/hi";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router";
const AddEventModal: FC = function () {
    const [isOpenAdd, setOpenAdd] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [faculty, setFaculty]=useState('');
    const [scale,setScale] =useState('');
    const [quantity_ticket,setQuality]=useState('');
    const [start_time,setStartTime]=useState('');
    const [end_time,setEndTime]=useState('');
    const [status,setStatus]=useState('');
    const [category_id,setCategoryID]=useState('');
    const [categoryAll,setCategoryAll]=useState([]);
    const [facultyAll,setFacultyAll]=useState([]);
    const [locationAll,setLocationAll]=useState([]);
    const [scaleAll,setSacleAll]=useState([]);
    const navigate = useNavigate();
    console.log(title, categories, description, location, faculty, scale,quantity_ticket,start_time,end_time,category_id, status )

    useEffect(() => {
        const fetchData = async () => {
          const responseCategory = await axios.get('https://api.boxvlu.click/api/categories');
          setCategoryAll(responseCategory.data);
          const responseFaculty = await axios.get('https://api.boxvlu.click/api/faculties');
          setFacultyAll(responseFaculty.data);
    
          const responseLocation = await axios.get('https://api.boxvlu.click/api/locations');
          setLocationAll(responseLocation.data);

          const responseScale = await axios.get('https://api.boxvlu.click/api/scales');
          setSacleAll(responseScale.data);
        };
    
        fetchData();
      }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://api.boxvlu.click/api/events', { title, categories, description, location, faculty, scale,quantity_ticket,start_time,end_time,category_id, status });
            console.log(response.data);
            toast.success("Thêm Thành Công")
            setOpenAdd(false)
            navigate('/events/list');
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
                    Add Event
                </div>
            </Button>

            <Modal onClose={() => setOpenAdd(false)} show={isOpenAdd}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                        <strong>Thêm Sự Kiện</strong>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="Name">Tiêu Đề</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="Name"
                                        name="Name"
                                        placeholder="Bonnie"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-1">
                                <Label htmlFor="Location">Địa điểm</Label>
                                <div id="select">
                                    <Select
                                        id="Location"
                                        required={true}
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                    >
                                        {locationAll.map(item => (
                                        <option key={item.id}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="id">
                                    ID Danh Mục
                                </Label>
                                <TextInput
                                    type="text"
                                    id="id"
                                    placeholder={`1`}
                                    value={category_id}
                                    onChange={(event) => setCategoryID(event.target.value)}
                                />
                            </div>
                            <div className="mt-1">
                                <Label htmlFor="categories">Danh Mục</Label>
                                <div id="select">
                                    <Select
                                        id="categories"
                                        required={true}
                                        value={categories}
                                        onChange={(event) => setCategory(event.target.value)}
                                    >
                                        {categoryAll.map(item => (
                                        <option key={item.id}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-1">
                                <Label htmlFor="scale">Quy Mô</Label>
                                <div id="select">
                                    <Select
                                        id="scale"
                                        required={true}
                                        value={scale}
                                        onChange={(event) => setScale(event.target.value)}
                                    >
                                        {scaleAll.map(item => (
                                        <option key={item.id}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-1">
                                <Label htmlFor="faculty">Khoa ban</Label>
                                <div id="select">
                                    <Select
                                        id="faculty"
                                        required={true}
                                        value={faculty}
                                        onChange={(event) => setFaculty(event.target.value)}
                                    >
                                        {facultyAll.map(item => (
                                        <option key={item.id}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-1">
                                <Label htmlFor="status">Trạng Thái</Label>
                                <div id="select">
                                    <Select
                                        id="status"
                                        required={true}
                                        value={status}
                                        onChange={(event) => setStatus(event.target.value)}
                                    >
                                        <option>
                                            Chưa duyệt
                                        </option>
                                        <option>
                                            Nháp
                                        </option>
                                        <option>
                                            Đã duyệt
                                        </option>
                                        <option>
                                            Hủy
                                        </option>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-1">
                                    <Label
                                        htmlFor="quality"
                                        value="Số lượng vé"
                                    />
                                    <TextInput
                                        id="quality"
                                        name="quality"
                                        placeholder="Số lượng vé"
                                        value={quantity_ticket}
                                        onChange={(event) => setQuality(event.target.value)}
                                    />
                                </div>

                            <div>
                            </div>
                            <div id="textarea">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="comment"
                                        value="Mô Tả"
                                    />
                                </div>
                                <Textarea
                                    id="comment"
                                    placeholder="Mô tả ở đây..."
                                    required={true}
                                    rows={4}
                                    className="w-full"
                                    value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                />
                                <div className="mt-1">
                                    <Label
                                        htmlFor="start_time"
                                        value="Ngày bắt đầu"
                                    />
                                    <TextInput
                                        id="start_time"
                                        name="start_time"
                                        placeholder="YYYY-MM-DD hh:mm:ss"
                                        value={start_time}
                                        onChange={(event) => setStartTime(event.target.value)}
                                    />
                                </div>
                                <div className="mt-1">
                                    <Label
                                        htmlFor="start_time"
                                        value="Ngày kết thúc"
                                    />
                                    <TextInput
                                        id="end_time"
                                        name="end_time"
                                        placeholder="YYYY-MM-DD hh:mm:ss"
                                        value={end_time}
                                        onChange={(event) => setEndTime(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div id="fileUpload">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="file"
                                        value="Chọn hình ảnh"
                                    />
                                </div>
                                <FileInput
                                    id="file"
                                    accept="image/*"
                                    helperText="Chọn hình ảnh "
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
export default AddEventModal;