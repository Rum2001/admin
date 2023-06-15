/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
  HiDocumentDownload,
  HiChevronLeft,
  HiChevronRight
} from "react-icons/hi";
import {
  HiXCircle,
  HiEye
} from "react-icons/hi2"
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteEventModal from "./deleteeventmodal";
import { ToastContainer } from "react-toastify";
import ExcelJS from "exceljs";
import { useSelector } from "react-redux";
const Events: FC = function () {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(4);


  useEffect(() => {
    const fetchDatas = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/events');
      setEvents(res.data);
    };
    fetchDatas();
    const interval = setInterval(fetchDatas, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.locations.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.categories.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.faculties.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.scales.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // Get current locations
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Event List");

    worksheet.columns = [
      { header: "Sự kiện", key: "title", width: 25 },
      { header: "Thể loại", key: "categories", width: 25 },
      { header: "Địa điểm", key: "location", width: 25 },
      { header: "Mô tả", key: "description", width: 50 },
      { header: "Khoa", key: "faculty", width: 25 },
      { header: "Quy Mô", key: "scale", width: 25 },
      { header: "Số lượng vé", key: "quality_ticket", width: 25 },
      { header: "Ngày bắt đầu", key: "start_time", width: 25 },
      { header: "Ngày kết thúc", key: "end_time", width: 25 },
      { header: "Trạng Thái", key: "status", width: 25 },
      { header: "Created At", key: "created_at", width: 25 },
      { header: "Updated At", key: "updated_at", width: 25 },
    ];

    events.forEach((event) => {
      worksheet.addRow({
        title: event.title,
        categories: event.categories,
        location: event.locations,
        description: event.description,
        faculty: event.faculties,
        scale: event.scales,
        quality_ticket: event.quantity_ticket,
        start_time: event.start_time,
        end_time: event.end_time,
        status: event.status,
        created_at: event.created_at,
        updated_at: event.updated_at,
      });
    });

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Event List.xlsx";
        link.click();
      })
      .catch((err) => console.log(err));
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Trang chủ</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/events/list">
                Sự kiện
              </Breadcrumb.Item>
              <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Danh sách sự kiện
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Tìm kiếm sự kiện"
                    onChange={handleSearch}
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button onClick={exportToExcel} color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllEventsTable events={currentEvents} />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
        <div className="mb-4 flex items-center sm:mb-0">
          <button
            onClick={handlePrevPage}
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous page</span>
            <HiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={handleNextPage}
            className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next page</span>
            <HiChevronRight className="text-2xl" />
          </button>

        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrevPage}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <HiChevronLeft className="mr-1 text-base" />
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Next
            <HiChevronRight className="ml-1 text-base" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for events"

        />
      </div>
    </form>
  );
};
const AllEventsTable: FC = function (props) {
  const { events } = props;
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const loginUser = useSelector((state) => state.auth.user)
  const roleLoginUser = `${loginUser.role}`;
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700 align-center">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell className="text-center">Tiêu đề</Table.HeadCell>
        <Table.HeadCell className="text-center">Địa Điểm</Table.HeadCell>
        <Table.HeadCell className="text-center">Danh mục</Table.HeadCell>
        <Table.HeadCell className="text-center">Quy Mô</Table.HeadCell>
        <Table.HeadCell className="text-center">Trạng Thái</Table.HeadCell>
        <Table.HeadCell className="text-center">Hành động</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {events.map(event => (
          <Table.Row key={event.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">

              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {event.faculties}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {event.locations}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {event.categories}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {event.scales}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {event.status}
            </Table.Cell>

            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <button onClick={() => navigate(`/events/list/watch/${event.id}`)}>
                </button>
                {roleLoginUser == 'Admin' ? (
                  <div className="flex gap-2">
                  <Link to={`/events/list/delete/${event.id}`}>
                    <DeleteEventModal />
                  </Link>
                  <Link to={`/events/list/watch/${event.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-400">
                      <div className="flex items-center gap-x-3">
                        <HiEye className="text-xl" />
                      </div>
                    </Button>
                  </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-x-3 whitespace-nowrap">
                    <Button className="bg-red-600 hover:bg-red-400">
                      <div className="flex items-center gap-x-3">
                        <HiXCircle className="text-xl" />
                      </div>
                    </Button>
                  </div>
                )}

              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Events;
